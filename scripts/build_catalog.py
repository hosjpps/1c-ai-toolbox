#!/usr/bin/env python3
"""Строит страницы каталога (catalog/*.md) из data/catalog.json.

    python3 scripts/build_catalog.py            # собрать из сохранённых данных
    python3 scripts/build_catalog.py --refresh  # сначала обновить звёзды/даты/лицензии через `gh api`

Оценки (tier) и тексты правятся в data/catalog.json руками или новым прогоном
research/workflow.js; факты GitHub — только из data/github.json (их пишет --refresh).
"""
import json
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT = ROOT / "catalog"

CATEGORIES = {
    "ai-skills": "Скиллы, плагины и правила для ИИ-агентов",
    "mcp": "MCP-серверы",
    "quality": "Анализ кода, языковые серверы, редакторы",
    "testing": "Тестирование",
    "build-ci-vcs": "Сборка, CI/CD, git, OneScript",
    "formats": "Форматы и парсеры: cf/cfe/epf, XML-выгрузка, BSL",
    "integration": "Интеграции и обмены",
    "llm-in-1c": "LLM внутри 1С и RAG по коду",
    "knowledge": "Знания и справка для агентов",
    "dev-consoles": "Консоли запросов, СКД, инструменты разработчика",
    "edt": "Плагины и надстройки EDT",
    "techlog": "Технологический журнал и журнал регистрации",
    "monitoring": "Мониторинг производительности и сервера",
    "cluster-admin": "Администрирование кластера (RAC/RAS)",
}
TIERS = [
    ("core", "Брать почти всегда"),
    ("useful", "Часто пригодится"),
    ("niche", "Под конкретную задачу"),
    ("skip", "Отсеяно (и почему)"),
]
VERDICT = {
    "confirmed": "проверено скептиком",
    "corrected": "проверено скептиком, данные исправлены",
    "demoted": "проверено скептиком, оценка понижена",
    "gap-found": "найдено при доборе пропусков, скептик не проверял",
}


def gh_key(url):
    m = re.match(r"https?://github\.com/([^/\s]+)/([^/\s#?]+)", url)
    return f"{m.group(1)}/{m.group(2)}" if m else None


def refresh(items):
    keys = sorted({k for k in (gh_key(i["url"]) for i in items) if k})

    def fetch(k):
        p = subprocess.run(
            ["gh", "api", f"repos/{k}", "--jq",
             "{full:.full_name,stars:.stargazers_count,pushed:.pushed_at,lic:.license.spdx_id,arch:.archived,fork:.fork}"],
            capture_output=True, text=True)
        return k, json.loads(p.stdout) if p.returncode == 0 else {"error": p.stderr.strip()[:200]}

    with ThreadPoolExecutor(8) as ex:
        facts = dict(ex.map(fetch, keys))
    (DATA / "github.json").write_text(json.dumps(facts, ensure_ascii=False, indent=1), encoding="utf-8")
    bad = [k for k, v in facts.items() if "error" in v]
    print(f"gh api: {len(facts)} репо, ошибок {len(bad)}: {bad}")
    return facts


def clean(s):
    return (s or "").replace("\n", " ").strip()


def render_item(i, facts, lock):
    k = gh_key(i["url"])
    f = facts.get(k, {}) if k else {}
    stars = f.get("stars", i.get("stars"))
    pushed = (f.get("pushed") or i.get("last_push") or "")[:10]
    lic = f.get("lic") or i.get("license") or "нет"
    meta = []
    if stars is not None:
        meta.append(f"★ {stars}")
    if pushed:
        meta.append(f"обновлён {pushed}")
    meta.append(f"лицензия {lic}")
    if i.get("paid"):
        meta.append("платно/закрыто")
    if f.get("arch") or i.get("archived"):
        meta.append("⚠ репозиторий в архиве")
    if f.get("full") and k and f["full"].lower() != k.lower():
        meta.append(f"переименован в {f['full']}")
    meta.append(VERDICT.get(i.get("verdict"), "без проверки"))
    lines = [f"#### [{i['name']}]({i['url']})", "", " · ".join(meta), "", clean(i["what"]), ""]
    for label, key in [("Работает", "runtime"), ("Нужно", "needs"), ("Доступ к данным", "data_access"),
                       ("Риски", "risks"), ("Почему такая оценка", "why_tier"), ("Проверка", "note")]:
        if clean(i.get(key)):
            lines.append(f"- **{label}:** {clean(i[key])}")
    if k and k in lock:
        lines.append(f"- **Версия на дату проверки:** `{lock[k]['commit'][:12]}` ({lock[k]['commit_date']})")
    return "\n".join(lines) + "\n"


def main():
    cat = json.loads((DATA / "catalog.json").read_text(encoding="utf-8"))
    items = cat["items"]
    facts = refresh(items) if "--refresh" in sys.argv else json.loads((DATA / "github.json").read_text(encoding="utf-8"))
    lock = json.loads((DATA / "tools.lock.json").read_text(encoding="utf-8"))["tools"]
    OUT.mkdir(exist_ok=True)

    index = ["# Каталог: сводка", "",
             f"Проверено {cat['checked']}. Всего {len(items)} инструментов. Полные карточки — в файлах категорий.", "",
             "| Категория | Всегда | Часто | Под задачу | Отсеяно |", "|---|---|---|---|---|"]
    top = ["", "## Всё с оценкой «всегда» и «часто»", "",
           "| Оценка | Инструмент | Категория | Что делает |", "|---|---|---|---|"]
    for key, title in CATEGORIES.items():
        group = [i for i in items if i["category"] == key]
        counts = {t: sum(1 for i in group if i["tier"] == t) for t, _ in TIERS}
        index.append(f"| [{title}]({key}.md) | {counts['core']} | {counts['useful']} | {counts['niche']} | {counts['skip']} |")
        body = [f"# {title}", "", f"Проверено {cat['checked']}. Факты GitHub обновляются `scripts/build_catalog.py --refresh`.", ""]
        for tier, tier_title in TIERS:
            part = sorted((i for i in group if i["tier"] == tier), key=lambda i: -(i.get("stars") or 0))
            if not part:
                continue
            body += [f"## {tier_title}", ""]
            body += [render_item(i, facts, lock) for i in part]
            if tier in ("core", "useful"):
                for i in part:
                    label = "всегда" if tier == "core" else "часто"
                    what = clean(i["what"])
                    what = what if len(what) <= 140 else what[:137].rstrip() + "…"
                    top.append(f"| {label} | [{i['name']}]({i['url']}) | [{key}]({key}.md) | {what.replace('|', '/')} |")
        (OUT / f"{key}.md").write_text("\n".join(body), encoding="utf-8")
    orphans = [i["name"] for i in items if i["category"] not in CATEGORIES]
    if orphans:
        print("Без категории:", orphans)
    (OUT / "INDEX.md").write_text("\n".join(index + top) + "\n", encoding="utf-8")
    print(f"Собрано: {len(CATEGORIES)} категорий, {len(items)} карточек")


if __name__ == "__main__":
    main()

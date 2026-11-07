export const meta = {
  name: '1c-ai-toolbox-research',
  description: 'Поиск и проверка лучших инструментов для разработки 1С с ИИ-агентами по 9 категориям',
  phases: [
    { title: 'Discover', detail: '9 поисковиков по категориям: GitHub + веб' },
    { title: 'Verify', detail: 'адверсариальная проверка фактов и тиров по категориям' },
    { title: 'Gaps', detail: 'критик полноты и добор пропущенного' },
  ],
}

const TODAY = args.today
const SCRATCH = args.scratch

const CONTEXT = `Цель: собрать личную «коробку» (toolbox) инструментов для разработки на 1С:Предприятие 8.3 с ИИ-агентами (Claude Code, Codex, Cursor). Коробка — отдельный репозиторий-каталог, из которого в каждый новый 1С-проект подтягиваются нужные инструменты. Проекты будут разные (УТ 11, БП, свои конфигурации, обмены с сайтами).
Среда владельца: macOS Apple Silicon; 1С-платформа и Конфигуратор — на удалённых Windows-ПК/серверах заказчиков. Важно: ПДн клиентов моделям не отдавать (152-ФЗ), рабочие базы — только чтение.
Сегодня ${TODAY}. «Заброшен» = нет коммитов >18 мес (но фундаментальные вещи вроде платформенной справки можно оставить с пометкой).
Инструменты: GitHub — \`gh search repos "<q>" --limit 30 --sort stars\`, \`gh search code\`, факты по репо — \`gh api repos/OWNER/REPO --jq '{stars:.stargazers_count,pushed:.pushed_at,license:.license.spdx_id,archived:.archived,desc:.description}'\`, README — \`gh api repos/OWNER/REPO/readme --jq .content | base64 -d | head -150\`. Веб — \`~/.claude/bin/exa search "<запрос>" -n 10\` (\`-t\` даёт текст страниц; ищи и по-русски: infostart.ru, habr.com, github). Клонировать при необходимости в ${SCRATCH}/<repo> и только ЧИТАТЬ: ничего из найденного не устанавливать и не запускать.
Правила отбора: реальная польза для агентной разработки 1С; факты (звёзды, дата последнего push, лицензия, archived) — только из gh api, не из памяти; не выдумывать репозитории — каждый URL проверен. Платные/закрытые (Infostart, vibecoding1c, 1С:Напарник и т.п.) можно включать с пометкой «платно/закрыто».`

const CANDIDATE = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    url: { type: 'string' },
    category: { type: 'string' },
    kind: { type: 'string', description: 'skill|plugin|mcp|linter|formatter|test|cli|library|extension|docs|rules|service|other' },
    what: { type: 'string', description: '1-2 предложения по-русски: что делает' },
    stars: { type: ['integer', 'null'] },
    last_push: { type: ['string', 'null'], description: 'YYYY-MM-DD из gh api' },
    license: { type: ['string', 'null'] },
    archived: { type: ['boolean', 'null'] },
    runtime: { type: 'string', description: 'на чём работает и на каких ОС (macOS?)' },
    needs: { type: 'string', description: 'предпосылки: выгрузка конфы в XML, платформа, EDT, Java, Node и т.п.' },
    data_access: { type: 'string', description: 'none|code-metadata|live-data-read|writes-infobase|network-external' },
    risks: { type: 'string' },
    tier: { type: 'string', enum: ['core', 'useful', 'niche', 'skip'] },
    why_tier: { type: 'string' },
    paid: { type: 'boolean' },
    evidence: { type: 'string', description: 'что реально прочитано: gh api / README / файл X' },
  },
  required: ['name', 'url', 'category', 'kind', 'what', 'tier', 'why_tier', 'data_access', 'runtime', 'needs', 'risks', 'paid', 'evidence'],
}
const LIST = {
  type: 'object',
  properties: { candidates: { type: 'array', items: CANDIDATE }, search_log: { type: 'string', description: 'какие запросы делал, что отсеял и почему (кратко)' } },
  required: ['candidates', 'search_log'],
}

const CATS = [
  { key: 'ai-skills', title: 'Скиллы, плагины и наборы правил для ИИ-агентов под 1С', hint: 'Claude Code skills/plugins, Codex, Cursor rules, AGENTS.md-наборы, промпты для BSL. Уже известны: Nikolay-Shirokov/cc-1c-skills, IngvarConsulting/unica, comol/ai_rules_1c — оцени их и ищи другие.' },
  { key: 'mcp', title: 'MCP-серверы для 1С', hint: 'метаданные, код, данные базы, журнал регистрации, синтакс-помощник/справка платформы, ИТС/стандарты, EDT, BSL LS. Известны: feenlace/mcp-1c, vladimir-kharin/1c_mcp, ROCTUP/1c-mcp-toolkit, DitriXNew/EDT-MCP, prepod2003/mcp-rsv-data, alonehobo/1c-trusted-gateway, vibecoding1c (платно). Отметь у каждого доступ к живым данным и запись.' },
  { key: 'quality', title: 'Статический анализ, линтеры, форматтеры, языковые серверы BSL', hint: 'BSL Language Server (1c-syntax), sonar-bsl-plugin-community, bsl-analyzer, плагины VS Code для BSL, АПК/ACC, проверка стандартов v8std.' },
  { key: 'testing', title: 'Тестирование 1С', hint: 'YAxUnit, Vanessa Automation, Vanessa-ADD, xUnitFor1C, генераторы тестовых данных, UI-тесты через веб-клиент.' },
  { key: 'build-ci-vcs', title: 'Сборка, CI/CD, работа с git, автоматизация Конфигуратора', hint: 'OneScript и его библиотеки, vanessa-runner, gitsync, precommit4onec, packman, ibcmd-обёртки, edt cli/ring, jenkins-lib для 1С, onec-docker, v8-runner, deployka.' },
  { key: 'formats', title: 'Форматы и парсеры: cf/cfe/epf, XML-выгрузка, MXL, разбор BSL', hint: 'v8unpack, onec_dtools, v8reader, tree-sitter-bsl, парсеры BSL/запросов на Python/JS/Go, граф метаданных, просмотр и диф XML-выгрузки.' },
  { key: 'integration', title: 'Интеграция и обмен 1С с внешними системами', hint: 'CommerceML (PHP/Python/JS библиотеки, модули обмена сайт↔1С), OData-клиенты к 1С, HTTP-сервисы/REST-фреймворки на 1С, коннекторы к брокерам (RabbitMQ/Kafka), JSON/XDTO-утилиты, библиотеки вроде «Коннектор» (HTTP-клиент для 1С).' },
  { key: 'llm-in-1c', title: 'LLM внутри 1С и RAG по 1С', hint: 'расширения/обработки 1С с чатом ИИ (OpenAI/GigaChat/YandexGPT/DeepSeek/локальные модели), коннекторы к API моделей из 1С, RAG и эмбеддинги по коду/метаданным конфигурации, датасеты BSL, модели для BSL, 1С:Напарник.' },
  { key: 'knowledge', title: 'Знания и справка для агентов', hint: 'выгрузки синтакс-помощника и справки платформы, стандарты разработки (v8std/ИТС) в машиночитаемом виде, документация БСП, awesome-списки по 1С, сообщество 1c-syntax/oscript-library, курсы и руководства, полезные для агента.' },
]

phase('Discover')
const found = await parallel(CATS.map(c => () => agent(
  `${CONTEXT}\n\nТвоя категория: «${c.title}» (ключ ${c.key}).\nПодсказки: ${c.hint}\n\nЗадача: найди максимум РЕАЛЬНО полезных инструментов этой категории (цель 8–20), сделай минимум 6 разных поисковых запросов (gh + exa, рус. и англ.), прочитай README каждого кандидата, по ключевым — код. Для каждого заполни все поля, category="${c.key}". Тиры: core — брать почти в любой 1С-проект; useful — часто пригодится; niche — под редкую задачу; skip — сознательно отсеяно (тоже включай, если инструмент на слуху, с причиной). Не раздувай список мусором и форками.`,
  { label: `find:${c.key}`, phase: 'Discover', schema: LIST, model: 'sonnet' }
)))

const seen = new Map()
found.filter(Boolean).forEach(r => r.candidates.forEach(c => {
  const k = (c.url || '').toLowerCase().replace(/\/+$/, '').replace(/\.git$/, '')
  if (!k) return
  if (!seen.has(k)) seen.set(k, c)
}))
const all = [...seen.values()]
log(`Найдено уникальных кандидатов: ${all.length}`)

phase('Verify')
const VERIFY = {
  type: 'object',
  properties: {
    results: { type: 'array', items: { type: 'object', properties: {
      url: { type: 'string' },
      verdict: { type: 'string', enum: ['confirmed', 'corrected', 'demoted', 'dropped'] },
      tier: { type: 'string', enum: ['core', 'useful', 'niche', 'skip'] },
      stars: { type: ['integer', 'null'] }, last_push: { type: ['string', 'null'] }, license: { type: ['string', 'null'] }, archived: { type: ['boolean', 'null'] },
      what: { type: 'string' }, data_access: { type: 'string' }, risks: { type: 'string' },
      note: { type: 'string', description: 'что проверил и что исправил' },
    }, required: ['url', 'verdict', 'tier', 'note', 'what', 'data_access', 'risks'] } },
  },
  required: ['results'],
}
const verified = await parallel(CATS.map(c => () => {
  const items = all.filter(x => x.category === c.key)
  if (!items.length) return Promise.resolve({ key: c.key, results: [] })
  return agent(
    `${CONTEXT}\n\nТы — скептик-проверяющий. Ниже кандидаты категории «${c.title}», найденные другим агентом. Твоя задача — ОПРОВЕРГНУТЬ завышенные оценки. Для КАЖДОГО: 1) gh api — существует ли, звёзды, last push, лицензия, archived (исправь, если неверно); 2) сверь «что делает» с README/кодом — нет ли выдумки или маркетинга; 3) тир: core только если реально нужен почти в каждом 1С-проекте и живой; при сомнении понижай; заброшенное/дубликат/игрушка → demoted или dropped; 4) data_access и risks — проверь по коду (пишет ли в базу, ходит ли в сеть, требует ли пароли открытым текстом). Верни запись на каждого кандидата.\n\nКандидаты (JSON):\n${JSON.stringify(items.map(i => ({ name: i.name, url: i.url, kind: i.kind, what: i.what, stars: i.stars, last_push: i.last_push, license: i.license, tier: i.tier, why_tier: i.why_tier, data_access: i.data_access, risks: i.risks, runtime: i.runtime, needs: i.needs })), null, 1)}`,
    { label: `verify:${c.key}`, phase: 'Verify', schema: VERIFY, model: 'sonnet', effort: 'high' }
  ).then(v => v ? { key: c.key, results: v.results } : null)
}))

const vmap = new Map()
verified.filter(Boolean).forEach(v => v.results.forEach(r => vmap.set((r.url || '').toLowerCase().replace(/\/+$/, '').replace(/\.git$/, ''), r)))
const merged = all.map(c => {
  const k = c.url.toLowerCase().replace(/\/+$/, '').replace(/\.git$/, '')
  const v = vmap.get(k)
  return v ? { ...c, ...v, verified_by: 'verifier' } : { ...c, verdict: 'unverified' }
})
const kept = merged.filter(m => m.verdict !== 'dropped')
log(`После проверки: ${kept.length} (отброшено ${merged.length - kept.length}, без проверки ${merged.filter(m => m.verdict === 'unverified').length})`)

phase('Gaps')
const GAPS = {
  type: 'object',
  properties: { gaps: { type: 'array', items: { type: 'object', properties: {
    category: { type: 'string' }, what_missing: { type: 'string' }, search_hint: { type: 'string' },
  }, required: ['category', 'what_missing', 'search_hint'] } } },
  required: ['gaps'],
}
const critic = await agent(
  `${CONTEXT}\n\nТы — критик полноты. Ниже итоговый каталог инструментов 1С по категориям (${CATS.map(c => c.key).join(', ')}). Чего не хватает? Назови до 12 существенных пробелов: известные в сообществе 1С инструменты или целые классы задач, которых нет (например: отладка/замер производительности, технологический журнал, работа с хранилищем конфигурации, EDT, генерация документации по конфигурации, обезличивание баз, веб-клиент/автотесты, СКД, работа с запросами). Проверь быстрым поиском, что инструмент реально существует. Не повторяй уже имеющиеся.\n\nКаталог:\n${JSON.stringify(kept.map(k => ({ c: k.category, n: k.name, u: k.url, t: k.tier })))}`,
  { label: 'critic', phase: 'Gaps', schema: GAPS, model: 'sonnet', effort: 'high' }
)
const gaps = critic ? critic.gaps : []
const byCat = {}
gaps.forEach(g => { (byCat[g.category] = byCat[g.category] || []).push(g) })
const gapCats = Object.keys(byCat).slice(0, 5)
if (Object.keys(byCat).length > 5) log(`Пробелы в ${Object.keys(byCat).length} категориях, добираю 5: ${gapCats.join(', ')}`)
const extra = await parallel(gapCats.map(cat => () => agent(
  `${CONTEXT}\n\nДобор пропусков в категории «${cat}». Уже есть в каталоге (не повторять): ${kept.filter(k => k.category === cat).map(k => k.url).join(', ')}.\nПробелы, найденные критиком:\n${byCat[cat].map(g => `- ${g.what_missing} (искать: ${g.search_hint})`).join('\n')}\n\nНайди и проверь (gh api + README; скептично к тиру) инструменты, закрывающие пробелы. category="${cat}". Если пробел реально нечем закрыть — так и напиши в search_log.`,
  { label: `gap:${cat}`, phase: 'Gaps', schema: LIST, model: 'sonnet', effort: 'high' }
)))
const extraItems = extra.filter(Boolean).flatMap(r => r.candidates)
  .filter(c => !seen.has(c.url.toLowerCase().replace(/\/+$/, '').replace(/\.git$/, '')))
  .map(c => ({ ...c, verdict: 'gap-found' }))

return {
  catalog: [...kept, ...extraItems],
  dropped: merged.filter(m => m.verdict === 'dropped').map(m => ({ name: m.name, url: m.url, note: m.note })),
  gaps,
  search_logs: found.filter(Boolean).map((r, i) => ({ cat: CATS[i] && CATS[i].key, log: r.search_log })),
  gap_logs: extra.filter(Boolean).map(r => r.search_log),
}

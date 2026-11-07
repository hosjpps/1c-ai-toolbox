# Пробелы и отсеянное

Прогон 07.11.2026. Критик полноты назвал 13 пробелов; 5 добраны отдельными агентами (их инструменты — в категориях `techlog`, `monitoring`, `cluster-admin`, `edt`, `dev-consoles` с пометкой «найдено при доборе»). Остальные 8 ниже — со слов критика: он проверял существование через `gh api`, но скептик их не смотрел. Добирать при следующем прогоне или по мере надобности в проекте.

## Документация по конфигурации и граф зависимостей

Из генераторов документации в каталоге только onec-cfg2md. Проверено: alkoleft/bsl-graph (49 звёзд, MIT, push 2025-09-20, анализатор и визуализатор конфигураций, полезен для карты проекта и анализа влияния). Устаревшие, брать только как идею: khorevaa/oscript-documentator (9, Apache-2.0, push 2019-03-18), brobots-corporation/1c2json (5, 2020-03-07, выгрузка метаданных в JSON для документации), alkoleft/ones_doc_gen и bia-technologies/autodocgen (оба 2019). Под задачу «сгенерировать описание чужой конфигурации и дать его агенту» реально подходит только bsl-graph.

Где искать дальше: gh api repos/alkoleft/bsl-graph; exa search '1С генерация документации по конфигурации github'

## Обезличивание баз (152-ФЗ)

В каталоге нет инструментов обезличивания, хотя владелец прямо отметил ограничение 152-ФЗ. Проверено: pg_anon от Tantor (tantorlabs.ru/tools/pg_anon, документация docs.tantorlabs.ru/tdb/en/15_17/se1c/pg_anon.html) обезличивает базу 1С на PostgreSQL без промежуточной копии, есть разбор на Infostart (infostart.ru/1c/articles/2747170). В репозитории ROCTUP/1c-mcp-toolkit есть ANONYMIZATION.md. Статья про то, что ломается на живых данных: infostart.ru/1c/articles/2764491. Это не готовый скилл, а процесс. Штатная обработка обезличивания из ИТС тоже существует. Класс задач нужно закрыть до того, как агенту дают данные заказчика. Для проектов на файловой или MS SQL базе pg_anon не подойдёт.

Где искать дальше: exa search 'обезличивание базы 1С pg_anon'; gh api repos/ROCTUP/1c-mcp-toolkit/contents/ANONYMIZATION.md

## Каркасы и шаблоны проектов 1С (repo bootstrap)

В каталоге есть vanessa-bootstrap yellow-hammer, но нет шаблонов структуры проекта. Проверено: astrizhachuk/bootstrap-1c (53 звезды, push 2025-08-20, шаблон для быстрого создания проектов 1С, лицензия не указана), csm-ivanovo-ru/cfe-template (0 звёзд, Unlicense, но push 2023-04-17, шаблон репозитория для расширений, брать только как образец структуры). Для плана «коробка на GitHub» нужен собственный шаблон проекта (AGENTS.md, .gitignore, структура src, CI), эти репозитории дают для него образцы.

Где искать дальше: gh api repos/astrizhachuk/bootstrap-1c; exa search '1С расширения cfe разработка шаблон проект git'

## Библиотеки OneScript для самих скриптов (тесты, утверждения, логи)

OneScript и opm есть, но нет базовых библиотек для скриптов. Проверено: oscript-library/asserts (13 звёзд, push 2026-06-23), oscript-library/logos (34, 2026-03-12, логирование в стиле log4j), oscript-library/1testrunner (11, push 2025-11-15, юнит-тесты для OneScript), artbear/1testrunner (7, 2025-11-12), oscript-library/1bdd (6, MPL-2.0, но push 2023-10-06). oscript-library/cmdline (13) заброшен с 2019-01-21, брать не стоит. Пригодится, когда агент пишет вспомогательные OneScript-утилиты для обмена и CI, а не только конфигурацию. Также существует каталог пакетов hub.oscript.io/packages.

Где искать дальше: gh api repos/oscript-library/asserts; gh api repos/oscript-library/1testrunner; exa search 'oscript-library'

## Сравнение и слияние конфигураций / расширений, пакетный режим Конфигуратора и ibcmd

Нет инструментов под обновление типовой и контроль расширений. Проверено: oscript-library/diff3cf (12 звёзд, MIT, но push 2019-11-01, сравнивает переопределённые в расширении модули с изменениями поставщика, идея ценная, код старый), AlexanderNiMo/designer_cmd (3, 2021-10-06, обёртка над пакетным режимом, фактически заброшена, есть v8runner в каталоге). Свежая статья по ibcmd (выгрузка и загрузка конфигурации из командной строки): infostart.ru/1c/articles/2804957 (2026-09-30). Нужна как справка для сценария «ibcmd вместо Конфигуратора» на серверах заказчиков. Для УТ 11 на поддержке сравнение вендорских обновлений с доработками первостепенная задача.

Где искать дальше: gh api repos/oscript-library/diff3cf; exa search 'ibcmd выгрузка загрузка конфигурации 1С командной строки'

## Работа с 1С с macOS (Apple Silicon): окружение разработчика

Владелец сидит на Mac, а в каталоге нет ничего про запуск инструментов 1С локально или удалённо. Нашлись материалы: статья «Mac OS для 1С разработчика» (infostart.ru/1c/articles/1950663), psyriccio/dck1c (167 звёзд, LGPL-3.0, Docker-контейнер Linux-клиента 1С, но push 2017-08-29 и под Apple Silicon он не подходит), mussolene/1c-develop (3 звезды, push 2026-07-24, лицензии нет, описания нет, содержимое надо читать). Остаётся пробел: не подтверждено ни одного живого способа поднять платформу на Apple Silicon. Практичный путь это удалённый Windows с MCP или SSH, поэтому нужна заметка-решение в коробке, а не инструмент.

Где искать дальше: exa search '1С на Mac macOS запуск разработка'; gh api repos/mussolene/1c-develop

## Конвертация и редактирование конфигурации в YAML

В каталоге нет редактора метаданных, работающего без Конфигуратора. Проверено: crimsongoldteam/nkdk (29 звёзд, push 2026-11-01, лицензия NOASSERTION, редактор конфигурации 1С в формате YAML, активный проект). Рядом ещё md-sparrow и cc-1c-skills уже в каталоге, но это разные подходы. Инструмент нужно проверить на реальной выгрузке перед включением, так как он работает с форматом данных, где ошибка ломает конфигурацию.

Где искать дальше: gh api repos/crimsongoldteam/nkdk; exa search '1c yaml metadata cfe extension'

## Регламентные задания, блокировки и разбор производительности запросов (SQL-уровень)

Нет справочных материалов по разбору блокировок и планов запросов, которые нужны вместе с ТЖ. Нашлись: статья «Оптимизация запросов 1С: план, метрики и цикл с LLM» (nizamov.school/optimizaciya-zaprosov-1s, 2026-09-06), разбор регламентных заданий (erp.band/proizvoditelnost-1s/analiz-vypolneniya-reglamentnyh-zadaniy-1s), «Мониторинг производительности» от Rarus про RLS и блокировки (rarus.ru/publications/20241128-ot-ekspertov-1c-performance-monitor-part-03-717288), стандарт ИТС по регламентным заданиям (its.1c.ru/db/content/v8std/src/200/500/i8100540.htm). Это справочники и статьи, а не инструменты, но для скилла «диагностика медленной конфигурации» они основа. Содержимое сторонних статей надо проверять перед тем, как класть в знания агента.

Где искать дальше: exa search 'оптимизация запросов 1С план запроса LLM'; exa search '1С регламентные задания блокировки анализ'

## Отсеяно при проверке

Скептик удалил из каталога (кроме того, в каждой категории есть раздел «Отсеяно» с причинами):

- [silverbulleters/silverlint-edt](https://github.com/silverbulleters/silverlint-edt) — gh api: 22, push 2023-08-21 (~39 мес), LGPL-3.0 — совпало. Заброшен (>18 мес), нишу занял bslls-connector-for-edt. Исключить.
- [oscript-library/precommit4onec](https://github.com/oscript-library/precommit4onec) — gh api: 22, push 2025-01-22 (~21 мес, >18), MIT — совпало. Оригинал xDrivenDevelopment/precommit1c: 247 звёзд, push 2021-07-05, лицензия NOASSERTION — тоже заброшен. Обе версии — заброшены, исключить; нужные автозамены закрывают форматтеры BSL LS/onec-hbk-bsl, а pre-commit хук проще собрать самому.
- [1CWorkers/mcp-1c-standards](https://github.com/1CWorkers/mcp-1c-standards) — gh api: 3, 2026-03-09, лицензии нет, не archived — совпало. README подтверждает health-ответ {standards:15, categories:10}, Docker-образ ghcr.io/1cworkers/mcp-1c-standards, порт 3000. 15 стандартов против ~300 в v8std — дубликат с урезанным содержимым, без лицензии, 3 звезды. Исключить.
- [xDrivenDevelopment/xUnitFor1C](https://github.com/xDrivenDevelopment/xUnitFor1C) — gh api: 364 звезды, push 2018-03-31, Apache-2.0, не archived (но 8 лет без коммитов). Заброшен, заменён ADD и YAxUnit — даже README YAxUnit благодарит его как предшественника. В коробку не включать.
- [Tavalik/VA-SmokeTests](https://github.com/Tavalik/VA-SmokeTests) — gh api: 24 звезды, push 2023-09-22 (более 3 лет), MIT, не archived. Заброшен по правилу >18 мес, привязан к ERP 3.2 и УХ 3.2 (не к УТ 11). Исключить.
- [KrapivinAndrey/mutagen](https://github.com/KrapivinAndrey/mutagen) — gh api: 23 звезды, push 2022-10-16 (более 4 лет), MIT, не archived. README подтверждает идею и OneScript-установку (opm install -f mutagen.ospx, команды mutagen generate/run/config), так что runtime = OneScript проверен (кандидат писал «не проверял»). Заброшен, исключить; мутационные тесты доступны через панель тестов Platform Tools (mutatos).
- [d0codesoft/bsl-1c-decompiler-public](https://github.com/d0codesoft/bsl-1c-decompiler-public) — Факты подтверждены gh api (0★, NOASSERTION). Исключить из коробки полностью: юридический риск при работе с клиентским кодом, нулевое сообщество, ценности для агентной разработки нет.
- [pasha1st/pfCFTools](https://github.com/pasha1st/pfCFTools) — Факты подтверждены gh api. Удалить: порог 18 месяцев пройден с запасом, лицензия отсутствует, функции распаковки покрывает saby/v8unpack. Единственный интерес — справка о формате CFU и восстановлении, ссылку можно оставить в заметках, но не в наборе инструментов.

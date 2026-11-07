# Каталог: сводка

Проверено 2026-11-07. Всего 269 инструментов. Полные карточки — в файлах категорий.

| Категория | Всегда | Часто | Под задачу | Отсеяно |
|---|---|---|---|---|
| [Скиллы, плагины и правила для ИИ-агентов](ai-skills.md) | 2 | 4 | 12 | 7 |
| [MCP-серверы](mcp.md) | 1 | 6 | 13 | 5 |
| [Анализ кода, языковые серверы, редакторы](quality.md) | 0 | 1 | 9 | 4 |
| [Тестирование](testing.md) | 1 | 4 | 7 | 5 |
| [Сборка, CI/CD, git, OneScript](build-ci-vcs.md) | 2 | 3 | 16 | 9 |
| [Форматы и парсеры: cf/cfe/epf, XML-выгрузка, BSL](formats.md) | 1 | 2 | 12 | 3 |
| [Интеграции и обмены](integration.md) | 0 | 7 | 15 | 11 |
| [LLM внутри 1С и RAG по коду](llm-in-1c.md) | 0 | 2 | 6 | 15 |
| [Знания и справка для агентов](knowledge.md) | 0 | 3 | 10 | 9 |
| [Консоли запросов, СКД, инструменты разработчика](dev-consoles.md) | 1 | 3 | 4 | 1 |
| [Плагины и надстройки EDT](edt.md) | 0 | 7 | 7 | 3 |
| [Технологический журнал и журнал регистрации](techlog.md) | 0 | 4 | 5 | 3 |
| [Мониторинг производительности и сервера](monitoring.md) | 1 | 1 | 6 | 5 |
| [Администрирование кластера (RAC/RAS)](cluster-admin.md) | 0 | 4 | 4 | 3 |

## Всё с оценкой «всегда» и «часто»

| Оценка | Инструмент | Категория | Что делает |
|---|---|---|---|
| всегда | [Nikolay-Shirokov/cc-1c-skills](https://github.com/Nikolay-Shirokov/cc-1c-skills) | [ai-skills](ai-skills.md) | 80 скиллов (JSON-DSL и валидаторы для метаданных, форм, ролей, СКД, макетов, расширений, XDTO, EPF/ERF) плюс db-*, web-* и web-test; плаг… |
| всегда | [1c-syntax/claude-code-bsl-lsp](https://github.com/1c-syntax/claude-code-bsl-lsp) | [ai-skills](ai-skills.md) | Плагин Claude Code, подключающий BSL Language Server как LSP для .bsl/.os (диагностики, переход к определению, ссылки, форматирование); п… |
| часто | [comol/ai_rules_1c](https://github.com/comol/ai_rules_1c) | [ai-skills](ai-skills.md) | Единый источник правил для 1С (55 правил, 13 субагентов, 38 команд, 24 скилла, режимы Mode/Quality/Orchestration/UI) с адаптерами под Cla… |
| часто | [IngvarConsulting/unica](https://github.com/IngvarConsulting/unica) | [ai-skills](ai-skills.md) | Плагин Юника для Codex, Claude Code и ZCode: 50 скиллов (метаданные, формы, роли, СКД, БСП-паттерны, транзакции и блокировки, оптимизация… |
| часто | [Desko77/claude-code-skills-1c](https://github.com/Desko77/claude-code-skills-1c) | [ai-skills](ai-skills.md) | 122 скилла и 49 правил (развитие cc-1c-skills): валидаторы XML со сверкой по индексу конфигурации, справочник API БСП (2624 метода), 38 с… |
| часто | [brake71/1c-ssl-skills](https://github.com/brake71/1c-ssl-skills) | [ai-skills](ai-skills.md) | Скилл bsp для Claude Code, Codex и OpenCode: справочник по применению БСП 3.1.11 (общие модули и методы, контекст выполнения, стабильный… |
| всегда | [BSL Language Server (режим MCP)](https://github.com/1c-syntax/bsl-language-server) | [mcp](mcp.md) | Эталонный анализатор BSL; в pre-release v1.1.0-rc.x умеет работать MCP-сервером (диагностики, символы, ссылки, hover, определение, справк… |
| часто | [EDT-MCP (DitriXNew)](https://github.com/DitriXNew/EDT-MCP) | [mcp](mcp.md) | MCP-плагин внутри 1C:EDT: чтение и правка модулей BSL, метаданные, поиск, иерархия вызовов, ошибки проекта, обновление базы, запуск и отл… |
| часто | [mcp-1c (feenlace), открытая редакция](https://github.com/feenlace/mcp-1c) | [mcp](mcp.md) | Go-бинарник и расширение 1С: метаданные, структура объектов и форм, запросы SELECT, журнал регистрации, поиск по коду, справка BSL. С фла… |
| часто | [Awesome 1C MCP Servers (Untru)](https://github.com/Untru/1c-mcp) | [mcp](mcp.md) | Курируемый каталог MCP-серверов, плагинов и наборов skills для 1С с автообновляемым рейтингом по звёздам. |
| часто | [rlm-tools-bsl](https://github.com/Dach-Coin/rlm-tools-bsl) | [mcp](mcp.md) | MCP для анализа больших конфигураций 1С без RAG: индексы и хелперы, чтобы агент не читал файлы целиком и экономил токены (форматы CF и EDT). |
| часто | [code-index-mcp (bsl-indexer)](https://github.com/Regsorm/code-index-mcp) | [mcp](mcp.md) | Rust-бинарник, строит SQLite-индекс по выгрузке конфигурации 1С (Конфигуратор/EDT) и отдаёт агенту быстрый поиск по коду и метаданным (42… |
| часто | [v8std MCP (стандарты разработки 1С)](https://github.com/zeegin/v8std) | [mcp](mcp.md) | Сайт стандартов разработки 1С v8std.ru и MCP к нему: стандарты ИТС, диагностики АПК, BSL LS и EDT, связи между ними; агент ищет стандарт… |
| часто | [vsc-language-1c-bsl (расширение VS Code / Cursor)](https://github.com/1c-syntax/vsc-language-1c-bsl) | [quality](quality.md) | Расширение VS Code/Cursor для BSL и языка запросов 1С: подсветка, навигация, шаблоны, диагностики BSL LS, проверка .os через OneScript. |
| всегда | [YAxUnit](https://github.com/bia-technologies/yaxunit) | [testing](testing.md) | Фреймворк юнит- и интеграционных тестов для 1С, ставится как расширение (cfe): ассерты, моки (Мокито), генерация данных, теги, отчёты JUn… |
| часто | [Vanessa Automation](https://github.com/Pr-Mex/vanessa-automation) | [testing](testing.md) | BDD-инструмент приёмочного и UI-тестирования 1С: сценарии Gherkin, готовые шаги, запись действий, тест-клиент, отчёты Allure/JUnit; в нов… |
| часто | [vanessa-runner](https://github.com/vanessa-opensource/vanessa-runner) | [testing](testing.md) | Консольная утилита на OneScript для рутины разработчика 1С: сборка и разборка конфигураций, расширений и обработок, загрузка в базу, хран… |
| часто | [1C: Platform Tools (VS Code)](https://github.com/yellow-hammer/vscode-1c-platform-tools) | [testing](testing.md) | Мультифункциональное расширение VS Code/Cursor для 1С: команды vanessa-runner, дерево метаданных, отладка, панель тестов (YAxUnit, Vaness… |
| часто | [yaxunit-test-writer (skill)](https://github.com/astrizhachuk/yaxunit-test-writer) | [testing](testing.md) | Skill для ИИ-агентов по написанию тестов YAxUnit: цикл given/when/then, Мокито, тестовые наборы и теги, регистрация тестового модуля в ра… |
| всегда | [OneScript (движок oscript)](https://github.com/EvilBeaver/OneScript) | [build-ci-vcs](build-ci-vcs.md) | Среда выполнения скриптов на языке 1С без платформы; основа vrunner, gitsync, precommit4onec и oscript-library. |
| всегда | [opm (пакетный менеджер OneScript)](https://github.com/oscript-library/opm) | [build-ci-vcs](build-ci-vcs.md) | Пакетный менеджер OneScript (opm install ...). |
| часто | [gitsync](https://github.com/oscript-library/gitsync) | [build-ci-vcs](build-ci-vcs.md) | Синхронизация хранилища конфигурации 1С с git-репозиторием в формате выгрузки Конфигуратора. |
| часто | [onec-docker (firstBit)](https://github.com/firstBitMarksistskaya/onec-docker) | [build-ci-vcs](build-ci-vcs.md) | Dockerfile и скрипты сборки образов с платформой 1С 8.3, клиентом, сервером, EDT, oscript, vanessa-runner, SonarScanner. |
| часто | [precommit4onec](https://github.com/bia-technologies/precommit4onec) | [build-ci-vcs](build-ci-vcs.md) | Git pre-commit хук для 1С: автообработка исходников (форматирование, дубли метаданных, разбор epf/erf) при коммите. |
| всегда | [saby-integration/v8unpack](https://github.com/saby-integration/v8unpack) | [formats](formats.md) | Python (pip install v8unpack, requires-python >=3.7, единственная зависимость tqdm): распаковка и сборка бинарных cf/cfe/epf без платформ… |
| часто | [yellow-hammer/namespace-forest](https://github.com/yellow-hammer/namespace-forest) | [formats](formats.md) | XSD выгрузки Конфигуратора по версиям формата (schemas/designer/<версия>) и метамодель 1С:EDT (ecore/xcore) в schemas/edt/<версия EDT>. О… |
| часто | [pZayash/hbk-to-md](https://github.com/pZayash/hbk-to-md) | [formats](formats.md) | Python CLI: .hbk (shcntx_ru.hbk и опционально shlang_ru.hbk) в плоский каталог Markdown с индексами, breadcrumbs и техотчётами; распаковк… |
| часто | [vbondarevsky/Connector (КоннекторHTTP)](https://github.com/vbondarevsky/Connector) | [integration](integration.md) | HTTP-клиент для 1С ('Requests для 1С'): один общий модуль вместо ручной сборки HTTPСоединение/HTTPЗапрос; JSON, формы/multipart, gzip, Ba… |
| часто | [Bayselonarrend/OpenIntegrations (OPI)](https://github.com/Bayselonarrend/OpenIntegrations) | [integration](integration.md) | Открытый пакет готовых интеграций с внешними API (Telegram, VK, Bitrix24, CDEK, S3, Google, Yandex Disk, PostgreSQL/MySQL/MSSQL/ClickHous… |
| часто | [zerobig/swagger-1c](https://github.com/zerobig/swagger-1c) | [integration](integration.md) | Расширение .cfe: по метаданным HTTP-сервисов и модулям '<Имя>Описание' строит OpenAPI-спецификацию и отдаёт её по /swagger со встроенным… |
| часто | [sgtpep/woocommerce-1c](https://github.com/sgtpep/woocommerce-1c) | [integration](integration.md) | Плагин WooCommerce для обмена с 1С по протоколу сайта (каталог, цены, остатки, заказы в обе стороны, полная/частичная синхронизация). |
| часто | [vbondarevsky/1connector](https://github.com/vbondarevsky/1connector) | [integration](integration.md) | Пакет Коннектора для OneScript (opm): тот же текучий HTTP-клиент для скриптов и тестов вне платформы 1С. |
| часто | [Протокол обмена с сайтом (официальная спецификация 1С/1С-Битрикс)](https://v8.1c.ru/tekhnologii/obmen-dannymi-i-integratsiya/standarty-i-formaty/protokol-obmena-s-saytom) | [integration](integration.md) | Официальный протокол обмена 1С с сайтом (checkauth/init/file/import/query/success, каталог, остатки, заказы type=sale). |
| часто | [CommerceML 2 (официальные стандарты и схемы 1С)](https://v8.1c.ru/tekhnologii/obmen-dannymi-i-integratsiya/standarty-i-formaty/standarty-commerceml/commerceml-2) | [integration](integration.md) | Страница стандарта CommerceML 2 с описанием форматов (логическое описание 2.10) и схемами. |
| часто | [ИИкона (1c-ai-connector)](https://github.com/andromanpro/1c-ai-connector) | [llm-in-1c](llm-in-1c.md) | Расширение 1С (CFE, платформа 8.3.27+): коннектор к разным LLM (облачные и локальные Ollama/LM Studio), агентская петля с инструментами,… |
| часто | [BSL Atlas](https://github.com/Arman-Kudaibergenov/bsl-atlas) | [llm-in-1c](llm-in-1c.md) | MCP-сервер в Docker: индексирует XML/BSL-выгрузку конфигурации или расширения, даёт структурный поиск (процедуры, модули, метаданные, гра… |
| часто | [1c-syntax/ssl_3_1 (БСП 3.1, исходники)](https://github.com/1c-syntax/ssl_3_1) | [knowledge](knowledge.md) | Открытое зеркало исходников БСП 3.1 (платформа 8.3): справочный эталон для grep по реальным общим модулям и методам вместо выдуманных выз… |
| часто | [ИТС: Система стандартов и методик (v8std)](https://its.1c.ru/db/v8std) | [knowledge](knowledge.md) | Официальная система стандартов и методик разработки 1С на ИТС; эталон, с которым сверяют производные корпуса стандартов. |
| часто | [1C AI Dev Tools (aitools1c.dev)](https://aitools1c.dev) | [knowledge](knowledge.md) | Сравнительный каталог AI-инструментов для разработки на 1С по категориям (метаданные, код, справка, формы, проверки) с критериями сравнения. |
| всегда | [cpr1c/tools_ui_1c (Универсальные инструменты 1С)](https://github.com/cpr1c/tools_ui_1c) | [dev-consoles](dev-consoles.md) | Бесплатное открытое расширение (UI.cfe) с набором инструментов для управляемых форм: консоль запросов (форк RequestConsole9000), консоль… |
| часто | [Infostart Toolkit Air (infostart-hub/toolkit)](https://github.com/infostart-hub/toolkit) | [dev-consoles](dev-consoles.md) | Коммерческий набор инструментов разработчика на управляемых формах: консоль запросов (отладка пакетов с временными таблицами, анализ план… |
| часто | [kuzyara/Awesome-RequestConsoles](https://github.com/kuzyara/Awesome-RequestConsoles) | [dev-consoles](dev-consoles.md) | Подборка почти всех консолей запросов для 1С (типовые ИТС 8.1/8.2/8.3, обычные формы, управляемые формы, consquery, Консоль 9000, Infosta… |
| часто | [lavelinevgeny/consquery (Консоль запросов consquery.ru)](https://github.com/lavelinevgeny/consquery) | [dev-consoles](dev-consoles.md) | Внешняя обработка .epf: консоль запросов с историей, автоподстановкой, выполнением произвольного кода над результатами запроса, отладкой… |
| часто | [tormozit/RDT1C («ИР» — Инструменты разработчика Tormozit)](https://github.com/tormozit/RDT1C) | [edt](edt.md) | Сам «ИР» — подсистема/расширение для платформы 1С 8 (исходники в src, релизы 8.23.1 от 2026-11-06): консоль запросов, редакторы, отладка… |
| часто | [1C-Company/ssl-support (1С:SSL support for EDT)](https://github.com/1C-Company/ssl-support) | [edt](edt.md) | Официальное расширение EDT от 1С для разработки на БСП: помощник ввода и гиперссылки в строковых литералах (ОбщегоНазначения.ОбщийМодуль,… |
| часто | [YanSergey/edt.cf_builder (EDT CF-builder)](https://github.com/YanSergey/edt.cf_builder) | [edt](edt.md) | Плагин EDT для импорта проекта из .cf/.cfe, сравнения/объединения проекта с cf/cfe и экспорта (сборки) cf/cfe — через временную или привя… |
| часто | [Xelgo/edt-extension-tweaks](https://github.com/Xelgo/edt-extension-tweaks) | [edt](edt.md) | Плагин для работы с workspace «основная конфигурация + расширения + внешние обработки/отчёты»: общий BSL-контекст между проектами (подска… |
| часто | [tormozit/EDT.Comfort (плагин «Комфорт» для EDT)](https://github.com/tormozit/EDT.Comfort) | [edt](edt.md) | Многоцелевой плагин для 1C:EDT 2025.2+: навигация и наборы объектов, фильтры, улучшенный BSL-редактор и автодополнение, отладка (инспекто… |
| часто | [marmyshev/edt-editing (Disable Editing plugin)](https://github.com/marmyshev/edt-editing) | [edt](edt.md) | Блокирует редактирование выбранных объектов метаданных в UI-редакторах EDT по настраиваемым правилам — защита типовых (поставщика) объект… |
| часто | [Oxotka/git-flow-edt (Git Flow для EDT)](https://github.com/Oxotka/git-flow-edt) | [edt](edt.md) | Единая Git-панель внутри EDT: подготовка файлов к коммиту, сообщение, ветки, получение/отправка, граф истории. Проверен на 1C:EDT 2026.1.… |
| часто | [SteelMorgan/1c-agent-based-dev-framework: скиллы tech-log-analysis и event-log-analysis](https://github.com/SteelMorgan/1c-agent-based-dev-framework/tree/master/framework_eng/skills/tool-usage/diagnostics) | [techlog](techlog.md) | Два готовых агентных скилла диагностики: ТЖ (какой event искать при медленном запросе, блокировках, EXCP, CALL; полный цикл: сохранить lo… |
| часто | [rdv-team/logt (RDV-LogT)](https://github.com/rdv-team/logt) | [techlog](techlog.md) | Потоково читает ТЖ 1С, склеивает события в пользовательские операции (VRSREQUEST→VRSRESPONSE, SESN), отбирает по длительности только проб… |
| часто | [rdv-team/loga (RDV-LogA)](https://github.com/rdv-team/loga) | [techlog](techlog.md) | Построчный разбор очень больших ТЖ (10–50 ГБ на файл), фильтры и агрегации (sum/p95/median/stddev) по свойствам событий через polars, рез… |
| часто | [medigor/tech-log-parser](https://github.com/medigor/tech-log-parser) | [techlog](techlog.md) | Быстрый парсер ТЖ на Rust: библиотека, консольный конвертер каталога ТЖ в JSON (без дублей ключей, в отличие от штатного JSON-формата 8.3… |
| всегда | [LazarenkoA/prometheus_1C_exporter](https://github.com/LazarenkoA/prometheus_1C_exporter) | [monitoring](monitoring.md) | Экспортер метрик кластера 1С в Prometheus через утилиту rac: лицензии, сеансы и соединения, ресурсы процессов (память, CPU), диск, реглам… |
| часто | [yellow-hammer/prometheus-e1c](https://github.com/yellow-hammer/prometheus-e1c) | [monitoring](monitoring.md) | Расширение 1С:Предприятия: HTTP-сервис GET /metrics в формате Prometheus. Фасад PrometheusFacade даёт счётчики, гистограммы и лейблы прям… |
| часто | [rac-use (навык агента по rac из 1c-agent-based-dev-framework)](https://github.com/SteelMorgan/1c-agent-based-dev-framework/tree/master/framework/skills/tool-usage/platform-admin/rac-use) | [cluster-admin](cluster-admin.md) | Навык (SKILL.md) для Claude Code/Cursor: когда и как вызывать rac — список и убийство сеансов, отключение соединений, запрет входа и регл… |
| часто | [alkir-rahc (Alkir-RAHC)](https://github.com/DigiLabsru/alkir-rahc) | [cluster-admin](cluster-admin.md) | Java-приложение (Spring) на официальной java-библиотеке 1С для RAS: REST и JSON-RPC API (OpenAPI/Swagger UI) для сеансов, соединений, их… |
| часто | [alkir-web-rac](https://github.com/DigiLabsru/alkir-web-rac) | [cluster-admin](cluster-admin.md) | Stateless HTTP API к RAS на java-библиотеках 1С (не обёртка над rac): заявлена поддержка всех команд RAC (чтение, создание, изменение), м… |
| часто | [python-rac (pyrac) — прямой клиент RAS: CLI, веб-консоль, MCP](https://gitlab.com/platform42/python-rac) | [cluster-admin](cluster-admin.md) | Python-клиент, говорящий с RAS по TCP напрямую, без rac.exe: библиотека, CLI (pyrac), веб-консоль (pyrac-web, PWA, Docker), настольная ко… |

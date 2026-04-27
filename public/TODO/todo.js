// Master Plan 6 Tháng — Week Navigator + Dynamic Content
(function () {
    'use strict';

    // ═══════════════════════════════════════
    // WEEK DATA — Tuần 9→26 (full day-by-day)
    // ═══════════════════════════════════════

    const weekData = {
        9: {
            title: 'Tuần 9 — Go Language Bắt Đầu',
            phase: 2, goal: 'Syntax Go, Goroutines, Channels, HTTP server. So sánh Go vs C#.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Vocabulary — 500 từ checkpoint', desc: 'Ôn 200 từ cũ + thêm 10 từ mới: language, compile, function, variable, type, struct, method, package, import, return. Tổng: ~300 từ.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'Go', title: 'Go Basics — Types, Variables, Functions', desc: 'Cài Go (go.dev). Go Tour phần 1. Syntax: var, :=, const. Types: int, float64, string, bool, []slice, map. Functions: multiple return values. Viết 5 programs nhỏ.', output: '5 Go files: hello, calculator, fibonacci, string reverse, word count' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL Review — Complex Queries', desc: 'Ôn lại SQL: viết 5 queries phức tạp dùng JOIN + subquery + CTE. Giữ SQL "warm" trong khi học Go.', output: '5 SQL review queries' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Future Simple — will + going to', desc: '"I will learn Go this week", "We are going to deploy tomorrow". Phân biệt will vs going to. Practice 10 câu.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'Go', title: 'Structs, Methods, Interfaces', desc: 'Struct: define, embed. Methods: value receiver vs pointer receiver. Interfaces: implicit implementation (duck typing). Error interface. Stringer interface. So sánh với C# class/interface.', output: 'Demo project: Animal interface + Dog/Cat structs' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — API Health Check', desc: 'Kiểm tra lại .NET API project: chạy tests, review code quality. Thêm health check endpoint nếu chưa có.', output: '.NET API review + health check' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — Tech YouTube có sub EN', desc: 'Xem "Go in 100 Seconds" (Fireship) + 1 video Go tutorial. Ghi 5 từ mới từ video.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'Go', title: 'Goroutines & Channels', desc: 'go keyword: spawn goroutine. Channel: make(chan), send (<-), receive. Buffered vs Unbuffered channels. Select statement. WaitGroup. Mutex. Demo: concurrent web scraper (fetch 5 URLs cùng lúc).', output: 'Concurrent URL fetcher + notes concurrency patterns' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker Review — Container Management', desc: 'Ôn Docker: docker ps, logs, exec, prune. Docker compose up/down. Kiểm tra containers đang chạy. Clean up images không dùng.', output: 'Docker management notes' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới + Shadowing', desc: 'Thêm: goroutine, channel, concurrent, parallel, thread, lock, mutex, sync, buffer, routine. Shadowing 10 phút podcast.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'Go', title: 'HTTP Server — net/http + Gin', desc: 'net/http: ListenAndServe, HandlerFunc, Mux. Gin framework: router, middleware, binding, validation. JSON responses. Route groups. Demo: REST API CRUD products.', output: 'Go REST API: GET/POST/PUT/DELETE products' },
                    { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go Practice — Extra Exercises', desc: 'LeetCode Easy bằng Go: Two Sum, Valid Parentheses, Merge Sorted Array. Làm quen Go syntax qua algorithms.', output: '3 LeetCode solutions bằng Go' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review + Speaking 2 phút', desc: 'Topic: "Why I\'m learning Go". Record, nghe lại. Ôn 310 từ Anki.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'CI/CD Intro — GitHub Actions + Jenkins Overview', desc: 'GitHub Actions: YAML workflow, triggers, jobs, steps. Viết workflow: checkout → build → test cho Go. <strong>Jenkins overview</strong>: architecture (master/agent), plugins, Blue Ocean. Khi nào dùng GH Actions (nhỏ, open-source), khi nào Jenkins (enterprise, complex pipelines).', output: 'GH Actions workflow + Jenkins architecture notes' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'CI/CD — GitHub Actions for Go', desc: 'Viết GitHub Actions workflow cho Go: checkout → setup-go → build → test → vet → lint (golangci-lint).', output: '.github/workflows/go.yml' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 9', desc: 'Review cards + nghe podcast. Tập nói về Go vs C# bằng EN.' },
                    { time: '09:30–12:00', tag: 'lang', label: 'Go', title: 'Project: REST API hoàn chỉnh bằng Go', desc: 'Gin + GORM (ORM) + PostgreSQL. CRUD endpoints + middleware (logging, auth). Error handling. Environment config.' },
                    { time: '14:00–16:00', tag: 'lang', label: 'Go', title: 'Project (tiếp) — Test + Docker + Push', desc: 'Viết Go tests (table-driven). Dockerfile multi-stage cho Go (build nhỏ ~10MB). Push GitHub.', output: 'GitHub repo: Go REST API + GORM + Docker + Tests' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'So sánh Go vs C#', desc: 'Viết bảng so sánh: syntax, error handling, concurrency, ecosystem, use case. Ưu/nhược điểm từng ngôn ngữ. Khi nào chọn Go, khi nào chọn C#.', output: 'Go vs C# comparison document' }
                ]}
            ]
        },
        10: {
            title: 'Tuần 10 — TypeScript Backend + Jenkins/CI/CD',
            phase: 2, goal: 'TypeScript types, Node.js + Express, Prisma ORM. CI/CD: GitHub Actions + Jenkins pipelines.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Present Perfect Continuous', desc: '"I have been learning Go for a week", "She has been coding since morning". Practice 10 câu.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'TS', title: 'TypeScript — Types, Interfaces, Generics', desc: 'Cài Node.js + TS. Primitive types, union, intersection. Interface vs Type. Generics: function<T>, class<T>. Utility types: Partial, Required, Pick, Omit. tsconfig.json setup.', output: '10 TypeScript exercises + notes' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Views + Materialized Views', desc: 'CREATE VIEW: virtual table. Indexed view (SQL Server). Khi nào dùng view. Performance: view vs stored procedure. Refresh strategy.', output: '3 views + performance notes' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — BBC Learning English', desc: '1 episode mới. Focus: bắt main idea + 5 new words. Shadowing 5 phút.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'TS', title: 'Node.js + Express + TypeScript', desc: 'Express setup với TS: express, @types/express. Routing, middleware, error handling. Request/Response typing. Folder structure: controllers, services, routes.', output: 'Express + TS project boilerplate' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — Background Service Review', desc: 'Ôn IHostedService, BackgroundService. Tạo service: check health of external APIs mỗi 5 phút. Logging kết quả.', output: 'Background health checker service' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới + Anki review', desc: 'Thêm: typescript, interface, generic, compile, strict, nullable, optional, async, await, promise.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'GitHub Actions + Jenkins — So sánh 2 CI/CD', desc: 'GitHub Actions: YAML workflow, matrix, secrets, artifacts. <strong>Jenkins</strong>: cài bằng Docker (<code>jenkins/jenkins:lts</code>), tạo Pipeline job, Jenkinsfile syntax (stages, steps, post). So sánh: GH Actions (cloud, free cho public) vs Jenkins (self-hosted, plugin ecosystem, enterprise).', output: 'GH Actions workflow + Jenkinsfile cho TS project' },
                    { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go — Error Handling Patterns', desc: 'Go error handling: errors.New, fmt.Errorf, %w wrapping. Custom error types. errors.Is, errors.As. Sentinel errors. Compare với C# exceptions.', output: 'Error handling patterns doc + demo' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Passive Voice cơ bản', desc: '"The bug was fixed", "Tests are run automatically", "The code has been deployed". Practice 10 câu.' },
                    { time: '20:00–21:30', tag: 'lang', label: 'TS', title: 'Prisma ORM + Zod Validation', desc: 'Prisma: schema.prisma → generate → migrate. CRUD operations. Relations: 1:1, 1:N, N:N. Zod: schema definition, parse, safeParse. Combine: Zod validates input → Prisma writes DB.', output: 'Express API + Prisma + Zod: Products CRUD' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Jenkins — Plugins & Configuration', desc: 'Jenkins plugins: Git, Docker Pipeline, Blue Ocean, Credentials, Pipeline Utility Steps. Manage Jenkins: Global Tool Config, Credentials store.', output: 'Jenkins setup + plugins notes' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Đọc — 1 bài Dev.to bằng EN', desc: 'Chọn bài ngắn (~5 phút đọc) về TypeScript hoặc Node.js. Highlight từ mới, ghi vào Anki.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Jenkins Pipeline cho .NET — Full CI/CD', desc: 'Jenkinsfile cho .NET: Checkout → dotnet restore → build → test → Docker build → push to Docker Hub. Jenkins plugins: Docker Pipeline, Blue Ocean UI. Webhook: GitHub push → trigger Jenkins build. So sánh pipeline syntax: declarative vs scripted.', output: 'Jenkins pipeline .NET: auto build + test + Docker push' },
                    { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go — Testing — go test', desc: 'Testing in Go: _test.go files, TestXxx functions. Table-driven tests. t.Run subtests. Benchmarks: BenchmarkXxx. Coverage: go test -cover.', output: 'Go test suite: 10 tests + benchmark' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 10', desc: 'Review cards (~330 từ). Nghe podcast. Tập nói: "What is TypeScript and why use it?"' },
                    { time: '09:30–12:00', tag: 'lang', label: 'TS', title: 'Project: TS + Express + Prisma API', desc: 'Full API: auth (JWT), Products CRUD, validation (Zod), error handling, logging. PostgreSQL with Prisma.' },
                    { time: '14:00–16:00', tag: 'lang', label: 'TS', title: 'Project (tiếp) — Test + Docker', desc: 'Jest tests. Dockerfile cho Node.js app. docker-compose: API + PostgreSQL. Push GitHub.', output: 'GitHub repo: TS REST API + Prisma + Zod + Docker' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'So sánh TS vs C# + Review', desc: 'Bảng so sánh: type system, async patterns, ORM (Prisma vs EF Core), ecosystem. Khi nào dùng TS backend, khi nào dùng C#.', output: 'TS vs C# comparison + Tuần 9-10 checklist' }
                ]}
            ]
        },
        11: {
            title: 'Tuần 11 — Frontend Fundamentals',
            phase: 2, goal: 'HTML5 semantic, CSS modern (Flexbox/Grid), JavaScript ES6+, DOM/Fetch API.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Modal Verbs — can/could/should/must', desc: '"You should test before deploying", "We must fix this bug", "I could use React for this". Practice 10 câu.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'HTML5 Semantic + Accessibility', desc: 'Semantic tags: header, nav, main, section, article, aside, footer. ARIA roles. Form elements: input types, label, fieldset. Meta tags, Open Graph. Viết 1 page HTML chuẩn semantic.', output: 'Semantic HTML page + notes' },
                    { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go Review — Build CLI Tool', desc: 'Ôn Go: viết CLI tool nhỏ dùng cobra hoặc flag. Ví dụ: JSON formatter, file watcher. Giữ Go skills warm.', output: 'Go CLI tool' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe + Shadowing', desc: 'Nghe 1 episode podcast. Shadowing 10 phút đoạn dễ. Ghi 5 từ mới.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'CSS Modern — Flexbox + Grid + Variables', desc: 'Flexbox: direction, justify, align, wrap, gap. Grid: template-columns/rows, areas, auto-fill/fit. Custom Properties (CSS variables). Box model, position, z-index. Practice: build 3 layouts.', output: '3 CSS layouts: card grid, sidebar layout, holy grail' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Transactions + Isolation Levels', desc: 'Transaction isolation: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Dirty read, phantom read, non-repeatable read demo.', output: 'Transaction isolation demo + notes' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới — Frontend vocab', desc: 'Thêm: layout, responsive, component, style, render, event, click, submit, form, input.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'JavaScript ES6+ Essentials', desc: 'Arrow functions, destructuring, spread/rest, template literals. Map/filter/reduce. Modules (import/export). Promises, async/await. Optional chaining, nullish coalescing. Viết 10 exercises.', output: '10 JS exercises: array manipulations, async, modules' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker — Node.js Dockerfile', desc: 'Dockerfile cho Node.js + TS: multi-stage build. node:alpine base. COPY package*.json → npm ci → COPY src → build. .dockerignore.', output: 'Node.js + TS Dockerfile multi-stage' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Reported Speech cơ bản', desc: '"He said he would fix the bug", "She told me she was working on it". Practice 8 câu.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'DOM + Events + Fetch API', desc: 'DOM: querySelector, createElement, classList, dataset. Events: click, submit, input, delegation. Fetch API: GET, POST, headers, error handling. Demo: Todo list interactif (add, delete, toggle).', output: 'Interactive Todo app: vanilla JS + Fetch' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — Refactor + Clean Code', desc: 'Review .NET project: refactor code smells. Apply SOLID principles. Clean up unused imports. Improve naming conventions.', output: 'Refactored .NET project' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review + Writing', desc: 'Viết 1 đoạn ngắn (5 câu) bằng EN: "What I built this week in frontend".' },
                    { time: '20:00–21:30', tag: 'lang', label: 'Go', title: 'Go Review — Viết CLI tool', desc: 'Ôn lại Go: viết CLI tool dùng flag package. Ví dụ: file finder, word counter, JSON formatter. Giữ Go "warm" trong khi học FE.', output: 'Go CLI tool: file-stats (count lines, words, files)' },
                    { time: '21:30–22:15', tag: 'lang', label: 'TS', title: 'TS Practice — Type Challenges', desc: 'TypeScript type challenges (github.com/type-challenges): Easy level 5 bài. Generics practice. Utility types: Record, Extract, Exclude.', output: '5 type challenges solved' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 11', desc: 'Review 350 từ Anki. Nghe podcast. Tập nói 3 phút: "Frontend vs Backend".' },
                    { time: '09:30–12:00', tag: 'fe', label: 'FE', title: 'Project: Responsive Landing Page', desc: 'Design: hero section, features grid, testimonials, pricing cards, footer. Mobile-first approach. CSS Grid + Flexbox. Smooth scroll. Hamburger menu cho mobile.' },
                    { time: '14:00–16:00', tag: 'fe', label: 'FE', title: 'Project (tiếp) — Polish + Deploy', desc: 'Animations (CSS transitions), dark theme, performance (lazy images). Deploy lên GitHub Pages hoặc Netlify.', output: 'Live landing page: responsive + deployed' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review tuần 9-11', desc: 'Self-test: Go goroutines, TS generics, CSS Grid, JS async/await. Đánh giá: đã sẵn sàng học React chưa?', output: 'Tuần 9-11 checklist ✓' }
                ]}
            ]
        },
        12: {
            title: 'Tuần 12 — 🔋 Tuần Nhẹ', phase: 'rest',
            goal: 'Nghỉ ngơi. English + Review. Consolidate Go, TS, FE basics.',
            days: [
                { name: 'Thứ 2 → Thứ 5', rest: true, blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English bình thường 30 phút/ngày', desc: 'T2: Anki review 350 cards. T3: Nghe podcast + ghi từ. T4: Đọc 1 bài Medium EN về React. T5: Shadowing + 10 từ mới.' },
                    { time: '19:30–20:00', tag: 'review', label: 'Review', title: 'Đọc docs/news nhẹ nhàng', desc: 'Đọc React official docs (react.dev) overview. Không code — chỉ đọc hiểu concepts: components, state, props, hooks.' }
                ]},
                { name: 'Thứ 6 → CN', rest: true, blocks: [
                    { time: '10:00–13:00', tag: 'review', label: 'Review', title: 'Ôn + Practice nhẹ', desc: 'T6: Review flashcard + ôn Go/TS syntax. T7: Xem React crash course video (không code). CN: Nghỉ hoàn toàn — đi chơi!', output: 'Tinh thần sảng khoái, sẵn sàng cho React!' }
                ]}
            ],
            restNote: '⚡ Tuần nhẹ. Chỉ English + đọc docs. Não cần consolidate 3 tuần vừa qua.'
        },
        13: {
            title: 'Tuần 13 — React Start + Cloud + Nginx Production',
            phase: 2, goal: 'React components, useState/useEffect. Cloud: Azure deploy + Nginx production + SSL/Domain.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '1000 từ — Milestone check!', desc: 'Kiểm tra: đã có bao nhiêu từ trong Anki? Target: 400+. Nếu thiếu, bổ sung batch 20 từ common verbs.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Cloud Concepts — Azure/AWS Overview', desc: 'IaaS vs PaaS vs SaaS. Azure: App Service, Azure SQL, Blob Storage, Container Apps. AWS tương đương: EC2, RDS, S3, ECS. Pricing models. Free tier. Tạo Azure account (free tier).', output: 'Azure account + notes cloud concepts' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Backup & Restore', desc: 'BACKUP DATABASE: full, differential, transaction log. RESTORE DATABASE. Recovery models: Simple, Full, Bulk-logged. Backup strategy: full weekly + diff daily.', output: 'Backup/restore scripts + strategy doc' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking practice — HelloTalk', desc: 'Tải HelloTalk app. Tìm partner. Tự giới thiệu bằng EN. Hoặc tập nói 3 phút: "What I do for work".' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Deploy .NET: Azure + Nginx Production', desc: 'Azure App Service: deploy .NET API. <strong>Nginx production config</strong>: reverse proxy, SSL termination, gzip compression, rate limiting, caching static files, <code>proxy_set_header</code>. Docker: Nginx container trước API. Jenkins: auto deploy khi merge to main.', output: '.NET API live trên Azure + Nginx config production-ready' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — Output Caching + Response Compression', desc: 'Output caching middleware (.NET 7+). Response compression: Brotli, Gzip. Configure trong Program.cs. Cache profiles. VaryByQueryKeys.', output: 'API với output caching + compression' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — YouTube tech channel EN', desc: 'Xem 1 video Fireship/Traversy Media về React. Ghi 5 từ mới. Tập nói lại 3 câu từ video.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Basics — Components, Props, JSX', desc: 'Create React App hoặc Vite: npx create-vite@latest. JSX syntax. Functional components. Props: passing data, children. Conditional rendering. Lists + keys. Viết 5 components.', output: '5 React components: Header, Card, List, Button, Footer' },
                    { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go Review — HTTP Client + JSON', desc: 'Go net/http client: GET, POST, custom headers. JSON: encoding/json, Marshal, Unmarshal, json tags. Struct tags. API consumer demo.', output: 'Go HTTP client: consume external API' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới + Review', desc: 'Thêm: component, render, state, props, hook, effect, virtual, DOM, mount, update.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React State — useState + useEffect', desc: 'useState: counter, toggle, form input. useEffect: fetch data on mount, cleanup, dependency array. Rules of Hooks. Demo: fetch products from API → display in list.', output: 'React app: fetch + display products from .NET API' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'SSL/TLS — Certificates Deep-dive', desc: 'TLS handshake flow. Certificate types: DV, OV, EV. Self-signed vs CA. OpenSSL commands: generate key, CSR, cert. mkcert for local dev.', output: 'SSL/TLS notes + local dev certificates' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Conditionals — If type 2', desc: '"If I knew React, I would build a SPA", "If we had more time, we would add tests". Practice 8 câu.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Domain + DNS + SSL + Nginx HTTPS', desc: 'Mua domain (Namecheap/Cloudflare). DNS: A record, CNAME, MX. <strong>Nginx SSL</strong>: Let\'s Encrypt + Certbot, auto-renew. <code>ssl_certificate</code>, HTTP→HTTPS redirect, HSTS header. Docker: nginx + certbot containers. Custom domain cho Azure App Service.', output: 'Custom domain + Nginx HTTPS + auto-renew SSL' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker + Nginx — Production Config', desc: 'Nginx container: custom nginx.conf. Docker network: nginx → api. Nginx caching, compression, security headers. Content-Security-Policy, X-Frame-Options.', output: 'Production nginx.conf + Docker setup' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn + speaking', desc: 'Review 420 từ Anki. Tập nói: "How React works — components and state".' },
                    { time: '09:30–12:00', tag: 'fe', label: 'FE', title: 'Project: React Todo App + API', desc: 'React + Vite. Components: TodoList, TodoItem, AddTodo, Filter. State management với useState. Fetch API gọi .NET backend. CRUD operations.' },
                    { time: '14:00–16:00', tag: 'fe', label: 'FE', title: 'Project (tiếp) — Styling + Deploy', desc: 'CSS Modules hoặc Tailwind. Responsive design. Deploy React lên Netlify/Vercel. Connect tới Azure API.', output: 'React Todo app: live + connected to .NET API' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review tuần 13', desc: 'Self-test: Cloud concepts, React state/effect, DNS flow. Chuẩn bị tuần 14: React Router docs.', output: 'Tuần 13 checklist ✓' }
                ]}
            ]
        },
        14: {
            title: 'Tuần 14 — React Router + Context + Monitoring',
            phase: 2, goal: 'React Router, Context API, useReducer. Grafana + Prometheus monitoring.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Relative Clauses — who/which/that', desc: '"The developer who fixed the bug", "The framework that we use", "The server which crashed". Practice 10 câu.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Router — Routes, Params, Nested', desc: 'react-router-dom: BrowserRouter, Routes, Route, Link, NavLink. Dynamic routes: /products/:id. Nested routes. useNavigate, useParams, useSearchParams. Protected routes.', output: 'React app với 5 routes + navigation' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Monitoring + DMVs', desc: 'Dynamic Management Views: sys.dm_exec_query_stats, sys.dm_os_wait_stats, sys.dm_db_index_usage_stats. Identify slow queries. Wait statistics analysis.', output: 'DMV queries + monitoring dashboard SQL' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — Podcast dài hơn (15 phút)', desc: 'Nghe .NET Rocks! hoặc Syntax.fm 15 phút. Ghi keywords + main idea. Không cần hiểu 100%.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Monitoring — Grafana + Prometheus', desc: 'Prometheus: metrics endpoint, scraping. Grafana: dashboards, panels, alerts. Docker: prometheus + grafana containers. .NET: prometheus-net middleware. Create dashboard: request rate, latency, errors.', output: 'Grafana dashboard cho .NET API metrics' },
                    { time: '21:30–22:15', tag: 'lang', label: 'TS', title: 'TS Review — Async Patterns', desc: 'Ôn TypeScript async: Promise.all, Promise.allSettled, Promise.race. Async generators. AbortController. Error handling patterns.', output: 'Async patterns demo + notes' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới + Review 440 cards', desc: 'Thêm: route, navigate, context, provider, consumer, reducer, action, dispatch, monitor, dashboard.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Context API + useReducer', desc: 'Context: createContext, Provider, useContext. Avoid prop drilling. useReducer: state machine pattern. Combine: Context + useReducer = mini Redux. Demo: Theme context + Cart context.', output: 'Theme switcher + Shopping cart context demo' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — API Versioning', desc: 'API versioning: URL path (/v1/), query string (?v=1), header. Asp.Versioning.Http package. Swagger per version. Deprecation policy.', output: 'API versioning demo' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Email template', desc: 'Practice viết email: "Hi team, I deployed the new feature..." Cấu trúc: greeting, body, action items, closing.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Docker Production + ELK Logging', desc: '<strong>Docker production patterns</strong>: logging drivers (json-file, fluentd), secrets management, resource limits (--memory, --cpus), restart policies, Docker networks (overlay). <strong>ELK Stack</strong>: Elasticsearch + Kibana + Filebeat. Docker Compose: Nginx logs → Filebeat → Elasticsearch → Kibana dashboard.', output: 'Docker production config + ELK logging pipeline' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker — Security Best Practices', desc: 'Non-root user trong Dockerfile. Read-only filesystem. Resource limits (--memory, --cpus). Docker Bench Security. Trivy image scanning.', output: 'Secure Dockerfile + scan report' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review + Speaking 3 phút', desc: 'Topic: "How monitoring helps in production" — nói bằng EN 3 phút. Record.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Forms + Error Handling', desc: 'Controlled components. Form validation: required, pattern, custom. React Hook Form library. Error Boundary. Loading states. Optimistic updates.', output: 'Contact form with validation + error handling' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Terraform — State Management', desc: 'Terraform state: local vs remote (Azure Storage, S3). State locking. terraform state commands: list, show, mv, rm. Import existing resources.', output: 'Terraform remote state config' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 14', desc: 'Review cards + podcast + speaking practice.' },
                    { time: '09:30–12:00', tag: 'fe', label: 'FE', title: 'Project: React + .NET Full-stack', desc: 'React frontend: routing, context, forms. .NET backend: API endpoints. Connect: React calls .NET API. Auth flow: login → store token → protected pages.' },
                    { time: '14:00–16:00', tag: 'fe', label: 'FE', title: 'Project (tiếp) — Docker + Monitoring', desc: 'Docker Compose: React (nginx) + .NET API + SQL + Redis + Grafana. Full observability stack.', output: 'Full-stack project: React + .NET + Docker + Monitoring' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review + Phase 2 mid-check', desc: 'Self-assessment: Go ✓, TS ✓, React basics ✓, CI/CD ✓, Cloud ✓, Monitoring ✓. Điểm yếu? Cần bổ sung gì?', output: 'Phase 2 mid-check scorecard' }
                ]}
            ]
        },
        15: {
            title: 'Tuần 15 — React Advanced + K8s + Terraform',
            phase: 2, goal: 'Custom hooks, performance. K8s basics, Terraform IaC, production DevOps stack.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Phrasal Verbs phổ biến', desc: 'set up, log in, sign up, break down, roll out, scale up, shut down, back up. Đặt câu với mỗi phrasal verb.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Custom Hooks', desc: 'Tạo custom hooks: useFetch (API calls), useLocalStorage, useDebounce, useMediaQuery, useAuth. Pattern: extract logic → reusable hook. Testing custom hooks.', output: '5 custom hooks library + tests' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL Review — Complex Report Queries', desc: 'Viết complex report: sales summary by month (PIVOT), top N products per category (ROW_NUMBER), running total (SUM OVER). Business intelligence queries.', output: '3 report queries + sample results' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — TED talk ngắn (5 phút)', desc: 'Xem 1 TED talk ngắn có sub EN. Ghi 5 expressions mới. Tập nói lại 2 câu hay.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Kubernetes Basics — Pod, Service, Deployment', desc: 'Concepts: Pod, Node, Cluster, Service, Deployment. kubectl commands. YAML manifests. Minikube local setup. Deploy .NET API lên K8s: Deployment + Service + Ingress.', output: 'K8s manifests + .NET deployed on Minikube' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — OpenTelemetry Setup', desc: 'OpenTelemetry cho .NET: traces, metrics, logs. OTLP exporter. Jaeger cho distributed tracing. Correlation IDs. W3C Trace Context.', output: '.NET + OpenTelemetry + Jaeger setup' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ mới + Review', desc: 'Thêm: hook, memo, callback, lazy, suspense, hydrate, server, render, bundle, optimize.' },
                    { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Performance', desc: 'React.memo: skip re-render. useMemo: cache computed values. useCallback: cache functions. React.lazy + Suspense: code splitting. Profiler DevTools. Identify re-render issues.', output: 'Performance-optimized React demo + Profiler screenshots' },
                    { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React Review — Component Patterns', desc: 'Ôn React: compound components, render props, HOC pattern. When to use which. Refactor a component using each pattern.', output: '3 pattern demos' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Conversation practice', desc: 'Tập hội thoại: ordering food, asking directions, small talk at work. 5 mini dialogues.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'K8s Advanced — ConfigMap, Secrets, Scaling', desc: 'ConfigMap: environment config. Secrets: sensitive data. HPA: Horizontal Pod Autoscaler. Rolling update strategy. Readiness/Liveness probes.', output: 'K8s manifests với ConfigMap + HPA + probes' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Terraform — Modules + Variables', desc: 'Terraform modules: input variables, output values. Local modules. Module registry. terraform.tfvars. Sensitive variables. Validation rules.', output: 'Terraform module: reusable Azure App Service' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review + Speaking', desc: 'Topic: "Containers vs Kubernetes — when do you need K8s?" Nói 3 phút EN.' },
                    { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'Terraform + IaC Basics', desc: '<strong>Infrastructure as Code</strong>: Terraform concepts (provider, resource, state, plan, apply). Viết .tf file: tạo Azure Resource Group + App Service + SQL. <code>terraform init → plan → apply</code>. So sánh: Terraform vs ARM templates vs Bicep. Jenkins + Terraform: auto provision infra.', output: 'Terraform config: Azure resources + Jenkins integration' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Jenkins + Terraform Integration', desc: 'Jenkins pipeline stage: terraform init → plan → apply. Approval gate cho production. Terraform workspace per environment. State trong Azure Storage.', output: 'Jenkinsfile with Terraform stages' }
                ]},
                { name: 'Thứ 7', weekend: true, blocks: [
                    { time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 15', desc: 'Review cards (~460 từ). Nghe podcast. Speaking practice.' },
                    { time: '09:30–12:00', tag: 'build', label: 'Build', title: 'Project: Production Deploy — Full DevOps Stack', desc: 'Docker Compose production: <strong>Nginx</strong> (SSL + reverse proxy) → .NET API (2 instances, load balanced) → SQL + Redis. <strong>Jenkins</strong> pipeline: GitHub webhook → build → test → Docker push → deploy. Terraform: provision Azure resources.' },
                    { time: '14:00–16:00', tag: 'build', label: 'Build', title: 'Project (tiếp) — Monitoring + Health Checks', desc: 'Grafana + Prometheus: API metrics dashboard. Nginx access logs → ELK. Health check endpoints. Docker health checks. Alerting rules. Full production-ready stack.', output: 'Production stack: Nginx + Jenkins + Docker + Terraform + Monitoring' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review tuần 15', desc: 'Self-test: React hooks, K8s concepts, AI tools. Chuẩn bị tuần 16: Phase 2 grand review.', output: 'Tuần 15 checklist ✓' }
                ]}
            ]
        },
        16: {
            title: 'Tuần 16 — 🔋 Phase 2 Review & Rest', phase: 'rest',
            goal: 'Consolidate Phase 2. Grand review. Chuẩn bị Phase 3.',
            days: [
                { name: 'Thứ 2 → Thứ 4', rest: true, blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English bình thường', desc: 'Anki review + podcast + đọc docs bằng EN mỗi ngày.' },
                    { time: '19:30–20:00', tag: 'review', label: 'Review', title: 'Đọc Rust/Python docs nhẹ nhàng', desc: 'T2: Rust Book chapter 1 (overview). T3: Python.org tutorial overview. T4: Kotlin Koans overview.' }
                ]},
                { name: 'Thứ 5 → Thứ 6', rest: true, blocks: [
                    { time: '19:30–20:30', tag: 'review', label: 'Review', title: 'Ôn lại Phase 2 projects', desc: 'Mở tất cả GitHub repos đã tạo. Đọc lại code. Fix nhỏ nếu thấy. Update README.' }
                ]},
                { name: 'Thứ 7', blocks: [
                    { time: '10:00–14:00', tag: 'review', label: 'Review', title: 'PHASE 2 GRAND REVIEW', desc: 'Viết document: "Phase 2 — Journey". List: Go API ✓, TS API ✓, React app ✓, CI/CD pipeline ✓, Cloud deploy ✓, K8s basics ✓, Monitoring ✓. Tự chấm điểm. So sánh Phase 1 vs Phase 2 growth.', output: 'Phase 2 Report + Growth assessment' }
                ]},
                { name: 'Chủ nhật', rest: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Plan Phase 3', desc: 'Install Rust (rustup). Install Python. Đọc overview Rust ownership. Phase 3 = thử thách lớn nhất!', output: 'Rust + Python installed. Phase 3 plan ready.' }
                ]}
            ],
            restNote: '⚡ 4 tháng đã qua! Bạn đã biết: Go, TypeScript, React, CI/CD, Cloud, K8s. Incredible progress! Phase 3 sẽ nâng lên expert level.'
        },
        17: {
            title: 'Tuần 17 — Rust Language', phase: 3,
            goal: 'Ownership, Borrowing, Structs, Enums, Pattern Matching, Traits, Error Handling.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Đọc tech articles EN 15 phút', desc: 'Đọc 1 bài Rust blog bằng EN. Highlight từ mới. Ghi 5 từ.' }, { time: '20:00–21:30', tag: 'lang', label: 'Rust', title: 'Ownership & Borrowing — Core Concept', desc: 'Ownership rules: 1 owner, move semantics. Borrowing: &ref (immutable), &mut ref (mutable). Lifetime basics. So sánh với C# GC: Rust = no GC, compile-time safety.', output: '10 Rust exercises: ownership + borrowing' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — Performance Profiling', desc: 'dotnet-trace, dotnet-counters, dotnet-dump. BenchmarkDotNet: [Benchmark], [MemoryDiagnoser]. Profile memory allocation. Identify hot paths.', output: 'Benchmark report + profiling notes' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — Rust podcast/video', desc: 'Nghe "New Rustacean" podcast hoặc video "Rust in 100 Seconds". Ghi keywords.' }, { time: '20:00–21:30', tag: 'lang', label: 'Rust', title: 'Structs, Enums, Pattern Matching', desc: 'Struct: fields, methods, impl. Enum: variants with data. match expression (exhaustive). if let, while let. Option<T> và Result<T,E> — the Rust way of handling null/errors.', output: 'Pattern matching exercises + Option/Result demos' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL Review — Advanced Indexing', desc: 'Ôn indexes: clustered, non-clustered, covering, filtered, columnstore. Index maintenance: REORGANIZE vs REBUILD. Fill factor. Missing index DMV.', output: 'Index optimization script' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Review 480 cards', desc: 'Thêm: ownership, borrow, lifetime, trait, crate, cargo, unsafe, macro, pattern, match.' }, { time: '20:00–21:30', tag: 'lang', label: 'Rust', title: 'Traits + Generics + Error Handling', desc: 'Traits: define, implement, derive. Generics: fn<T>, struct<T>. Trait bounds: T: Display + Clone. Error handling: Result, ?, custom error types. thiserror crate.', output: 'Generic data structures + custom error types' }, { time: '21:30–22:15', tag: 'lang', label: 'Rust', title: 'Rust Practice — Rustlings Exercises', desc: 'Rustlings: 10 exercises về variables, functions, if, primitive types. cargo run, cargo test. Compiler error messages — đọc và hiểu.', output: '10 rustlings exercises completed' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — Explain Rust ownership in EN', desc: 'Tự giải thích ownership/borrowing bằng EN 3 phút. Record + nghe lại.' }, { time: '20:00–21:30', tag: 'lang', label: 'Rust', title: 'Axum HTTP Framework', desc: 'Axum: Router, handlers, extractors. Serde: serialize/deserialize JSON. State sharing. Middleware (tower). Demo: REST API CRUD.', output: 'Rust Axum REST API skeleton' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker — Multi-arch Builds', desc: 'Docker buildx: multi-platform builds (amd64, arm64). Manifest lists. CI/CD: build cho multiple architectures. QEMU emulation.', output: 'Multi-arch Dockerfile + build script' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review + Writing', desc: 'Viết 5 câu EN: "What is unique about Rust compared to other languages".' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Advanced — Custom hooks + Performance review', desc: 'Ôn lại React: tạo useApi hook. React.memo optimization. Lazy loading routes. Giữ FE skills warm.', output: 'Optimized React app với lazy loading' }, { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React Review — Custom Hook Library', desc: 'Ôn React hooks: tạo useApi (generic fetch), useDebounce, useIntersectionObserver. Publish hooks as npm package (private).', output: '3 custom hooks + test' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn', desc: 'Review 490 cards. Podcast. Speaking practice.' }, { time: '09:30–12:00', tag: 'lang', label: 'Rust', title: 'Project: CLI Tool bằng Rust', desc: 'Clap crate cho CLI args. File I/O. Regex. Serde JSON. Ví dụ: log parser, file organizer, markdown converter.' }, { time: '14:00–16:00', tag: 'lang', label: 'Rust', title: 'Project (tiếp) — Test + Publish', desc: 'Cargo test. Clippy linting. cargo build --release. Push GitHub.', output: 'Rust CLI tool: tested + released binary' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review Rust week', desc: 'Self-test: explain ownership, write pattern match, handle Result. So sánh Rust vs Go vs C#.', output: 'Rust cheat sheet + language comparison update' }]}
            ]
        },
        18: {
            title: 'Tuần 18 — Python + System Design', phase: 3,
            goal: 'Python basics, FastAPI, System Design fundamentals.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Conversation practice', desc: 'Thêm: script, library, framework, dependency, virtual, environment, pip, module, class, decorator.' }, { time: '20:00–21:30', tag: 'lang', label: 'Python', title: 'Python Basics — Syntax, Data Structures', desc: 'Syntax: indentation, variables, f-strings. Data structures: list, dict, set, tuple. List comprehension. Generators. Lambda, map, filter. Viết 10 exercises.', output: '10 Python exercises + notes' }, { time: '21:30–22:15', tag: 'lang', label: 'Rust', title: 'Rust — Lifetime Practice', desc: 'Lifetime exercises: function signatures, struct lifetimes. \'static lifetime. Lifetime elision rules. Common patterns. Compiler error analysis.', output: 'Lifetime exercises + notes' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe + Shadowing 15 phút', desc: 'Nghe tech podcast EN. Focus: catch keywords, understand main points.' }, { time: '20:00–21:30', tag: 'lang', label: 'Python', title: 'FastAPI — REST API + Pydantic', desc: 'FastAPI: async, path params, query params. Pydantic: BaseModel, validation. Auto-generated docs (Swagger). Dependency injection. Demo: CRUD API.', output: 'Python FastAPI: CRUD products API' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'K8s Review — Helm Charts', desc: 'Helm: chart structure, values.yaml, templates. helm install, upgrade, rollback. Create chart cho .NET API. Chart repositories.', output: 'Helm chart cho .NET API' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Technical email', desc: 'Viết email: "Hi team, here is the system design proposal for our new service..." 10 câu.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'System Design — Load Balancer, CDN, Caching', desc: 'Load Balancer: L4 vs L7, algorithms (round-robin, least connections). CDN: how it works, CloudFlare. Caching layers: browser → CDN → API → DB. Cache invalidation strategies.', output: 'System Design notes: LB + CDN + Caching diagrams' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Graph Queries + Temporal Tables', desc: 'Temporal tables: system-versioned, querying history (AS OF, BETWEEN). Graph tables: NODE, EDGE. Use case: social network, recommendation.', output: 'Temporal table demo + graph query' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Review 510 cards', desc: 'Thêm: scale, load, balance, distribute, cache, replicate, partition, shard, queue, stream.' }, { time: '20:00–21:30', tag: 'lang', label: 'Python', title: 'Python Ecosystem — pip, venv, pytest', desc: 'Virtual env: venv, poetry. Package management: pip, requirements.txt. Testing: pytest, fixtures, parametrize. Type hints: typing module. Linting: ruff, mypy.', output: 'Python project with pytest + type hints' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — Minimal API Advanced', desc: 'Ôn Minimal API: Route groups, filters, endpoint metadata. TypedResults. OpenAPI customization. Rate limiting per endpoint.', output: 'Advanced Minimal API demo' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — System Design explanation', desc: 'Tự giải thích "How to design a URL shortener" bằng EN 5 phút. Record.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'System Design — Sharding, Event Sourcing, CQRS', desc: 'DB Sharding: horizontal vs vertical. Event Sourcing: store events, rebuild state. CQRS: separate read/write models. Practice: design e-commerce system architecture.', output: 'E-commerce system architecture diagram' }, { time: '21:30–22:15', tag: 'lang', label: 'Python', title: 'Python Practice — Scripts + Automation', desc: 'Python scripts: file processing, CSV parsing, JSON manipulation, web scraping (requests + BeautifulSoup). Automate repetitive tasks.', output: '3 Python automation scripts' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn + 2000 từ target check', desc: 'Review 520 cards. Milestone check: đang ở ~520/2000. Bổ sung batch nếu cần.' }, { time: '09:30–12:00', tag: 'lang', label: 'Python', title: 'Project: Automation Script', desc: 'Viết Python script: web scraper (BeautifulSoup/httpx), file organizer, hoặc data pipeline. Real-world use case.' }, { time: '14:00–16:00', tag: 'lang', label: 'Python', title: 'Project (tiếp) — Test + Document', desc: 'Pytest tests. README. requirements.txt. Push GitHub.', output: 'Python automation project on GitHub' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'So sánh 5 ngôn ngữ', desc: 'Viết comparison table: C# vs Go vs TS vs Rust vs Python. Categories: syntax, typing, concurrency, ecosystem, use case, learning curve.', output: '5-language comparison document' }]}
            ]
        },
        19: {
            title: 'Tuần 19 — Kotlin/JVM + AI Integration', phase: 3,
            goal: 'Kotlin basics, Spring Boot. AI API (Claude/OpenAI), RAG, Semantic Kernel.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Meeting English — Phrases', desc: '"Let me share my screen", "Can you hear me?", "I have a question", "Let\'s circle back on this". Practice 10 meeting phrases.' }, { time: '20:00–21:30', tag: 'lang', label: 'Kotlin', title: 'Kotlin Basics — Null Safety, Data Class, Coroutines', desc: 'Kotlin vs Java: null safety (?.), data class, sealed class. Coroutines: launch, async/await, Dispatchers. Extension functions. String templates. Viết 5 Kotlin programs.', output: '5 Kotlin programs + comparison with C#' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker — Python Dockerfile', desc: 'Python Dockerfile: multi-stage, pip install, requirements.txt vs poetry. Virtual env trong container. Slim base image. Health check.', output: 'Python Dockerfile + docker-compose' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — Tech conference talk (10 phút)', desc: 'Xem 1 talk ngắn từ NDC/DotNext conference. Ghi keywords + main idea.' }, { time: '20:00–21:30', tag: 'lang', label: 'Kotlin', title: 'Spring Boot + Kotlin REST API', desc: 'Spring Boot: start.spring.io with Kotlin. REST controllers, services, repositories. Spring Data JPA. Validation. Exception handling. Demo: CRUD API.', output: 'Spring Boot + Kotlin REST API' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL Review — Query Tuning Challenge', desc: 'Lấy 5 slow queries từ projects cũ hoặc sample. Analyze execution plan. Apply fixes: indexes, rewrite joins, avoid SELECT *. Measure improvement.', output: '5 query optimization results' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Review 540 cards', desc: 'Thêm: artificial, intelligence, model, prompt, token, embed, vector, semantic, search, generate.' }, { time: '20:00–21:30', tag: 'ai', label: 'AI', title: 'AI API Integration — Claude/OpenAI trong .NET', desc: 'Anthropic SDK / OpenAI SDK cho .NET. Chat completion, streaming. Prompt engineering: system prompt, few-shot. Semantic Kernel: plugins, planners, memory. Demo: Q&A chatbot.', output: '.NET chatbot project + Semantic Kernel setup' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — SignalR Deep-dive', desc: 'Ôn SignalR: strongly typed hubs, groups, streaming. Scale-out: Redis backplane. Authentication trong SignalR. Client reconnection.', output: 'SignalR advanced demo' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — README bằng EN', desc: 'Viết README.md cho AI project bằng tiếng Anh: description, setup, usage, examples.' }, { time: '20:00–21:30', tag: 'ai', label: 'AI', title: 'RAG — Embeddings, Vector DB, Semantic Search', desc: 'Embeddings: text → vector. Vector DB: Qdrant, Pinecone, hoặc pgvector. Chunking strategies. Retrieval: similarity search. RAG pipeline: query → retrieve → generate. Demo trong .NET.', output: 'RAG demo: upload docs → ask questions → get answers' }, { time: '21:30–22:15', tag: 'lang', label: 'Kotlin', title: 'Kotlin Extra — Coroutines Practice', desc: 'Coroutine exercises: async/await patterns, Flow operators (map, filter, combine), StateFlow vs SharedFlow. Error handling in coroutines.', output: 'Coroutine exercises + Flow demo' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — Demo AI project bằng EN', desc: 'Tự present: "This is my RAG application. It can..." 3 phút EN. Record.' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'Next.js Introduction', desc: 'Next.js: App Router, Server Components, SSR vs CSR. File-based routing. API routes. Metadata. Streaming. So sánh Next.js vs vanilla React.', output: 'Next.js hello world + 3 routes' }, { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React Review — State Management', desc: 'Ôn state management: Context + useReducer vs Zustand vs Redux Toolkit. When to use which. Migrate a Context app to Zustand.', output: 'State management comparison + migration' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn tuần 19', desc: 'Review cards. Speaking practice. Podcast.' }, { time: '09:30–12:00', tag: 'ai', label: 'AI', title: 'Project: AI Chatbot/RAG App', desc: '.NET backend: Semantic Kernel + RAG pipeline + Claude/OpenAI API. React frontend: chat interface. Upload documents → vectorize → chat with docs.' }, { time: '14:00–16:00', tag: 'ai', label: 'AI', title: 'Project (tiếp) — Polish + Deploy', desc: 'Error handling, loading states. Docker compose. Deploy. README EN.', output: 'AI RAG App: .NET + React + Vector DB + deployed' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review tuần 17-19', desc: 'Self-test: Rust ownership, Python FastAPI, Kotlin null safety, AI RAG pipeline. Massive progress check!', output: 'Tuần 17-19 review + skills matrix update' }]}
            ]
        },
        20: {
            title: 'Tuần 20 — 🔋 Tuần Nhẹ', phase: 'rest',
            goal: 'Nghỉ ngơi. Ôn tất cả languages. English focus.',
            days: [
                { name: 'Thứ 2 → Thứ 5', rest: true, blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English 30 phút/ngày', desc: 'Anki review 550+ cards. Podcast EN. Đọc tech article EN. Speaking practice.' },
                    { time: '19:30–20:00', tag: 'review', label: 'Review', title: 'Quick language review', desc: 'T2: Go quiz. T3: TS quiz. T4: Rust quiz. T5: Python quiz. 30 phút nhẹ mỗi ngày.' }
                ]},
                { name: 'Thứ 6 → CN', rest: true, blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Ôn + Chuẩn bị Capstone', desc: 'T6: Đọc Clean Architecture docs. T7: Sketch capstone project idea. CN: Nghỉ hoàn toàn.', output: 'Capstone project idea + architecture sketch' }
                ]}
            ],
            restNote: '⚡ Tuần nghỉ cuối cùng trước sprint cuối. Sau đây là 6 tuần intense nhất — Capstone + Interview Prep + Graduation!'
        },
        21: {
            title: 'Tuần 21 — Capstone Backend', phase: 3,
            goal: 'Clean Architecture .NET API: auth, business logic, tests, Docker.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Đọc EN + 10 từ mới', desc: 'Đọc 1 bài về Clean Architecture bằng EN. Ghi 10 từ: architecture, layer, domain, application, infrastructure, presentation, dependency, inversion, abstraction, interface.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Architecture Design — Clean Architecture', desc: 'Layers: Domain → Application → Infrastructure → API. Dependency rule: inward only. Tạo solution structure: 4 projects. Define domain entities: User, Product, Order. Define interfaces.', output: '.NET Solution: 4 projects + domain entities' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'AWS/Azure — Managed Services Comparison', desc: 'Compare: Azure App Service vs AWS ECS. Azure SQL vs RDS. Blob Storage vs S3. Azure Functions vs Lambda. Pricing comparison.', output: 'Cloud services comparison table' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Project proposal EN', desc: 'Viết 1 đoạn mô tả capstone project bằng EN: "This project is a full-stack e-commerce application..."' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'API Setup + Authentication', desc: 'Minimal API endpoints. JWT auth: register, login, refresh token. Role-based authorization. Swagger với auth. Middleware: logging, error handling, rate limiting.', output: 'API layer + auth flow hoàn chỉnh' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Sharding + Partitioning Strategies', desc: 'Horizontal vs vertical partitioning. Sharding strategies: hash, range, geographic. Consistent hashing. Cross-shard queries. Trade-offs.', output: 'Sharding strategy notes + diagrams' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe podcast EN 15 phút', desc: 'Focus: catch 80% content. Ghi 3 expressions mới.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Database Design + EF Core Migrations', desc: 'Design DB cho capstone (e-commerce). EF Core: entities, configurations (Fluent API), migrations. Seed data. Repository pattern implementation.', output: 'Database schema + EF Core migrations + repositories' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — Distributed Caching — Redis', desc: 'StackExchange.Redis: GetDatabase, StringSet/Get. IDistributedCache. Cache patterns: cache-aside, write-through, write-behind. Cache invalidation.', output: 'Redis caching patterns demo' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Review 570 cards', desc: 'Thêm: service, repository, handler, validator, mapper, middleware, pipeline, endpoint, authorization, claim.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Business Logic + Services', desc: 'Application layer: Commands/Queries (MediatR optional). Service implementations. FluentValidation rules. Mapster mapping. Hangfire background jobs.', output: 'Application layer: services + validators + mappers' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Monitoring — Alerting + On-call Basics', desc: 'Alerting rules: error rate > threshold, latency P99, disk usage. PagerDuty/OpsGenie concepts. Runbooks. Incident response: detect → triage → mitigate → resolve → postmortem.', output: 'Alert rules + runbook template' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — Explain architecture', desc: 'Tự present Clean Architecture bằng EN 5 phút. Dùng diagram.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Tests — Unit + Integration', desc: 'Unit tests: service layer với NSubstitute (10+ tests). Integration tests: WebApplicationFactory + TestContainers (5+ tests). Code coverage: > 70%.', output: '15+ tests + code coverage report' }, { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go Review — gRPC Service', desc: 'Ôn Go + gRPC: define .proto, generate Go code. Server + client. Bidirectional streaming. Compare: gRPC Go vs gRPC .NET.', output: 'Go gRPC service demo' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn', desc: 'Review cards + podcast + speaking.' }, { time: '09:30–12:00', tag: 'dotnet', label: '.NET', title: 'Capstone Backend Sprint', desc: 'Integrate tất cả: API + Services + DB + Auth + Cache (Redis) + Logging (Serilog). Docker Compose: API + SQL + Redis.' }, { time: '14:00–16:00', tag: 'dotnet', label: '.NET', title: 'Sprint (tiếp) — Test + Fix', desc: 'Run all tests. Fix bugs. Swagger docs. README. Git: clean commit history.', output: 'Capstone Backend: .NET API hoàn chỉnh trong Docker' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review + Plan Frontend', desc: 'Test API manually. List all endpoints. Plan React pages/components for next week.', output: 'API endpoints list + React wireframes' }]}
            ]
        },
        22: {
            title: 'Tuần 22 — Capstone Frontend + Full DevOps', phase: 3,
            goal: 'React frontend, API integration. DevOps: Jenkins pipeline + Nginx + Docker + Terraform + Monitoring.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Viết README bằng EN cho capstone', desc: 'Professional README: title, description, tech stack, screenshots, setup guide, API docs.' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'React Setup + Routing', desc: 'Vite + React + TypeScript. React Router: Home, Login, Register, Products, Cart, Checkout, Admin. Layout components. Protected routes.', output: 'React project: 7 routes + layouts' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Database CI/CD', desc: 'Database migrations trong CI/CD: Flyway, DbUp, EF migrations. Schema comparison tools. Rollback strategies. Zero-downtime migrations.', output: 'DB migration pipeline config' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe + Shadowing', desc: 'Nghe tech podcast 15 phút. Shadowing 5 phút.' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'Components + State Management', desc: 'Components: ProductCard, ProductList, CartItem, Navbar, Footer. Context: AuthContext, CartContext. Custom hooks: useAuth, useCart, useProducts.', output: 'React components library + contexts' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET Review — Clean Architecture', desc: 'Ôn Clean Architecture: Domain, Application, Infrastructure, Presentation layers. Dependency rule. Use cases. Repository pattern. CQRS.', output: 'Clean Architecture diagram + review' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: '10 từ + Review 590 cards', desc: 'Thêm: deploy, release, version, staging, production, rollback, feature, branch, merge, conflict.' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'API Integration + Error Handling', desc: 'Axios/fetch wrapper: base URL, interceptors, auth token. API calls: products, auth, cart, orders. Loading states. Error boundary. Toast notifications.', output: 'React app fully connected to .NET API' }, { time: '21:30–22:15', tag: 'lang', label: 'Go', title: 'Go — Microservice in Go', desc: 'Build Go microservice: Gin + GORM. Docker container. gRPC hoặc REST. Health check. Graceful shutdown. 12-factor app principles.', output: 'Go microservice + Dockerfile' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — Demo presentation practice', desc: 'Practice: "Let me walk you through the application..." 5 phút EN demo presentation.' }, { time: '20:00–21:30', tag: 'fe', label: 'FE', title: 'Styling + Responsive', desc: 'CSS Modules hoặc Tailwind CSS. Responsive: mobile-first. Dark theme. Animations. Polish UI: loading skeletons, empty states, error pages.', output: 'Polished UI: responsive + dark theme' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Terraform — Full Infrastructure', desc: 'Terraform cho project: VNet, App Service, SQL, Redis, Container Registry. Modules. Output: connection strings. State locking.', output: 'Complete Terraform infrastructure' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Blog post outline EN', desc: 'Outline cho blog: "Building a Full-Stack E-commerce App with .NET + React". Intro, Tech Stack, Architecture, Challenges, Lessons.' }, { time: '20:00–21:30', tag: 'build', label: 'Build', title: 'DevOps Full Stack — Jenkins + Nginx + Docker', desc: 'Docker Compose production: <strong>Nginx</strong> (SSL, reverse proxy, static files) → React build → .NET API (2 replicas) → SQL + Redis. <strong>Jenkins</strong> pipeline: Checkout → Build → Test → Docker build → Push → Deploy staging → Deploy production. <strong>Terraform</strong>: provision cloud resources. Branch strategy: main, develop, feature/*.', output: 'Jenkins pipeline + Nginx + Docker Compose + Terraform' }, { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React — SSR + Next.js Intro', desc: 'Next.js basics: pages router, getServerSideProps, getStaticProps. SSR vs SSG vs ISR. API routes. Deploy to Vercel.', output: 'Next.js demo app deployed' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn', desc: 'Review cards. Speaking: "My capstone project" 5 phút EN.' }, { time: '09:30–12:00', tag: 'build', label: 'Build', title: 'Full DevOps Sprint', desc: 'Jenkins: pipeline hoàn chỉnh (build → test → Docker → deploy). Nginx: reverse proxy React + API, SSL, gzip. Docker Compose: 6 containers (Nginx + React + API + SQL + Redis + Jenkins). Test full flow end-to-end.' }, { time: '14:00–16:00', tag: 'build', label: 'Build', title: 'Deploy Production + Monitoring', desc: 'Terraform → provision Azure/AWS resources. Jenkins → auto deploy. Grafana dashboard: API metrics + Nginx logs. Health checks. Load test with k6 hoặc Artillery. Record demo.', output: 'Capstone LIVE: Nginx + Jenkins CI/CD + Docker + Cloud + Monitoring' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Demo + Refactor', desc: 'Self-demo: walk through entire app. Note improvements. Refactor code nếu cần. Update README.', output: 'Capstone v1.0 COMPLETE 🎉' }]}
            ]
        },
        23: {
            title: 'Tuần 23 — System Design + Interview Prep', phase: 3,
            goal: 'System Design practice, .NET interview questions, mock interviews.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Interview phrases EN', desc: '"In my current role, I...", "I have experience with...", "The challenge was...", "I solved it by...". Practice 10 interview answers.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'System Design: URL Shortener', desc: 'Design: API, hashing algorithm (base62), database schema, cache layer, analytics. Scalability: horizontal scaling, read replicas, CDN. Draw architecture diagram.', output: 'URL Shortener system design document + diagram' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Docker — GPU Containers + ML', desc: 'NVIDIA Container Toolkit. GPU passthrough. TensorFlow/PyTorch Docker images. Resource management for ML workloads.', output: 'GPU Docker setup notes' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe interview examples EN', desc: 'YouTube: "Software Engineer Interview" videos. Note common questions + answer patterns.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'System Design: Chat Application', desc: 'Design: WebSocket/SignalR, message storage, delivery status, group chat, presence. Scalability: message queue, connection load balancing, chat history partitioning.', output: 'Chat App system design document + diagram' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — ML.NET Basics', desc: 'ML.NET: install packages. IDataView, pipeline, trainer. Demo: sentiment analysis hoặc price prediction. Model evaluation: accuracy, F1.', output: 'ML.NET demo: sentiment classifier' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Review 600+ cards + 10 từ mới', desc: 'Thêm: scalable, distributed, consistent, available, partition, replicate, throughput, latency, bottleneck, resilient.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: '.NET Interview Prep — Core Questions', desc: 'Top 30 .NET questions: async/await internals, DI lifetimes, middleware pipeline, EF Core tracking, GC generations, value vs reference types, Span<T>, records, pattern matching. Viết answers.', output: '30 .NET interview Q&A document' }, { time: '21:30–22:15', tag: 'lang', label: 'Python', title: 'Python — Data Analysis with Pandas', desc: 'Pandas: DataFrame, Series. Read CSV/JSON. Filter, groupby, merge, pivot. Matplotlib/Seaborn basic plots. Exploratory data analysis.', output: 'Jupyter notebook: data analysis demo' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Speaking — Mock interview EN', desc: 'Self-interview: "Tell me about yourself", "Describe a challenging project", "How do you handle deadlines". Record 5 phút.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'SQL + Docker + Design Patterns Interview Prep', desc: 'SQL: query optimization, index strategy, transaction isolation. Docker: layers, networking, compose. Patterns: Repository, CQRS, Mediator, Strategy, Factory. Viết answers cho 20 questions.', output: '20 SQL + Docker + Patterns Q&A' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Full-text Search + Analytics', desc: 'Full-text search: CONTAINS, FREETEXT, full-text index. OLAP concepts. Columnstore index cho analytics. Query large datasets efficiently.', output: 'Full-text search + analytics queries' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Self-introduction EN', desc: 'Viết self-introduction 200 words EN: background, skills, projects, goals.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Coding Challenge Practice', desc: 'LeetCode medium problems (2 bài). Focus: arrays, strings, hash maps. Cách approach: understand → plan → code → test → optimize. Time yourself: 30 min/bài.', output: '2 LeetCode solutions + approach notes' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'MLOps Basics — Model Deployment', desc: 'MLflow: experiment tracking, model registry. Docker container cho ML model. REST API endpoint cho inference. A/B testing models.', output: 'ML model deployment pipeline notes' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn', desc: 'Review cards. Practice interview answers EN.' }, { time: '09:30–12:00', tag: 'dotnet', label: '.NET', title: 'Mock Interview Practice', desc: 'Full mock interview (tự hỏi-tự trả lời hoặc nhờ bạn): 1) Self-intro (5 min), 2) Technical questions (20 min), 3) System Design (20 min), 4) Coding (15 min). Record toàn bộ.' }, { time: '14:00–16:00', tag: 'review', label: 'Review', title: 'Review recording + Fix gaps', desc: 'Xem lại recording. Note: câu nào trả lời tốt, câu nào cần cải thiện. Viết lại answers cho weak areas.', output: 'Mock interview recording + improvement notes' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Review tuần 23', desc: 'Finalize: system design cheat sheet, interview Q&A binder, coding patterns.', output: 'Interview prep package complete' }]}
            ]
        },
        24: {
            title: 'Tuần 24 — Portfolio + English B1 Push', phase: 3,
            goal: 'GitHub profile, blog posts, LinkedIn, English B1 target.',
            days: [
                { name: 'Thứ 2', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Mock interview bằng EN (10 phút)', desc: 'Full EN interview practice: "Tell me about your most challenging project" — trả lời 3 phút không dừng.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Design Patterns Deep Review', desc: 'Review top 10 patterns dùng trong .NET: Singleton, Factory, Strategy, Observer, Decorator, Repository, Unit of Work, Mediator, CQRS, Specification. Code examples cho mỗi pattern.', output: '10 design pattern examples in C#' }, { time: '21:30–22:15', tag: 'lang', label: 'Python', title: 'Python — FastAPI Development', desc: 'FastAPI: auto docs, Pydantic models, dependency injection. Async endpoints. WebSocket support. Compare: FastAPI vs Express vs ASP.NET.', output: 'FastAPI CRUD API + auto docs' }]},
                { name: 'Thứ 3', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Nghe — Full conference talk EN (20 phút)', desc: 'Xem 1 talk từ .NET Conf hoặc NDC. Không dừng, không sub. Test: tóm tắt lại bằng EN 5 câu.' }, { time: '20:00–21:30', tag: 'dotnet', label: '.NET', title: 'Code Review Best Practices', desc: 'Checklist: naming, SOLID, error handling, security, performance, testing. Practice: review 2 open-source PRs trên GitHub. Viết review comments.', output: 'Code review checklist + 2 PR reviews' }, { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Vector Databases — Pinecone/Weaviate', desc: 'Vector DB concepts: embeddings, similarity search, HNSW index. Pinecone: upsert, query. Weaviate: schema, objects. Use case: semantic search.', output: 'Vector DB demo + semantic search' }]},
                { name: 'Thứ 4', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'Writing — Blog post EN (draft)', desc: 'Viết draft blog post EN: "My 6-Month Learning Journey: From .NET Lead to Full-Stack Developer". 500+ words.' }, { time: '20:00–21:30', tag: 'ai', label: 'AI', title: 'GitHub Profile + README', desc: 'GitHub profile README: intro, skills, projects, stats. Pin top 5 repos. Update all project READMEs. Add screenshots/GIFs. Clean up old repos.', output: 'Professional GitHub profile + 5 pinned repos' }, { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — Semantic Kernel Overview', desc: 'Microsoft Semantic Kernel: plugins, planner, memory. Integrate OpenAI/Azure OpenAI. Chain prompts. Build AI agent trong .NET.', output: 'Semantic Kernel demo + notes' }]},
                { name: 'Thứ 5', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'English B1 Test Practice', desc: 'Làm 1 bài test English B1 online (Cambridge practice). Đánh giá: Listening, Reading, Writing, Speaking.' }, { time: '20:00–21:30', tag: 'ai', label: 'AI', title: 'Blog Post Writing', desc: 'Viết 1-2 blog posts (Dev.to hoặc Medium): technical article về .NET topic hoặc learning journey. Include code snippets, diagrams.', output: '1-2 published blog posts' }, { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL Review — Performance Audit', desc: 'Comprehensive SQL audit: missing indexes, unused indexes, query stats, wait stats. Generate optimization report. Apply top 5 recommendations.', output: 'SQL performance audit report' }]},
                { name: 'Thứ 6', blocks: [{ time: '19:30–20:00', tag: 'english', label: 'English', title: 'LinkedIn profile update EN', desc: 'Update LinkedIn: headline, summary, experience, skills, projects. Viết bằng EN.' }, { time: '20:00–21:30', tag: 'review', label: 'Review', title: 'Portfolio Polish', desc: 'Review tất cả projects. Ensure: mỗi repo có README, screenshots, setup guide. Portfolio website nếu có thời gian.', output: 'Complete portfolio: GitHub + Blog + LinkedIn' }, { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React — AI Chat UI Component', desc: 'Build chat UI: message list, input box, streaming response display. Markdown rendering. Code syntax highlighting. Loading states.', output: 'React AI chat component' }]},
                { name: 'Thứ 7', weekend: true, blocks: [{ time: '09:00–09:30', tag: 'english', label: 'English', title: 'Tổng ôn + Speaking test', desc: 'Self-test EN: nói 5 phút liên tục về "My skills and experience". Check: fluency, vocabulary, grammar.' }, { time: '09:30–12:00', tag: 'dotnet', label: '.NET', title: 'Mock Interview bằng EN', desc: 'Full mock interview IN ENGLISH: intro, behavioral, technical, system design, coding. 60 phút. Record.' }, { time: '14:00–16:00', tag: 'review', label: 'Review', title: '6-MONTH GRAND REVIEW', desc: 'REVIEW LỚN CUỐI CÙNG: Liệt kê TẤT CẢ đã học, đã build, đã deploy. Tự chấm điểm cho 7 mảng. Viết "6 Month Report".', output: '6-Month Grand Report + Final scorecard 🎉' }]},
                { name: 'Chủ nhật', sunday: true, blocks: [{ time: '10:00–12:00', tag: 'review', label: 'Review', title: 'Celebration + Future Planning', desc: 'Celebrate! Viết "What\'s Next" plan. Đặt goals cho 6 tháng tiếp theo. Share report trên LinkedIn.', output: 'Future roadmap + LinkedIn post' }]}
            ]
        },
        25: {
            title: 'Tuần 25 — 🎓 Buffer Week', phase: 3,
            goal: 'Bù lại topic thiếu. Deep-dive topic yêu thích. Polish portfolio.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English duy trì 30 phút/ngày', desc: 'Anki review + podcast/video EN + speaking practice. Duy trì momentum.' },
                    { time: '20:00–21:30', tag: 'review', label: 'Flexible', title: 'Bù + Deep-dive — Topic yếu nhất', desc: 'Chọn topic yếu nhất để ôn lại. Làm exercises, đọc docs, viết code practice.' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Infrastructure Setup — Terraform + K8s', desc: 'Capstone infra: Terraform provision Azure resources. K8s manifests: deployments, services, ingress. Helm chart. CI/CD pipeline.', output: 'Capstone infrastructure code' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English duy trì 30 phút/ngày', desc: 'Anki review + podcast/video EN + speaking practice. Duy trì momentum.' },
                    { time: '20:00–21:30', tag: 'review', label: 'Flexible', title: 'Bù + Deep-dive — Topic thích nhất', desc: 'Chọn topic thích nhất để đào sâu thêm. Build something cool.' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'Database Design + Migrations', desc: 'Capstone DB: design schema, ER diagram. EF Core migrations. Seed data. Indexes cho query patterns. Backup strategy.', output: 'Capstone database schema + migrations' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English duy trì 30 phút/ngày', desc: 'Anki review + podcast/video EN + speaking practice. Duy trì momentum.' },
                    { time: '20:00–21:30', tag: 'review', label: 'Flexible', title: 'Bù + Deep-dive — Thử framework mới', desc: 'Thử framework hoặc tool mới mà bạn muốn explore.' },
                    { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React — Frontend Architecture', desc: 'Capstone frontend: folder structure, routing, state management. Component library. API integration layer. Error handling. Loading states.', output: 'Capstone React app structure' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English duy trì 30 phút/ngày', desc: 'Anki review + podcast/video EN + speaking practice. Duy trì momentum.' },
                    { time: '20:00–21:30', tag: 'review', label: 'Flexible', title: 'Bù + Deep-dive — Đọc sách tech', desc: 'Đọc sách tech: Clean Code, Designing Data-Intensive Applications, hoặc sách khác.' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'CI/CD Pipeline — Full Setup', desc: 'Capstone CI/CD: Jenkins hoặc GitHub Actions. Stages: lint → test → build → Docker → deploy staging → deploy prod. Approval gates.', output: 'Capstone CI/CD pipeline' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English duy trì 30 phút/ngày', desc: 'Anki review + podcast/video EN + speaking practice. Duy trì momentum.' },
                    { time: '20:00–21:30', tag: 'review', label: 'Flexible', title: 'Bù + Deep-dive — Contribute open-source', desc: 'Tìm repo open-source phù hợp. Đọc contributing guide. Fix issue nhỏ hoặc improve docs.' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — API Integration Testing', desc: 'Capstone: WebApplicationFactory tests. Test all endpoints. Authentication testing. Load testing với k6 hoặc NBomber. Performance baseline.', output: 'Capstone integration tests + load test' }
                ]},
                { name: 'Thứ 7 → CN', blocks: [
                    { time: '10:00–16:00', tag: 'review', label: 'Review', title: 'Final project polish', desc: 'Update tất cả repos. Fix bugs. Add features nhỏ. Prepare cho tuần graduation.', output: 'All projects polished + ready for showcase' }
                ]}
            ]
        },
        26: {
            title: 'Tuần 26 — 🎓 GRADUATION', phase: 3,
            goal: 'Final review. Celebrate. Plan next chapter.',
            days: [
                { name: 'Thứ 2', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English maintenance', desc: 'Anki review + conversation practice. Target maintained: 2000+ từ, B1 level.' },
                    { time: '19:30–21:00', tag: 'review', label: 'Review', title: 'Final documentation — Blog post', desc: 'Viết "6 Month Journey" blog post (EN). Kể lại hành trình từ .NET Lead đến Full-Stack Developer.' },
                    { time: '21:30–22:15', tag: 'build', label: 'Build', title: 'Production Readiness Checklist', desc: 'Checklist: HTTPS, CORS, rate limiting, health checks, logging, monitoring, backup, security headers, error pages, graceful shutdown.', output: 'Production readiness audit' }
                ]},
                { name: 'Thứ 3', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English maintenance', desc: 'Anki review + conversation practice. Target maintained: 2000+ từ, B1 level.' },
                    { time: '19:30–21:00', tag: 'review', label: 'Review', title: 'Final documentation — Video demo', desc: 'Record video demo tất cả projects. Showcase features, architecture, code quality.' },
                    { time: '21:30–22:15', tag: 'sql', label: 'SQL', title: 'SQL — Final Optimization', desc: 'Final SQL audit: query performance, index review, maintenance plan. Document database architecture. Knowledge transfer documentation.', output: 'Final SQL optimization report' }
                ]},
                { name: 'Thứ 4', blocks: [
                    { time: '19:30–20:00', tag: 'english', label: 'English', title: 'English maintenance', desc: 'Anki review + conversation practice. Target maintained: 2000+ từ, B1 level.' },
                    { time: '19:30–21:00', tag: 'review', label: 'Review', title: 'Final documentation — Portfolio website', desc: 'Update portfolio website. Thêm screenshots, links, descriptions cho tất cả projects.' },
                    { time: '21:30–22:15', tag: 'dotnet', label: '.NET', title: '.NET — Code Review + Refactor', desc: 'Final code review: clean up TODOs, remove dead code, improve error messages. Document API endpoints. Update README. Architecture Decision Records.', output: 'Clean codebase + documentation' }
                ]},
                { name: 'Thứ 5', blocks: [
                    { time: '19:30–21:00', tag: 'review', label: 'Review', title: 'Knowledge transfer — Guide', desc: 'Viết guide cho đồng nghiệp muốn học. Chia sẻ resources, tips, mistakes to avoid.' },
                    { time: '21:30–22:15', tag: 'fe', label: 'FE', title: 'React — Polish + Accessibility', desc: 'Final frontend: accessibility audit (axe DevTools), responsive testing, performance (Lighthouse). Fix issues. Polish UI animations.', output: 'Accessible, polished frontend' }
                ]},
                { name: 'Thứ 6', blocks: [
                    { time: '19:30–21:00', tag: 'review', label: 'Review', title: 'Knowledge transfer — Share', desc: 'Share journey trên LinkedIn, Dev.to, Reddit. Publish blog posts. Connect with community.', output: 'Published: blog + video + LinkedIn post' }
                ]},
                { name: 'Thứ 7', blocks: [
                    { time: '10:00–12:00', tag: 'review', label: 'Review', title: '🎓 GRADUATION DAY', desc: 'Đọc lại Phase 1 notes → Phase 2 notes → Phase 3 notes. Nhìn lại ngày đầu tiên vs bây giờ. Bạn đã: master .NET, biết Go/TS/Rust/Python/Kotlin, build React apps, deploy to cloud, CI/CD, Docker/K8s, AI integration, English B1. INCREDIBLE!', output: '🎓 GRADUATED — 6 months well spent!' }
                ]},
                { name: 'Chủ nhật', sunday: true, blocks: [
                    { time: 'Cả ngày', tag: 'rest', label: '🎉', title: 'CELEBRATE!', desc: 'Nghỉ ngơi. Đi chơi. Ăn ngon. Bạn xứng đáng. 182 ngày kiên trì là không hề dễ dàng. Chúc mừng phiên bản mới của bạn! 🚀' }
                ]}
            ],
            restNote: '🎓 Chúc mừng tốt nghiệp! 6 tháng kiên trì = 1 phiên bản hoàn toàn khác. Bây giờ bạn là: .NET Expert + Polyglot Developer + Cloud/DevOps capable + AI-integrated + English B1. The world is yours!'
        }
    };

    // ═══════════════════════════════════════
    // RENDER FUNCTIONS
    // ═══════════════════════════════════════

    function renderBlock(b) {
        let html = `<div class="block">`;
        html += `<span class="block-time">${b.time}</span>`;
        html += `<span class="block-tag tag-${b.tag}">${b.label}</span>`;
        html += `<div class="block-body"><strong>${b.title}</strong><p>${b.desc}</p>`;
        if (b.output) html += `<div class="block-output">📤 ${b.output}</div>`;
        html += `</div></div>`;
        return html;
    }

    function renderDay(d) {
        let cls = 'day-card';
        if (d.weekend) cls += ' day-weekend';
        if (d.sunday) cls += ' day-sunday';
        if (d.rest) cls += ' day-rest';
        let html = `<div class="${cls}"><div class="day-header"><span class="day-name">${d.name}</span>`;
        if (d.weekend) html += `<span class="day-type">Weekend — 4.5h</span>`;
        if (d.sunday) html += `<span class="day-type">Review — 2h</span>`;
        html += `</div><div class="day-blocks">`;
        d.blocks.forEach(b => { html += renderBlock(b); });
        html += `</div></div>`;
        return html;
    }

    function renderWeek(num, w) {
        const phaseColor = w.phase === 2 ? '#A78BFA' : '#F59E0B';
        const isRest = w.phase === 'rest';
        let html = `<div class="week-panel" data-week="${num}">`;
        html += `<div class="week-title"><h3>${w.title}</h3>`;
        if (isRest) {
            html += `<span class="week-phase-tag week-rest-tag">REST</span>`;
        } else {
            html += `<span class="week-phase-tag" style="--wpc:${phaseColor}">Phase ${w.phase}</span>`;
        }
        html += `</div>`;
        html += `<div class="week-goal">🎯 Mục tiêu: ${w.goal}</div>`;
        w.days.forEach(d => { html += renderDay(d); });
        if (w.restNote) {
            html += `<div class="rest-banner">${w.restNote}</div>`;
        }
        html += `</div>`;
        return html;
    }

    // Render weeks 9-26
    const container = document.getElementById('weeks-9-26');
    if (container) {
        let html = '';
        for (let i = 9; i <= 26; i++) {
            if (weekData[i]) {
                html += renderWeek(i, weekData[i]);
            }
        }
        container.innerHTML = html;
    }

    // ═══════════════════════════════════════
    // WEEK NAVIGATION
    // ═══════════════════════════════════════

    const phaseTabs = document.querySelectorAll('.phase-tab');
    const weekBtns = document.querySelectorAll('.week-btn');
    const restWeeks = [4, 8, 12, 16, 20];

    // Mark rest week buttons
    weekBtns.forEach(btn => {
        const w = parseInt(btn.dataset.week);
        if (restWeeks.includes(w)) btn.classList.add('rest-week');
    });

    // Phase tab click
    phaseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            phaseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const phase = parseInt(tab.dataset.phase);
            const ranges = { 1: [1, 8], 2: [9, 16], 3: [17, 26] };
            const [start, end] = ranges[phase];

            // Show only relevant week buttons
            weekBtns.forEach(btn => {
                const w = parseInt(btn.dataset.week);
                btn.style.display = (w >= start && w <= end) ? '' : 'none';
            });

            // Activate first week of phase
            const firstBtn = document.querySelector(`.week-btn[data-week="${start}"]`);
            if (firstBtn) firstBtn.click();
        });
    });

    // Week button click
    weekBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            weekBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const week = btn.dataset.week;

            document.querySelectorAll('.week-panel').forEach(p => {
                p.classList.toggle('active', p.dataset.week === week);
            });
        });
    });

    // ═══════════════════════════════════════
    // STANDARD: Hamburger + TOC + Smooth scroll
    // ═══════════════════════════════════════

    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    const tocBar = document.querySelector('.toc-bar');
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = [];
    tocLinks.forEach(link => {
        const id = link.getAttribute('href')?.replace('#', '');
        if (id) {
            const el = document.getElementById(id);
            if (el) sections.push({ id, el, link });
        }
    });

    function updateTOC() {
        const scrollY = window.scrollY + 160;
        let current = sections[0];
        for (const s of sections) {
            if (s.el.offsetTop <= scrollY) current = s;
        }
        tocLinks.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    if (sections.length) {
        window.addEventListener('scroll', updateTOC, { passive: true });
        updateTOC();
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').replace('#', '');
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                const offset = tocBar ? tocBar.offsetHeight + 20 : 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    if (tocBar) {
        window.addEventListener('scroll', () => {
            tocBar.classList.toggle('scrolled', window.scrollY > 400);
        }, { passive: true });
    }
})();

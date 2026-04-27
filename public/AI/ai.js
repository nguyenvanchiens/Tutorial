/*
    ===== AI HUB — JAVASCRIPT =====
    File này làm gì: Fetch tin tức AI từ 5 nguồn, phân tích nội dung tiếng Việt,
    render card, auto-refresh mỗi 5 phút, tìm kiếm, lọc, sắp xếp.

    Cấu trúc:
    1. CONFIG & STATE — Cấu hình, biến toàn cục
    2. MOBILE NAV — Hamburger menu
    3. FILTER TABS — Lọc theo nguồn
    4. SEARCH & SORT — Tìm kiếm + sắp xếp
    5. FETCH FUNCTIONS — Lấy dữ liệu từ 5 API
    6. AI ANALYSIS — Phân tích nội dung → tóm tắt tiếng Việt + đánh giá hữu ích cho dev
    7. RENDER — Tạo HTML card
    8. TIMER — Đồng hồ đếm ngược auto-refresh
    9. INIT — Khởi chạy

    Tất cả API đều miễn phí, không cần key.
    IIFE pattern: bọc toàn bộ code trong (function(){...})() để không gây xung đột biến toàn cục.
*/
(function () {
    'use strict';

    // ===== 1. CONFIG & STATE =====
    var REFRESH_INTERVAL = 5 * 60 * 1000;  // 5 phút (tính bằng mili-giây)
    var allArticles = [];                    // Mảng chứa tất cả bài đã fetch
    var currentFilter = 'all';               // Nguồn đang lọc (all/devto/hackernews/github/reddit/producthunt)
    var currentSort = 'newest';              // Sắp xếp: newest hoặc popular
    var currentField = 'all';                // Lọc lĩnh vực: all/web/mobile/design
    var searchQuery = '';                    // Từ khóa tìm kiếm hiện tại
    var timerInterval = null;                // ID interval đồng hồ đếm ngược

    // Cache DOM elements — lấy 1 lần, dùng nhiều lần (tối ưu hiệu suất)
    var $grid = document.getElementById('newsGrid');
    var $loading = document.getElementById('loadingState');
    var $empty = document.getElementById('emptyState');
    var $totalArticles = document.getElementById('totalArticles');
    var $lastUpdate = document.getElementById('lastUpdate');
    var $searchInput = document.getElementById('searchInput');
    var $sortBy = document.getElementById('sortBy');
    var $btnRefresh = document.getElementById('btnRefresh');
    var $refreshTimer = document.getElementById('refreshTimer');
    var $fieldFilter = document.getElementById('fieldFilter');


    // ===== 2. MOBILE NAV =====
    // Hamburger menu: mở/đóng overlay nav-links trên mobile
    (function initMobileNav() {
        var hamburger = document.querySelector('.nav-hamburger');
        var navLinks = document.querySelector('.nav-links');
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        // Đóng menu khi click vào link
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { navLinks.classList.remove('open'); });
        });
        // Đóng khi nhấn Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') navLinks.classList.remove('open');
        });
    })();


    // ===== 3. FILTER TABS =====
    // Click tab nguồn → lọc bài theo nguồn đó
    (function initFilterTabs() {
        var tabs = document.querySelectorAll('.nav-links a[data-filter]');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                tabs.forEach(function (t) { t.classList.remove('nav-active'); });
                tab.classList.add('nav-active');
                currentFilter = tab.getAttribute('data-filter');
                renderArticles();
            });
        });
    })();


    // ===== 4. SEARCH & SORT =====
    // Tìm kiếm: debounce 300ms (chờ người dùng gõ xong rồi mới lọc, tránh lag)
    var searchTimeout = null;
    $searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
            searchQuery = $searchInput.value.trim().toLowerCase();
            renderArticles();
        }, 300);
    });

    // Sắp xếp: mới nhất hoặc phổ biến nhất
    $sortBy.addEventListener('change', function () {
        currentSort = $sortBy.value;
        renderArticles();
    });

    // Lọc theo lĩnh vực: Web / Mobile / Design
    $fieldFilter.addEventListener('change', function () {
        currentField = $fieldFilter.value;
        renderArticles();
    });

    // Nút refresh: fetch lại ngay lập tức
    $btnRefresh.addEventListener('click', function () {
        $btnRefresh.classList.add('spinning');
        fetchAllNews().then(function () {
            setTimeout(function () { $btnRefresh.classList.remove('spinning'); }, 500);
        });
    });


    // ===== 5. FETCH FUNCTIONS =====
    // Mỗi hàm gọi API từ 1 nguồn, trả về Promise → mảng bài viết format chuẩn

    /*
        fetchDevToAI() — Lấy bài từ Dev.to có tag AI/ML
        Dev.to API cho phép lọc theo tag: ai, machinelearning, llm, openai, chatgpt...
        Gọi nhiều tag song song rồi gộp, loại trùng theo URL.
    */
    function fetchDevToAI() {
        var tags = ['ai', 'machinelearning', 'llm', 'openai', 'chatgpt', 'copilot', 'generativeai'];
        var fetches = tags.map(function (tag) {
            return fetch('https://dev.to/api/articles?tag=' + tag + '&per_page=10&top=1')
                .then(function (r) { return r.ok ? r.json() : []; })
                .catch(function () { return []; });
        });

        return Promise.all(fetches).then(function (results) {
            // Gộp tất cả kết quả, loại bài trùng URL
            var seen = {};
            var merged = [];
            results.forEach(function (arr) {
                arr.forEach(function (a) {
                    if (!seen[a.url]) {
                        seen[a.url] = true;
                        merged.push({
                            source: 'devto',
                            title: a.title || '',
                            desc: a.description || '',
                            url: a.url || '',
                            date: a.published_at || a.created_at || '',
                            tags: a.tag_list || [],
                            likes: a.positive_reactions_count || 0,
                            comments: a.comments_count || 0,
                            author: a.user ? a.user.name || a.user.username : ''
                        });
                    }
                });
            });
            return merged;
        }).catch(function () { return []; });
    }

    /*
        fetchHackerNewsAI() — Lấy top stories từ HN, lọc bài liên quan AI
        Bước 1: Lấy danh sách ID top stories
        Bước 2: Fetch chi tiết 80 bài đầu (song song)
        Bước 3: Lọc chỉ giữ bài có từ khóa AI trong title
    */
    function fetchHackerNewsAI() {
        // Từ khóa AI để lọc bài HN — bài nào title chứa 1 trong các từ này mới giữ
        var aiKeywords = /\b(ai|artificial intelligence|machine learning|deep learning|neural|gpt|llm|chatgpt|openai|claude|gemini|copilot|llama|mistral|transformer|diffusion|stable diffusion|midjourney|langchain|vector|embedding|rag|fine.?tun|anthropic|hugging.?face|tensorflow|pytorch|onnx|ml ops|mlops|generative|large language|foundation model|agent|autonomous|reasoning)\b/i;

        return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(function (r) { return r.json(); })
            .then(function (ids) {
                // Lấy 80 bài đầu rồi lọc — vì không phải bài nào cũng về AI
                var top = ids.slice(0, 80);
                var fetches = top.map(function (id) {
                    return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
                        .then(function (r) { return r.json(); })
                        .catch(function () { return null; });
                });
                return Promise.all(fetches);
            })
            .then(function (items) {
                return items
                    .filter(function (item) {
                        // Chỉ giữ story (không phải job/poll) + có title liên quan AI
                        return item && item.type === 'story' && item.title && aiKeywords.test(item.title);
                    })
                    .map(function (item) {
                        return {
                            source: 'hackernews',
                            title: item.title || '',
                            desc: item.url ? item.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] : 'Hacker News discussion',
                            url: item.url || 'https://news.ycombinator.com/item?id=' + item.id,
                            date: item.time ? new Date(item.time * 1000).toISOString() : '',
                            tags: [],
                            likes: item.score || 0,
                            comments: item.descendants || 0,
                            author: item.by || ''
                        };
                    });
            })
            .catch(function () { return []; });
    }

    /*
        fetchGitHubAI() — Lấy repo AI/ML trending trên GitHub
        Dùng GitHub Search API tìm repo có stars > 500, push trong 7 ngày gần,
        chỉ lọc repo liên quan AI bằng keywords trong tên + description.
    */
    function fetchGitHubAI() {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        var weekAgo = d.toISOString().split('T')[0]; // Format: "2026-03-14"

        // Tìm repo có chứa keyword AI trong tên hoặc description
        var query = 'ai OR llm OR machine-learning OR deep-learning OR gpt OR langchain OR transformer OR diffusion';
        var url = 'https://api.github.com/search/repositories?q=' +
            encodeURIComponent(query + ' stars:>500 pushed:>' + weekAgo) +
            '&sort=stars&order=desc&per_page=20';

        return fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var items = (data && data.items) || [];
                return items.map(function (repo) {
                    return {
                        source: 'github',
                        title: repo.full_name || '',
                        desc: repo.description || '',
                        url: repo.html_url || '',
                        date: repo.pushed_at || repo.updated_at || '',
                        tags: [repo.language || 'N/A'].concat((repo.topics || []).slice(0, 4)),
                        likes: repo.stargazers_count || 0,
                        comments: repo.open_issues_count || 0,
                        author: repo.owner ? repo.owner.login : ''
                    };
                });
            })
            .catch(function () { return []; });
    }

    /*
        fetchRedditAI() — Lấy bài hot từ các subreddit AI
        Reddit chặn CORS → thử trực tiếp, nếu lỗi → dùng CORS proxy.
        Lấy từ 3 subreddit: MachineLearning, artificial, LocalLLaMA
    */
    function fetchRedditAI() {
        var subreddits = ['MachineLearning', 'artificial', 'LocalLLaMA'];

        var fetches = subreddits.map(function (sub) {
            var redditUrl = 'https://www.reddit.com/r/' + sub + '/hot.json?limit=10&raw_json=1';

            function parseReddit(data) {
                var children = (data && data.data && data.data.children) || [];
                return children
                    .filter(function (c) { return c.data && !c.data.stickied; })
                    .map(function (c) {
                        var d = c.data;
                        return {
                            source: 'reddit',
                            title: d.title || '',
                            desc: truncate(stripHtml(d.selftext || ''), 200) || d.domain || '',
                            url: d.url && d.url.indexOf('reddit.com') === -1 ? d.url : 'https://www.reddit.com' + d.permalink,
                            date: d.created_utc ? new Date(d.created_utc * 1000).toISOString() : '',
                            tags: [('r/' + sub)].concat(d.link_flair_text ? [d.link_flair_text] : []),
                            likes: d.score || 0,
                            comments: d.num_comments || 0,
                            author: d.author || ''
                        };
                    });
            }

            // Thử trực tiếp → proxy 1 → proxy 2
            return fetch(redditUrl)
                .then(function (r) { if (!r.ok) throw new Error('fail'); return r.json(); })
                .then(parseReddit)
                .catch(function () {
                    var proxy1 = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(redditUrl);
                    return fetch(proxy1)
                        .then(function (r) { if (!r.ok) throw new Error('fail'); return r.json(); })
                        .then(parseReddit)
                        .catch(function () {
                            var proxy2 = 'https://corsproxy.io/?' + encodeURIComponent(redditUrl);
                            return fetch(proxy2)
                                .then(function (r) { if (!r.ok) throw new Error('fail'); return r.json(); })
                                .then(parseReddit)
                                .catch(function () { return []; });
                        });
                });
        });

        // Gộp kết quả từ 3 subreddit
        return Promise.all(fetches).then(function (results) {
            var merged = [];
            results.forEach(function (arr) { merged = merged.concat(arr); });
            return merged;
        });
    }

    /*
        fetchProductHunt() — Lấy sản phẩm AI mới từ Product Hunt
        Product Hunt không có public API miễn phí nên dùng phương pháp thay thế:
        Fetch từ RSS qua CORS proxy, parse XML để lấy sản phẩm.
        Nếu lỗi → fallback sang Dev.to tag "producthunt" + "ai".
    */
    function fetchProductHunt() {
        // Dùng RSS feed của Product Hunt qua CORS proxy
        var rssUrl = 'https://www.producthunt.com/feed';
        var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl);

        // Từ khóa AI để lọc sản phẩm liên quan
        var aiFilter = /\b(ai|gpt|llm|copilot|chatbot|machine learning|neural|automat|generat|intelligen|assistant|agent|prompt|model)\b/i;

        return fetch(proxyUrl)
            .then(function (r) {
                if (!r.ok) throw new Error('PH RSS failed');
                return r.text();
            })
            .then(function (xml) {
                // Parse RSS XML → lấy các <item>
                var parser = new DOMParser();
                var doc = parser.parseFromString(xml, 'text/xml');
                var items = doc.querySelectorAll('item');
                var results = [];

                items.forEach(function (item) {
                    var title = (item.querySelector('title') || {}).textContent || '';
                    var desc = (item.querySelector('description') || {}).textContent || '';
                    var link = (item.querySelector('link') || {}).textContent || '';
                    var pubDate = (item.querySelector('pubDate') || {}).textContent || '';

                    // Chỉ giữ sản phẩm liên quan AI
                    if (aiFilter.test(title) || aiFilter.test(desc)) {
                        results.push({
                            source: 'producthunt',
                            title: title,
                            desc: truncate(stripHtml(desc), 200),
                            url: link,
                            date: pubDate ? new Date(pubDate).toISOString() : '',
                            tags: ['Product Hunt'],
                            likes: 0,
                            comments: 0,
                            author: 'Product Hunt'
                        });
                    }
                });
                return results;
            })
            .catch(function () {
                // Fallback: nếu RSS lỗi → lấy từ Dev.to với tag producthunt + ai
                console.log('[AI Hub] PH RSS failed — fallback to Dev.to');
                return fetch('https://dev.to/api/articles?tag=ai&per_page=5&top=7')
                    .then(function (r) { return r.ok ? r.json() : []; })
                    .then(function (arr) {
                        return arr.map(function (a) {
                            return {
                                source: 'producthunt',
                                title: a.title || '',
                                desc: a.description || '',
                                url: a.url || '',
                                date: a.published_at || '',
                                tags: a.tag_list || [],
                                likes: a.positive_reactions_count || 0,
                                comments: a.comments_count || 0,
                                author: a.user ? a.user.name || a.user.username : ''
                            };
                        });
                    })
                    .catch(function () { return []; });
            });
    }


    // ===== 6. AI ANALYSIS — Phân tích nội dung tiếng Việt =====
    /*
        analyzeAI(article) — Phân tích bài viết AI → trả về mảng dòng tiếng Việt
        Dùng regex matching keywords trong title + desc + tags
        Kết quả gồm:
        - Loại nội dung (tutorial, so sánh, ra mắt mới, nghiên cứu, ...)
        - Công nghệ/model liên quan (GPT, Claude, LLaMA, PyTorch, ...)
        - Ứng dụng cụ thể (code assistant, chatbot, image gen, ...)
        - Mức độ quan tâm (theo likes/stars)
        - Đánh giá: có hữu ích trực tiếp cho dev không?
    */
    function analyzeAI(article) {
        var text = ((article.title || '') + ' ' + (article.desc || '') + ' ' + (article.tags || []).join(' ')).toLowerCase();
        var lines = [];

        // ---- LOẠI NỘI DUNG ----
        var contentTypes = [
            { re: /tutorial|hướng dẫn|how.?to|step.?by|getting.?started|beginner/i, label: 'Tutorial / Hướng dẫn' },
            { re: /comparison|vs\.?[\s]|versus|so sánh|benchmark|shootout/i, label: 'So sánh / Benchmark' },
            { re: /release|launch|announc|v\d+\.\d+|new version|just shipped|introducing/i, label: 'Ra mắt mới / Phiên bản mới' },
            { re: /research|paper|arxiv|study|finding|breakthrough/i, label: 'Nghiên cứu / Paper' },
            { re: /open.?source|foss|self.?host|license/i, label: 'Mã nguồn mở' },
            { re: /security|vulnerab|exploit|hack|leak|privacy|safety/i, label: 'Bảo mật / An toàn AI' },
            { re: /career|hiring|job|interview|salary/i, label: 'AI & Nghề nghiệp' },
            { re: /opinion|think|hot.?take|controversial|debate|ethic/i, label: 'Quan điểm / Tranh luận' },
            { re: /tip|trick|hack|shortcut|productivity|workflow/i, label: 'Mẹo & Thủ thuật' },
            { re: /architect|design.?pattern|system.?design|infrastructure/i, label: 'Kiến trúc hệ thống' },
            { re: /deploy|production|scale|hosting|cloud|infra/i, label: 'Triển khai / DevOps' },
            { re: /cost|pricing|free|cheap|token|billing|api.?cost/i, label: 'Chi phí / Pricing' },
            { re: /regulation|law|ban|policy|govern|comply/i, label: 'Quy định / Pháp lý AI' },
            { re: /startup|funding|raised|valuation|yc|invest/i, label: 'Startup AI' },
            { re: /local|on.?prem|self.?host|privacy|offline|edge/i, label: 'Chạy AI local / Self-hosted' }
        ];

        var matchedTypes = [];
        contentTypes.forEach(function (ct) {
            if (ct.re.test(text)) matchedTypes.push(ct.label);
        });
        if (matchedTypes.length > 0) {
            lines.push('📋 Loại: ' + matchedTypes.slice(0, 3).join(', '));
        }

        // ---- MODEL / CÔNG NGHỆ AI ----
        var aiModels = [
            { re: /\bgpt[\s-]?4|gpt[\s-]?4o|gpt[\s-]?4\.?5/i, label: 'GPT-4' },
            { re: /\bgpt[\s-]?3|gpt[\s-]?3\.5/i, label: 'GPT-3.5' },
            { re: /\bchatgpt\b/i, label: 'ChatGPT' },
            { re: /\bopenai\b/i, label: 'OpenAI' },
            { re: /\bclaude\b/i, label: 'Claude (Anthropic)' },
            { re: /\banthrop/i, label: 'Anthropic' },
            { re: /\bgemini\b/i, label: 'Gemini (Google)' },
            { re: /\bllama[\s-]?\d?/i, label: 'LLaMA (Meta)' },
            { re: /\bmistral\b/i, label: 'Mistral' },
            { re: /\bqwen\b/i, label: 'Qwen (Alibaba)' },
            { re: /\bdeepseek\b/i, label: 'DeepSeek' },
            { re: /\bperplexity\b/i, label: 'Perplexity' },
            { re: /\bcopilot\b/i, label: 'GitHub Copilot' },
            { re: /\bcursor\b/i, label: 'Cursor (AI Editor)' },
            { re: /\bcodeium\b|cody\b|tabnine\b|supermaven/i, label: 'Code AI Assistant' },
            { re: /\bstable.?diffusion|sdxl|comfyui/i, label: 'Stable Diffusion' },
            { re: /\bmidjourney\b/i, label: 'Midjourney' },
            { re: /\bdalle?\b|dall[\s-]?e/i, label: 'DALL-E' },
            { re: /\bsora\b/i, label: 'Sora (OpenAI Video)' },
            { re: /\bwhisper\b/i, label: 'Whisper (Speech)' }
        ];

        var matchedModels = [];
        aiModels.forEach(function (m) {
            if (m.re.test(text)) matchedModels.push(m.label);
        });
        if (matchedModels.length > 0) {
            lines.push('🤖 Model/Tool: ' + matchedModels.slice(0, 3).join(', '));
        }

        // ---- FRAMEWORK / THƯ VIỆN AI ----
        var frameworks = [
            { re: /\blangchain\b/i, label: 'LangChain' },
            { re: /\bllamaindex\b|llama.?index/i, label: 'LlamaIndex' },
            { re: /\bhugging.?face\b|transformers\b/i, label: 'Hugging Face' },
            { re: /\bpytorch\b/i, label: 'PyTorch' },
            { re: /\btensorflow\b/i, label: 'TensorFlow' },
            { re: /\bollama\b/i, label: 'Ollama (Local LLM)' },
            { re: /\bvllm\b/i, label: 'vLLM' },
            { re: /\bautogen\b|crewai\b|agent.?framework/i, label: 'AI Agent Framework' },
            { re: /\brag\b|retrieval.?augment/i, label: 'RAG' },
            { re: /\bvector.?db|pinecone|weaviate|chroma|milvus|qdrant/i, label: 'Vector Database' },
            { re: /\bfine[\s-]?tun/i, label: 'Fine-tuning' },
            { re: /\bprompt.?engineer|prompt.?template/i, label: 'Prompt Engineering' },
            { re: /\bembedding/i, label: 'Embeddings' },
            { re: /\bonnx\b|gguf|ggml|quantiz/i, label: 'Model Optimization' },
            { re: /\bmlops\b|ml.?pipeline|kubeflow|mlflow/i, label: 'MLOps' }
        ];

        var matchedFw = [];
        frameworks.forEach(function (f) {
            if (f.re.test(text)) matchedFw.push(f.label);
        });
        if (matchedFw.length > 0) {
            lines.push('🔧 Công nghệ: ' + matchedFw.slice(0, 3).join(', '));
        }

        // ---- ỨNG DỤNG CỤ THỂ ----
        var useCases = [
            { re: /code.?gen|code.?assist|code.?complet|autocomplete|code.?review|programming/i, label: 'Hỗ trợ viết code' },
            { re: /chatbot|conversational|dialog|chat.?interface/i, label: 'Chatbot / Hội thoại' },
            { re: /image.?gen|text.?to.?image|img2img|art.?gen/i, label: 'Tạo ảnh' },
            { re: /video.?gen|text.?to.?video/i, label: 'Tạo video' },
            { re: /voice|speech|tts|stt|audio|music/i, label: 'Giọng nói / Âm thanh' },
            { re: /translat|locali[sz]/i, label: 'Dịch thuật' },
            { re: /summar|digest|tldr/i, label: 'Tóm tắt nội dung' },
            { re: /search|retriev|knowledge.?base/i, label: 'Tìm kiếm thông minh' },
            { re: /automat|workflow|no.?code|low.?code/i, label: 'Tự động hóa workflow' },
            { re: /data.?analy|data.?science|visuali[sz]/i, label: 'Phân tích dữ liệu' },
            { re: /medical|health|drug|diagnos/i, label: 'Y tế / Sức khỏe' },
            { re: /game|gaming|npc/i, label: 'Game AI' },
            { re: /robot|embodied|autonomous.?driv/i, label: 'Robotics' },
            { re: /document|ocr|pdf|extract/i, label: 'Xử lý tài liệu' }
        ];

        // ---- LĨNH VỰC: WEB / MOBILE / DESIGN ----
        // Phân loại bài theo lĩnh vực người dùng quan tâm
        var fieldTags = [];

        // Web development
        var webRe = /\b(web|frontend|front.?end|backend|back.?end|fullstack|full.?stack|react|vue|angular|svelte|next\.?js|nuxt|remix|astro|html|css|tailwind|sass|javascript|typescript|node\.?js|express|nestjs|asp\.?net|blazor|api|rest|graphql|websocket|pwa|spa|ssr|ssg|responsive|browser|dom|webpack|vite|vercel|netlify)\b/i;
        if (webRe.test(text)) fieldTags.push('🌐 Web Dev');

        // Mobile development
        var mobileRe = /\b(mobile|android|ios|swift|kotlin|flutter|react.?native|expo|ionic|capacitor|maui|xamarin|app.?store|play.?store|cross.?platform|native.?app|swiftui|jetpack.?compose|mobile.?app|tablet|smartphone)\b/i;
        if (mobileRe.test(text)) fieldTags.push('📱 Mobile');

        // Design / UI / UX
        var designRe = /\b(design|figma|sketch|adobe|photoshop|illustrator|canva|ui\/ux|ui.?ux|user.?interface|user.?experience|prototype|wireframe|mockup|layout|typography|color.?palette|design.?system|component.?library|icon|illustration|animation|motion|framer|principle|zeplin|invision|dribbble|behance)\b/i;
        if (designRe.test(text)) fieldTags.push('🎨 Design');

        if (fieldTags.length > 0) {
            lines.push('🏷️ Lĩnh vực: ' + fieldTags.join(' · '));
        }

        var matchedUC = [];
        useCases.forEach(function (uc) {
            if (uc.re.test(text)) matchedUC.push(uc.label);
        });
        if (matchedUC.length > 0) {
            lines.push('💡 Ứng dụng: ' + matchedUC.slice(0, 3).join(', '));
        }

        // ---- Repo GitHub: thêm thông tin cho repo ----
        if (article.source === 'github') {
            var repoTypes = [
                { re: /awesome|curated|list|collection/i, label: 'Danh sách tổng hợp (Awesome list)' },
                { re: /\bcli\b|command.?line|terminal/i, label: 'CLI tool' },
                { re: /framework|library|sdk|toolkit/i, label: 'Framework / Thư viện' },
                { re: /api|server|backend|endpoint/i, label: 'API / Backend service' },
                { re: /ui|frontend|web.?app|demo|interface/i, label: 'UI / Web app' },
                { re: /extension|plugin|addon|vscode/i, label: 'Extension / Plugin' },
                { re: /model|weights|checkpoint|trained/i, label: 'Pre-trained model' },
                { re: /dataset|corpus|benchmark/i, label: 'Dataset / Benchmark' },
                { re: /docker|container|compose/i, label: 'Docker-ready' },
                { re: /template|boilerplate|starter/i, label: 'Template / Starter' }
            ];
            repoTypes.forEach(function (rt) {
                if (rt.re.test(text)) lines.push('📦 Loại repo: ' + rt.label);
            });
        }

        // ---- MỨC ĐỘ QUAN TÂM ----
        var likes = article.likes || 0;
        if (likes >= 10000) lines.push('🔥 Cực hot — ' + formatNumber(likes) + ' lượt quan tâm');
        else if (likes >= 1000) lines.push('⭐ Rất nổi bật — ' + formatNumber(likes) + ' lượt quan tâm');
        else if (likes >= 100) lines.push('📊 Được chú ý — ' + formatNumber(likes) + ' lượt quan tâm');

        // Nếu không match gì → phân tích chung
        if (lines.length === 0) {
            lines.push('📋 Tin tức / Thảo luận về AI');
        }

        return lines;
    }

    /*
        getDevRelevance(article) — Đánh giá bài viết liên quan đến lĩnh vực nào của dev
        Trả về mảng nhãn: "Web Dev", "Mobile", "Design", "Dev chung"
        → Hiện nhãn màu trên card giúp lọc nhanh bài nào đáng đọc
    */
    function getDevRelevance(article) {
        var text = ((article.title || '') + ' ' + (article.desc || '') + ' ' + (article.tags || []).join(' ')).toLowerCase();
        var badges = [];

        // Web development — liên quan trực tiếp đến web dev
        var webRe = /\b(web|frontend|front.?end|backend|back.?end|fullstack|react|vue|angular|svelte|next\.?js|nuxt|html|css|tailwind|javascript|typescript|node\.?js|express|nestjs|asp\.?net|blazor|api|rest|graphql|pwa|spa|ssr|responsive|vite|vercel|netlify)\b/i;
        if (webRe.test(text)) badges.push({ label: '🌐 Liên quan Web Dev', cls: 'badge-web' });

        // Mobile development
        var mobileRe = /\b(mobile|android|ios|swift|kotlin|flutter|react.?native|expo|ionic|maui|xamarin|cross.?platform|swiftui|jetpack.?compose|mobile.?app)\b/i;
        if (mobileRe.test(text)) badges.push({ label: '📱 Liên quan Mobile', cls: 'badge-mobile' });

        // Design / UI / UX / Figma
        var designRe = /\b(design|figma|sketch|adobe|ui\/ux|ui.?ux|user.?interface|user.?experience|prototype|wireframe|mockup|design.?system|component|icon|illustration|animation|framer|dribbble|behance|canva|photoshop)\b/i;
        if (designRe.test(text)) badges.push({ label: '🎨 Liên quan Design', cls: 'badge-design' });

        // Dev chung — tool / framework / code
        if (badges.length === 0) {
            var devGeneral = /\b(api|sdk|framework|library|code|coding|programming|developer|tutorial|how.?to|build|implement|deploy|integrate|open.?source|github|npm|pip|docker|cli|vscode|cursor|copilot|langchain|llamaindex|pytorch|tensorflow|ollama|fine.?tun|rag|embedding|prompt.?engineer)\b/i;
            if (devGeneral.test(text)) badges.push({ label: '⚡ Hữu ích cho dev', cls: 'badge-dev' });
        }

        return badges;
    }


    // ===== HÀM TIỆN ÍCH =====

    // Xóa HTML tags khỏi string (dùng cho mô tả Reddit)
    function stripHtml(html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // Cắt string dài thành tối đa N ký tự + "..."
    function truncate(str, max) {
        if (!str) return '';
        return str.length > max ? str.substring(0, max) + '...' : str;
    }

    // Escape HTML để chống XSS (Cross-Site Scripting)
    function esc(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str || ''));
        return div.innerHTML;
    }

    // Format số lớn: 1500 → "1.5K", 1200000 → "1.2M"
    function formatNumber(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toString();
    }

    // Tính khoảng cách thời gian: "5 phút trước", "2 giờ trước", "3 ngày trước"
    function timeAgo(dateStr) {
        if (!dateStr) return '';
        var now = Date.now();
        var then = new Date(dateStr).getTime();
        var diff = Math.floor((now - then) / 1000); // Đổi ra giây

        if (diff < 60) return 'Vừa xong';
        if (diff < 3600) return Math.floor(diff / 60) + ' phút trước';
        if (diff < 86400) return Math.floor(diff / 3600) + ' giờ trước';
        if (diff < 604800) return Math.floor(diff / 86400) + ' ngày trước';
        return new Date(dateStr).toLocaleDateString('vi-VN');
    }

    // Map tên nguồn → label hiển thị
    function sourceLabel(source) {
        var map = {
            devto: 'Dev.to',
            hackernews: 'Hacker News',
            github: 'GitHub',
            reddit: 'Reddit',
            producthunt: 'Product Hunt'
        };
        return map[source] || source;
    }


    // ===== 7. RENDER — Tạo HTML card =====
    /*
        renderArticles() — Lọc, sắp xếp, và render tất cả bài viết ra #newsGrid.
        Mỗi card gồm: badge nguồn, thời gian, tiêu đề, mô tả, phân tích AI,
        nhãn "hữu ích cho dev", tags, likes/comments, tác giả.
    */
    function renderArticles() {
        // Bước 1: Lọc theo nguồn
        var filtered = allArticles;
        if (currentFilter !== 'all') {
            filtered = allArticles.filter(function (a) { return a.source === currentFilter; });
        }

        // Bước 2: Lọc theo lĩnh vực (Web / Mobile / Design)
        if (currentField !== 'all') {
            var fieldRegex = {
                web: /\b(web|frontend|front.?end|backend|back.?end|fullstack|react|vue|angular|svelte|next\.?js|nuxt|html|css|tailwind|javascript|typescript|node\.?js|express|nestjs|asp\.?net|blazor|api|rest|graphql|pwa|spa|ssr|responsive|vite|vercel|netlify)\b/i,
                mobile: /\b(mobile|android|ios|swift|kotlin|flutter|react.?native|expo|ionic|maui|xamarin|cross.?platform|swiftui|jetpack.?compose|mobile.?app)\b/i,
                design: /\b(design|figma|sketch|adobe|ui\/ux|ui.?ux|user.?interface|user.?experience|prototype|wireframe|mockup|design.?system|component|icon|illustration|animation|framer|dribbble|behance|canva|photoshop)\b/i
            };
            var re = fieldRegex[currentField];
            if (re) {
                filtered = filtered.filter(function (a) {
                    var t = ((a.title || '') + ' ' + (a.desc || '') + ' ' + (a.tags || []).join(' ')).toLowerCase();
                    return re.test(t);
                });
            }
        }

        // Bước 3: Lọc theo từ khóa tìm kiếm
        if (searchQuery) {
            filtered = filtered.filter(function (a) {
                var haystack = ((a.title || '') + ' ' + (a.desc || '') + ' ' + (a.tags || []).join(' ') + ' ' + (a.author || '')).toLowerCase();
                return haystack.indexOf(searchQuery) !== -1;
            });
        }

        // Bước 4: Sắp xếp
        filtered.sort(function (a, b) {
            if (currentSort === 'popular') return (b.likes || 0) - (a.likes || 0);
            // newest: sắp theo ngày mới nhất
            return new Date(b.date || 0) - new Date(a.date || 0);
        });

        // Bước 5: Render
        if (filtered.length === 0) {
            $grid.innerHTML = '';
            $empty.style.display = 'block';
            return;
        }
        $empty.style.display = 'none';

        var html = '';
        filtered.forEach(function (article) {
            // Phân tích AI tiếng Việt
            var analysis = analyzeAI(article);
            var analysisHtml = '';
            if (analysis.length > 0) {
                analysisHtml = '<div class="card-analysis">';
                analysis.forEach(function (line) {
                    analysisHtml += '<div class="analysis-line">' + esc(line) + '</div>';
                });
                analysisHtml += '</div>';
            }

            // Nhãn liên quan lĩnh vực: Web Dev / Mobile / Design / Dev chung
            var badges = getDevRelevance(article);
            var badgesHtml = '';
            if (badges.length > 0) {
                badges.forEach(function (b) {
                    badgesHtml += '<div class="card-dev-useful ' + b.cls + '">' + esc(b.label) + '</div>';
                });
            }

            // Tags HTML
            var tagsHtml = '';
            if (article.tags && article.tags.length > 0) {
                tagsHtml = '<div class="card-tags">';
                article.tags.slice(0, 4).forEach(function (tag) {
                    tagsHtml += '<span class="card-tag">' + esc(tag) + '</span>';
                });
                tagsHtml += '</div>';
            }

            // Icon likes theo nguồn
            var likeIcon = article.source === 'github' ? '⭐' : '👍';
            var commentIcon = article.source === 'github' ? '🔀' : '💬';
            var commentLabel = article.source === 'github' ? 'issues' : 'comments';

            html += '<article class="news-card" data-source="' + esc(article.source) + '" onclick="window.open(\'' + esc(article.url) + '\', \'_blank\')">'
                + '<div class="card-header">'
                + '<span class="card-source ' + esc(article.source) + '">' + esc(sourceLabel(article.source)) + '</span>'
                + '<span class="card-time">' + esc(timeAgo(article.date)) + '</span>'
                + '</div>'
                + '<h3 class="card-title">' + esc(article.title) + '</h3>'
                + '<p class="card-desc">' + esc(article.desc) + '</p>'
                + analysisHtml
                + badgesHtml
                + tagsHtml
                + '<div class="card-footer">'
                + '<span>' + likeIcon + ' ' + formatNumber(article.likes) + '</span>'
                + '<span>' + commentIcon + ' ' + formatNumber(article.comments) + '</span>'
                + (article.author ? '<span class="card-author">@' + esc(article.author) + '</span>' : '')
                + '</div>'
                + '</article>';
        });

        $grid.innerHTML = html;
    }


    // ===== 8. FETCH ALL & TIMER =====

    /*
        fetchAllNews() — Gọi tất cả 5 nguồn song song (Promise.all),
        gộp kết quả, cập nhật thống kê, render.
    */
    function fetchAllNews() {
        $loading.style.display = 'block';
        $grid.innerHTML = '';

        return Promise.all([
            fetchDevToAI(),
            fetchHackerNewsAI(),
            fetchGitHubAI(),
            fetchRedditAI(),
            fetchProductHunt()
        ]).then(function (results) {
            // Gộp tất cả mảng con thành 1 mảng lớn
            allArticles = [];
            results.forEach(function (arr) { allArticles = allArticles.concat(arr); });

            // Cập nhật thống kê trên hero
            $totalArticles.textContent = allArticles.length;
            var now = new Date();
            $lastUpdate.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

            // Ẩn loading, render bài
            $loading.style.display = 'none';
            renderArticles();

            // Bắt đầu đếm ngược đến lần refresh tiếp theo
            startTimer();

            console.log('[AI Hub] Đã tải ' + allArticles.length + ' bài từ 5 nguồn.');
        }).catch(function (err) {
            console.error('[AI Hub] Lỗi:', err);
            $loading.style.display = 'none';
        });
    }

    /*
        startTimer() — Đồng hồ đếm ngược 5 phút, tự động fetch khi hết giờ.
    */
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        var remaining = REFRESH_INTERVAL / 1000; // Đổi ra giây (300s = 5 phút)

        timerInterval = setInterval(function () {
            remaining--;
            if (remaining <= 0) {
                clearInterval(timerInterval);
                fetchAllNews(); // Fetch lại khi hết giờ
                return;
            }
            var min = Math.floor(remaining / 60);
            var sec = remaining % 60;
            $refreshTimer.textContent = 'Cập nhật sau ' + min + ':' + (sec < 10 ? '0' : '') + sec;
        }, 1000);
    }


    // ===== 9. KHỞI CHẠY =====
    // Fetch ngay khi trang load
    fetchAllNews();

})();

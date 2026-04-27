// ===== QUIZ ENGINE — Expanded Question Bank =====
// Mỗi chủ đề 20-25 câu, mỗi lần thi random 10 câu

const quizBank = {
    clr: {
        name: "CLR & Memory Management",
        questions: [
            {
                q: "Trong .NET, biến kiểu `int x = 42;` được lưu ở đâu trong memory?",
                options: ["Heap", "Stack", "Large Object Heap", "Static Memory"],
                answer: 1,
                explain: "int là value type. Khi khai báo local variable, value type được lưu trên Stack. Chỉ khi boxing (object obj = 42) hoặc là field của class thì mới lên Heap."
            },
            {
                q: "Garbage Collector trong .NET chia heap thành mấy generation?",
                options: ["2 (Gen 0, Gen 1)", "3 (Gen 0, Gen 1, Gen 2)", "4 (Gen 0, Gen 1, Gen 2, Gen 3)", "1 (chỉ có 1 generation)"],
                answer: 1,
                explain: "GC chia thành 3 generation: Gen 0 (short-lived objects, GC thường xuyên), Gen 1 (buffer), Gen 2 (long-lived objects, GC hiếm khi). Ngoài ra còn Large Object Heap (LOH) cho objects > 85KB."
            },
            {
                q: "Đoạn code sau có vấn đề gì?",
                code: "public void ReadFile()\n{\n    var stream = new FileStream(\"data.txt\", FileMode.Open);\n    var content = new StreamReader(stream).ReadToEnd();\n    return content;\n}",
                options: [
                    "Không có vấn đề gì",
                    "Memory leak vì không dispose FileStream và StreamReader",
                    "FileStream không thể mở file",
                    "StreamReader không đọc được UTF-8"
                ],
                answer: 1,
                explain: "FileStream và StreamReader là unmanaged resources, GC không tự giải phóng được. Phải dùng 'using' statement hoặc gọi Dispose() thủ công. Nếu không, file handle bị lock và memory bị leak."
            },
            {
                q: "Boxing xảy ra khi nào?",
                options: [
                    "Khi cast reference type sang value type",
                    "Khi cast value type sang reference type (ví dụ: object obj = 42)",
                    "Khi gọi ToString() trên string",
                    "Khi tạo mới một class instance"
                ],
                answer: 1,
                explain: "Boxing là quá trình wrap value type vào object (reference type) trên heap. Ví dụ: object obj = 42; → int 42 được copy lên heap và wrap trong object. Boxing gây allocation, ảnh hưởng performance nếu xảy ra nhiều."
            },
            {
                q: "Large Object Heap (LOH) chứa objects có kích thước tối thiểu bao nhiêu?",
                options: ["10KB", "50KB", "85KB", "100KB"],
                answer: 2,
                explain: "Objects >= 85,000 bytes (khoảng 85KB) được allocate trên LOH. LOH KHÔNG được compact mặc định (từ .NET 4.5.1 có thể bật), nên có thể gây fragmentation."
            },
            {
                q: "Sự khác nhau chính giữa struct và class trong C# là gì?",
                options: [
                    "struct có thể kế thừa, class thì không",
                    "struct là value type (stack), class là reference type (heap)",
                    "struct nhanh hơn class trong mọi trường hợp",
                    "class không có constructor, struct thì có"
                ],
                answer: 1,
                explain: "struct là value type → lưu trên stack (khi là local variable), copy by value. class là reference type → lưu trên heap, copy by reference. Dùng struct khi data nhỏ, immutable, ngắn hạn."
            },
            {
                q: "JIT Compilation trong .NET hoạt động thế nào?",
                options: [
                    "Compile toàn bộ source code trước khi chạy",
                    "Compile IL code thành native code tại runtime, khi method được gọi lần đầu",
                    "Interpret code từng dòng giống Python",
                    "Chỉ compile trong Debug mode"
                ],
                answer: 1,
                explain: "JIT (Just-In-Time) compiler chuyển IL thành native code khi method được gọi LẦN ĐẦU. Kết quả được cache. .NET có Tiered Compilation: tier 0 (nhanh, chưa optimize) → tier 1 (optimize sau)."
            },
            {
                q: "Khi nào Finalizer (~ClassName) được gọi?",
                options: [
                    "Ngay khi object ra khỏi scope",
                    "Khi gọi Dispose()",
                    "Không xác định — GC quyết định, có thể rất muộn hoặc không bao giờ",
                    "Khi application shutdown"
                ],
                answer: 2,
                explain: "Finalizer được GC gọi trên finalizer thread, thời điểm KHÔNG xác định. Object có finalizer sống lâu hơn ít nhất 1 GC cycle. Nên dùng IDisposable + using thay vì finalizer."
            },
            {
                q: "Span<T> giải quyết vấn đề gì?",
                options: [
                    "Thay thế List<T> hoàn toàn",
                    "Cho phép làm việc với memory slice mà KHÔNG tạo allocation mới",
                    "Tạo thread-safe collection",
                    "Tự động dispose memory"
                ],
                answer: 1,
                explain: "Span<T> là stack-only type cho phép truy cập memory liên tục mà KHÔNG cần copy hay allocate. Rất hữu ích cho string parsing, buffer processing."
            },
            {
                q: "GC.SuppressFinalize(this) thường được gọi ở đâu và tại sao?",
                options: [
                    "Trong constructor — để tăng performance",
                    "Trong Dispose() — vì đã cleanup rồi, không cần finalizer nữa",
                    "Trong destructor — để ngăn GC chạy lại",
                    "Không bao giờ nên gọi method này"
                ],
                answer: 1,
                explain: "Gọi GC.SuppressFinalize(this) trong Dispose() để báo GC không cần chạy finalizer. Object được thu hồi ngay ở Gen 0 thay vì chờ finalizer thread."
            },
            {
                q: "WeakReference<T> dùng trong trường hợp nào?",
                options: [
                    "Thay thế strong reference để tránh null",
                    "Cho phép GC thu hồi object ngay cả khi vẫn có reference — phù hợp cho caching",
                    "Tạo circular reference an toàn",
                    "Tăng tốc garbage collection"
                ],
                answer: 1,
                explain: "WeakReference không ngăn GC thu hồi object. Dùng cho cache: nếu memory dư → object còn, nếu memory thiếu → GC thu hồi. Kiểm tra TryGetTarget() trước khi dùng."
            },
            {
                q: "ArrayPool<T>.Shared dùng để làm gì?",
                options: [
                    "Tạo array readonly",
                    "Thuê và trả lại arrays để tái sử dụng — tránh allocation/GC cho arrays thường xuyên tạo-hủy",
                    "Chia array cho nhiều threads",
                    "Compress array data"
                ],
                answer: 1,
                explain: "ArrayPool<T>.Shared.Rent(size) → lấy array. Return(array) → trả lại pool. Tránh allocate/GC liên tục cho buffer operations (đọc file, network). Array thuê có thể lớn hơn size yêu cầu."
            },
            {
                q: "Trong .NET, string là value type hay reference type?",
                options: [
                    "Value type vì nó immutable",
                    "Reference type nhưng behave như value type (immutable, interned)",
                    "Primitive type đặc biệt",
                    "Tùy thuộc vào cách khai báo"
                ],
                answer: 1,
                explain: "string là reference type (class), lưu trên heap. Nhưng immutable: mọi 'modification' tạo string MỚI. String interning: cùng literal string → cùng instance. StringBuilder để tránh tạo nhiều string objects."
            },
            {
                q: "Pinned Object Heap (POH) trong .NET 5+ dùng để làm gì?",
                options: [
                    "Lưu objects cố định không bao giờ GC",
                    "Chứa pinned objects (GCHandle.Alloc) riêng biệt để không ảnh hưởng GC compaction trên SOH",
                    "Lưu static variables",
                    "Cache hot objects"
                ],
                answer: 1,
                explain: "Pinned objects (dùng trong interop, unsafe code) không di chuyển được khi GC compact. Trước .NET 5, pin trên SOH gây fragmentation. POH tách riêng pinned objects → SOH compact tốt hơn."
            },
            {
                q: "record type trong C# khác class thế nào?",
                options: [
                    "record là value type",
                    "record là reference type với built-in value equality, immutability by default, và with-expression support",
                    "record nhanh hơn class",
                    "record không có constructor"
                ],
                answer: 1,
                explain: "record (C# 9+): reference type nhưng equality so sánh theo VALUE (không phải reference). Init-only properties by default. with expression tạo copy có modify. record struct (C# 10) = value type version."
            },
            {
                q: "Đoạn code nào gây Boxing?",
                code: "int x = 10;\nstring s1 = x.ToString();      // Line A\nobject obj = x;                 // Line B\nIComparable c = x;              // Line C\nint y = x + 5;                  // Line D",
                options: [
                    "Chỉ Line A",
                    "Line B và Line C (cast value type sang reference type/interface)",
                    "Tất cả các line",
                    "Không line nào"
                ],
                answer: 1,
                explain: "Line B: int → object = Boxing. Line C: int → IComparable (interface là reference type) = Boxing. Line A: ToString() trên int là virtual method override, KHÔNG boxing (.NET optimize). Line D: arithmetic, không boxing."
            },
            {
                q: "GC Workstation mode vs Server mode khác nhau thế nào?",
                options: [
                    "Không khác biệt",
                    "Workstation: 1 GC heap, ít tốn CPU. Server: 1 GC heap per logical processor, optimize throughput cho server workloads.",
                    "Server mode không có GC",
                    "Workstation chỉ cho Windows"
                ],
                answer: 1,
                explain: "Workstation GC: 1 managed heap, GC chạy trên thread trigger nó → ít tốn resource, cho desktop apps. Server GC: 1 heap per core, GC parallel → throughput cao hơn cho multi-request server. ASP.NET Core mặc định dùng Server GC."
            },
            {
                q: "IDisposable pattern chuẩn cần implement những gì?",
                options: [
                    "Chỉ cần method Dispose()",
                    "Dispose(), Dispose(bool disposing), optional finalizer, GC.SuppressFinalize",
                    "Chỉ cần finalizer",
                    "using statement tự implement"
                ],
                answer: 1,
                explain: "Pattern chuẩn: public Dispose() gọi Dispose(true) + GC.SuppressFinalize(this). Protected virtual Dispose(bool disposing) xử lý: if(disposing) → dispose managed resources. Luôn dispose unmanaged resources. Optional ~Finalizer() gọi Dispose(false) như safety net."
            },
            {
                q: "Frozen collections trong .NET 8 giúp gì?",
                options: [
                    "Collections không thể tạo mới",
                    "Optimized read-only collections — tối ưu cho lookup cực nhanh khi data không thay đổi",
                    "Thread-safe collections",
                    "Collections tự serialize"
                ],
                answer: 1,
                explain: "FrozenDictionary/FrozenSet (.NET 8): tốn thời gian tạo (analyze data pattern, optimize hash) nhưng lookup cực nhanh. Dùng cho: config, lookup tables, static data. Trade-off: slow creation vs fast read."
            },
            {
                q: "Memory<T> khác Span<T> thế nào?",
                options: [
                    "Giống nhau hoàn toàn",
                    "Span<T> chỉ sống trên stack (không thể là field của class). Memory<T> có thể lưu trên heap, dùng trong async code.",
                    "Memory<T> nhanh hơn",
                    "Span<T> cho managed memory, Memory<T> cho unmanaged"
                ],
                answer: 1,
                explain: "Span<T> = ref struct → chỉ stack, không thể là class field, không dùng trong async/lambda. Memory<T> = struct thường → lưu trên heap được, dùng trong async. Memory<T>.Span trả về Span<T> khi cần thao tác."
            }
        ]
    },
    async: {
        name: "Async/Await & Threading",
        questions: [
            {
                q: "async/await trong C# có tạo thread mới không?",
                options: [
                    "Có, mỗi await tạo một thread mới",
                    "KHÔNG — await giải phóng thread hiện tại và tiếp tục trên thread pool khi I/O hoàn tất",
                    "Chỉ tạo thread mới khi dùng Task.Run",
                    "Tùy thuộc vào SynchronizationContext"
                ],
                answer: 1,
                explain: "async/await KHÔNG tạo thread mới. Khi await I/O, thread hiện tại được GIẢI PHÓNG trả lại thread pool. Khi I/O hoàn tất, continuation chạy trên một thread pool thread."
            },
            {
                q: "Đoạn code sau có vấn đề gì?",
                code: "public string GetData()\n{\n    var result = GetDataAsync().Result;\n    return result;\n}",
                options: [
                    "Không có vấn đề gì",
                    "Có thể gây DEADLOCK khi chạy trên ASP.NET (pre-.NET Core)",
                    "Sẽ throw NullReferenceException",
                    "Compile error"
                ],
                answer: 1,
                explain: ".Result block thread hiện tại. Trong ASP.NET (pre-Core), SynchronizationContext yêu cầu continuation chạy trên cùng thread → DEADLOCK! Giải pháp: async all the way."
            },
            {
                q: "CancellationToken dùng để làm gì?",
                options: [
                    "Tự động kill thread khi timeout",
                    "Cơ chế cooperative cancellation — cho phép hủy operation một cách an toàn",
                    "Ngăn chặn race condition",
                    "Encrypt data trong async operation"
                ],
                answer: 1,
                explain: "CancellationToken là cooperative — code phải TỰ KIỂM TRA token và quyết định dừng. Nó KHÔNG tự kill thread. Khi user disconnect, ASP.NET Core trigger CancellationToken."
            },
            {
                q: "Khi nào nên dùng Task.Run()?",
                options: [
                    "Luôn dùng để wrap async operations",
                    "Chỉ cho CPU-bound work, KHÔNG dùng cho I/O-bound work",
                    "Khi muốn chạy code trên main thread",
                    "Để thay thế async/await"
                ],
                answer: 1,
                explain: "Task.Run() đẩy work lên thread pool → cho CPU-bound work. KHÔNG dùng cho I/O (DB, HTTP) vì async I/O API đã có sẵn, Task.Run chỉ lãng phí thêm 1 thread."
            },
            {
                q: "ValueTask<T> khác Task<T> như thế nào?",
                options: [
                    "ValueTask nhanh hơn trong mọi trường hợp",
                    "ValueTask tránh heap allocation khi kết quả đã sẵn sàng (synchronous completion)",
                    "ValueTask thread-safe hơn Task",
                    "Không có sự khác biệt"
                ],
                answer: 1,
                explain: "Task<T> luôn allocate trên heap. ValueTask<T> là struct — khi result đã có sẵn (cache hit), KHÔNG allocate. Lưu ý: ValueTask KHÔNG được await nhiều lần."
            },
            {
                q: "ConfigureAwait(false) làm gì?",
                options: [
                    "Disable async cho method đó",
                    "Bỏ qua việc capture SynchronizationContext, continuation chạy trên bất kỳ thread pool thread nào",
                    "Force continuation chạy trên main thread",
                    "Tăng timeout cho await"
                ],
                answer: 1,
                explain: "ConfigureAwait(false) bỏ qua SynchronizationContext → continuation chạy trên thread pool bất kỳ. Dùng trong LIBRARY code để tránh deadlock. KHÔNG dùng trong Controller nếu cần HttpContext."
            },
            {
                q: "Task.WhenAll() và Task.WhenAny() khác nhau thế nào?",
                options: [
                    "WhenAll chạy tuần tự, WhenAny chạy song song",
                    "WhenAll chờ TẤT CẢ tasks hoàn tất, WhenAny chờ BẤT KỲ task nào hoàn tất đầu tiên",
                    "WhenAll trả về kết quả, WhenAny không",
                    "Không có sự khác biệt"
                ],
                answer: 1,
                explain: "WhenAll → chờ TẤT CẢ, cho parallel I/O. WhenAny → BẤT KỲ task nào xong, cho timeout pattern hoặc 'first response wins'."
            },
            {
                q: "SemaphoreSlim trong async code dùng để làm gì?",
                options: [
                    "Thay thế lock keyword cho async code",
                    "Tạo thread mới",
                    "Giảm số lượng tasks chạy đồng thời",
                    "Cả A và C đều đúng"
                ],
                answer: 3,
                explain: "SemaphoreSlim hỗ trợ WaitAsync() nên dùng được trong async context (lock KHÔNG dùng được với await). Vừa là async mutex (SemaphoreSlim(1,1)) vừa throttle concurrent operations."
            },
            {
                q: "IAsyncEnumerable<T> giải quyết bài toán gì?",
                options: [
                    "Thay thế IEnumerable<T> hoàn toàn",
                    "Cho phép yield return async — stream data từng phần thay vì load hết vào memory",
                    "Tạo parallel collection",
                    "Auto-dispose sau khi enumerate xong"
                ],
                answer: 1,
                explain: "IAsyncEnumerable<T> cho phép 'await foreach' — lấy data từng item async. Hữu ích cho DB query lớn, gRPC streaming, đọc file line by line."
            },
            {
                q: "Parallel.ForEachAsync khác Task.WhenAll(items.Select(...)) thế nào?",
                options: [
                    "Không khác nhau",
                    "Parallel.ForEachAsync giới hạn degree of parallelism, Task.WhenAll fire tất cả cùng lúc",
                    "Task.WhenAll nhanh hơn",
                    "Parallel.ForEachAsync chỉ cho CPU-bound work"
                ],
                answer: 1,
                explain: "Parallel.ForEachAsync có MaxDegreeOfParallelism mặc định = ProcessorCount. Task.WhenAll fire TẤT CẢ cùng lúc — 10,000 items = 10,000 concurrent calls → overload."
            },
            {
                q: "Channel<T> trong .NET dùng cho pattern nào?",
                options: [
                    "Observer pattern",
                    "Producer-Consumer pattern — thread-safe async queue giữa producer và consumer",
                    "Decorator pattern",
                    "Singleton pattern"
                ],
                answer: 1,
                explain: "Channel<T> là high-performance async producer-consumer queue. Channel.CreateBounded(100) giới hạn capacity → backpressure. Writer.WriteAsync() và Reader.ReadAllAsync(). Tốt hơn ConcurrentQueue cho async scenarios."
            },
            {
                q: "async void khác async Task thế nào? Tại sao nên tránh async void?",
                options: [
                    "Không khác nhau",
                    "async void: exception không thể catch, không thể await. Chỉ dùng cho event handlers.",
                    "async void nhanh hơn",
                    "async Task không thể dùng trong controller"
                ],
                answer: 1,
                explain: "async void: (1) Exception crash app (không catch được). (2) Không await được → caller không biết khi nào xong. (3) Không compose được (WhenAll). CHỈ dùng cho UI event handlers (button_Click). Mọi nơi khác → async Task."
            },
            {
                q: "TaskCompletionSource<T> dùng khi nào?",
                options: [
                    "Thay thế async/await",
                    "Tạo Task thủ công từ callback-based API hoặc custom async logic — bridge giữa callback và Task world",
                    "Auto-complete tasks",
                    "Dispose tasks"
                ],
                answer: 1,
                explain: "TaskCompletionSource<T>: tạo Task mà bạn tự quyết định khi nào SetResult/SetException/SetCanceled. Dùng để wrap callback-based legacy API thành async/await, hoặc tạo custom async synchronization."
            },
            {
                q: "Thread.Sleep(1000) và await Task.Delay(1000) khác nhau thế nào?",
                options: [
                    "Giống nhau — cả 2 đều chờ 1 giây",
                    "Thread.Sleep BLOCK thread (lãng phí resource). Task.Delay GIẢI PHÓNG thread trong khi chờ.",
                    "Task.Delay chính xác hơn",
                    "Thread.Sleep chỉ cho main thread"
                ],
                answer: 1,
                explain: "Thread.Sleep(1000): thread bị BLOCK, nằm đó chờ 1s, không làm gì → lãng phí thread pool thread. await Task.Delay(1000): thread được trả lại pool, timer callback resume sau 1s. LUÔN dùng Task.Delay trong async code."
            },
            {
                q: "Đoạn code này có vấn đề gì?",
                code: "public async Task ProcessAsync(List<int> ids)\n{\n    foreach (var id in ids)\n    {\n        await SendEmailAsync(id);\n    }\n}",
                options: [
                    "Không có vấn đề",
                    "Chạy TUẦN TỰ — mỗi email chờ cái trước xong mới gửi. Nên dùng Task.WhenAll cho parallel.",
                    "Compile error",
                    "Memory leak"
                ],
                answer: 1,
                explain: "await trong foreach = sequential: email 1 xong → email 2 → ... N emails = N × time. Fix: var tasks = ids.Select(id => SendEmailAsync(id)); await Task.WhenAll(tasks); → tất cả chạy song song."
            },
            {
                q: "ExecutionContext và SynchronizationContext khác nhau thế nào?",
                options: [
                    "Giống nhau",
                    "ExecutionContext mang theo security/culture info qua threads. SynchronizationContext quyết định THREAD nào chạy continuation.",
                    "ExecutionContext cho async, SynchronizationContext cho sync",
                    "SynchronizationContext mới hơn"
                ],
                answer: 1,
                explain: "ExecutionContext: tự động flow qua await, chứa security identity, culture. SynchronizationContext: quyết định where continuation runs. ASP.NET Core KHÔNG có SyncContext (continuation chạy trên thread pool bất kỳ) → giảm deadlock risk."
            },
            {
                q: "lock(obj) { await ... } có compile được không?",
                options: [
                    "Có, hoạt động bình thường",
                    "KHÔNG compile — C# compiler cấm await bên trong lock. Dùng SemaphoreSlim.WaitAsync() thay thế.",
                    "Compile nhưng runtime error",
                    "Chỉ cho .NET 8+"
                ],
                answer: 1,
                explain: "C# compiler ERROR: cannot await in body of lock statement. Lý do: lock = Monitor.Enter/Exit phải cùng thread, nhưng await có thể resume trên thread khác. Fix: SemaphoreSlim(1,1) với WaitAsync()/Release()."
            },
            {
                q: "Nesting CancellationTokenSource (linked token) dùng khi nào?",
                options: [
                    "Khi cần 2 passwords",
                    "Khi muốn cancel khi BẤT KỲ điều kiện nào: ví dụ user cancel HOẶC timeout → CancellationTokenSource.CreateLinkedTokenSource(token1, token2)",
                    "Khi cần retry",
                    "Không nên dùng nested tokens"
                ],
                answer: 1,
                explain: "CreateLinkedTokenSource: tạo token cancel khi bất kỳ parent token nào cancel. Ví dụ: combine user cancellation + timeout. var linked = CancellationTokenSource.CreateLinkedTokenSource(userToken, timeoutToken);"
            },
            {
                q: "Task.FromResult(value) dùng khi nào?",
                options: [
                    "Để convert Task sang value",
                    "Trả về completed Task ngay lập tức — cho interface async method khi result đã có sẵn (cached, constant)",
                    "Lấy result từ running task",
                    "Create background task"
                ],
                answer: 1,
                explain: "Task.FromResult(42) tạo completed Task<int> KHÔNG async overhead. Dùng khi: implement interface async method nhưng logic synchronous, return cached value, unit test mocking."
            },
            {
                q: "PeriodicTimer trong .NET 6+ tốt hơn Timer/Task.Delay loop thế nào?",
                options: [
                    "Không tốt hơn",
                    "Async-native, không bị drift, dùng WaitForNextTickAsync() với CancellationToken — ideal cho background service",
                    "Nhanh hơn 10x",
                    "Chỉ cho UI apps"
                ],
                answer: 1,
                explain: "PeriodicTimer: while (await timer.WaitForNextTickAsync(ct)). Không callback hell như System.Timers.Timer. Không drift như while + Task.Delay. Cancel sạch sẽ qua CancellationToken. Perfect cho BackgroundService loops."
            }
        ]
    },
    solid: {
        name: "SOLID & Design Patterns",
        questions: [
            {
                q: "Một class UserService vừa xử lý business logic, vừa gửi email, vừa ghi log. Vi phạm nguyên tắc nào?",
                options: [
                    "Open/Closed Principle",
                    "Single Responsibility Principle",
                    "Liskov Substitution Principle",
                    "Interface Segregation Principle"
                ],
                answer: 1,
                explain: "SRP: Mỗi class chỉ có MỘT lý do để thay đổi. UserService có 3 lý do: business logic, email logic, logging logic. Nên tách thành UserService, IEmailService, ILogger."
            },
            {
                q: "Đoạn code dùng if/else chain để tính discount. Vi phạm nguyên tắc nào?",
                code: "public decimal GetDiscount(string type) {\n    if (type == \"Gold\") return 0.2m;\n    if (type == \"Silver\") return 0.1m;\n    return 0;\n}",
                options: [
                    "Single Responsibility Principle",
                    "Open/Closed Principle",
                    "Dependency Inversion Principle",
                    "Liskov Substitution Principle"
                ],
                answer: 1,
                explain: "OCP: Open for extension, Closed for modification. Thêm loại mới = SỬA code cũ. Fix: IDiscountStrategy interface, mỗi loại 1 class implement."
            },
            {
                q: "Liskov Substitution Principle (LSP) nói về điều gì?",
                options: [
                    "Mỗi class chỉ có 1 responsibility",
                    "Subclass phải thay thế được parent class mà KHÔNG break program behavior",
                    "Depend on abstractions",
                    "Interface nên nhỏ gọn"
                ],
                answer: 1,
                explain: "LSP: Nếu B kế thừa A, mọi nơi dùng A đều có thể thay bằng B mà chương trình vẫn đúng. Vi phạm kinh điển: Square extends Rectangle."
            },
            {
                q: "DIP khác Dependency Injection thế nào?",
                options: [
                    "Giống nhau hoàn toàn",
                    "DIP là NGUYÊN TẮC (depend on abstractions), DI là KỸ THUẬT thực hiện DIP",
                    "DIP là về database, DI là về code",
                    "DIP chỉ cho .NET"
                ],
                answer: 1,
                explain: "DIP là principle: High-level modules không phụ thuộc low-level, cả hai phụ thuộc abstractions. DI là technique: inject interface qua constructor."
            },
            {
                q: "Repository Pattern giải quyết vấn đề gì?",
                options: [
                    "Tăng tốc database queries",
                    "Abstraction cho data access — tách business logic khỏi chi tiết database",
                    "Cache data tự động",
                    "Validate input data"
                ],
                answer: 1,
                explain: "Repository tạo abstraction giữa business logic và data access. Service chỉ biết IOrderRepository, không biết đang dùng SQL hay MongoDB. Dễ test, dễ đổi database."
            },
            {
                q: "Strategy Pattern phù hợp cho tình huống nào?",
                options: [
                    "Tạo singleton object",
                    "Thay đổi algorithm/behavior tại runtime mà không sửa code client",
                    "Cache data",
                    "Validate input"
                ],
                answer: 1,
                explain: "Strategy: interface cho algorithm, mỗi implementation 1 strategy. Ví dụ: IPaymentStrategy → CreditCard, Momo, BankTransfer. Thêm payment = thêm class."
            },
            {
                q: "MediatR giúp gì trong ASP.NET Core?",
                options: [
                    "Thay thế Dependency Injection",
                    "Decouple request handler khỏi controller — controller chỉ gửi command/query",
                    "Tăng tốc API response",
                    "Tự động tạo API endpoints"
                ],
                answer: 1,
                explain: "MediatR: Controller gửi IRequest, MediatR tìm IRequestHandler xử lý. Controller gọn, dễ thêm cross-cutting concerns qua Pipeline Behaviors."
            },
            {
                q: "Interface Segregation Principle nói rằng:",
                options: [
                    "Mỗi interface chỉ nên có 1 method",
                    "Client không nên bị ép implement method mà nó không dùng — nên tách interface nhỏ",
                    "Interface phải kế thừa IDisposable",
                    "Mỗi class chỉ implement 1 interface"
                ],
                answer: 1,
                explain: "ISP: Thay vì 1 IWorker có Work(), Eat(), Sleep() → tách IWorkable, IFeedable, ISleepable. Robot implement IWorkable (không cần Eat)."
            },
            {
                q: "Decorator Pattern thường dùng ở đâu?",
                options: [
                    "Thêm behavior mới cho object MÀ KHÔNG sửa code gốc (caching, logging wrap quanh service)",
                    "Tạo factory cho objects",
                    "Quản lý database connection",
                    "Routing HTTP requests"
                ],
                answer: 0,
                explain: "Decorator wrap object gốc và thêm behavior. Ví dụ: IOrderService → CachingDecorator → LoggingDecorator → OrderService. Dùng Scrutor: services.Decorate<IService, CachingDecorator>()."
            },
            {
                q: "Thứ tự ưu tiên đúng của các nguyên tắc design?",
                options: [
                    "DRY > KISS > YAGNI",
                    "YAGNI > DRY > KISS",
                    "KISS > YAGNI > DRY",
                    "SOLID > DRY > KISS"
                ],
                answer: 2,
                explain: "KISS (đơn giản) > YAGNI (không làm thứ chưa cần) > DRY (tránh lặp). Nhiều dev DRY quá sớm → tạo abstraction phức tạp cho 2 chỗ giống nhau."
            },
            {
                q: "Factory Method Pattern khác Abstract Factory Pattern thế nào?",
                options: [
                    "Giống nhau",
                    "Factory Method tạo 1 loại product qua override method. Abstract Factory tạo FAMILY of related products qua interface.",
                    "Abstract Factory mới hơn",
                    "Factory Method cho simple objects"
                ],
                answer: 1,
                explain: "Factory Method: class có virtual CreateProduct() → subclass override để tạo product cụ thể. Abstract Factory: interface tạo family: CreateButton(), CreateTextbox() → WinFactory, MacFactory tạo cả family UI controls."
            },
            {
                q: "Observer Pattern trong .NET được implement bằng gì?",
                options: [
                    "Interface IObserver",
                    "Events và delegates — cơ chế event built-in của C# là Observer Pattern",
                    "Static methods",
                    "Reflection"
                ],
                answer: 1,
                explain: "C# events = Observer Pattern. Publisher raise event, Subscribers (handlers) nhận notification. event EventHandler<T> + delegate. Cũng có IObservable<T>/IObserver<T> cho reactive pattern."
            },
            {
                q: "Chain of Responsibility Pattern dùng khi nào?",
                options: [
                    "Khi cần 1 handler xử lý tất cả",
                    "Khi request đi qua chuỗi handlers, mỗi handler quyết định xử lý hoặc chuyển tiếp — ASP.NET Middleware chính là pattern này",
                    "Khi cần undo/redo",
                    "Khi tạo tree structure"
                ],
                answer: 1,
                explain: "Chain of Responsibility: request đi qua pipeline handlers. Middleware ASP.NET Core: Auth → CORS → Routing → Controller. Mỗi middleware quyết định: xử lý, modify, hoặc next(). MediatR Pipeline Behaviors cũng dùng pattern này."
            },
            {
                q: "Specification Pattern giải quyết vấn đề gì?",
                options: [
                    "Thay thế if/else",
                    "Encapsulate business rules thành reusable, composable objects — combine bằng AND, OR, NOT",
                    "Validate database schema",
                    "Generate documentation"
                ],
                answer: 1,
                explain: "Specification Pattern: mỗi rule là 1 class (ActiveUserSpec, PremiumUserSpec). Combine: activeSpec.And(premiumSpec). Dùng trong repository filter: repo.Find(spec). Tách business rules khỏi query logic."
            },
            {
                q: "Unit of Work Pattern kết hợp với Repository như thế nào?",
                options: [
                    "Thay thế Repository",
                    "UoW quản lý transaction across nhiều repositories — SaveChanges() commit tất cả changes cùng lúc",
                    "UoW chỉ cho read operations",
                    "Không liên quan"
                ],
                answer: 1,
                explain: "Unit of Work: track changes từ nhiều repositories, commit tất cả trong 1 transaction. DbContext trong EF Core chính là UoW: AddAsync (qua repo) → SaveChangesAsync (qua UoW) → 1 transaction. Đảm bảo consistency."
            },
            {
                q: "Builder Pattern phù hợp khi nào?",
                options: [
                    "Khi object chỉ có 1-2 properties",
                    "Khi tạo object phức tạp với nhiều optional parameters — fluent API: builder.WithX().WithY().Build()",
                    "Khi cần singleton",
                    "Khi cần destroy object"
                ],
                answer: 1,
                explain: "Builder: tách construction logic phức tạp. Ví dụ: HostBuilder.ConfigureServices().ConfigureLogging().Build(). Fluent API dễ đọc hơn constructor với 15 params. Immutable objects: builder tạo, object không đổi."
            },
            {
                q: "Adapter Pattern vs Facade Pattern khác nhau thế nào?",
                options: [
                    "Giống nhau",
                    "Adapter: convert interface A sang interface B (compatibility). Facade: đơn giản hóa API phức tạp thành interface đơn giản.",
                    "Facade mới hơn",
                    "Adapter cho databases"
                ],
                answer: 1,
                explain: "Adapter: có interface cũ, cần dùng với code mới → wrap lại cho compatible. Ví dụ: wrap legacy XML service thành modern IService. Facade: hệ thống phức tạp (nhiều classes) → tạo 1 simple interface che đi complexity."
            },
            {
                q: "Composition over Inheritance nghĩa là gì?",
                options: [
                    "Không bao giờ dùng inheritance",
                    "Ưu tiên HAS-A (chứa dependency) hơn IS-A (kế thừa) — linh hoạt hơn, dễ thay đổi hơn",
                    "Dùng nhiều interfaces",
                    "Tránh abstract class"
                ],
                answer: 1,
                explain: "Inheritance tạo tight coupling, khó thay đổi. Composition: inject dependencies, swap at runtime. Ví dụ: thay vì Bird extends Animal { Fly() }, dùng Bird có IFlyBehavior. Strategy Pattern chính là composition."
            },
            {
                q: "Tell, Don't Ask principle nói gì?",
                options: [
                    "Không hỏi user",
                    "Nói object LÀM gì thay vì HỎI state rồi tự quyết định — đẩy logic vào object thay vì nằm ngoài",
                    "Không dùng getter",
                    "Luôn return void"
                ],
                answer: 1,
                explain: "Sai: if (order.Status == 'paid') order.Ship(); → hỏi state rồi quyết định. Đúng: order.ProcessPaymentAndShip(); → object tự biết logic. Tránh anemic domain model (chỉ có get/set, logic nằm ở service)."
            },
            {
                q: "CQRS Pattern tách gì?",
                options: [
                    "Frontend và Backend",
                    "Command (write/mutation) và Query (read) thành separate models — có thể optimize riêng biệt",
                    "Database và Cache",
                    "Auth và Business logic"
                ],
                answer: 1,
                explain: "CQRS: Write model (Commands) optimize cho consistency, validation. Read model (Queries) optimize cho performance, denormalized. Có thể dùng khác DB (SQL for write, Elasticsearch for read). MediatR: ICommand → Handler, IQuery → Handler."
            }
        ]
    },
    sql: {
        name: "SQL & Database Internals",
        questions: [
            {
                q: "Clustered Index khác Non-Clustered Index thế nào?",
                options: [
                    "Clustered nhanh hơn trong mọi trường hợp",
                    "Clustered = thứ tự vật lý data (1 per table). Non-Clustered = con trỏ đến data row (nhiều cái).",
                    "Non-Clustered chỉ cho string columns",
                    "Không có sự khác biệt"
                ],
                answer: 1,
                explain: "Clustered Index quyết định thứ tự VẬT LÝ data → chỉ 1 per table (mặc định Primary Key). Non-Clustered tạo B-Tree riêng + con trỏ. Table có thể nhiều Non-Clustered."
            },
            {
                q: "Đoạn query sau có vấn đề gì?",
                code: "SELECT * FROM Orders WHERE YEAR(CreatedDate) = 2024;",
                options: [
                    "Không có vấn đề",
                    "Hàm YEAR() khiến query Non-Sargable → không dùng được index",
                    "YEAR() không tồn tại",
                    "Thiếu ORDER BY"
                ],
                answer: 1,
                explain: "Bọc column trong function → Full Table Scan. Fix: WHERE CreatedDate >= '2024-01-01' AND CreatedDate < '2025-01-01' → Index Seek. Đây gọi là Sargable query."
            },
            {
                q: "N+1 Query Problem là gì?",
                options: [
                    "Query trả về N+1 rows",
                    "1 query lấy N items, rồi N query riêng lẻ lấy detail → N+1 queries total",
                    "Query chạy N+1 giây",
                    "Index fragment thành N+1 phần"
                ],
                answer: 1,
                explain: "1 query 100 Orders + FOR EACH 1 query Customer = 101 queries. Fix: Eager loading (.Include()), JOIN, batch query."
            },
            {
                q: "READ UNCOMMITTED có rủi ro gì?",
                options: [
                    "Không cho phép đọc data",
                    "Dirty Read — đọc data CHƯA commit (có thể bị rollback)",
                    "Deadlock",
                    "Chậm hơn READ COMMITTED"
                ],
                answer: 1,
                explain: "READ UNCOMMITTED (NOLOCK) cho phép đọc data chưa commit → Dirty Read. Chỉ dùng khi chấp nhận data không chính xác 100%."
            },
            {
                q: "Covering Index là gì?",
                options: [
                    "Index trên tất cả columns",
                    "Index INCLUDE thêm columns cần SELECT → query lấy đủ data từ index, không cần Key Lookup",
                    "Index tự động",
                    "Index trên foreign key"
                ],
                answer: 1,
                explain: "CREATE INDEX IX ON Users(Status) INCLUDE(Name, Email) → query SELECT Name, Email WHERE Status='Active' chỉ đọc index, không Key Lookup."
            },
            {
                q: "Deadlock trong database xảy ra khi nào?",
                options: [
                    "Query chạy quá lâu",
                    "2 transactions lock resource của nhau, cả 2 chờ nhau mãi",
                    "Table quá lớn",
                    "Connection pool hết"
                ],
                answer: 1,
                explain: "Transaction A lock Row 1 chờ Row 2. Transaction B lock Row 2 chờ Row 1 → deadlock. Phòng: consistent lock ordering, keep transactions SHORT."
            },
            {
                q: "Table Scan trong Execution Plan nghĩa là gì?",
                options: [
                    "Query chạy nhanh",
                    "SQL đọc TOÀN BỘ table vì không tìm được index phù hợp — cần optimize",
                    "Table bị lock",
                    "Data bị corrupt"
                ],
                answer: 1,
                explain: "Table Scan = đọc TOÀN BỘ rows. Table nhỏ OK, table lớn rất chậm. Nguyên nhân: thiếu index, non-sargable query, SELECT *. Mong muốn: Index Seek."
            },
            {
                q: "Khi nào nên Denormalize database?",
                options: [
                    "Luôn luôn",
                    "Khi READ performance quan trọng hơn và chấp nhận data redundancy",
                    "Khi table ít records",
                    "Không bao giờ"
                ],
                answer: 1,
                explain: "Normalize: giảm redundancy. Denormalize: thêm redundancy tránh JOIN, tăng read speed. Trade-off: write phức tạp hơn. Dùng cho: reporting DB, read models."
            },
            {
                q: "Partition table giúp gì?",
                options: [
                    "Encrypt data",
                    "Chia table lớn thành phần nhỏ theo range — query chỉ scan partition cần thiết",
                    "Backup nhanh hơn",
                    "Tăng write speed mọi trường hợp"
                ],
                answer: 1,
                explain: "Partition chia table theo range (date, id). Query WHERE Date = '2024-01' chỉ scan partition đó. Hữu ích cho table hàng trăm triệu rows."
            },
            {
                q: "SELECT * có vấn đề gì?",
                options: [
                    "Syntax error",
                    "Lấy TẤT CẢ columns → nhiều I/O, không dùng Covering Index, data thừa qua network",
                    "Không dùng WHERE được",
                    "Chậm vì parse *"
                ],
                answer: 1,
                explain: "SELECT * problems: waste I/O, không Covering Index, schema change break app. LUÔN specify columns cần."
            },
            {
                q: "SNAPSHOT Isolation Level khác READ COMMITTED SNAPSHOT thế nào?",
                options: [
                    "Giống nhau",
                    "SNAPSHOT: transaction-level consistency (đọc data tại thời điểm BEGIN). RCSI: statement-level (đọc committed data tại thời điểm mỗi statement).",
                    "SNAPSHOT chậm hơn",
                    "RCSI không dùng tempdb"
                ],
                answer: 1,
                explain: "SNAPSHOT: TẤT CẢ reads trong transaction thấy cùng data tại BEGIN TRAN. RCSI: mỗi SELECT thấy latest committed data tại thời điểm chạy. Cả 2 dùng row versioning (tempdb), readers không block writers."
            },
            {
                q: "Index Fragmentation ảnh hưởng gì và cách xử lý?",
                options: [
                    "Không ảnh hưởng performance",
                    "Data pages không liên tục → nhiều I/O hơn. REORGANIZE (< 30%) hoặc REBUILD (> 30%) index.",
                    "Chỉ ảnh hưởng INSERT",
                    "Phải drop và tạo lại index"
                ],
                answer: 1,
                explain: "Fragmentation: pages không liên tục trên disk → random I/O thay vì sequential. ALTER INDEX REORGANIZE (online, nhẹ, < 30%). ALTER INDEX REBUILD (lock table, > 30%). ONLINE REBUILD tránh lock."
            },
            {
                q: "Filtered Index là gì?",
                options: [
                    "Index bị lọc bỏ",
                    "Index chỉ trên subset rows (có WHERE clause) → nhỏ hơn, nhanh hơn cho query cụ thể",
                    "Index filter data type",
                    "Index trên computed column"
                ],
                answer: 1,
                explain: "CREATE INDEX IX ON Orders(Status) WHERE IsDeleted = 0; → Index chỉ chứa active orders, nhỏ hơn nhiều. Dùng khi query luôn có điều kiện cố định (soft delete, status filter)."
            },
            {
                q: "Parameter Sniffing là gì?",
                options: [
                    "Security vulnerability",
                    "SQL Server cache execution plan cho lần gọi đầu tiên — plan có thể không optimal cho parameter values khác",
                    "Cách hack database",
                    "Parameter validation"
                ],
                answer: 1,
                explain: "SQL Server compile plan dựa trên parameter lần đầu. Nếu lần đầu value hiếm (10 rows) → Index Seek plan. Lần sau value phổ biến (1M rows) → vẫn dùng plan cũ → chậm. Fix: OPTIMIZE FOR UNKNOWN, RECOMPILE hint."
            },
            {
                q: "Window Functions (ROW_NUMBER, RANK, LAG, LEAD) hữu ích khi nào?",
                options: [
                    "Thay thế JOIN",
                    "Tính toán trên 'window' rows mà KHÔNG GROUP BY — pagination, running total, compare previous row",
                    "Tạo stored procedure",
                    "Thay thế subquery"
                ],
                answer: 1,
                explain: "Window Functions: ROW_NUMBER() OVER (ORDER BY ...) cho pagination. LAG/LEAD so sánh row trước/sau. SUM() OVER cho running total. KHÔNG collapse rows như GROUP BY — giữ nguyên detail rows."
            },
            {
                q: "Common Table Expression (CTE) khác Temp Table thế nào?",
                options: [
                    "Giống nhau",
                    "CTE: logical (inline, 1 query scope, không materialized). Temp Table: physical (tempdb, persistent trong session, có index).",
                    "CTE nhanh hơn luôn",
                    "Temp Table là deprecated"
                ],
                answer: 1,
                explain: "CTE (WITH ... AS): inline subquery, readable, 1 statement scope. Có thể chạy nhiều lần trong recursive CTE. Temp Table (#table): persist trong session, có statistics/index → tốt hơn cho large result set cần reuse."
            },
            {
                q: "Optimistic Concurrency vs Pessimistic Concurrency?",
                options: [
                    "Giống nhau",
                    "Optimistic: không lock, check version/timestamp khi UPDATE (row version). Pessimistic: lock row khi SELECT FOR UPDATE.",
                    "Pessimistic nhanh hơn",
                    "Optimistic chỉ cho read"
                ],
                answer: 1,
                explain: "Optimistic: đọc không lock, update check RowVersion → nếu thay đổi → DbUpdateConcurrencyException. Tốt cho low contention. Pessimistic: lock ngay khi đọc → high contention = nhiều waiting. EF Core dùng [ConcurrencyCheck] hoặc [Timestamp]."
            },
            {
                q: "MERGE statement dùng khi nào?",
                options: [
                    "Merge 2 databases",
                    "UPSERT: INSERT nếu chưa có, UPDATE nếu đã có — trong 1 atomic statement",
                    "Merge indexes",
                    "Combine query results"
                ],
                answer: 1,
                explain: "MERGE target USING source ON condition WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT. Atomic upsert, tốt cho ETL/sync data. Lưu ý: MERGE có bugs trong SQL Server cũ, cần HOLDLOCK hint."
            },
            {
                q: "Query Store trong SQL Server 2016+ giúp gì?",
                options: [
                    "Lưu query results",
                    "Tự động capture execution plans + runtime stats — detect plan regression, force good plan",
                    "Encrypt queries",
                    "Backup queries"
                ],
                answer: 1,
                explain: "Query Store: lưu lịch sử execution plans + performance metrics. Phát hiện: query đột nhiên chậm (plan regression). Force plan: chọn plan tốt nhất. Built-in reports trong SSMS. Automatic Tuning (SQL 2017) tự revert bad plans."
            },
            {
                q: "Columnstore Index khác Rowstore Index thế nào?",
                options: [
                    "Giống nhau",
                    "Columnstore lưu data theo COLUMN (compress tốt, scan nhanh cho analytics). Rowstore lưu theo ROW (tốt cho OLTP point lookups).",
                    "Columnstore mới hơn nên tốt hơn",
                    "Rowstore cho read, Columnstore cho write"
                ],
                answer: 1,
                explain: "Columnstore: lưu theo cột, compress cực tốt (10x), batch mode processing → analytics/warehouse queries (SUM, AVG trên triệu rows). Rowstore: lưu theo dòng → OLTP (SELECT WHERE ID = 123). SQL Server hỗ trợ cả 2 trên cùng table."
            }
        ]
    },
    http: {
        name: "HTTP & REST API Design",
        questions: [
            {
                q: "HTTP Method nào là idempotent?",
                options: [
                    "Chỉ GET",
                    "GET, PUT, DELETE (gọi nhiều lần cho cùng kết quả)",
                    "POST, PUT, PATCH",
                    "Tất cả HTTP methods"
                ],
                answer: 1,
                explain: "Idempotent = gọi 1 hay N lần cho cùng kết quả. GET, PUT, DELETE là idempotent. POST không phải: gọi 2 lần = 2 resources."
            },
            {
                q: "Tạo resource thành công, API nên trả status code nào?",
                options: [
                    "200 OK",
                    "201 Created + Location header",
                    "204 No Content",
                    "202 Accepted"
                ],
                answer: 1,
                explain: "201 Created + Location header chứa URL resource mới. Trong ASP.NET Core: CreatedAtAction(nameof(GetOrder), new { id }, order)."
            },
            {
                q: "401 và 403 khác nhau thế nào?",
                options: [
                    "Giống nhau",
                    "401 = chưa đăng nhập (AuthN fail). 403 = đăng nhập rồi nhưng không có quyền (AuthZ fail).",
                    "401 cho GET, 403 cho POST",
                    "401 server error, 403 client error"
                ],
                answer: 1,
                explain: "401: 'Tôi không biết bạn là ai' → cần login/token. 403: 'Tôi biết bạn, nhưng không có quyền' → role không đủ."
            },
            {
                q: "CORS là gì?",
                options: [
                    "Encrypt data",
                    "Cho phép browser gọi API từ domain khác — browser gửi preflight OPTIONS request",
                    "Loại authentication",
                    "Compress HTTP response"
                ],
                answer: 1,
                explain: "Browser mặc định chặn cross-origin request. CORS: server trả Access-Control-Allow-Origin header. Preflight OPTIONS kiểm tra trước. Postman không enforce CORS."
            },
            {
                q: "PUT và PATCH khác nhau thế nào?",
                options: [
                    "Giống nhau",
                    "PUT thay thế TOÀN BỘ resource, PATCH chỉ update MỘT PHẦN",
                    "PUT cho create, PATCH cho update",
                    "PATCH nhanh hơn"
                ],
                answer: 1,
                explain: "PUT: gửi toàn bộ object → REPLACE hoàn toàn. PATCH: chỉ gửi fields thay đổi → merge. Thực tế PATCH phổ biến hơn."
            },
            {
                q: "Status code 429 có ý nghĩa gì?",
                options: [
                    "Server error",
                    "Too Many Requests — rate limited, cần giảm tần suất",
                    "Not found",
                    "Authentication expired"
                ],
                answer: 1,
                explain: "429: rate limiting. Response thường có Retry-After header. Quan trọng cho API public bảo vệ server."
            },
            {
                q: "Content-Type và Accept khác nhau?",
                options: [
                    "Giống nhau",
                    "Content-Type = format REQUEST body. Accept = format client MUỐN NHẬN trong response.",
                    "Content-Type cho GET, Accept cho POST",
                    "Accept bắt buộc"
                ],
                answer: 1,
                explain: "Content-Type: 'Body tôi gửi là JSON'. Accept: 'Tôi muốn response dạng JSON'. Server không hỗ trợ → 406 Not Acceptable."
            },
            {
                q: "REST Maturity Model Level 2 yêu cầu gì?",
                options: [
                    "Chỉ cần API endpoint",
                    "Đúng HTTP Methods + đúng Status Codes",
                    "Implement HATEOAS",
                    "Dùng GraphQL"
                ],
                answer: 1,
                explain: "Level 0: RPC. Level 1: Resources. Level 2: HTTP Verbs + Status Codes. Level 3: HATEOAS. Hầu hết API đạt Level 2 là đủ."
            },
            {
                q: "API Versioning nên dùng cách nào?",
                options: [
                    "Chỉ 1 cách",
                    "URL (/api/v1/orders) phổ biến nhất, Header (api-version: 2) clean hơn. Tùy project.",
                    "Không cần versioning",
                    "Tạo API mới cho mỗi version"
                ],
                answer: 1,
                explain: "URL versioning phổ biến vì đơn giản. Header versioning clean hơn. ASP.NET Core: Asp.Versioning library hỗ trợ tất cả."
            },
            {
                q: "ETag header dùng để làm gì?",
                options: [
                    "Encrypt response",
                    "Caching — client gửi If-None-Match, server trả 304 nếu data không đổi",
                    "Auth token",
                    "Compress data"
                ],
                answer: 1,
                explain: "ETag = fingerprint resource. Flow: Server trả ETag → Client gửi If-None-Match → 304 Not Modified (no body). Tiết kiệm bandwidth. Cũng dùng cho optimistic concurrency."
            },
            {
                q: "HTTP/2 Multiplexing nghĩa là gì?",
                options: [
                    "Gửi nhiều file cùng lúc",
                    "Nhiều request/response song song trên CÙNG 1 TCP connection — không bị head-of-line blocking",
                    "Encrypt tất cả traffic",
                    "Nén headers"
                ],
                answer: 1,
                explain: "HTTP/1.1: 1 request/response per connection (hoặc pipelining nhưng vẫn ordered). HTTP/2: multiplex nhiều streams trên 1 connection, binary protocol, header compression (HPACK). ASP.NET Core hỗ trợ HTTP/2 mặc định."
            },
            {
                q: "Problem Details (RFC 7807) là gì?",
                options: [
                    "Error tracking tool",
                    "Chuẩn format cho error response API — type, title, status, detail, instance fields",
                    "Logging standard",
                    "API testing tool"
                ],
                answer: 1,
                explain: "RFC 7807: standard error format thay vì mỗi API trả error khác nhau. { type, title, status, detail, instance }. ASP.NET Core 7+: app.UseExceptionHandler() tự trả Problem Details. Consistent error handling."
            },
            {
                q: "GraphQL khác REST ở điểm nào chính?",
                options: [
                    "GraphQL nhanh hơn REST",
                    "Client tự chọn CHÍNH XÁC fields cần — tránh over-fetching/under-fetching. 1 endpoint thay vì nhiều.",
                    "GraphQL an toàn hơn REST",
                    "REST không hỗ trợ filtering"
                ],
                answer: 1,
                explain: "REST: endpoint trả cố định fields, cần nhiều endpoints. GraphQL: client query chính xác { user { name, email } } → chỉ trả name + email. Tốt cho mobile (bandwidth), nhưng phức tạp hơn, khó cache, N+1 problem."
            },
            {
                q: "Idempotency Key dùng khi nào?",
                options: [
                    "Thay thế API key",
                    "Client gửi unique key với POST request → server deduplicate, tránh tạo duplicate khi retry",
                    "Encrypt request",
                    "Validate request"
                ],
                answer: 1,
                explain: "POST không idempotent → retry tạo duplicate. Idempotency Key: client generate UUID, gửi trong header. Server lưu key + response → retry cùng key = trả cached response. Stripe, payment APIs bắt buộc."
            },
            {
                q: "Pagination: Offset-based vs Cursor-based?",
                options: [
                    "Giống nhau",
                    "Offset: ?page=3&size=10 (đơn giản, skip rows). Cursor: ?after=abc123 (stable, performant cho large datasets).",
                    "Cursor chỉ cho NoSQL",
                    "Offset nhanh hơn"
                ],
                answer: 1,
                explain: "Offset: SKIP 100 → SQL phải scan 100 rows bỏ qua, page cao = chậm, insert/delete gây duplicate/miss. Cursor: WHERE id > last_id → index seek, stable, fast. Cursor phổ biến: Facebook, Twitter API."
            },
            {
                q: "Rate Limiting strategies phổ biến?",
                options: [
                    "Chỉ có 1 cách",
                    "Fixed Window, Sliding Window, Token Bucket, Leaky Bucket — mỗi cái trade-off khác nhau",
                    "Chỉ cần timeout",
                    "Rate limiting không cần thiết"
                ],
                answer: 1,
                explain: "Fixed Window: 100 req/minute (burst đầu window). Sliding Window: smooth hơn. Token Bucket: tokens refill đều, cho phép burst ngắn. .NET 7+: builder.Services.AddRateLimiter() built-in."
            },
            {
                q: "Content Negotiation trong ASP.NET Core hoạt động thế nào?",
                options: [
                    "Luôn trả JSON",
                    "Server đọc Accept header → chọn format phù hợp (JSON, XML, etc). AddControllers().AddXmlSerializerFormatters().",
                    "Client không thể chọn format",
                    "Chỉ hỗ trợ JSON và XML"
                ],
                answer: 1,
                explain: "Accept: application/json → JSON. Accept: application/xml → XML (cần AddXmlSerializerFormatters()). Custom: implement OutputFormatter cho CSV, protobuf, etc. 406 Not Acceptable nếu không hỗ trợ."
            },
            {
                q: "HATEOAS (Level 3 REST) là gì?",
                options: [
                    "Security framework",
                    "Response chứa hypermedia links mô tả actions có thể thực hiện — API tự khám phá (self-discoverable)",
                    "Caching mechanism",
                    "Authentication protocol"
                ],
                answer: 1,
                explain: "HATEOAS: response chứa _links: { self: '/orders/1', pay: '/orders/1/pay', cancel: '/orders/1/cancel' }. Client không cần hardcode URL. Ít API đạt Level 3 vì phức tạp, nhưng là REST 'thuần túy'."
            },
            {
                q: "HEAD request khác GET thế nào?",
                options: [
                    "HEAD nhanh hơn GET",
                    "HEAD giống GET nhưng response KHÔNG có body — chỉ headers. Dùng kiểm tra resource tồn tại, content-length, last-modified.",
                    "HEAD cho authentication",
                    "Không có HEAD method"
                ],
                answer: 1,
                explain: "HEAD: server xử lý giống GET nhưng chỉ trả headers. Dùng: check file size trước khi download, check resource exists (200 vs 404), cache validation. Lightweight check."
            },
            {
                q: "OPTIONS request dùng trong trường hợp nào?",
                options: [
                    "Update resource options",
                    "Describe communication options cho resource — CORS preflight request, API discovery",
                    "Delete options",
                    "Chỉ cho REST Level 3"
                ],
                answer: 1,
                explain: "OPTIONS: server trả Allow header (GET, POST, PUT...). CORS preflight: browser gửi OPTIONS trước cross-origin request để kiểm tra server cho phép không. Server trả Access-Control-Allow-* headers."
            }
        ]
    },
    di: {
        name: "Dependency Injection",
        questions: [
            {
                q: "3 lifetimes trong ASP.NET Core DI là gì?",
                options: [
                    "Short, Medium, Long",
                    "Transient (mỗi inject = instance mới), Scoped (1 per request), Singleton (1 per app)",
                    "Request, Session, Application",
                    "Prototype, Cached, Static"
                ],
                answer: 1,
                explain: "Transient: mỗi resolve = new. Scoped: 1 per HTTP request scope. Singleton: 1 cho toàn bộ app lifetime."
            },
            {
                q: "Captive Dependency là gì?",
                options: [
                    "Circular dependency",
                    "Singleton chứa Scoped/Transient → scoped bị giữ mãi, không dispose đúng",
                    "Missing dependency",
                    "Duplicate registration"
                ],
                answer: 1,
                explain: "Singleton CacheService inject Scoped DbContext → DbContext bị giữ mãi → connection leak, stale data. Fix: IServiceScopeFactory."
            },
            {
                q: "DbContext nên register lifetime nào?",
                options: [
                    "Singleton",
                    "Scoped (1 per request)",
                    "Transient",
                    "Tùy thích"
                ],
                answer: 1,
                explain: "Scoped: mỗi request có DbContext riêng, Change Tracking độc lập, SaveChanges() scope đó, dispose cuối request."
            },
            {
                q: "IOptions vs IOptionsSnapshot vs IOptionsMonitor?",
                options: [
                    "Giống nhau",
                    "IOptions: Singleton (1 lần). IOptionsSnapshot: Scoped (refresh mỗi request). IOptionsMonitor: Singleton + onChange.",
                    "IOptions cho string, snapshot cho int",
                    "IOptionsMonitor chậm nhất"
                ],
                answer: 1,
                explain: "IOptions: KHÔNG thay đổi khi config thay đổi. IOptionsSnapshot: scoped, đọc lại mỗi request. IOptionsMonitor: singleton + OnChange event, detect realtime."
            },
            {
                q: "Service Locator anti-pattern là gì?",
                options: [
                    "Constructor injection",
                    "Inject IServiceProvider rồi resolve trong method — che giấu dependencies, khó test",
                    "Register 2 lần",
                    "Dùng interface"
                ],
                answer: 1,
                explain: "Service Locator: dependencies ẩn, khó test, dễ runtime error. Constructor Injection: rõ ràng, compile-time check, dễ mock."
            },
            {
                q: "Register nhiều implementations cho 1 interface?",
                options: [
                    "Không thể",
                    "Register nhiều lần → inject IEnumerable<IService>, hoặc keyed services (.NET 8+)",
                    "Dùng if/else trong constructor",
                    "Tạo base class"
                ],
                answer: 1,
                explain: "Nhiều AddScoped<INotification, ...>() → inject IEnumerable<INotification> nhận tất cả. .NET 8: AddKeyedScoped + [FromKeyedServices(\"key\")]."
            },
            {
                q: "Background Service xử lý Scoped dependency thế nào?",
                options: [
                    "Inject trực tiếp",
                    "Tạo scope mới bằng IServiceScopeFactory vì Background Service là Singleton",
                    "Dùng static class",
                    "Không thể"
                ],
                answer: 1,
                explain: "Background Service = Singleton → inject Scoped = Captive Dependency. Phải tạo scope mới mỗi iteration bằng IServiceScopeFactory."
            },
            {
                q: "AddScoped vs AddTransient — khác biệt thực tế?",
                options: [
                    "Không khác",
                    "Scoped: 2 services inject cùng interface trong 1 request → cùng instance. Transient: mỗi inject = instance khác.",
                    "Transient nhanh hơn",
                    "Scoped thread-safe hơn"
                ],
                answer: 1,
                explain: "ServiceA và ServiceB cùng inject IUnitOfWork. Scoped → chung instance → SaveChanges thấy changes cả 2. Transient → riêng biệt."
            },
            {
                q: "Decorator Pattern với DI register thế nào?",
                options: [
                    "Không thể",
                    "Scrutor library: services.Decorate<IService, CachingDecorator>() — hoặc manual factory",
                    "Kế thừa class gốc",
                    "Dùng middleware"
                ],
                answer: 1,
                explain: "Built-in DI không hỗ trợ trực tiếp. Scrutor: Decorate<TInterface, TDecorator>(). Rất mạnh cho cross-cutting concerns."
            },
            {
                q: "ValidateOnBuild giúp gì?",
                options: [
                    "Tăng performance",
                    "Phát hiện missing registrations, captive dependencies NGAY KHI START",
                    "Encrypt services",
                    "Không tác dụng"
                ],
                answer: 1,
                explain: "ValidateScopes + ValidateOnBuild: crash ngay khi start nếu DI configuration sai. Mặc định BẬT trong Development."
            },
            {
                q: "Keyed Services trong .NET 8 giải quyết gì?",
                options: [
                    "Encrypt service keys",
                    "Đăng ký nhiều implementation cùng interface với KEY khác nhau — resolve by key thay vì IEnumerable",
                    "Tạo dictionary service",
                    "Auto-register services"
                ],
                answer: 1,
                explain: "builder.Services.AddKeyedScoped<INotification, EmailNotification>(\"email\"); Controller: [FromKeyedServices(\"email\")] INotification svc. Cleaner hơn factory pattern cho multiple implementations."
            },
            {
                q: "Open Generic Registration là gì?",
                options: [
                    "Register generic class mà KHÔNG specify type argument — services.AddScoped(typeof(IRepo<>), typeof(Repo<>))",
                    "Register mọi class tự động",
                    "Generic constraint registration",
                    "Register cho object type"
                ],
                answer: 0,
                explain: "AddScoped(typeof(IRepository<>), typeof(Repository<>)) → resolve IRepository<Order> tự động map sang Repository<Order>. Không cần register từng entity. MediatR dùng open generic cho IRequestHandler<,>."
            },
            {
                q: "TryAddScoped vs AddScoped khác nhau?",
                options: [
                    "Giống nhau",
                    "TryAdd chỉ register NẾU chưa có registration cho interface đó — tránh override. AddScoped luôn thêm.",
                    "TryAdd nhanh hơn",
                    "AddScoped an toàn hơn"
                ],
                answer: 1,
                explain: "TryAddScoped<IService, MyService>(): chỉ add nếu IService chưa register. Dùng trong library code để cung cấp default implementation mà app có thể override. services.AddScoped<IService, CustomService>() override được."
            },
            {
                q: "IServiceScope khi nào cần manually dispose?",
                options: [
                    "Không bao giờ",
                    "Khi tạo scope thủ công (IServiceScopeFactory) — using var scope = factory.CreateScope() đảm bảo dispose scoped services",
                    "Luôn luôn",
                    "Chỉ cho Singleton"
                ],
                answer: 1,
                explain: "ASP.NET Core tự tạo/dispose scope per request. Khi TỰ tạo scope (background service, message handler), PHẢI dispose để release scoped services (DbContext, etc). using statement đảm bảo cleanup."
            },
            {
                q: "Lazy<T> injection dùng khi nào?",
                options: [
                    "Thay thế DI container",
                    "Delay việc tạo expensive service cho đến khi thực sự cần — inject Lazy<IExpensiveService> thay vì IExpensiveService",
                    "Tạo singleton tự động",
                    "Cache dependencies"
                ],
                answer: 1,
                explain: "services.AddTransient(sp => new Lazy<IExpensiveService>(() => sp.GetRequiredService<IExpensiveService>())). Object chỉ tạo khi .Value được access lần đầu. Tốt cho service ít khi dùng trong request path."
            },
            {
                q: "Scrutor library auto-registration hoạt động thế nào?",
                options: [
                    "Scan assembly, tìm classes matching pattern, tự register — services.Scan(scan => scan.FromAssemblyOf<T>()...)",
                    "Tạo code generation",
                    "Override DI container",
                    "Compile-time DI"
                ],
                answer: 0,
                explain: "Scrutor: scan.FromAssemblyOf<Startup>().AddClasses(c => c.AssignableTo<IService>()).AsImplementedInterfaces().WithScopedLifetime(). Auto-discover và register. Giảm boilerplate cho projects lớn."
            },
            {
                q: "Primary Constructor DI trong .NET 8 (C# 12) trông như thế nào?",
                options: [
                    "Không hỗ trợ DI",
                    "public class OrderService(IRepo repo, ILogger logger) — parameters tự inject, không cần private readonly fields",
                    "Chỉ cho record types",
                    "Cần attribute đặc biệt"
                ],
                answer: 1,
                explain: "C# 12 primary constructors: public class Service(IRepo repo, ILogger<Service> logger) { public void Do() => repo.Save(); }. Ngắn gọn hơn, parameters captured. Lưu ý: parameters là mutable, không tự tạo readonly fields."
            },
            {
                q: "Compile-time DI (Source Generators) có lợi gì so với runtime DI?",
                options: [
                    "Không khác biệt",
                    "Phát hiện lỗi DI lúc COMPILE, startup nhanh hơn (no reflection), AOT friendly",
                    "Dễ dùng hơn",
                    "Hỗ trợ mọi DI feature"
                ],
                answer: 1,
                explain: "Runtime DI: reflection, startup overhead, lỗi runtime. Compile-time: source generator tạo factory code, lỗi compile-time, no reflection → fast startup, AOT compatible. Libraries: Jab, StrongInject. Trade-off: ít feature hơn runtime DI."
            }
        ]
    },
    security: {
        name: "Security Fundamentals",
        questions: [
            {
                q: "Authentication và Authorization khác nhau?",
                options: [
                    "Giống nhau",
                    "AuthN = 'Bạn là ai?' (verify identity). AuthZ = 'Bạn được làm gì?' (check permissions).",
                    "AuthN cho frontend, AuthZ cho backend",
                    "AuthZ chạy trước AuthN"
                ],
                answer: 1,
                explain: "AuthN luôn chạy TRƯỚC: verify identity. AuthZ chạy SAU: check permissions. app.UseAuthentication() → app.UseAuthorization()."
            },
            {
                q: "JWT Token gồm mấy phần?",
                options: [
                    "2 phần",
                    "3 phần: Header.Payload.Signature",
                    "1 phần: encrypted string",
                    "4 phần"
                ],
                answer: 1,
                explain: "JWT = Header (algorithm) + Payload (claims) + Signature. Payload chỉ Base64, KHÔNG encrypted → không lưu sensitive data."
            },
            {
                q: "Tại sao KHÔNG dùng MD5/SHA256 hash password?",
                options: [
                    "Deprecated",
                    "Quá NHANH → brute force hàng tỉ hash/giây. Cần BCrypt/Argon2 (chậm + salt).",
                    "Hash quá dài",
                    "Không hỗ trợ .NET"
                ],
                answer: 1,
                explain: "MD5/SHA256 designed to be FAST → GPU crack billions/sec. BCrypt/Argon2 designed to be SLOW + salt → cùng password, hash khác nhau."
            },
            {
                q: "SQL Injection hoạt động thế nào?",
                code: "var query = $\"SELECT * FROM Users WHERE Name = '{input}'\";",
                options: [
                    "Không thể inject",
                    "Input: ' OR 1=1 -- → trả về TẤT CẢ users",
                    "SQL tự escape",
                    "Chỉ xảy ra MySQL"
                ],
                answer: 1,
                explain: "Fix: LUÔN parameterized query. command.Parameters.AddWithValue(\"@name\", input). KHÔNG BAO GIỜ nối string vào query."
            },
            {
                q: "CSRF attack là gì?",
                options: [
                    "Steal JWT token",
                    "Trick user đã login click link → browser gửi cookie → action dưới danh nghĩa user",
                    "SQL Injection qua form",
                    "DDoS"
                ],
                answer: 1,
                explain: "Fix: Anti-Forgery Token, SameSite cookie, check Referer header."
            },
            {
                q: "Access Token vs Refresh Token?",
                options: [
                    "Giống nhau",
                    "Access: ngắn hạn (15-60 phút). Refresh: dài hạn, dùng lấy Access Token mới.",
                    "Access cho read, Refresh cho write",
                    "Refresh nhanh hơn"
                ],
                answer: 1,
                explain: "Access Token ngắn hạn: nếu steal, chỉ dùng ngắn. Refresh Token: lưu httpOnly cookie, bị steal → revoke ở server."
            },
            {
                q: "HTTPS bảo vệ những gì?",
                options: [
                    "Chỉ password",
                    "Encrypt TOÀN BỘ communication, xác thực server, chống man-in-the-middle",
                    "Chỉ POST requests",
                    "Tăng tốc website"
                ],
                answer: 1,
                explain: "HTTPS (TLS): Encryption, Authentication (certificate), Integrity. URL query string vẫn có thể lộ trong server logs."
            },
            {
                q: "XSS là gì?",
                options: [
                    "CSS framework",
                    "Inject malicious script → chạy trên browser victim → steal cookie/data",
                    "Server attack",
                    "Database attack"
                ],
                answer: 1,
                explain: "Fix: LUÔN encode output, validate input, CSP header, HttpOnly cookie. 3 loại: Stored, Reflected, DOM-based."
            },
            {
                q: "Claims-based vs Role-based Authorization?",
                options: [
                    "Giống nhau",
                    "Role: check role (Admin). Claims: check claim cụ thể (department=IT) — linh hoạt hơn.",
                    "Claims cho JWT, Role cho Cookie",
                    "Role mới hơn"
                ],
                answer: 1,
                explain: "Role đơn giản nhưng cứng. Claims linh hoạt: bất kỳ thông tin nào. Policy: combine requirements."
            },
            {
                q: "HSTS là gì?",
                options: [
                    "Authentication",
                    "Header báo browser luôn dùng HTTPS — chống downgrade attack",
                    "Encrypt password",
                    "Firewall"
                ],
                answer: 1,
                explain: "Strict-Transport-Security: browser tự HTTP→HTTPS, chống SSL stripping. app.UseHsts()."
            },
            {
                q: "OAuth 2.0 vs OpenID Connect?",
                options: [
                    "Giống nhau",
                    "OAuth 2.0 = Authorization (access to resources). OIDC = Authentication (identity) built on top of OAuth 2.0.",
                    "OAuth mới hơn",
                    "OIDC thay thế OAuth"
                ],
                answer: 1,
                explain: "OAuth 2.0: 'Cho phép app X truy cập ảnh Google của tôi' (authorization, access_token). OIDC: 'Đăng nhập bằng Google' (authentication, id_token chứa user info). OIDC = OAuth 2.0 + identity layer."
            },
            {
                q: "Content Security Policy (CSP) header ngăn gì?",
                options: [
                    "SQL Injection",
                    "XSS — giới hạn nguồn script, style, image được phép load trên trang",
                    "CSRF",
                    "Brute force"
                ],
                answer: 1,
                explain: "CSP: Content-Security-Policy: script-src 'self' → chỉ cho phép script từ cùng domain. Inline script, eval() bị block. Defense-in-depth chống XSS ngay cả khi output encoding bị miss."
            },
            {
                q: "PKCE (Proof Key for Code Exchange) trong OAuth giải quyết gì?",
                options: [
                    "Encrypt tokens",
                    "Chống authorization code interception — client tạo verifier, server validate. Bắt buộc cho SPA/mobile apps.",
                    "Tăng tốc OAuth flow",
                    "Thay thế client secret"
                ],
                answer: 1,
                explain: "PKCE: client tạo random code_verifier → hash thành code_challenge gửi lên authorization server. Khi đổi code lấy token, gửi code_verifier → server verify hash match. Ngay cả intercept authorization code cũng không dùng được vì không có verifier."
            },
            {
                q: "Rate Limiting bảo vệ khỏi gì?",
                options: [
                    "SQL Injection",
                    "Brute force attacks, DDoS, credential stuffing — giới hạn số request per time window",
                    "XSS",
                    "CSRF"
                ],
                answer: 1,
                explain: "Rate limiting: 100 login attempts/minute/IP. Bảo vệ: brute force password, API abuse, DDoS layer 7. .NET 7+: AddRateLimiter() built-in."
            },
            {
                q: "Secure cookie flags nào nên LUÔN set?",
                options: [
                    "Chỉ Secure flag",
                    "HttpOnly (no JS access), Secure (HTTPS only), SameSite=Strict/Lax (chống CSRF)",
                    "Chỉ SameSite",
                    "Không cần flags"
                ],
                answer: 1,
                explain: "HttpOnly: document.cookie không đọc được → chống XSS steal cookie. Secure: chỉ gửi qua HTTPS. SameSite: chống CSRF (Strict: không gửi cross-site, Lax: gửi cho top-level navigation)."
            },
            {
                q: "Data Protection API trong ASP.NET Core dùng cho gì?",
                options: [
                    "Database encryption",
                    "Encrypt/decrypt sensitive data (tokens, cookies, anti-forgery) — tự quản lý key rotation",
                    "HTTPS certificate",
                    "Password hashing"
                ],
                answer: 1,
                explain: "Data Protection: tự tạo, rotate, manage encryption keys. Dùng cho: cookie encryption, anti-forgery tokens, Protect()/Unprotect() API cho app data. Key storage configurable: file system, Azure Key Vault, Redis."
            },
            {
                q: "Input Validation ở server-side hay client-side?",
                options: [
                    "Client-side là đủ",
                    "LUÔN validate ở SERVER. Client validation chỉ là UX convenience — attacker bypass dễ dàng.",
                    "Server-side không cần nếu có client",
                    "Chỉ cho form input"
                ],
                answer: 1,
                explain: "Client-side validation bypass: Postman, curl, browser DevTools modify request. LUÔN validate server-side: data type, range, length, format, business rules. FluentValidation trong ASP.NET Core."
            },
            {
                q: "Principle of Least Privilege nghĩa là gì?",
                options: [
                    "Cho admin quyền toàn bộ",
                    "Mỗi user/service chỉ có QUYỀN TỐI THIỂU cần thiết để thực hiện công việc",
                    "Không cần authorization",
                    "Dùng root account"
                ],
                answer: 1,
                explain: "API service account chỉ cần READ access → không cho WRITE. User chỉ cần xem report → không cho delete. DB connection string: specific user, specific permissions. Giảm blast radius khi bị compromise."
            },
            {
                q: "Secret Management trong production nên dùng gì?",
                options: [
                    "Hardcode trong appsettings.json",
                    "Azure Key Vault / AWS Secrets Manager / HashiCorp Vault — KHÔNG lưu secrets trong code/config files",
                    "Environment variables là đủ",
                    ".env file commit vào git"
                ],
                answer: 1,
                explain: "KHÔNG hardcode secrets. KHÔNG commit vào git. Vault services: encryption at rest, access control, audit log, rotation. Environment variables OK cho simple cases nhưng không có audit/rotation. User Secrets cho development."
            },
            {
                q: "SQL Server connection string nên dùng authentication nào?",
                options: [
                    "sa account",
                    "Windows/Azure AD Authentication (Integrated Security) thay vì SQL Authentication (password trong connection string)",
                    "Không cần authentication",
                    "Anonymous access"
                ],
                answer: 1,
                explain: "SQL Auth: password trong connection string → risk exposure. Windows/Azure AD Auth: no password in config, managed identity, centralized access control. Azure Managed Identity: zero secrets, auto-rotate."
            }
        ]
    },
    testing: {
        name: "Testing Strategy",
        questions: [
            {
                q: "Test Pyramid gồm những tầng nào?",
                options: [
                    "E2E → Integration → Unit",
                    "Unit (nhiều, nhanh) → Integration (vừa) → E2E (ít, chậm)",
                    "Manual → Unit → Integration",
                    "Performance → Security → Functional"
                ],
                answer: 1,
                explain: "Unit: nhiều, nhanh, isolated. Integration: vừa, nhiều components. E2E: ít, chậm, full flow. Đảo pyramid = slow, brittle."
            },
            {
                q: "AAA Pattern là gì?",
                options: [
                    "Authentication, Authorization, Auditing",
                    "Arrange (setup) → Act (gọi method) → Assert (kiểm tra kết quả)",
                    "Add, Apply, Analyze",
                    "Async, Await, Assert"
                ],
                answer: 1,
                explain: "Arrange: setup data, mock. Act: gọi method (CHỈ 1 action). Assert: verify kết quả. Mỗi test assert 1 behavior."
            },
            {
                q: "Khi nào KHÔNG nên mock?",
                options: [
                    "Luôn mock tất cả",
                    "KHÔNG mock internal logic, domain model — chỉ mock EXTERNAL dependencies",
                    "Không bao giờ mock",
                    "Chỉ mock trong E2E"
                ],
                answer: 1,
                explain: "Mock external: DB, HTTP, email. KHÔNG mock internal: domain logic, utilities. Over-mocking → false confidence."
            },
            {
                q: "WebApplicationFactory dùng để làm gì?",
                options: [
                    "Tạo production server",
                    "In-memory test server — chạy REAL HTTP pipeline mà không cần host thật",
                    "Generate API docs",
                    "Mock HTTP"
                ],
                answer: 1,
                explain: "WebApplicationFactory<Program>: TestServer chạy full pipeline in-memory. CreateClient() → HttpClient gọi API. Override DI, test authentication."
            },
            {
                q: "Test naming convention tốt nhất?",
                options: [
                    "Test1, Test2",
                    "MethodName_Scenario_ExpectedResult",
                    "Test_ClassName",
                    "Tên ngắn nhất"
                ],
                answer: 1,
                explain: "Ví dụ: CreateOrder_WhenOutOfStock_ThrowsException. Khi fail, đọc tên hiểu ngay issue."
            },
            {
                q: "100% Code Coverage = no bugs?",
                options: [
                    "Đúng",
                    "SAI — Coverage chỉ đo lines CHẠY QUA, không đo logic ĐÚNG. Có thể 100% mà assert sai.",
                    "Coverage không quan trọng",
                    "Chỉ cần 50%"
                ],
                answer: 1,
                explain: "Focus: 70-80% meaningful coverage tốt hơn 100% superficial. Test business logic critical paths."
            },
            {
                q: "Flaky test thường do gì?",
                options: [
                    "Bug test framework",
                    "Phụ thuộc external state: time, random, shared DB, network, test order",
                    "Code phức tạp",
                    "Server chậm"
                ],
                answer: 1,
                explain: "Fix: isolated data, inject IClock, proper async/await, mock external services."
            },
            {
                q: "[Theory] và [Fact] trong xUnit?",
                options: [
                    "Giống nhau",
                    "[Fact]: 1 case cố định. [Theory] + [InlineData]: NHIỀU cases parameterized.",
                    "Theory cho integration, Fact cho unit",
                    "Theory chậm hơn"
                ],
                answer: 1,
                explain: "[Theory] [InlineData(1,2,3)] [InlineData(0,0,0)] giảm code duplication cho nhiều input combinations."
            },
            {
                q: "Testcontainers giải quyết gì?",
                options: [
                    "Container cho production",
                    "Chạy REAL database/service trong Docker cho integration test — test xong tự cleanup",
                    "Mock Docker",
                    "Deploy results"
                ],
                answer: 1,
                explain: "Test dùng REAL DB (SQL Server container) thay vì InMemory → bắt bugs InMemory bỏ sót. Container tự destroy."
            },
            {
                q: "Mutation Testing là gì?",
                options: [
                    "Test data corrupt",
                    "Tự động SỬA code (mutate) rồi chạy test — nếu test vẫn pass = test yếu",
                    "Test performance",
                    "Test security"
                ],
                answer: 1,
                explain: "Stryker.NET: đổi if(a > b) → if(a < b). Test pass = test không detect lỗi. Mutation score cho thấy test quality thật sự."
            },
            {
                q: "Snapshot Testing là gì?",
                options: [
                    "Screenshot testing",
                    "So sánh output hiện tại với snapshot lưu trước — detect unintended changes trong JSON, HTML, etc.",
                    "Backup before test",
                    "Memory snapshot"
                ],
                answer: 1,
                explain: "Verify().MatchSnapshot(): lần đầu tạo snapshot file. Lần sau so sánh output vs snapshot. Nếu khác → fail (review thay đổi). Verify library cho .NET. Tốt cho API response, serialization output."
            },
            {
                q: "Test Doubles: Stub vs Mock vs Fake?",
                options: [
                    "Giống nhau",
                    "Stub: trả data cố định. Mock: verify interactions (method called, times). Fake: implementation đơn giản (InMemory DB).",
                    "Fake mới nhất",
                    "Chỉ dùng Mock"
                ],
                answer: 1,
                explain: "Stub: _repoMock.Setup(r => r.GetById(1)).Returns(order) — chỉ trả data. Mock: _emailMock.Verify(e => e.Send(), Times.Once) — verify behavior. Fake: InMemoryRepository implement real logic đơn giản."
            },
            {
                q: "Property-Based Testing khác Example-Based Testing thế nào?",
                options: [
                    "Giống nhau",
                    "Example: test specific inputs (1+2=3). Property: test INVARIANTS với random inputs (a+b = b+a cho mọi a,b).",
                    "Property chậm hơn",
                    "Chỉ cho math functions"
                ],
                answer: 1,
                explain: "Property-based (FsCheck, Bogus): generate hàng trăm random inputs, verify property luôn đúng. Tìm edge cases bạn không nghĩ đến. Ví dụ: Serialize then Deserialize = original object."
            },
            {
                q: "Integration Test nên test gì?",
                options: [
                    "Mọi thứ giống Unit Test",
                    "Interactions giữa components: API → Service → DB pipeline, middleware, DI wiring, serialization",
                    "Chỉ database queries",
                    "UI interactions"
                ],
                answer: 1,
                explain: "Integration test value: middleware pipeline hoạt động đúng, DI wired correctly, DB queries đúng, serialization/deserialization, auth flow. Bắt bugs mà unit test bỏ sót (real HTTP, real DB)."
            },
            {
                q: "Test Data Builder Pattern là gì?",
                options: [
                    "Generate random test data",
                    "Fluent API tạo test objects: new OrderBuilder().WithProduct(\"Laptop\").WithQuantity(2).Build() — dễ đọc, reusable",
                    "Import data từ production",
                    "Database seeding"
                ],
                answer: 1,
                explain: "Builder Pattern cho test data: tạo valid default object, override chỉ fields cần test. Ví dụ: OrderBuilder mặc định valid → .WithQuantity(0) test invalid case. Giảm setup boilerplate, tests dễ đọc."
            },
            {
                q: "Arrange-Act-Assert: tại sao chỉ nên có 1 Act?",
                options: [
                    "Vì rule nói vậy",
                    "Khi test fail, biết CHÍNH XÁC action nào gây fail. Nhiều Acts → không rõ step nào lỗi.",
                    "Tiết kiệm code",
                    "Performance"
                ],
                answer: 1,
                explain: "1 Act = 1 behavior per test. Test fail → biết ngay method nào, scenario nào. Nhiều Acts = multiple behaviors → debug khó, test tên không mô tả đúng. Nếu cần test flow → integration/E2E test."
            },
            {
                q: "Bogus library trong .NET dùng cho gì?",
                options: [
                    "Mock HTTP",
                    "Generate realistic fake data cho tests — Faker<User>().RuleFor(u => u.Name, f => f.Person.FullName)",
                    "Fake database",
                    "Fake authentication"
                ],
                answer: 1,
                explain: "Bogus: generate realistic fake data. var faker = new Faker<Order>().RuleFor(o => o.Total, f => f.Finance.Amount()). Deterministic seed cho reproducible tests. Tốt hơn hardcode 'test123'."
            },
            {
                q: "Respawn library giúp gì trong integration tests?",
                options: [
                    "Restart application",
                    "Reset database về trạng thái sạch giữa các tests — delete data theo đúng FK order, nhanh hơn recreate DB",
                    "Restore backup",
                    "Migrate database"
                ],
                answer: 1,
                explain: "Respawn: intelligent DB cleanup. Biết FK relationships → delete theo đúng order. Nhanh hơn: drop + recreate DB. Dùng giữa tests để isolate data: await _checkpoint.ResetAsync(connectionString)."
            },
            {
                q: "Architecture Tests (ArchUnitNET) test gì?",
                options: [
                    "API architecture",
                    "Enforce coding conventions tự động: 'Controllers phải ở namespace X', 'Domain không reference Infrastructure'",
                    "Server architecture",
                    "Cloud architecture"
                ],
                answer: 1,
                explain: "ArchUnitNET: Types().That().ResideInNamespace(\"Domain\").Should().NotDependOnAny(\"Infrastructure\"). Enforce clean architecture rules, naming conventions, dependency direction. Chạy trong CI → prevent violations."
            },
            {
                q: "Contract Testing (Pact) khác Integration Testing thế nào?",
                options: [
                    "Giống nhau",
                    "Contract: test AGREEMENT giữa consumer và provider API mà không cần cả 2 chạy cùng lúc. Integration: test thật với cả 2.",
                    "Contract mới hơn",
                    "Chỉ cho microservices"
                ],
                answer: 1,
                explain: "Contract testing: Consumer define expectations (contract), Provider verify contract. Không cần chạy cùng lúc → independent deployment, fast feedback. Pact: consumer-driven contract testing. Tốt cho microservices."
            }
        ]
    }
};

// ===== QUIZ STATE =====
let currentQuiz = {
    topic: null,
    questions: [],
    currentIndex: 0,
    answers: [],
    startTime: null,
    timerInterval: null
};

const QUESTIONS_PER_QUIZ = 10;
const QUESTIONS_ALL_QUIZ = 20;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initQuizSelector();
    initQuizNav();
    loadQuizScores();
    updateQuestionCounts();
});

function updateQuestionCounts() {
    document.querySelectorAll('.quiz-topic-btn').forEach(btn => {
        const topic = btn.dataset.quiz;
        if (topic === 'all') {
            let total = 0;
            for (const data of Object.values(quizBank)) total += data.questions.length;
            const nameEl = btn.querySelector('.qt-name');
            nameEl.textContent = `Thi tổng hợp (${QUESTIONS_ALL_QUIZ} câu random từ ${total} câu)`;
        } else if (quizBank[topic]) {
            const count = quizBank[topic].questions.length;
            const nameEl = btn.querySelector('.qt-name');
            nameEl.innerHTML = `${nameEl.textContent} <span style="font-size:0.75rem;color:#8888AA;">(${count} câu)</span>`;
        }
    });
}

function initQuizSelector() {
    document.querySelectorAll('.quiz-topic-btn').forEach(btn => {
        btn.addEventListener('click', () => startQuiz(btn.dataset.quiz));
    });
}

function initQuizNav() {
    document.getElementById('btnNext').addEventListener('click', nextQuestion);
    document.getElementById('btnPrev').addEventListener('click', prevQuestion);
    document.getElementById('btnSubmit').addEventListener('click', submitQuiz);
    document.getElementById('quizCloseBtn').addEventListener('click', closeQuiz);
    document.getElementById('btnRetry').addEventListener('click', () => startQuiz(currentQuiz.topic));
    document.getElementById('btnBackToTopics').addEventListener('click', closeQuiz);
}

// ===== START QUIZ =====
function startQuiz(topic) {
    let questions, title;

    if (topic === 'all') {
        const allQ = [];
        for (const [key, data] of Object.entries(quizBank)) {
            data.questions.forEach(q => allQ.push({ ...q, _topic: key }));
        }
        questions = shuffleArray(allQ).slice(0, QUESTIONS_ALL_QUIZ);
        title = `Thi Tổng Hợp (${QUESTIONS_ALL_QUIZ} câu random)`;
    } else {
        const bank = quizBank[topic].questions;
        questions = shuffleArray([...bank]).slice(0, QUESTIONS_PER_QUIZ);
        title = `${quizBank[topic].name} (${QUESTIONS_PER_QUIZ}/${bank.length} câu)`;
    }

    // Shuffle options for each question
    questions = questions.map(q => {
        const indices = q.options.map((_, i) => i);
        const shuffled = shuffleArray(indices);
        return {
            ...q,
            options: shuffled.map(i => q.options[i]),
            answer: shuffled.indexOf(q.answer)
        };
    });

    currentQuiz = {
        topic,
        questions,
        currentIndex: 0,
        answers: new Array(questions.length).fill(null),
        startTime: Date.now(),
        timerInterval: null
    };

    document.getElementById('quizSelector').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    document.getElementById('quizTitle').textContent = title;
    document.getElementById('qTotal').textContent = questions.length;

    startTimer();
    renderQuestion();
}

// ===== RENDER QUESTION =====
function renderQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const idx = currentQuiz.currentIndex;
    const total = currentQuiz.questions.length;

    document.getElementById('qCurrent').textContent = idx + 1;
    document.getElementById('quizProgressFill').style.width = `${((idx + 1) / total) * 100}%`;
    document.getElementById('questionText').textContent = `${idx + 1}. ${q.q}`;

    const codeBlock = document.getElementById('questionCode');
    if (q.code) {
        document.getElementById('questionCodeContent').textContent = q.code;
        codeBlock.style.display = 'block';
    } else {
        codeBlock.style.display = 'none';
    }

    const optionsDiv = document.getElementById('quizOptions');
    const letters = ['A', 'B', 'C', 'D'];
    const isAnswered = currentQuiz.answers[idx] !== null;

    optionsDiv.innerHTML = q.options.map((opt, i) => {
        let extraClass = '';
        if (isAnswered) {
            if (i === q.answer) extraClass = 'correct disabled';
            else if (i === currentQuiz.answers[idx]) extraClass = 'wrong disabled';
            else extraClass = 'disabled';
        }
        const selectedClass = (!isAnswered && false) ? '' : (i === currentQuiz.answers[idx] ? 'selected' : '');
        return `
            <div class="quiz-option ${selectedClass} ${extraClass}"
                 data-index="${i}" onclick="selectOption(${i})">
                <span class="option-letter">${letters[i]}</span>
                <span class="option-text">${opt}</span>
            </div>
        `;
    }).join('');

    const expDiv = document.getElementById('quizExplanation');
    if (isAnswered) {
        const isCorrect = currentQuiz.answers[idx] === q.answer;
        expDiv.style.display = 'block';
        expDiv.className = `quiz-explanation ${isCorrect ? 'correct-exp' : 'wrong-exp'}`;
        document.getElementById('explanationTitle').textContent = isCorrect ? '✅ Chính xác!' : '❌ Sai rồi!';
        document.getElementById('explanationText').textContent = q.explain;
    } else {
        expDiv.style.display = 'none';
    }

    document.getElementById('btnPrev').disabled = idx === 0;
    const isLast = idx === total - 1;
    const allAnswered = currentQuiz.answers.every(a => a !== null);
    document.getElementById('btnNext').style.display = isLast ? 'none' : 'inline-block';
    document.getElementById('btnSubmit').style.display = (isLast || allAnswered) ? 'inline-block' : 'none';
}

// ===== SELECT OPTION =====
function selectOption(index) {
    if (currentQuiz.answers[currentQuiz.currentIndex] !== null) return;
    currentQuiz.answers[currentQuiz.currentIndex] = index;
    renderQuestion();
}

function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        renderQuestion();
    }
}

// ===== TIMER =====
function startTimer() {
    clearInterval(currentQuiz.timerInterval);
    currentQuiz.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
        const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const sec = String(elapsed % 60).padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${min}:${sec}`;
    }, 1000);
}

// ===== SUBMIT =====
function submitQuiz() {
    clearInterval(currentQuiz.timerInterval);
    const elapsed = Math.floor((Date.now() - currentQuiz.startTime) / 1000);

    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
        if (currentQuiz.answers[i] === q.answer) correct++;
    });

    const total = currentQuiz.questions.length;
    const wrong = total - correct;
    const percent = Math.round((correct / total) * 100);

    saveQuizScore(currentQuiz.topic, percent);

    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    document.getElementById('resultPercent').textContent = percent;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = wrong;

    const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const sec = String(elapsed % 60).padStart(2, '0');
    document.getElementById('resultTime').textContent = `${min}:${sec}`;

    let title, message;
    if (percent >= 90) { title = 'Xuất sắc! 🏆'; message = 'Nắm rất vững! Sẵn sàng mentor team.'; }
    else if (percent >= 70) { title = 'Tốt! 👍'; message = 'Khá vững, ôn thêm phần sai để hoàn thiện.'; }
    else if (percent >= 50) { title = 'Cần cải thiện 📚'; message = 'Nắm cơ bản nhưng cần đào sâu. Đọc lại lý thuyết.'; }
    else { title = 'Cần học lại 🔄'; message = 'Đừng nản! Quay lại đọc kỹ rồi thi lại nhé.'; }

    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;

    // Animate circle
    setTimeout(() => {
        const circle = document.getElementById('resultCircle');
        const circumference = 2 * Math.PI * 54;
        circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }, 100);

    const svg = document.querySelector('.result-circle svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `<linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6C5CE7"/>
            <stop offset="100%" style="stop-color:#00D2FF"/>
        </linearGradient>`;
        svg.prepend(defs);
    }

    // Review
    const reviewDiv = document.getElementById('resultReview');
    const letters = ['A', 'B', 'C', 'D'];
    reviewDiv.innerHTML = currentQuiz.questions.map((q, i) => {
        const isCorrect = currentQuiz.answers[i] === q.answer;
        const userAnswer = currentQuiz.answers[i] !== null
            ? `${letters[currentQuiz.answers[i]]}. ${q.options[currentQuiz.answers[i]]}`
            : 'Chưa trả lời';
        const correctAnswer = `${letters[q.answer]}. ${q.options[q.answer]}`;

        return `
            <div class="review-item ${isCorrect ? 'review-correct' : 'review-wrong'}">
                <div class="review-question">${i + 1}. ${q.q}</div>
                <div class="review-answer">
                    ${isCorrect
                        ? `<span class="correct-answer">✅ ${correctAnswer}</span>`
                        : `<span class="your-answer">❌ Bạn chọn: ${userAnswer}</span><br><span class="correct-answer">✅ Đáp án: ${correctAnswer}</span>`
                    }
                </div>
                <div class="review-explanation">💡 ${q.explain}</div>
            </div>
        `;
    }).join('');
}

// ===== CLOSE =====
function closeQuiz() {
    clearInterval(currentQuiz.timerInterval);
    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizSelector').style.display = 'grid';
}

// ===== SCORES =====
const QUIZ_SCORE_KEY = 'dotnet-mastery-quiz-scores';

function saveQuizScore(topic, percent) {
    const scores = JSON.parse(localStorage.getItem(QUIZ_SCORE_KEY) || '{}');
    if (!scores[topic] || percent > scores[topic]) {
        scores[topic] = percent;
    }
    localStorage.setItem(QUIZ_SCORE_KEY, JSON.stringify(scores));
    loadQuizScores();
}

function loadQuizScores() {
    const scores = JSON.parse(localStorage.getItem(QUIZ_SCORE_KEY) || '{}');
    for (const [topic, percent] of Object.entries(scores)) {
        const el = document.getElementById(`score-${topic}`);
        if (el) el.textContent = `Best: ${percent}%`;
    }
}

// ===== UTILS =====
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

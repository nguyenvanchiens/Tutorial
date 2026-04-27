/* ===== INTERVIEW SIMULATION ENGINE ===== */
/* Nhà tuyển dụng .NET Developer — Chặt chẽ, thực tế, PASS/FAIL */

// ===== INTERVIEW ROUNDS CONFIG PER POSITION =====
const positionConfig = {
    fresher: {
        title: 'Fresher .NET Developer',
        salary: '8-12 triệu',
        passScore: 55,
        rounds: [
            { name: 'Kiến thức nền tảng', types: ['knowledge'], count: 5 },
            { name: 'Đọc code & Debug', types: ['read', 'bug'], count: 5 },
            { name: 'Code Challenge', types: ['refactor'], count: 3 }
        ],
        interviewerComments: {
            pass: 'Bạn có nền tảng tốt cho một Fresher. Tôi thấy bạn hiểu được các khái niệm cơ bản của C# và .NET. Với sự hướng dẫn phù hợp, bạn có thể phát triển nhanh trong team.',
            borderline: 'Bạn có một số kiến thức nhưng còn nhiều lỗ hổng cơ bản. Tôi khuyên bạn nên ôn lại C# fundamentals, đặc biệt là OOP và async/await trước khi phỏng vấn lại.',
            fail: 'Thật lòng, bạn cần dành thêm thời gian học nền tảng. Các khái niệm C# cơ bản như value type/reference type, OOP principles, và SQL basics là bắt buộc. Hãy quay lại khi đã vững hơn.'
        }
    },
    junior: {
        title: 'Junior .NET Developer',
        salary: '12-20 triệu',
        passScore: 55,
        rounds: [
            { name: 'Kiến thức kỹ thuật', types: ['knowledge'], count: 5 },
            { name: 'Tìm Bug & Debug', types: ['bug', 'read'], count: 5 },
            { name: 'Code Review & Refactor', types: ['review', 'refactor'], count: 4 }
        ],
        interviewerComments: {
            pass: 'Ấn tượng! Bạn không chỉ biết syntax mà còn hiểu cách áp dụng trong thực tế. Code review skills tốt, biết identify common pitfalls. Tôi tin bạn sẽ contribute được ngay từ sprint đầu tiên.',
            borderline: 'Bạn có kinh nghiệm nhưng một số kiến thức quan trọng vẫn chưa chắc. Đặc biệt về ASP.NET Core middleware pipeline và EF Core behaviors. Cần ôn lại trước khi nhận tasks phức tạp.',
            fail: 'Với vị trí Junior, tôi expect bạn phải tự debug được, hiểu DI, viết được API cơ bản. Nhiều câu hỏi ở level này bạn chưa trả lời được. Suggest: làm 2-3 projects thực tế rồi thử lại.'
        }
    },
    mid: {
        title: 'Middle .NET Developer',
        salary: '20-35 triệu',
        passScore: 60,
        rounds: [
            { name: 'Deep Technical', types: ['knowledge', 'read'], count: 5 },
            { name: 'Bug Hunt & Performance', types: ['bug'], count: 5 },
            { name: 'System Design', types: ['design'], count: 3 },
            { name: 'Tình huống Production', types: ['situation'], count: 3 }
        ],
        interviewerComments: {
            pass: 'Bạn thể hiện tư duy của một dev có kinh nghiệm thực chiến. Biết cách approach vấn đề có hệ thống, hiểu trade-offs, và có thể tự đưa ra technical decisions. Phù hợp để handle features phức tạp independently.',
            borderline: 'Technical skills OK, nhưng tôi chưa thấy depth ở system design và production troubleshooting. Ở level Mid, bạn cần tự xử lý được incidents và thiết kế solutions. Suggest: đọc thêm về distributed patterns và on-call experience.',
            fail: 'Thẳng thắn: nhiều câu hỏi ở level Mid bạn chưa handle được, đặc biệt system design và incident response. Có thể bạn phù hợp hơn ở vị trí Junior tại thời điểm này. Không sao — focus vào building real-world experience.'
        }
    },
    senior: {
        title: 'Senior .NET Developer',
        salary: '35-55 triệu',
        passScore: 65,
        rounds: [
            { name: 'Advanced Technical', types: ['knowledge', 'read'], count: 5 },
            { name: 'Architecture & Design', types: ['design', 'review'], count: 5 },
            { name: 'Production War Stories', types: ['situation', 'bug'], count: 4 },
            { name: 'Leadership & Decision', types: ['leadership', 'situation'], count: 3 }
        ],
        interviewerComments: {
            pass: 'Excellent! Bạn thể hiện đúng mindset của Senior: không chỉ giải quyết vấn đề mà còn nghĩ về maintainability, scalability, và team impact. Tôi đặc biệt ấn tượng với cách bạn evaluate trade-offs. Welcome aboard!',
            borderline: 'Bạn có technical skills tốt nhưng ở level Senior, tôi cần thấy leadership thinking và big-picture decision making mạnh hơn. Bạn approach như một strong developer nhưng chưa phải như một technical leader.',
            fail: 'Ở level Senior, expectations rất cao: architecture decisions, production crisis management, mentoring ability. Nhiều câu hỏi bạn trả lời ở level Mid. Suggest: lead 1-2 projects lớn, on-call experience, và đọc về system design.'
        }
    },
    lead: {
        title: 'Tech Lead / Architect',
        salary: '55-80+ triệu',
        passScore: 65,
        rounds: [
            { name: 'System Architecture', types: ['design'], count: 5 },
            { name: 'Critical Decision Making', types: ['leadership', 'situation'], count: 5 },
            { name: 'Production Crisis', types: ['situation', 'bug'], count: 4 },
            { name: 'Team & Strategy', types: ['leadership'], count: 3 }
        ],
        interviewerComments: {
            pass: 'Bạn có tư duy của một Tech Lead thực thụ. Cách bạn evaluate trade-offs, balance technical debt với business needs, và approach team problems cho thấy kinh nghiệm thực chiến. Tôi tin bạn sẽ define được technical direction cho cả team.',
            borderline: 'Strong technically, nhưng ở level Lead, tôi cần thấy strategic thinking và people management mạnh hơn. Decisions không chỉ về code — mà về team, timeline, business impact. Cần thêm experience leading complex cross-team projects.',
            fail: 'Tech Lead role yêu cầu vision, influence, và crisis management ở level cao nhất. Bạn có nền tảng technical tốt nhưng leadership dimension chưa đủ. Suggest: practice leading initiatives, facilitate architecture discussions, manage cross-team dependencies.'
        }
    }
};

// ===== QUESTION BANK — ORGANIZED BY TYPE & LEVEL =====
const questionBank = [

// ──── KNOWLEDGE (Conceptual) ────
{
    id: 'k-f-1', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'fresher', round: 1,
    title: 'Giải thích sự khác biệt giữa value type và reference type trong C#. Cho ví dụ.',
    interviewer: 'Câu hỏi cơ bản nhưng rất quan trọng. Tôi muốn nghe bạn giải thích bằng lời của mình, không cần hoàn hảo.',
    answerType: 'single', placeholder: 'Value type vs Reference type...',
    hint: 'Nghĩ về: stack vs heap, int/struct vs class, copy vs reference...',
    explanation: 'Value types (int, bool, struct, enum) lưu trên stack, copy toàn bộ giá trị khi gán. Reference types (class, string, array) lưu trên heap, biến chỉ chứa reference (con trỏ).\n\nVí dụ:\nint a = 5; int b = a; b = 10; → a vẫn = 5 (copy)\nList<int> x = new(); var y = x; y.Add(1); → x cũng có 1 phần tử (cùng reference)\n\nĐặc biệt: string là reference type nhưng behave như value type (immutable).',
    keywords: ['stack', 'heap', 'value', 'reference', 'copy', 'struct', 'class', 'int', 'gán', 'con trỏ', 'immutable']
},
{
    id: 'k-f-2', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'fresher', round: 1,
    title: 'Giải thích 4 nguyên tắc OOP: Encapsulation, Inheritance, Polymorphism, Abstraction.',
    interviewer: 'Đừng chỉ định nghĩa — hãy cho tôi ví dụ thực tế trong C# cho mỗi nguyên tắc.',
    answerType: 'single', placeholder: 'Giải thích và ví dụ...',
    hint: 'Encapsulation = private fields + public methods. Inheritance = class con kế thừa class cha. Polymorphism = override methods. Abstraction = abstract class / interface.',
    explanation: '1. Encapsulation: Đóng gói data, dùng private fields + public properties.\n   VD: private decimal _balance; public decimal Balance => _balance;\n\n2. Inheritance: Class con kế thừa class cha.\n   VD: class Dog : Animal { }\n\n3. Polymorphism: Cùng method, hành vi khác nhau.\n   VD: animal.Speak() → Dog: "Woof", Cat: "Meow" (override)\n\n4. Abstraction: Ẩn chi tiết, chỉ expose interface.\n   VD: interface IPayment { Task Pay(decimal amount); } — không cần biết bên trong dùng Stripe hay PayPal.',
    keywords: ['encapsulation', 'private', 'inheritance', 'kế thừa', 'polymorphism', 'override', 'abstract', 'interface', 'đóng gói']
},
{
    id: 'k-f-3', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'fresher', round: 1,
    title: 'Async/await trong C# là gì? Tại sao cần dùng?',
    interviewer: 'Nhiều fresher biết dùng nhưng không hiểu bản chất. Hãy giải thích cho tôi hiểu bạn thực sự nắm được.',
    answerType: 'single', placeholder: 'Giải thích async/await...',
    hint: 'Nghĩ về: non-blocking, thread không bị block khi chờ I/O, Task, ConfigureAwait...',
    explanation: 'async/await cho phép viết code bất đồng bộ (asynchronous) mà đọc giống synchronous.\n\nTại sao cần: Khi gọi database, API, đọc file → thread bị block → lãng phí. Async/await release thread trong khi chờ → thread pool có thể handle request khác.\n\nCách hoạt động:\n- async method trả về Task/Task<T>\n- await "tạm dừng" method, release thread\n- Khi I/O xong → tiếp tục trên thread available\n\nKhông nên: async void (trừ event handlers), .Result/.Wait() (có thể deadlock).',
    keywords: ['bất đồng bộ', 'non-blocking', 'thread', 'Task', 'I/O', 'release', 'thread pool', 'deadlock', 'await', '.Result']
},
{
    id: 'k-j-1', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'junior', round: 1,
    title: 'Giải thích Dependency Injection trong ASP.NET Core. Tại sao cần DI? Ba loại lifetime là gì?',
    interviewer: 'Đây là kiến thức core của ASP.NET Core. Tôi cần bạn giải thích rõ Singleton vs Scoped vs Transient.',
    answerType: 'single', placeholder: 'DI là gì, tại sao cần, 3 lifetime...',
    hint: 'DI = inject dependencies từ bên ngoài thay vì new bên trong. Singleton = 1 instance cả app. Scoped = 1 per request. Transient = mới mỗi lần.',
    explanation: 'DI (Dependency Injection): thay vì class tự tạo dependencies (new), ta inject từ bên ngoài qua constructor.\n\nTại sao:\n- Loose coupling (không phụ thuộc concrete class)\n- Dễ unit test (inject mock)\n- Dễ thay đổi implementation\n\n3 Lifetime:\n1. Singleton: 1 instance cho TOÀN BỘ app. Dùng cho: cache, configuration.\n2. Scoped: 1 instance per HTTP request. Dùng cho: DbContext, service có state per request.\n3. Transient: Instance mới MỖI LẦN inject. Dùng cho: lightweight stateless services.\n\n⚠️ Captive Dependency: KHÔNG inject Scoped vào Singleton!',
    keywords: ['inject', 'constructor', 'loose coupling', 'Singleton', 'Scoped', 'Transient', 'test', 'mock', 'DbContext', 'Captive', 'lifetime']
},
{
    id: 'k-j-2', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'junior', round: 1,
    title: 'Middleware pipeline trong ASP.NET Core hoạt động thế nào? Thứ tự middleware có quan trọng không?',
    interviewer: 'Vẽ cho tôi bức tranh tổng thể: request đi vào, qua các middleware, đến controller, rồi response đi ra.',
    answerType: 'single', placeholder: 'Giải thích middleware pipeline...',
    hint: 'Request → M1 → M2 → M3 → Endpoint → M3 → M2 → M1 → Response. Mỗi middleware có thể short-circuit.',
    explanation: 'Middleware Pipeline: chuỗi các "bộ lọc" xử lý request/response.\n\nFlow: Request → M1 → M2 → ... → Endpoint → ... → M2 → M1 → Response\n(Mô hình Russian Doll — mỗi middleware bọc middleware tiếp theo)\n\nThứ tự RẤT QUAN TRỌNG:\n1. UseExceptionHandler (bắt exception từ tất cả middleware sau)\n2. UseHttpsRedirection\n3. UseStaticFiles\n4. UseRouting\n5. UseCors (phải sau UseRouting, trước UseAuth)\n6. UseAuthentication\n7. UseAuthorization\n8. MapControllers / Endpoints\n\nMỗi middleware có thể:\n- Short-circuit: không gọi next() → dừng pipeline\n- Modify request/response\n- Thực hiện logic trước và sau next()',
    keywords: ['pipeline', 'request', 'response', 'thứ tự', 'short-circuit', 'next', 'UseAuthentication', 'UseAuthorization', 'UseRouting', 'Russian Doll']
},
{
    id: 'k-m-1', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'mid', round: 1,
    title: 'Giải thích CQRS pattern. Khi nào nên dùng, khi nào không?',
    interviewer: 'Tôi không muốn định nghĩa Wikipedia. Hãy cho tôi biết bạn đã áp dụng nó thế nào trong thực tế.',
    answerType: 'single', placeholder: 'CQRS là gì, khi nào nên/không nên...',
    hint: 'Command (write) vs Query (read) separate. Phức tạp thêm nhưng scalable. Thường đi kèm MediatR, Event Sourcing.',
    explanation: 'CQRS (Command Query Responsibility Segregation): Tách riêng model cho Read và Write.\n\nCommand (Write): CreateOrderCommand → validation → write to DB\nQuery (Read): GetOrdersQuery → read from optimized read model\n\nKhi NÊN dùng:\n- Read/Write có patterns rất khác nhau\n- Cần optimize read performance riêng (materialized views)\n- Complex domain logic\n- High-scale systems (scale read independently)\n\nKhi KHÔNG nên:\n- CRUD đơn giản → over-engineering\n- Team nhỏ, domain đơn giản\n- Prototype/MVP\n\nThường kết hợp: MediatR (handler pattern), Event Sourcing (store events instead of state), separate read DB.\n\nTrade-off: Complexity tăng, eventual consistency, debugging khó hơn.',
    keywords: ['Command', 'Query', 'separate', 'read model', 'write', 'MediatR', 'Event Sourcing', 'scalable', 'over-engineering', 'trade-off', 'eventual consistency']
},
{
    id: 'k-m-2', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'mid', round: 1,
    title: 'Transaction Isolation Levels trong SQL Server là gì? Giải thích từng level và khi nào dùng.',
    interviewer: 'Câu hỏi kinh điển mà nhiều Mid-level vẫn lơ mơ. Tôi cần bạn giải thích dirty read, phantom read, non-repeatable read.',
    answerType: 'single', placeholder: 'Isolation levels và vấn đề đồng thời...',
    hint: 'Read Uncommitted → Read Committed → Repeatable Read → Serializable → Snapshot. Mỗi level trade-off giữa consistency và performance.',
    explanation: 'Vấn đề concurrency:\n- Dirty Read: đọc data chưa commit (có thể rollback)\n- Non-Repeatable Read: cùng query, 2 lần đọc khác nhau (data bị update giữa chừng)\n- Phantom Read: query lần 2 có thêm/bớt rows\n\nIsolation Levels:\n1. Read Uncommitted: Cho phép tất cả → nhanh nhất, dirty nhất\n2. Read Committed (DEFAULT): Chặn dirty read. Đủ cho đa số cases.\n3. Repeatable Read: Chặn dirty + non-repeatable. Lock rows đã đọc.\n4. Serializable: Chặn tất cả. Range lock. Chậm nhất.\n5. Snapshot (MVCC): Mỗi transaction thấy snapshot tại thời điểm bắt đầu. Không lock.\n\nThực tế: Read Committed + optimistic concurrency (RowVersion) cho đa số apps.',
    keywords: ['dirty read', 'phantom', 'non-repeatable', 'Read Committed', 'Serializable', 'Snapshot', 'MVCC', 'lock', 'RowVersion', 'optimistic']
},
{
    id: 'k-s-1', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'senior', round: 1,
    title: 'So sánh Event-Driven Architecture vs Request-Driven Architecture. Trade-offs trong thực tế?',
    interviewer: 'Ở level Senior, tôi expect bạn không chỉ hiểu concepts mà còn evaluate trade-offs cho từng context cụ thể.',
    answerType: 'single', placeholder: 'So sánh, trade-offs, khi nào dùng...',
    hint: 'Request-driven: synchronous, simple, coupled. Event-driven: async, decoupled, eventual consistency, complex debugging.',
    explanation: 'Request-Driven: Service A gọi trực tiếp Service B (HTTP/gRPC).\n+ Simple, dễ debug, strong consistency\n- Tight coupling, cascade failures, latency chain\n\nEvent-Driven: Service A publish event, Service B subscribe.\n+ Loose coupling, resilient, scalable independently\n- Eventual consistency, complex debugging, event ordering issues\n\nTrade-offs thực tế:\n- Tracing: Request-driven dùng correlation ID dễ. Event-driven cần distributed tracing (Jaeger, Zipkin).\n- Error handling: Request → immediate error. Event → dead letter queue, retry policies.\n- Data consistency: Request → strong (if synchronous). Event → eventual (compensating transactions).\n\nRecommendation:\n- Internal module communication: request-driven (simple)\n- Cross-boundary/async workflows: event-driven\n- Hybrid approach is most common in practice',
    keywords: ['synchronous', 'event', 'decouple', 'eventual consistency', 'cascade', 'dead letter', 'distributed tracing', 'compensating', 'hybrid', 'trade-off']
},

// ──── READ CODE ────
{
    id: 'r-f-1', type: 'read', typeName: 'ĐỌC CODE', level: 'fresher', round: 2,
    title: 'Đoạn code sau in ra gì?',
    interviewer: 'Tôi muốn xem bạn trace code trong đầu được không. Giải thích từng bước.',
    code: `int x = 5;\nint y = x++;\nint z = ++x;\nConsole.WriteLine($"{x} {y} {z}");`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Output và giải thích từng bước...',
    hint: 'x++ gán trước rồi tăng. ++x tăng trước rồi gán.',
    explanation: 'y = x++ → y = 5 (gán TRƯỚC), x tăng thành 6\nz = ++x → x tăng thành 7 (tăng TRƯỚC), z = 7\n\nOutput: "7 5 7"',
    keywords: ['7 5 7', 'post-increment', 'pre-increment', 'x++', '++x', 'gán trước', 'tăng trước']
},
{
    id: 'r-f-2', type: 'read', typeName: 'ĐỌC CODE', level: 'fresher', round: 2,
    title: 'Đoạn code sau throw exception gì?',
    interviewer: 'Đây là lỗi rất phổ biến mà fresher hay mắc.',
    code: `List<int> nums = new List<int> { 1, 2, 3, 4, 5 };\nforeach (var n in nums)\n{\n    if (n == 3)\n        nums.Remove(n);\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Exception gì và tại sao...',
    hint: 'Có thể modify collection trong khi đang iterate bằng foreach không?',
    explanation: 'InvalidOperationException: "Collection was modified; enumeration operation may not execute."\n\nforeach dùng IEnumerator. Khi collection bị modify (Remove), enumerator detect version change → throw.\n\nFix: dùng for loop ngược, RemoveAll(), hoặc .ToList() trước khi iterate.',
    keywords: ['InvalidOperationException', 'modified', 'enumeration', 'foreach', 'enumerator', 'version', 'RemoveAll']
},
{
    id: 'r-j-1', type: 'read', typeName: 'ĐỌC CODE', level: 'junior', round: 2,
    title: 'Output và thứ tự in ra?',
    interviewer: 'Async execution order — một trong những câu hỏi yêu thích của tôi.',
    code: `async Task Main()\n{\n    Console.WriteLine("1");\n    var task = DoWork();\n    Console.WriteLine("2");\n    await task;\n    Console.WriteLine("3");\n}\n\nasync Task DoWork()\n{\n    Console.WriteLine("A");\n    await Task.Delay(100);\n    Console.WriteLine("B");\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Thứ tự output...',
    hint: 'async method chạy synchronously đến await đầu tiên.',
    explanation: '1 → A → 2 → B → 3\n\n1. In "1"\n2. Gọi DoWork() → chạy sync, in "A"\n3. await Task.Delay → DoWork pause, trả control về Main\n4. Main in "2"\n5. await task → chờ DoWork xong, in "B"\n6. In "3"',
    keywords: ['1', 'A', '2', 'B', '3', 'synchronous', 'await', 'control', 'pause']
},
{
    id: 'r-m-1', type: 'read', typeName: 'ĐỌC CODE', level: 'mid', round: 1,
    title: 'Đoạn code closure sau output gì?',
    interviewer: 'Closure bugs là một trong những lỗi khó detect nhất.',
    code: `var actions = new List<Action>();\nfor (int i = 0; i < 3; i++)\n{\n    actions.Add(() => Console.Write(i + " "));\n}\nforeach (var a in actions) a();`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Output và giải thích...',
    hint: 'Lambda capture biến i bằng reference. Giá trị của i sau vòng for?',
    explanation: 'Output: "3 3 3"\n\nClosure capture BIẾN i (reference), không phải VALUE. Sau vòng for, i = 3. Cả 3 lambda đều reference cùng biến i.\n\nFix: int local = i; bên trong loop.',
    keywords: ['3 3 3', 'closure', 'capture', 'reference', 'biến', 'local', 'value']
},
{
    id: 'r-s-1', type: 'read', typeName: 'ĐỌC CODE', level: 'senior', round: 1,
    title: 'DI lifetime: output là gì?',
    interviewer: 'Câu này phân biệt rõ ai hiểu DI thực sự.',
    code: `// Singleton<ServiceA>, Scoped<ServiceB>, Transient<ServiceC>\n// Mỗi service có Guid Id = Guid.NewGuid();\n\n[HttpGet]\npublic IActionResult Get(\n    [FromServices] ServiceA a1, [FromServices] ServiceA a2,\n    [FromServices] ServiceB b1, [FromServices] ServiceB b2,\n    [FromServices] ServiceC c1, [FromServices] ServiceC c2)\n{\n    return Ok(new {\n        A_Same = a1.Id == a2.Id,\n        B_Same = b1.Id == b2.Id,\n        C_Same = c1.Id == c2.Id\n    });\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Giá trị A_Same, B_Same, C_Same...',
    hint: 'Singleton = 1 per app, Scoped = 1 per request, Transient = 1 per injection.',
    explanation: 'A_Same: True (Singleton — cùng instance cả app)\nB_Same: True (Scoped — cùng instance trong 1 request)\nC_Same: False (Transient — mỗi lần inject = instance mới)\n\n⚠️ Captive Dependency: Singleton KHÔNG inject Scoped!',
    keywords: ['True', 'True', 'False', 'Singleton', 'Scoped', 'Transient', 'instance', 'Captive']
},

// ──── BUG HUNT ────
{
    id: 'b-f-1', type: 'bug', typeName: 'TÌM BUG', level: 'fresher', round: 2,
    title: 'Code async này có vấn đề gì nghiêm trọng?',
    interviewer: 'Lỗi này có thể crash cả application trong production.',
    code: `public async void SaveDataAsync(Data data)\n{\n    await _repo.SaveAsync(data);\n    await _cache.InvalidateAsync(data.Key);\n}\n\n[HttpPost]\npublic IActionResult Save(Data data)\n{\n    _service.SaveDataAsync(data);\n    return Ok("Saved!");\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Bug gì và cách fix...',
    hint: 'async void vs async Task. Fire-and-forget.',
    explanation: '1. async void: exception KHÔNG được catch → crash app!\n2. Fire-and-forget: return "Saved!" TRƯỚC KHI save xong\n3. Request context disposed trước khi operation hoàn thành\n\nFix: async Task + await trong controller.',
    keywords: ['async void', 'async Task', 'fire-and-forget', 'exception', 'crash', 'await', 'disposed']
},
{
    id: 'b-j-1', type: 'bug', typeName: 'TÌM BUG', level: 'junior', round: 2,
    title: 'API này có những lỗ hổng security nào?',
    interviewer: 'Tôi muốn xem bạn phát hiện được bao nhiêu issues.',
    code: `[HttpPost("users")]\npublic async Task<User> CreateUser(User user)\n{\n    user.Password = user.Password;\n    _db.Users.Add(user);\n    await _db.SaveChangesAsync();\n    return user;\n}\n\n[HttpGet("users/{id}")]\npublic async Task<User> GetUser(string id)\n{\n    return await _db.Users.FindAsync(id);\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Liệt kê tất cả bugs...',
    hint: 'Password storage, null handling, response data, status codes, validation...',
    explanation: '1. Password lưu plain text → phải hash (BCrypt)\n2. Return user kèm password → data exposure\n3. GetUser không check null → trả 200 với null thay vì 404\n4. Không validate input\n5. POST nên return 201 Created, không phải 200\n6. Không dùng DTO → expose internal model',
    keywords: ['hash', 'password', 'plain text', 'null', '404', 'DTO', 'validation', '201', 'Created', 'exposure', 'BCrypt']
},
{
    id: 'b-j-2', type: 'bug', typeName: 'TÌM BUG', level: 'junior', round: 2,
    title: 'Code EF Core này có N+1 query problem. Fix thế nào?',
    interviewer: 'N+1 là performance killer phổ biến nhất. Tôi cần bạn giải thích VÀ viết code fix.',
    code: `public async Task<List<OrderDto>> GetOrders()\n{\n    var orders = await _db.Orders.ToListAsync();\n    var result = new List<OrderDto>();\n    foreach (var order in orders)\n    {\n        var customer = await _db.Customers.FindAsync(order.CustomerId);\n        result.Add(new OrderDto {\n            Id = order.Id,\n            CustomerName = customer.Name,\n            Total = order.Total\n        });\n    }\n    return result;\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Giải thích N+1 và code fix...',
    hint: '100 orders = 101 queries. Dùng Include() hoặc Join.',
    explanation: 'N+1: 1 query orders + N queries customers.\n100 orders = 101 queries!\n\nFix:\nvar orders = await _db.Orders\n    .Include(o => o.Customer)\n    .Select(o => new OrderDto { Id = o.Id, CustomerName = o.Customer.Name, Total = o.Total })\n    .ToListAsync();\n→ 1 query duy nhất.',
    keywords: ['N+1', 'Include', 'eager loading', 'JOIN', 'Select', '101', 'query', 'ToListAsync']
},
{
    id: 'b-m-1', type: 'bug', typeName: 'TÌM BUG', level: 'mid', round: 2,
    title: 'Race condition ở đâu? Sẽ gây hậu quả gì?',
    interviewer: 'Concurrency bugs — loại bug khó nhất, production mới thấy.',
    code: `public class Counter\n{\n    private int _count = 0;\n    public void Increment()\n    {\n        if (_count < 100) { _count++; }\n    }\n}\n// Parallel.For(0, 200, i => counter.Increment());`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Race condition và solution...',
    hint: 'Check-then-act pattern. Hai threads cùng đọc _count = 99.',
    explanation: 'Race condition: check + act KHÔNG atomic.\n\nThread A đọc _count=99, Thread B cũng đọc =99. Cả hai pass check, cả hai increment → _count=101.\n\nFix: lock(_lock) { if (_count < 100) _count++; }\nHoặc: Interlocked.CompareExchange cho lock-free approach.',
    keywords: ['race condition', 'atomic', 'lock', 'Interlocked', 'check-then-act', 'concurrent', '101']
},
{
    id: 'b-m-2', type: 'bug', typeName: 'TÌM BUG', level: 'mid', round: 2,
    title: 'HttpClient bug — sẽ gây vấn đề gì trong production?',
    interviewer: 'Rất nhiều team đã bị production incident vì lỗi này.',
    code: `public class PaymentService : IPaymentService\n{\n    private readonly HttpClient _client;\n    public PaymentService()\n    {\n        _client = new HttpClient();\n        _client.BaseAddress = new Uri("https://api.payment.com");\n    }\n    // Registered as Scoped\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Vấn đề và cách fix đúng...',
    hint: 'new HttpClient() mỗi request → TCP connection. Scoped = mỗi request tạo mới.',
    explanation: 'Socket Exhaustion: Mỗi request tạo HttpClient mới → TCP connection mới → sockets ở TIME_WAIT → SocketException.\n\nFix: IHttpClientFactory\nbuilder.Services.AddHttpClient<IPaymentService, PaymentService>(c => { c.BaseAddress = ...; });\n\nIHttpClientFactory quản lý connection pooling, DNS refresh.',
    keywords: ['socket exhaustion', 'IHttpClientFactory', 'TCP', 'TIME_WAIT', 'connection pool', 'DNS', 'Scoped']
},
{
    id: 'b-s-1', type: 'bug', typeName: 'TÌM BUG', level: 'senior', round: 3,
    title: 'Memory leak ở đâu? Giải thích cơ chế.',
    interviewer: 'Memory leak trong .NET — nhiều người tưởng GC lo hết, nhưng không phải.',
    code: `public class EventService\n{\n    private static event Action<string> OnUserLogin;\n    public void Subscribe(Action<string> handler) { OnUserLogin += handler; }\n}\n\n// Scoped service:\npublic class DashboardService\n{\n    public DashboardService(EventService events)\n    {\n        events.Subscribe(user => UpdateDashboard(user));\n    }\n    private void UpdateDashboard(string user) { }\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Memory leak mechanism và fix...',
    hint: 'Static event + scoped service. Mỗi request subscribe nhưng không bao giờ unsubscribe.',
    explanation: 'Static event giữ reference đến mọi subscriber. Scoped DashboardService subscribe mỗi request nhưng không unsubscribe → GC không thu hồi → memory leak.\n\n10,000 requests = 10,000 instances không bao giờ GC.\n\nFix: IDisposable + unsubscribe, hoặc WeakReference, hoặc đổi sang Scoped event.',
    keywords: ['memory leak', 'static', 'event', 'scoped', 'unsubscribe', 'IDisposable', 'GC', 'WeakReference', 'reference']
},
{
    id: 'b-s-2', type: 'bug', typeName: 'TÌM BUG', level: 'senior', round: 3,
    title: 'Deadlock scenario — mô tả và fix.',
    interviewer: 'Bạn đã gặp deadlock trong production chưa? Hãy phân tích đoạn code này.',
    code: `public async Task TransferMoney(int fromId, int toId, decimal amount)\n{\n    using var tx = await _db.Database.BeginTransactionAsync();\n    var from = await _db.Accounts.FindAsync(fromId);\n    from.Balance -= amount;\n    await _db.SaveChangesAsync();\n    var to = await _db.Accounts.FindAsync(toId);\n    to.Balance += amount;\n    await _db.SaveChangesAsync();\n    await tx.CommitAsync();\n}\n// Thread1: Transfer(1, 2, 100)  Thread2: Transfer(2, 1, 50)`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Deadlock scenario và solutions...',
    hint: 'Thread1 lock account1, Thread2 lock account2. Cả hai chờ nhau.',
    explanation: 'Classic deadlock:\n1. T1 locks Account1 (SaveChanges → row lock)\n2. T2 locks Account2\n3. T1 needs Account2 (T2 holds) → WAIT\n4. T2 needs Account1 (T1 holds) → WAIT → DEADLOCK\n\nFix 1: Consistent lock order (luôn lock ID nhỏ trước)\nFix 2: Single SaveChanges (update cả hai rồi save 1 lần)\nFix 3: Optimistic concurrency (RowVersion)',
    keywords: ['deadlock', 'lock order', 'row lock', 'consistent', 'atomic', 'SaveChanges', 'optimistic', 'RowVersion']
},

// ──── REFACTOR ────
{
    id: 'ref-j-1', type: 'refactor', typeName: 'REFACTOR', level: 'junior', round: 3,
    title: 'Refactor đoạn code này cho clean hơn.',
    interviewer: 'Code "chạy được" nhưng violate SOLID. Viết lại cho tôi.',
    code: `public decimal CalculateDiscount(string customerType, decimal amount)\n{\n    if (customerType == "Regular")\n    {\n        if (amount > 1000) return amount * 0.05m;\n        else return 0;\n    }\n    else if (customerType == "Premium")\n    {\n        if (amount > 500) return amount * 0.10m;\n        else return amount * 0.05m;\n    }\n    else if (customerType == "VIP")\n    {\n        if (amount > 500) return amount * 0.20m;\n        else return amount * 0.10m;\n    }\n    return 0;\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Viết lại code...',
    hint: 'Strategy Pattern. Interface IDiscountStrategy. Mỗi customer type = 1 class.',
    explanation: 'Problems: OCP violation, string comparison, nested if/else.\n\nRefactored:\ninterface IDiscountStrategy { decimal Calculate(decimal amount); }\nclass VipDiscount : IDiscountStrategy { ... }\n\nDictionary<string, IDiscountStrategy> → lookup and calculate.',
    keywords: ['Strategy', 'interface', 'OCP', 'Open/Closed', 'Dictionary', 'SOLID', 'pattern', 'polymorphism']
},
{
    id: 'ref-j-2', type: 'refactor', typeName: 'REFACTOR', level: 'junior', round: 3,
    title: 'Refactor sang LINQ clean hơn.',
    interviewer: 'Imperative → Declarative. Cho tôi thấy bạn viết LINQ thành thạo.',
    code: `public List<string> GetActiveUserEmails(List<User> users)\n{\n    var result = new List<string>();\n    for (int i = 0; i < users.Count; i++)\n    {\n        if (users[i] != null && users[i].IsActive == true\n            && users[i].Email != null && users[i].Email != "")\n        {\n            if (!result.Contains(users[i].Email.ToLower()))\n                result.Add(users[i].Email.ToLower());\n        }\n    }\n    result.Sort();\n    return result;\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Viết lại bằng LINQ...',
    hint: 'Where → Select → Distinct → OrderBy → ToList.',
    explanation: 'users.Where(u => u is { IsActive: true, Email.Length: > 0 })\n  .Select(u => u.Email.ToLower())\n  .Distinct().OrderBy(e => e).ToList();\n\n1 line thay 15 lines. Distinct O(1) thay vì Contains O(n).',
    keywords: ['LINQ', 'Where', 'Select', 'Distinct', 'OrderBy', 'pipeline', 'pattern matching', 'declarative']
},
{
    id: 'ref-m-1', type: 'refactor', typeName: 'REFACTOR', level: 'mid', round: 3,
    title: 'Refactor exception handling → Result pattern.',
    interviewer: 'Bạn nghĩ gì về việc dùng exceptions cho business logic?',
    code: `public async Task<Order> PlaceOrder(OrderRequest req)\n{\n    try {\n        var user = await _userService.GetUser(req.UserId);\n        if (user == null) throw new Exception("User not found");\n        var product = await _productService.GetProduct(req.ProductId);\n        if (product == null) throw new Exception("Product not found");\n        if (product.Stock < req.Quantity) throw new Exception("Out of stock");\n        // ... create order\n        return order;\n    } catch (Exception ex) {\n        _logger.LogError(ex, "Order failed");\n        throw;\n    }\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Refactor dùng Result pattern...',
    hint: 'Exception = exceptional. Business rules (out of stock) → Result<T> pattern.',
    explanation: 'Result<T> pattern:\nreturn Result<Order>.Fail("User not found");\n\nNo exceptions for expected cases. Explicit error handling. Better performance (no stack trace overhead).',
    keywords: ['Result pattern', 'Result<T>', 'no exception', 'business logic', 'explicit', 'performance', 'Fail', 'Ok']
},

// ──── CODE REVIEW ────
{
    id: 'rev-j-1', type: 'review', typeName: 'CODE REVIEW', level: 'junior', round: 3,
    title: 'Review PR: JWT Auth middleware. APPROVE hay REJECT?',
    interviewer: 'Đây là PR từ một junior trong team. Bạn là reviewer.',
    code: `public async Task InvokeAsync(HttpContext context)\n{\n    var token = context.Request.Headers["Authorization"];\n    if (string.IsNullOrEmpty(token))\n    {\n        context.Response.StatusCode = 401;\n        return;\n    }\n    try {\n        var handler = new JwtSecurityTokenHandler();\n        var key = "MySecretKey12345"; // TODO: move to config\n        var validationParams = new TokenValidationParameters\n        {\n            ValidateIssuer = false,\n            ValidateAudience = false,\n            ValidateLifetime = false,\n            IssuerSigningKey = new SymmetricSecurityKey(\n                Encoding.UTF8.GetBytes(key))\n        };\n        var principal = handler.ValidateToken(token, validationParams, out _);\n        context.User = principal;\n    } catch {\n        context.Response.StatusCode = 401;\n    }\n    await _next(context);\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'APPROVE / REJECT? Liệt kê issues...',
    hint: 'Hardcoded secret, ValidateLifetime=false, no Bearer prefix strip, catch-all...',
    explanation: 'REJECT:\n1. Hardcoded secret → Key Vault\n2. ValidateLifetime=false → expired tokens vẫn valid!\n3. ValidateIssuer/Audience=false → any JWT passes\n4. Không strip "Bearer " prefix\n5. Catch-all exception\n6. Nên dùng built-in AddJwtBearer()',
    keywords: ['REJECT', 'hardcoded', 'ValidateLifetime', 'Bearer', 'catch', 'Key Vault', 'AddJwtBearer', 'security', 'expired']
},
{
    id: 'rev-m-1', type: 'review', typeName: 'CODE REVIEW', level: 'mid', round: 2,
    title: 'Review: File upload endpoint. Security issues?',
    interviewer: 'Security-focused review. Tìm tất cả vulnerabilities.',
    code: `[HttpPost("upload")]\npublic async Task<IActionResult> Upload(IFormFile file)\n{\n    var path = Path.Combine("wwwroot/uploads", file.FileName);\n    using var stream = new FileStream(path, FileMode.Create);\n    await file.CopyToAsync(stream);\n    return Ok(new { url = $"/uploads/{file.FileName}" });\n}`,
    codeLang: 'C#', answerType: 'single', placeholder: 'Liệt kê security issues...',
    hint: 'Path traversal, file type, size limit, original filename...',
    explanation: '1. Path Traversal: "../../etc/passwd" → ghi đè system files!\n2. No file type validation → upload .exe, .aspx → RCE!\n3. No size limit → DoS\n4. Lưu trong wwwroot → directly accessible\n5. Original filename → collision, info disclosure\n6. No virus scan, no magic bytes check',
    keywords: ['path traversal', 'file type', 'whitelist', 'size limit', 'wwwroot', 'RCE', 'DoS', 'GUID', 'magic bytes']
},

// ──── SYSTEM DESIGN ────
{
    id: 'd-m-1', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'mid', round: 3,
    title: 'Thiết kế hệ thống Notification (Email, SMS, Push) cho e-commerce.',
    interviewer: 'Requirements: multi-channel, 10K/phút peak, retry on failure, user preferences.',
    answerType: 'multi',
    parts: [
        { label: 'Architecture tổng quan', placeholder: 'Các components chính...' },
        { label: 'Xử lý reliability & scale', placeholder: 'Retry, queue, scale...' }
    ],
    hint: 'Message queue → Channel consumers. Mỗi channel là consumer riêng.',
    explanation: 'Event Source → Message Queue → Fan-out per channel:\n- Email Consumer → SendGrid\n- SMS Consumer → Twilio\n- Push Consumer → FCM\n\nReliability: Retry w/ backoff, Dead Letter Queue, idempotency key, circuit breaker.\nScale: Horizontal scale consumers, rate limiting per channel.',
    keywords: ['message queue', 'RabbitMQ', 'consumer', 'retry', 'dead letter', 'circuit breaker', 'idempotency', 'fan-out', 'scale']
},
{
    id: 'd-s-1', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'senior', round: 2,
    title: 'Thiết kế Rate Limiter middleware cho distributed API.',
    interviewer: 'Algorithm choice, distributed state, burst handling. Giải thích trade-offs.',
    answerType: 'multi',
    parts: [
        { label: 'Algorithm & tại sao', placeholder: 'Token Bucket? Sliding Window? Lý do...' },
        { label: 'Distributed implementation', placeholder: 'Sync state giữa nhiều servers...' }
    ],
    hint: 'Sliding Window Counter + Redis. Lua script cho atomicity.',
    explanation: 'Sliding Window Counter: balanced accuracy & memory.\n\nDistributed: Redis INCR + EXPIRE (atomic via Lua script).\nKey: "ratelimit:{userId}:{endpoint}:{window}"\nHeaders: X-RateLimit-Limit, Remaining, Retry-After\nReturn 429 when exceeded.',
    keywords: ['Sliding Window', 'Token Bucket', 'Redis', 'INCR', 'Lua', 'distributed', '429', 'burst', 'middleware']
},
{
    id: 'd-s-2', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'senior', round: 2,
    title: 'Thiết kế order processing đảm bảo consistency giữa microservices.',
    interviewer: 'Order → Inventory → Payment. Payment fail → hoàn lại inventory. Không dùng 2PC.',
    answerType: 'multi',
    parts: [
        { label: 'Pattern chọn & flow', placeholder: 'Saga? Orchestration? Choreography?...' },
        { label: 'Error handling & compensation', placeholder: 'Khi payment fail...' }
    ],
    hint: 'Saga pattern: orchestration. Compensating transactions. Outbox pattern.',
    explanation: 'Saga Orchestration:\n1. CreateOrder(Pending)\n2. ReserveItems\n3. ChargePayment\n\nCompensation: Payment fail → ReleaseItems → CancelOrder.\n\nReliability: Outbox pattern, idempotency, retry w/ backoff, state machine per saga.',
    keywords: ['Saga', 'orchestration', 'compensation', 'outbox', 'idempotent', 'eventual consistency', 'state machine', 'retry']
},
{
    id: 'd-l-1', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'lead', round: 1,
    title: 'Thiết kế Real-time Dashboard (orders/phút, revenue, active users) — không impact main app.',
    interviewer: 'End-to-end: data pipeline, aggregation, delivery to 500 concurrent users.',
    answerType: 'multi',
    parts: [
        { label: 'Data Pipeline', placeholder: 'Source → Processing → Storage...' },
        { label: 'Real-time delivery to clients', placeholder: 'Push mechanism...' },
        { label: 'Architecture components', placeholder: 'Mô tả flow...' }
    ],
    hint: 'CDC/Events → Stream Processing → Redis → SignalR → Browser.',
    explanation: 'DB → CDC (Debezium) → Kafka → Aggregation Service → Redis → SignalR Hub → Browser.\n\nAggregation: sliding window counters, HyperLogLog for active users.\nDelivery: SignalR WebSocket, push every 5s.\nSeparate pipeline = no impact on main app.',
    keywords: ['CDC', 'SignalR', 'WebSocket', 'aggregate', 'Redis', 'Kafka', 'streaming', 'HyperLogLog', 'real-time']
},

// ──── SITUATION / INCIDENT ────
{
    id: 's-m-1', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'mid', round: 4,
    title: 'API response time tăng từ 200ms lên 5 giây. Bạn là on-call.',
    interviewer: 'Alert vừa fire. Users đang complain. Bạn xử lý step-by-step thế nào?',
    description: 'Thông tin: .NET 8 API, 3 pods K8s, SQL Server, Redis. Không có deployment gần đây. CPU/Memory bình thường.',
    answerType: 'multi',
    parts: [
        { label: 'Bước 1: Xác định phạm vi', placeholder: 'Check gì trước...' },
        { label: 'Bước 2: Thu hẹp nguyên nhân', placeholder: 'Debug thế nào...' },
        { label: 'Bước 3: Mitigation & Fix', placeholder: 'Giảm impact ngay...' }
    ],
    hint: 'Scope → Triage → Mitigate → Fix. Check DB connections, Redis, external deps.',
    explanation: 'Scope: Tất cả endpoints hay một số?\nTriage: DB connection pool, slow queries, Redis health, external API timeouts, thread pool starvation.\nMitigate: Scale pods, fallback cache, rate limiting.\nFix: Root cause + monitoring + postmortem.',
    keywords: ['connection pool', 'slow query', 'Redis', 'monitoring', 'scale', 'circuit breaker', 'deadlock', 'thread pool', 'postmortem']
},
{
    id: 's-s-1', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'senior', round: 3,
    title: 'JWT secret key bị leak lên GitHub public repo cách đây 2 ngày.',
    interviewer: 'Bots đã crawl được. Bạn xử lý gì ngay lập tức?',
    answerType: 'multi',
    parts: [
        { label: 'Immediate (0-30 phút)', placeholder: 'Hành động khẩn cấp...' },
        { label: 'Short-term (1-4h)', placeholder: 'Audit và secure...' },
        { label: 'Long-term prevention', placeholder: 'Ngăn tái diễn...' }
    ],
    hint: 'Rotate ALL secrets. Revoke tokens. Check audit logs. Pre-commit hooks.',
    explanation: 'Immediate: Rotate JWT secret + DB password. Revoke all sessions.\nShort-term: Audit logs, check data exfiltration, remove from git history.\nLong-term: Secrets Manager (Key Vault), pre-commit hooks (gitleaks), CI secret scanning, .gitignore.',
    keywords: ['rotate', 'revoke', 'audit log', 'Key Vault', 'Secrets Manager', 'pre-commit', 'gitleaks', 'git filter-branch']
},
{
    id: 's-s-2', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'senior', round: 3,
    title: 'Database migration fail trên Production giữa chừng.',
    interviewer: 'Migration thêm NOT NULL column vào bảng 10 triệu rows. Fail ở bước UPDATE. Website lỗi.',
    answerType: 'multi',
    parts: [
        { label: 'Xử lý ngay', placeholder: 'Website hoạt động lại...' },
        { label: 'Fix data', placeholder: 'Fix column mới...' },
        { label: 'Prevent tương lai', placeholder: 'Deploy migration an toàn...' }
    ],
    hint: 'Rollback code hoặc set DEFAULT. UPDATE in batches. Expand-contract pattern.',
    explanation: 'Ngay: Rollback code hoặc ALTER COLUMN SET DEFAULT.\nFix: UPDATE TOP(1000) in batches → không lock bảng.\nPrevent: Expand-contract pattern — add nullable → deploy code → backfill → add constraint.',
    keywords: ['rollback', 'DEFAULT', 'batches', 'expand-contract', 'nullable', 'backward compatible', 'staging']
},

// ──── LEADERSHIP ────
{
    id: 'l-s-1', type: 'leadership', typeName: 'LEADERSHIP', level: 'senior', round: 4,
    title: 'Junior trong team liên tục merge code có bugs. Bạn xử lý thế nào?',
    interviewer: 'Đây không chỉ là vấn đề technical. Tôi muốn xem soft skills của bạn.',
    answerType: 'single', placeholder: 'Approach xử lý...',
    hint: 'Không blame. Tìm root cause: thiếu knowledge? Thiếu process? Thiếu review?',
    explanation: 'Approach:\n1. Private 1-on-1: tìm hiểu root cause (knowledge gap? Rushing? Unclear requirements?)\n2. Strengthen process: mandatory code review, CI/CD gates, minimum test coverage\n3. Pairing/mentoring: pair với junior on complex tasks\n4. Đặt expectations rõ ràng nhưng supportive\n5. Track improvement over time\n6. Recognize progress\n\nKhông: blame publicly, assign blame, remove from project immediately.',
    keywords: ['1-on-1', 'root cause', 'code review', 'pairing', 'mentor', 'expectation', 'process', 'CI/CD', 'supportive', 'knowledge gap']
},
{
    id: 'l-l-1', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 2,
    title: 'Monolith đang chậm. Team muốn chuyển Microservices vì "ai cũng dùng". Bạn recommend gì?',
    interviewer: 'Team 8 người, 200K LOC, 5 năm tuổi. Business muốn ship nhanh hơn.',
    answerType: 'multi',
    parts: [
        { label: 'Phân tích trước khi quyết định', placeholder: 'Evaluate gì...' },
        { label: 'Recommendation', placeholder: 'Nên làm gì...' },
        { label: 'Execution plan', placeholder: 'Các bước...' }
    ],
    hint: 'Performance ≠ cần Microservices. 8 người = chưa cần. Modular Monolith first.',
    explanation: 'Analysis: Performance issue → profile first, có thể fix bằng cache/DB optimization.\n8 người chưa cần microservices (Conway\'s Law).\n\nRecommend: Modular Monolith → Microservices (nếu cần).\n\nPhase 1: Performance fixes (cache, query optimization)\nPhase 2: Modular Monolith (clear boundaries)\nPhase 3: Extract services only where needed (Strangler Fig)',
    keywords: ['Modular Monolith', 'profiling', 'Conway', 'Strangler Fig', 'cache', 'boundaries', 'performance', 'over-engineering']
},
{
    id: 'l-l-2', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 2,
    title: 'PM muốn skip testing để kịp deadline. CTO muốn quality. Bạn xử lý thế nào?',
    interviewer: 'Classic conflict. Tôi muốn xem cách bạn navigate stakeholder disagreement.',
    answerType: 'single', placeholder: 'Approach xử lý conflict...',
    hint: 'Không chọn side. Tìm giải pháp win-win. Quantify risk vs benefit.',
    explanation: 'Approach:\n1. Lắng nghe cả hai sides: PM lo deadline, CTO lo quality\n2. Quantify: "Skip testing saves 3 days but risk Y bugs in production = Z hours hotfix + customer impact"\n3. Propose compromise: test critical paths only, automate smoke tests, staged rollout with monitoring\n4. Risk-based testing: focus testing vào high-risk areas\n5. Đề xuất: ship MVP with monitoring → iterate\n6. Document decision & risks for accountability\n\nKey: không chọn phe, data-driven decision, protect the team.',
    keywords: ['risk', 'quantify', 'compromise', 'critical path', 'staged rollout', 'monitoring', 'MVP', 'data-driven', 'stakeholder']
},
{
    id: 'l-l-3', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 4,
    title: 'Bạn vừa nhận dự án mới: xây dựng platform xử lý 1 triệu transactions/ngày. Team 5 người. Stack choice?',
    interviewer: 'Tôi muốn nghe cách bạn approach một greenfield project. Trade-offs trong mỗi quyết định.',
    answerType: 'multi',
    parts: [
        { label: 'Architecture & Stack choice', placeholder: 'Chọn gì, tại sao...' },
        { label: 'Team organization & timeline', placeholder: 'Ai làm gì, milestones...' },
        { label: 'Risk mitigation', placeholder: 'Rủi ro và cách giảm...' }
    ],
    hint: 'Đừng over-engineer từ đầu. Start simple, scale khi cần. 1M/day ≈ 12 TPS average.',
    explanation: '1M/day = ~12 TPS avg, ~100 TPS peak → modular monolith đủ ban đầu.\n\nStack: .NET 8, PostgreSQL, Redis, Docker, K8s.\nStart: Modular monolith → extract services khi bottleneck rõ.\n\nTeam: 2 backend, 1 frontend, 1 DevOps, 1 fullstack/lead.\nMilestones: MVP 2 months, scaling 1 month, monitoring + optimization ongoing.\n\nRisks: Over-engineering, hiring delay, unclear requirements → mitigate with agile, MVPs, weekly stakeholder sync.',
    keywords: ['modular monolith', '12 TPS', 'PostgreSQL', 'Redis', 'Docker', 'K8s', 'MVP', 'agile', 'milestone', 'trade-off']
},

// ──── THÊM CÂU HỎI — FRESHER ────
{
    id: 'k-f-4', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'fresher', round: 1,
    title: 'Giải thích sự khác biệt giữa abstract class và interface trong C#. Khi nào dùng cái nào?',
    interviewer: 'Đây là câu hỏi kinh điển. Trả lời rõ ràng, có ví dụ cụ thể.',
    answerType: 'single', placeholder: 'Abstract class vs Interface...',
    hint: 'Abstract class có thể chứa implementation, constructor. Interface chỉ định nghĩa contract. C# 8+ interface có default implementation.',
    explanation: 'Abstract class: có thể chứa fields, constructor, implemented methods. Chỉ kế thừa 1 abstract class (single inheritance).\n\nInterface: chỉ định nghĩa contract (methods, properties). Implement nhiều interfaces. Từ C# 8+ có default implementation.\n\nDùng abstract class khi: có shared logic giữa các derived class, cần constructor, cần state.\nDùng interface khi: định nghĩa contract cho nhiều class không liên quan, cần multiple inheritance.',
    keywords: ['abstract', 'interface', 'kế thừa', 'contract', 'constructor', 'single inheritance', 'multiple', 'implementation', 'default']
},
{
    id: 'k-f-5', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'fresher', round: 1,
    title: 'Giải thích access modifiers trong C#: public, private, protected, internal. Khi nào dùng cái nào?',
    interviewer: 'Access control là nền tảng của encapsulation. Trả lời kèm ví dụ thực tế.',
    answerType: 'single', placeholder: 'public, private, protected, internal...',
    hint: 'public = ai cũng truy cập được. private = chỉ trong class. protected = class + derived. internal = trong cùng assembly.',
    explanation: 'public: truy cập từ bất kỳ đâu.\nprivate: chỉ trong class khai báo.\nprotected: class khai báo + derived classes.\ninternal: trong cùng assembly (project).\nprotected internal: cả 2 điều kiện trên.\nprivate protected: derived class TRONG cùng assembly.\n\nBest practice: mặc định private, chỉ mở rộng khi cần. API public, implementation private.',
    keywords: ['public', 'private', 'protected', 'internal', 'assembly', 'encapsulation', 'access', 'scope']
},
{
    id: 'r-f-3', type: 'read', typeName: 'ĐỌC CODE', level: 'fresher', round: 2,
    title: 'Đoạn code sau in ra gì?\n\nstring a = "hello";\nstring b = a;\nb = "world";\nConsole.WriteLine(a);\nConsole.WriteLine(b);\n\nGiải thích tại sao?',
    interviewer: 'String trong C# có hành vi đặc biệt. Bạn hiểu immutability không?',
    answerType: 'single', placeholder: 'Output và giải thích...',
    hint: 'String là reference type nhưng immutable. Khi gán "world", tạo string mới trên heap.',
    explanation: 'Output:\nhello\nworld\n\nString là reference type nhưng IMMUTABLE. Khi b = "world", không thay đổi object cũ mà tạo string mới trên heap và b trỏ đến string mới. a vẫn trỏ đến "hello" ban đầu. Đây là lý do string behave giống value type dù là reference type.',
    keywords: ['hello', 'world', 'immutable', 'reference', 'tạo mới', 'heap', 'trỏ']
},
{
    id: 'b-f-2', type: 'bug', typeName: 'TÌM BUG', level: 'fresher', round: 2,
    title: 'Tìm bug trong code:\n\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int i = 0; i <= numbers.Length; i++)\n{\n    Console.WriteLine(numbers[i]);\n}',
    interviewer: 'Bug cơ bản nhưng rất phổ biến. Bạn thấy vấn đề gì?',
    answerType: 'single', placeholder: 'Bug ở đâu và cách fix...',
    hint: 'Array index bắt đầu từ 0. Length = 5 nhưng index cuối cùng là bao nhiêu?',
    explanation: 'Bug: điều kiện i <= numbers.Length gây IndexOutOfRangeException.\n\nArray có 5 phần tử, index từ 0 đến 4. numbers.Length = 5. Khi i = 5, truy cập numbers[5] → exception.\n\nFix: đổi thành i < numbers.Length (bỏ dấu =).',
    keywords: ['IndexOutOfRange', '<=', '<', 'Length', 'index', '0', '4', '5', 'exception']
},
{
    id: 'ref-f-1', type: 'refactor', typeName: 'REFACTOR', level: 'fresher', round: 3,
    title: 'Refactor đoạn code sau cho clean hơn:\n\nstring result = "";\nif (score >= 90) result = "A";\nelse if (score >= 80) result = "B";\nelse if (score >= 70) result = "C";\nelse if (score >= 60) result = "D";\nelse result = "F";\nreturn result;',
    interviewer: 'Có nhiều cách refactor. Cho tôi thấy bạn biết cách viết code sạch.',
    answerType: 'single', placeholder: 'Code sau khi refactor...',
    hint: 'Có thể dùng switch expression (C# 8+), hoặc đơn giản hơn: return trực tiếp trong mỗi if.',
    explanation: 'Cách 1 - Early return:\nif (score >= 90) return "A";\nif (score >= 80) return "B";\n...\n\nCách 2 - Switch expression (C# 8+):\nreturn score switch {\n    >= 90 => "A",\n    >= 80 => "B",\n    >= 70 => "C",\n    >= 60 => "D",\n    _ => "F"\n};\n\nLoại bỏ biến tạm không cần thiết, code ngắn gọn và dễ đọc hơn.',
    keywords: ['switch expression', 'return', 'early return', 'pattern matching', 'clean', 'biến tạm']
},
{
    id: 'ref-f-2', type: 'refactor', typeName: 'REFACTOR', level: 'fresher', round: 3,
    title: 'Refactor đoạn code:\n\nList<string> names = new List<string>();\nfor (int i = 0; i < people.Count; i++)\n{\n    if (people[i].Age > 18)\n    {\n        names.Add(people[i].Name);\n    }\n}',
    interviewer: 'Bạn biết LINQ không? Nếu biết, dùng nó.',
    answerType: 'single', placeholder: 'Code sau khi refactor...',
    hint: 'LINQ Where + Select, hoặc collection initializer.',
    explanation: 'Dùng LINQ:\nvar names = people\n    .Where(p => p.Age > 18)\n    .Select(p => p.Name)\n    .ToList();\n\nNgắn gọn, declarative, dễ đọc. LINQ giúp express intent rõ ràng hơn manual loop.',
    keywords: ['LINQ', 'Where', 'Select', 'ToList', 'lambda', 'declarative']
},
{
    id: 'b-f-3', type: 'bug', typeName: 'TÌM BUG', level: 'fresher', round: 2,
    title: 'Code sau có vấn đề gì?\n\npublic class Calculator\n{\n    public int Divide(int a, int b)\n    {\n        return a / b;\n    }\n}',
    interviewer: 'Simple method nhưng có một trường hợp nguy hiểm. Bạn thấy không?',
    answerType: 'single', placeholder: 'Vấn đề và cách fix...',
    hint: 'Điều gì xảy ra khi b = 0?',
    explanation: 'Bug: Không xử lý trường hợp b = 0 → DivideByZeroException.\n\nFix:\npublic int Divide(int a, int b)\n{\n    if (b == 0) throw new ArgumentException("Divisor cannot be zero", nameof(b));\n    return a / b;\n}\n\nHoặc return int? và return null khi b = 0. Luôn validate input ở boundary.',
    keywords: ['DivideByZero', 'b = 0', 'exception', 'ArgumentException', 'validate', 'throw', 'null']
},

// ──── THÊM CÂU HỎI — JUNIOR ────
{
    id: 'k-j-3', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'junior', round: 1,
    title: 'Giải thích Entity Framework Core Migrations. Tại sao cần? Workflow sử dụng migrations trong team?',
    interviewer: 'Tôi muốn nghe cách bạn quản lý database schema changes trong thực tế, không chỉ lý thuyết.',
    answerType: 'single', placeholder: 'EF Core Migrations...',
    hint: 'add-migration, update-database, migration history table, idempotent scripts cho production.',
    explanation: 'Migrations = quản lý database schema changes qua code (code-first approach).\n\nWorkflow:\n1. Thay đổi model/entity\n2. dotnet ef migrations add MigrationName\n3. Review migration code (Up/Down methods)\n4. dotnet ef database update (local)\n5. Production: dùng SQL script (dotnet ef migrations script --idempotent)\n\nTeam: commit migrations vào git, resolve conflicts nếu 2 dev tạo migration cùng lúc. Dùng migration history table (__EFMigrationsHistory) để track.',
    keywords: ['migrations', 'add-migration', 'update-database', 'Up', 'Down', 'idempotent', 'script', 'history', 'code-first', 'schema']
},
{
    id: 'k-j-4', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'junior', round: 1,
    title: 'Giải thích HTTP Status Codes phổ biến trong REST API: 200, 201, 400, 401, 403, 404, 500. Khi nào trả về code nào?',
    interviewer: 'Đúng HTTP status code thể hiện bạn hiểu REST conventions hay không.',
    answerType: 'single', placeholder: 'HTTP Status Codes...',
    hint: '2xx = success, 4xx = client error, 5xx = server error. 401 vs 403 là câu hỏi trick.',
    explanation: '200 OK: Request thành công (GET, PUT).\n201 Created: Tạo resource mới thành công (POST).\n204 No Content: Thành công, không có body (DELETE).\n400 Bad Request: Input không hợp lệ (validation fail).\n401 Unauthorized: Chưa authenticate (chưa đăng nhập).\n403 Forbidden: Đã authenticate nhưng không có quyền.\n404 Not Found: Resource không tồn tại.\n409 Conflict: Conflict (duplicate, concurrency).\n500 Internal Server Error: Lỗi server.\n\n401 = "bạn là ai?" vs 403 = "tôi biết bạn là ai, nhưng bạn không được phép".',
    keywords: ['200', '201', '400', '401', '403', '404', '500', 'authenticate', 'authorize', 'validation', 'REST']
},
{
    id: 'k-j-5', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'junior', round: 1,
    title: 'Giải thích 3 loại Dependency Injection lifetime: Transient, Scoped, Singleton. Cho ví dụ khi nào dùng cái nào?',
    interviewer: 'DI lifetime sai có thể gây memory leak hoặc bugs khó tìm. Bạn hiểu rõ chưa?',
    answerType: 'single', placeholder: 'Transient vs Scoped vs Singleton...',
    hint: 'Transient: mỗi lần inject = instance mới. Scoped: 1 instance per request. Singleton: 1 instance suốt app.',
    explanation: 'Transient: tạo instance MỚI mỗi lần inject. Dùng cho: lightweight stateless services, validators.\n\nScoped: 1 instance per HTTP request (trong ASP.NET Core). Dùng cho: DbContext (EF Core), Unit of Work, services cần share state trong 1 request.\n\nSingleton: 1 instance suốt vòng đời application. Dùng cho: caching, logging, configuration, HttpClientFactory.\n\nCẩn thận: KHÔNG inject Scoped vào Singleton (Captive Dependency problem) → service sẽ dùng DbContext cũ, gây data stale hoặc concurrency issues.',
    keywords: ['Transient', 'Scoped', 'Singleton', 'instance', 'request', 'DbContext', 'captive dependency', 'lifetime', 'memory leak']
},
{
    id: 'r-j-2', type: 'read', typeName: 'ĐỌC CODE', level: 'junior', round: 2,
    title: 'Đoạn code sau có output gì?\n\nvar tasks = new List<Task<int>>();\nfor (int i = 0; i < 3; i++)\n{\n    tasks.Add(Task.Run(() => i * 10));\n}\nvar results = await Task.WhenAll(tasks);\nforeach (var r in results) Console.Write(r + " ");',
    interviewer: 'Closure trong async context — đây là trap phổ biến.',
    answerType: 'single', placeholder: 'Output và giải thích...',
    hint: 'Biến i bị capture bởi closure. Khi Task.Run execute, i đã = bao nhiêu?',
    explanation: 'Output: 30 30 30 (hoặc tương tự, tất cả đều = 30)\n\nLý do: lambda () => i * 10 capture biến i bởi reference, không bởi value. Khi các tasks thực sự execute, vòng for đã kết thúc và i = 3. Nên tất cả tasks đều tính 3 * 10 = 30.\n\nFix: dùng biến local trong loop:\nvar local = i;\ntasks.Add(Task.Run(() => local * 10));\n→ Output: 0 10 20',
    keywords: ['30', 'closure', 'capture', 'reference', 'biến local', 'loop', 'i = 3']
},
{
    id: 'b-j-3', type: 'bug', typeName: 'TÌM BUG', level: 'junior', round: 2,
    title: 'API endpoint này có vấn đề gì?\n\n[HttpGet("users/{id}")]\npublic async Task<User> GetUser(int id)\n{\n    var user = await _db.Users.FindAsync(id);\n    return user;\n}',
    interviewer: 'Ngắn gọn nhưng có nhiều vấn đề. Tìm hết cho tôi.',
    answerType: 'single', placeholder: 'Các vấn đề và cách fix...',
    hint: 'Nghĩ về: null case, return type, HTTP status codes.',
    explanation: 'Các vấn đề:\n1. Không xử lý null → trả về 204 No Content thay vì 404 khi user không tồn tại.\n2. Return type không rõ ràng → nên dùng ActionResult<User> hoặc IActionResult.\n3. Expose toàn bộ User entity → nên dùng DTO để ẩn sensitive fields (password hash, etc.).\n\nFix:\n[HttpGet("users/{id}")]\npublic async Task<ActionResult<UserDto>> GetUser(int id)\n{\n    var user = await _db.Users.FindAsync(id);\n    if (user == null) return NotFound();\n    return Ok(_mapper.Map<UserDto>(user));\n}',
    keywords: ['null', '404', 'NotFound', 'ActionResult', 'DTO', 'sensitive', 'password', 'entity']
},
{
    id: 'rev-j-2', type: 'review', typeName: 'CODE REVIEW', level: 'junior', round: 3,
    title: 'Review controller action này:\n\n[HttpPost("register")]\npublic async Task<IActionResult> Register(RegisterDto dto)\n{\n    var user = new User { Email = dto.Email, Password = dto.Password };\n    _db.Users.Add(user);\n    await _db.SaveChangesAsync();\n    return Ok(user);\n}',
    interviewer: 'Đây là code thực tế tôi thấy từ dev mới. Tìm MỌI vấn đề — security, best practices, design.',
    answerType: 'single', placeholder: 'Các vấn đề tìm được...',
    hint: 'Password plaintext? Return user object? Validation? Duplicate email?',
    explanation: 'Vấn đề nghiêm trọng:\n1. SECURITY: Lưu password plaintext! Phải hash (BCrypt, PBKDF2, Argon2).\n2. SECURITY: Return toàn bộ user object (bao gồm password) trong response.\n3. No validation: không check email format, password strength.\n4. No duplicate check: email đã tồn tại? → exception 500 thay vì 409.\n5. No model validation: [Required], [EmailAddress] annotations.\n6. Nên return 201 Created + UserDto (không có password).\n\nFix: hash password, validate input, check duplicate, return DTO, CreatedAtAction.',
    keywords: ['password', 'plaintext', 'hash', 'BCrypt', 'validation', 'duplicate', 'email', '201', 'DTO', 'security']
},

// ──── THÊM CÂU HỎI — MID ────
{
    id: 'k-m-3', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'mid', round: 1,
    title: 'Giải thích sự khác biệt giữa optimistic concurrency và pessimistic concurrency. EF Core hỗ trợ cách nào?',
    interviewer: 'Concurrency control là bắt buộc trong production systems. Giải thích cách bạn handle trong thực tế.',
    answerType: 'single', placeholder: 'Optimistic vs Pessimistic concurrency...',
    hint: 'Optimistic: check conflict khi save (RowVersion/Timestamp). Pessimistic: lock row khi read (SELECT FOR UPDATE).',
    explanation: 'Optimistic: Không lock, cho phép đọc đồng thời. Khi save, check version — nếu data đã bị thay đổi → DbUpdateConcurrencyException. Dùng [Timestamp] hoặc [ConcurrencyCheck] trong EF Core.\n\nPessimistic: Lock row/table khi đọc, ngăn người khác sửa. Dùng raw SQL với SELECT FOR UPDATE hoặc transaction isolation levels.\n\nEF Core: native support Optimistic concurrency qua RowVersion/Timestamp. Pessimistic phải dùng raw SQL hoặc explicit transactions.\n\nDùng Optimistic khi: read nhiều hơn write, conflict ít. Dùng Pessimistic khi: write nhiều, conflict thường xuyên (banking, inventory).',
    keywords: ['optimistic', 'pessimistic', 'RowVersion', 'Timestamp', 'ConcurrencyCheck', 'lock', 'DbUpdateConcurrencyException', 'SELECT FOR UPDATE']
},
{
    id: 'k-m-4', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'mid', round: 1,
    title: 'Giải thích cách ASP.NET Core Middleware Pipeline hoạt động. Thứ tự middleware quan trọng như thế nào?',
    interviewer: 'Nếu bạn đặt sai thứ tự middleware, app sẽ behave khác. Giải thích cụ thể.',
    answerType: 'single', placeholder: 'Middleware pipeline...',
    hint: 'Request đi qua middleware theo thứ tự đăng ký, response đi ngược lại. UseAuthentication phải trước UseAuthorization.',
    explanation: 'Middleware pipeline = chuỗi delegates xử lý request/response theo thứ tự.\n\nRequest → Middleware 1 → 2 → 3 → Endpoint\nResponse ← Middleware 1 ← 2 ← 3 ← Endpoint\n\nThứ tự quan trọng:\n1. UseExceptionHandler (bắt mọi exception)\n2. UseHsts/UseHttpsRedirection\n3. UseStaticFiles (short-circuit cho static files)\n4. UseRouting\n5. UseCors\n6. UseAuthentication (WHO are you?)\n7. UseAuthorization (CAN you do this?)\n8. Custom middleware\n9. MapControllers/endpoints\n\nSai thứ tự: đặt UseAuthorization trước UseAuthentication → authorization check mà chưa biết user là ai → luôn fail.',
    keywords: ['pipeline', 'delegate', 'thứ tự', 'UseAuthentication', 'UseAuthorization', 'short-circuit', 'UseRouting', 'UseExceptionHandler', 'request', 'response']
},
{
    id: 'k-m-5', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'mid', round: 1,
    title: 'Giải thích Repository Pattern và Unit of Work Pattern. Ưu nhược điểm khi dùng với EF Core?',
    interviewer: 'Có debate lớn về việc có nên wrap EF Core trong Repository không. Quan điểm của bạn?',
    answerType: 'single', placeholder: 'Repository, Unit of Work, ưu nhược...',
    hint: 'Repository = abstraction cho data access. UoW = quản lý transaction. EF Core DbContext ĐÃ là cả 2.',
    explanation: 'Repository Pattern: abstract data access layer, cung cấp collection-like interface cho domain objects.\nUnit of Work: track thay đổi, commit/rollback transaction.\n\nTranh cãi: DbContext đã là cả Repository (DbSet) + Unit of Work (SaveChanges). Wrap thêm = leaky abstraction.\n\nƯu: testable (mock repository), switch DB provider dễ, enforce business rules tại data access layer.\nNhược: extra layer of indirection, DbContext đã có đủ tính năng, khó wrap hết EF Core features (Include, AsNoTracking...).\n\nQuan điểm thực tế: Generic Repository = anti-pattern. Nếu dùng, dùng specific repositories với domain methods. Hoặc dùng CQRS/MediatR thay thế.',
    keywords: ['Repository', 'Unit of Work', 'DbContext', 'abstraction', 'DbSet', 'SaveChanges', 'testable', 'leaky abstraction', 'CQRS', 'generic repository']
},
{
    id: 'r-m-2', type: 'read', typeName: 'ĐỌC CODE', level: 'mid', round: 1,
    title: 'Code sau có vấn đề gì?\n\npublic async Task ProcessOrders()\n{\n    var orders = await _db.Orders.ToListAsync();\n    foreach (var order in orders)\n    {\n        order.Status = "Processed";\n        await _db.SaveChangesAsync();\n    }\n}',
    interviewer: 'Performance trap. Bạn thấy gì?',
    answerType: 'single', placeholder: 'Vấn đề và cách fix...',
    hint: 'SaveChangesAsync được gọi bao nhiêu lần? N orders = N database round-trips.',
    explanation: 'Vấn đề: SaveChangesAsync() gọi TRONG loop = N round-trips đến database. Nếu 1000 orders = 1000 lần gọi DB.\n\nFix: Di chuyển SaveChangesAsync ra ngoài loop:\nforeach (var order in orders)\n    order.Status = "Processed";\nawait _db.SaveChangesAsync(); // 1 lần duy nhất\n\nEF Core change tracker theo dõi tất cả thay đổi, SaveChanges batch tất cả vào 1 transaction.\n\nHoặc tốt hơn: dùng ExecuteUpdateAsync (EF Core 7+):\nawait _db.Orders.ExecuteUpdateAsync(s => s.SetProperty(o => o.Status, "Processed"));\n→ 1 SQL UPDATE duy nhất, không load entities vào memory.',
    keywords: ['SaveChanges', 'loop', 'N+1', 'round-trip', 'batch', 'ExecuteUpdateAsync', 'change tracker', 'performance']
},
{
    id: 'b-m-3', type: 'bug', typeName: 'TÌM BUG', level: 'mid', round: 2,
    title: 'Tìm vấn đề trong caching code:\n\npublic async Task<Product> GetProduct(int id)\n{\n    var key = $"product_{id}";\n    var cached = _cache.Get<Product>(key);\n    if (cached != null) return cached;\n    \n    var product = await _db.Products.FindAsync(id);\n    _cache.Set(key, product, TimeSpan.FromHours(1));\n    return product;\n}',
    interviewer: 'Code trông OK nhưng có nhiều vấn đề ẩn. Bạn thấy mấy vấn đề?',
    answerType: 'single', placeholder: 'Các vấn đề...',
    hint: 'Cache null? Race condition? Cache invalidation?',
    explanation: 'Vấn đề:\n1. Cache null: nếu product = null, cache null value → mọi request sau đều nhận null (hoặc lỗi khi Get).\n2. Race condition (cache stampede): nhiều requests đồng thời miss cache → tất cả đều query DB → spike.\n3. Không invalidate cache khi product thay đổi → stale data 1 giờ.\n4. Không handle exception: nếu DB fail, không cache error.\n\nFix:\n- Check null trước khi cache\n- Dùng GetOrCreateAsync với SemaphoreSlim (hoặc IMemoryCache.GetOrCreate)\n- Cache aside + event-driven invalidation\n- Hoặc dùng distributed cache (Redis) với pub/sub invalidation.',
    keywords: ['null', 'stampede', 'race condition', 'invalidation', 'stale', 'SemaphoreSlim', 'GetOrCreate', 'distributed cache']
},
{
    id: 'b-m-4', type: 'bug', typeName: 'TÌM BUG', level: 'mid', round: 2,
    title: 'API endpoint sau có security vulnerability nào?\n\n[HttpGet("users")]\npublic async Task<IActionResult> SearchUsers(string query)\n{\n    var sql = $"SELECT * FROM Users WHERE Name LIKE \'%{query}%\'";\n    var users = await _db.Users.FromSqlRaw(sql).ToListAsync();\n    return Ok(users);\n}',
    interviewer: 'Đây là lỗi mà nếu bạn để lọt vào production, hậu quả rất nghiêm trọng.',
    answerType: 'single', placeholder: 'Vulnerability và cách fix...',
    hint: 'String interpolation + SQL = ?',
    explanation: 'SQL INJECTION! String interpolation trực tiếp vào SQL query → attacker có thể inject SQL code.\n\nVí dụ: query = "\'; DROP TABLE Users; --" → xóa toàn bộ bảng Users.\n\nFix:\n1. Dùng parameterized query:\nFromSqlRaw("SELECT * FROM Users WHERE Name LIKE {0}", $"%{query}%")\n\n2. Hoặc dùng FromSqlInterpolated (EF Core):\nFromSqlInterpolated($"SELECT * FROM Users WHERE Name LIKE {$"%{query}%"}")\n\n3. Tốt nhất: dùng LINQ:\n_db.Users.Where(u => u.Name.Contains(query))\n\nNever trust user input. Always parameterize SQL queries.',
    keywords: ['SQL injection', 'parameterized', 'FromSqlInterpolated', 'LINQ', 'Contains', 'DROP TABLE', 'security', 'user input']
},
{
    id: 'd-m-2', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'mid', round: 3,
    title: 'Thiết kế hệ thống shopping cart cho e-commerce site. Yêu cầu: support guest users, persistent cart, handle stock validation.',
    interviewer: 'Tôi muốn thấy cách bạn nghĩ về edge cases: guest user add to cart rồi login, stock hết giữa chừng, concurrent users mua cùng item.',
    answerType: 'multi',
    parts: [
        { label: 'Data model & Storage', placeholder: 'Cart schema, guest vs logged-in...' },
        { label: 'Stock validation strategy', placeholder: 'Khi nào check stock, race condition...' },
        { label: 'Edge cases handling', placeholder: 'Guest → login merge, expired cart...' }
    ],
    hint: 'Guest: dùng session/cookie ID. Stock: check khi add + check lại khi checkout. Merge cart khi login.',
    explanation: 'Data model: CartId, UserId (nullable cho guest), SessionId, Items[ProductId, Quantity, PriceSnapshot].\n\nGuest: dùng SessionId (cookie). Khi login: merge guest cart vào user cart (sum quantities, resolve conflicts).\n\nStock validation:\n- Khi add to cart: soft check (hiển thị "còn hàng")\n- Khi checkout: hard check với pessimistic lock (SELECT FOR UPDATE) hoặc optimistic concurrency\n- Reserve stock khi enter checkout (TTL 15 phút)\n\nEdge cases:\n- Cart expiration: TTL 7 ngày, cleanup job\n- Price change: snapshot price khi add, show warning nếu giá thay đổi khi checkout\n- Concurrent buy: last-write-wins hoặc queue-based checkout',
    keywords: ['session', 'cookie', 'merge', 'stock', 'reserve', 'checkout', 'TTL', 'snapshot', 'concurrent', 'pessimistic lock']
},
{
    id: 's-m-2', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'mid', round: 4,
    title: 'Bạn deploy feature mới lên production. 30 phút sau, monitoring alert: memory usage tăng từ 2GB lên 8GB và vẫn tăng. Bạn xử lý thế nào?',
    interviewer: 'Đây là on-call scenario thực tế. Walk me through từng bước.',
    answerType: 'single', placeholder: 'Từng bước xử lý...',
    hint: 'Rollback trước hay investigate trước? Memory dump? GC logs? Profiler?',
    explanation: 'Step-by-step:\n1. Assess impact: users bị ảnh hưởng chưa? Latency tăng? OOM risk?\n2. Quick rollback nếu: memory > 80% threshold hoặc ảnh hưởng users → rollback deployment NGAY.\n3. Nếu còn thời gian investigate:\n   - Capture memory dump (dotnet-dump collect)\n   - Check GC metrics (Gen2 collections, LOH)\n   - So sánh code changes trong release mới\n4. Analyze dump: tìm objects chiếm nhiều memory nhất → thường là: event handler không unsubscribe, cache không có eviction, DbContext leak, large collection giữ reference.\n5. Sau khi fix: deploy hotfix, thêm memory alert thresholds, thêm unit test cho disposal.\n\nRule: Khi nghi ngờ, ROLLBACK TRƯỚC, investigate sau. User impact > debugging time.',
    keywords: ['rollback', 'memory dump', 'GC', 'dotnet-dump', 'LOH', 'event handler', 'dispose', 'leak', 'monitor', 'threshold']
},
{
    id: 's-m-3', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'mid', round: 4,
    title: 'Database query timeout xảy ra liên tục trên 1 endpoint cụ thể. Bạn approach troubleshoot như thế nào?',
    interviewer: 'Systematic approach. Đừng đoán — chứng minh bằng data.',
    answerType: 'single', placeholder: 'Các bước troubleshoot...',
    hint: 'Check query plan, missing index, parameter sniffing, lock contention, data volume.',
    explanation: '1. Reproduce: gọi endpoint, confirm timeout. Check connection timeout setting vs query duration.\n2. Identify query: EF Core logging, SQL Profiler, Application Insights.\n3. Analyze query plan: EXPLAIN/EXPLAIN ANALYZE\n   - Table scan? → missing index\n   - Estimated vs actual rows khác xa? → stale statistics\n   - Parameter sniffing? → OPTION(RECOMPILE) hoặc OPTIMIZE FOR\n4. Check: lock contention (sys.dm_exec_requests), blocking queries, deadlocks.\n5. Data volume: bảng grow lớn? Cần pagination, archival?\n6. Fix theo thứ tự ưu tiên:\n   - Add missing index (nhanh nhất)\n   - Optimize query (rewrite, split)\n   - Add caching layer\n   - Database scaling (read replica)\n\nLuôn benchmark trước/sau fix.',
    keywords: ['query plan', 'EXPLAIN', 'index', 'parameter sniffing', 'lock contention', 'statistics', 'pagination', 'caching', 'read replica', 'benchmark']
},

// ──── THÊM CÂU HỎI — SENIOR ────
{
    id: 'k-s-2', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'senior', round: 1,
    title: 'So sánh CAP theorem áp dụng vào thực tế. Trong distributed .NET system, bạn chọn CP hay AP? Tại sao?',
    interviewer: 'Đừng nói lý thuyết suông. Cho tôi ví dụ thực tế với trade-offs cụ thể.',
    answerType: 'single', placeholder: 'CAP theorem trong thực tế...',
    hint: 'CAP = Consistency, Availability, Partition tolerance. Thực tế: network partition LUÔN xảy ra, nên thật ra chọn C hoặc A.',
    explanation: 'CAP Theorem: distributed system chỉ đạt 2/3: Consistency, Availability, Partition tolerance.\n\nPartition tolerance là bắt buộc (network WILL fail) → chọn giữa CP và AP.\n\nCP (Consistency + Partition): banking, inventory, booking.\n- Ví dụ: SQL Server Always On Synchronous → nếu replica unreachable, block writes.\n- Trade-off: downtime acceptable hơn wrong data.\n\nAP (Availability + Partition): social media feeds, product catalog, analytics.\n- Ví dụ: Redis cluster, Cassandra → eventual consistency, data có thể stale vài giây.\n- Trade-off: stale data OK, downtime = lost revenue.\n\nThực tế: PACELC theorem mới phù hợp hơn — khi KHÔNG có partition, chọn Latency hay Consistency?',
    keywords: ['CAP', 'Consistency', 'Availability', 'Partition', 'CP', 'AP', 'eventual consistency', 'banking', 'PACELC', 'trade-off']
},
{
    id: 'k-s-3', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'senior', round: 1,
    title: 'Giải thích Outbox Pattern trong microservices. Tại sao cần? Implement thế nào với .NET?',
    interviewer: 'Dual write problem là pain point lớn. Bạn đã gặp và giải quyết chưa?',
    answerType: 'single', placeholder: 'Outbox Pattern...',
    hint: 'Problem: save DB + publish event không atomic. Outbox = save event vào DB cùng transaction, background job publish.',
    explanation: 'Problem: Dual write — cần save to DB VÀ publish event. Nếu DB save OK nhưng message broker fail → inconsistency.\n\nOutbox Pattern:\n1. Save entity + event message vào cùng database transaction (bảng Outbox).\n2. Background worker (polling hoặc CDC) đọc Outbox, publish to message broker.\n3. Mark event as published.\n\nImplement .NET:\n- EF Core: save entity + OutboxMessage trong cùng SaveChanges/transaction\n- Background: Hangfire/BackgroundService poll Outbox table mỗi vài giây\n- Hoặc dùng Change Data Capture (Debezium) cho real-time\n- Libraries: MassTransit có built-in Outbox, CAP library\n\nĐảm bảo: idempotent consumers (dedup by event ID), at-least-once delivery.',
    keywords: ['Outbox', 'dual write', 'atomic', 'transaction', 'background', 'polling', 'CDC', 'Debezium', 'MassTransit', 'idempotent', 'at-least-once']
},
{
    id: 'k-s-4', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'senior', round: 1,
    title: 'Giải thích cách bạn implement Authentication + Authorization trong microservices. JWT token flow, token validation, cross-service auth.',
    interviewer: 'Security trong distributed system phức tạp hơn monolith rất nhiều. Bạn handle thế nào?',
    answerType: 'single', placeholder: 'Auth trong microservices...',
    hint: 'API Gateway validation, JWT claims, service-to-service auth (client credentials), token propagation.',
    explanation: 'Auth flow trong microservices:\n\n1. API Gateway: validate JWT token (signature, expiration). Reject invalid requests trước khi vào internal services.\n\n2. JWT Claims: user info embedded trong token. Services đọc claims, không cần gọi auth service mỗi request.\n\n3. Service-to-service: Client Credentials flow (OAuth2). Mỗi service có clientId/secret riêng. Internal traffic cũng cần auth.\n\n4. Token propagation: forward JWT từ request gốc qua internal calls (HttpClient header propagation).\n\n5. Centralized auth: IdentityServer/Keycloak/Auth0 làm identity provider. Services chỉ validate token.\n\n6. Fine-grained: claims-based authorization, policy-based ([Authorize(Policy = "AdminOnly")]). Resource-based auth cho domain-specific rules.\n\nCẩn thận: token size (claims quá nhiều), token revocation (blacklist hoặc short TTL + refresh token), HTTPS everywhere.',
    keywords: ['JWT', 'Gateway', 'claims', 'Client Credentials', 'propagation', 'IdentityServer', 'Keycloak', 'policy-based', 'refresh token', 'revocation']
},
{
    id: 'r-s-2', type: 'read', typeName: 'ĐỌC CODE', level: 'senior', round: 1,
    title: 'Analyze code này:\n\nservices.AddSingleton<ICache, MemoryCache>();\nservices.AddScoped<IOrderService, OrderService>();\n\npublic class OrderService : IOrderService\n{\n    private readonly ICache _cache;\n    private readonly AppDbContext _db;\n    public OrderService(ICache cache, AppDbContext db)\n    {\n        _cache = cache;\n        _db = db;\n    }\n}\n\nCó vấn đề gì về DI lifetime? Giải thích.',
    interviewer: 'Captive dependency — classic trap. Bạn hiểu impact thực sự không?',
    answerType: 'single', placeholder: 'Vấn đề DI lifetime...',
    hint: 'Singleton giữ reference đến Scoped service → Scoped service sống lâu hơn expected.',
    explanation: 'Không có vấn đề ở đây! OrderService là Scoped, inject Singleton (ICache) và Scoped (DbContext) → OK.\n\nVấn đề xảy ra khi NGƯỢC LẠI: Singleton inject Scoped. Ví dụ:\nservices.AddSingleton<ISomeService, SomeService>(); // Singleton\n// SomeService inject AppDbContext (Scoped) → PROBLEM!\n\nSingleton sống suốt app lifetime → giữ reference đến DbContext → DbContext không được dispose theo request → stale data, memory leak, connection pool exhaustion.\n\nRule: service chỉ inject dependency có lifetime >= chính nó.\nSingleton → chỉ inject Singleton\nScoped → inject Singleton hoặc Scoped\nTransient → inject bất kỳ\n\nASP.NET Core có ValidateScopes option (bật mặc định trong Development) để detect captive dependency.',
    keywords: ['captive dependency', 'lifetime', 'Singleton', 'Scoped', 'dispose', 'stale', 'ValidateScopes', 'connection pool', 'OK', 'không có vấn đề']
},
{
    id: 'd-s-3', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'senior', round: 2,
    title: 'Thiết kế hệ thống payment processing cho e-commerce platform. Yêu cầu: multi-gateway (VNPay, Momo, Stripe), idempotency, refund support.',
    interviewer: 'Payment = zero tolerance for errors. Tôi muốn thấy bạn nghĩ về every failure scenario.',
    answerType: 'multi',
    parts: [
        { label: 'Architecture & Payment flow', placeholder: 'Gateway abstraction, state machine...' },
        { label: 'Idempotency & failure handling', placeholder: 'Retry, timeout, duplicate...' },
        { label: 'Refund & reconciliation', placeholder: 'Refund flow, daily reconciliation...' }
    ],
    hint: 'Payment gateway adapter pattern. State machine: Pending → Processing → Success/Failed. Idempotency key per request.',
    explanation: 'Architecture:\n- Payment Service với Gateway Adapter pattern (IPaymentGateway: VNPayAdapter, MomoAdapter, StripeAdapter)\n- State machine: Created → Pending → Processing → Success/Failed/Timeout\n- Persistent state: mỗi transition được log\n\nIdempotency:\n- Client gửi IdempotencyKey (UUID) per payment request\n- Server check: key exists? → return cached result (không charge lại)\n- Timeout handling: async polling hoặc webhook từ gateway\n\nFailure:\n- Gateway timeout → retry với exponential backoff + same idempotency key\n- Network failure → background job reconcile pending payments\n\nRefund:\n- Refund record linked to original payment\n- Partial refund support (amount <= original)\n- Gateway-specific refund API call\n- Daily reconciliation: compare internal records vs gateway reports → flag discrepancies.',
    keywords: ['adapter', 'state machine', 'idempotency', 'idempotency key', 'webhook', 'retry', 'exponential backoff', 'reconciliation', 'partial refund', 'gateway']
},
{
    id: 's-s-3', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'senior', round: 3,
    title: 'Production incident: microservice A gọi service B, service B gọi service C. Service C chậm → cascade failure, toàn bộ hệ thống down. Bạn giải quyết thế nào? Và prevent tương lai?',
    interviewer: 'Cascading failure là nightmare của microservices. Bạn xử lý thế nào — cả short-term fix và long-term prevention?',
    answerType: 'single', placeholder: 'Short-term fix và long-term prevention...',
    hint: 'Circuit breaker, timeout, bulkhead, retry policy, health checks.',
    explanation: 'Short-term (ngay lập tức):\n1. Identify bottleneck: service C → check logs, metrics\n2. Circuit break: tạm cắt call đến service C, return fallback/cached data\n3. Scale service C nếu có thể (add instances)\n4. Rate limit requests đến service C\n\nLong-term prevention:\n1. Circuit Breaker pattern (Polly): auto-open circuit khi error rate > threshold\n2. Timeout policy: mỗi HTTP call có timeout (không dùng default infinite)\n3. Bulkhead pattern: isolate thread pools per downstream service\n4. Retry + exponential backoff (Polly): transient failure recovery\n5. Fallback: cached data, degraded response, queue for later\n6. Health checks: /health endpoint, liveness + readiness probes\n7. Async communication: thay synchronous call bằng message queue khi possible\n8. Load shedding: reject excess requests gracefully (429 Too Many Requests)\n\nMicroservices golden rule: Design for failure.',
    keywords: ['circuit breaker', 'Polly', 'timeout', 'bulkhead', 'retry', 'exponential backoff', 'fallback', 'health check', 'async', 'message queue', 'load shedding', 'cascading']
},
{
    id: 'l-s-2', type: 'leadership', typeName: 'LEADERSHIP', level: 'senior', round: 4,
    title: 'Team member (mid-level) liên tục merge code chất lượng thấp: không test, naming convention sai, copy-paste code. Bạn đã code review reject 3 lần. Bạn handle thế nào?',
    interviewer: 'Đây là leadership test. Kỹ thuật giỏi nhưng manage people thế nào?',
    answerType: 'single', placeholder: 'Cách handle...',
    hint: 'Đừng blame publicly. 1-on-1 conversation. Understand root cause. Set clear expectations.',
    explanation: 'Approach:\n1. 1-on-1 private conversation (không public shame)\n2. Understand root cause: overloaded? unclear standards? skill gap? personal issues?\n3. Show specific examples (không nói chung chung "code xấu")\n4. Set clear expectations: coding standards document, definition of done checklist\n5. Pair programming sessions: review code cùng nhau, teach by example\n6. Incremental improvement: set small achievable goals\n7. Follow up weekly: track progress, acknowledge improvement\n\nNếu không cải thiện sau effort:\n8. Formal feedback với manager\n9. Performance improvement plan (PIP)\n10. Reassign tasks phù hợp với skill level\n\nKey: separate person from code. "Code này cần improve" không phải "bạn code tệ". Build trust trước khi demand change.',
    keywords: ['1-on-1', 'private', 'root cause', 'expectations', 'pair programming', 'coding standards', 'checklist', 'PIP', 'trust', 'feedback']
},

// ──── THÊM CÂU HỎI — LEAD ────
{
    id: 'd-l-2', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'lead', round: 1,
    title: 'Thiết kế hệ thống multi-tenant SaaS platform. Mỗi tenant có thể customize workflow riêng. Data isolation, tenant-specific configs, và fair resource allocation.',
    interviewer: 'Multi-tenancy là architectural decision cực kỳ quan trọng. Wrong choice ở đầu = rewrite toàn bộ sau này.',
    answerType: 'multi',
    parts: [
        { label: 'Data isolation strategy', placeholder: 'Shared DB, separate schema, separate DB...' },
        { label: 'Tenant configuration & customization', placeholder: 'Feature flags, workflow engine...' },
        { label: 'Resource allocation & noisy neighbor', placeholder: 'Rate limiting, quotas, isolation...' }
    ],
    hint: 'Data isolation: 3 levels (shared DB → shared schema → separate DB). Noisy neighbor: rate limiting per tenant, resource quotas.',
    explanation: 'Data isolation options:\n1. Shared DB + TenantId column: cheapest, hardest to isolate, risk of data leak\n2. Schema per tenant: moderate isolation, moderate cost\n3. DB per tenant: best isolation, most expensive, complex management\n→ Start with shared DB + TenantId, migrate high-value tenants to separate DB.\n\nGlobal filter: EF Core HasQueryFilter(e => e.TenantId == currentTenant) → auto-apply.\n\nCustomization:\n- Feature flags per tenant (LaunchDarkly, custom)\n- Workflow engine: bảng WorkflowDefinition per tenant, state machine pattern\n- UI theming: tenant-specific CSS/config\n\nResource allocation:\n- Rate limiting per tenant (sliding window)\n- Resource quotas: API calls/day, storage, bandwidth\n- Noisy neighbor prevention: separate queues per tier, priority-based scheduling\n- Monitoring: per-tenant metrics dashboards\n\nAuth: tenant resolution từ subdomain/header/JWT claim.',
    keywords: ['multi-tenant', 'TenantId', 'HasQueryFilter', 'data isolation', 'schema', 'feature flags', 'workflow', 'rate limiting', 'quotas', 'noisy neighbor']
},
{
    id: 'd-l-3', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'lead', round: 1,
    title: 'Bạn cần thiết kế CI/CD pipeline cho team 15 người, 8 microservices, deploy lên Kubernetes. Yêu cầu: < 15 phút từ commit đến production, zero-downtime deployment.',
    interviewer: 'DevOps maturity thể hiện technical leadership. Bạn design pipeline thế nào?',
    answerType: 'multi',
    parts: [
        { label: 'Pipeline stages & tools', placeholder: 'Build, test, deploy stages...' },
        { label: 'Deployment strategy', placeholder: 'Blue-green, canary, rolling...' },
        { label: 'Rollback & monitoring', placeholder: 'Auto-rollback triggers, observability...' }
    ],
    hint: 'Parallel builds, selective deploy (only changed services), canary deployment, auto-rollback on error rate spike.',
    explanation: 'Pipeline (< 15 min):\n1. Commit → trigger (GitHub Actions/GitLab CI)\n2. Build + Unit tests (parallel per service): 3-5 min\n3. Integration tests (parallel): 3-5 min\n4. Build Docker image, push to registry: 2 min\n5. Deploy to staging (auto): 2 min\n6. Smoke tests on staging: 1 min\n7. Manual approval (hoặc auto for non-critical)\n8. Production deploy: 2 min\n\nOptimizations: chỉ build/deploy services có changes (monorepo path filtering), layer caching Docker.\n\nDeployment strategy:\n- Canary: deploy 5% traffic → monitor 5 min → ramp up 25% → 100%\n- Kubernetes: Rolling update + readiness probes\n\nRollback:\n- Auto-rollback trigger: error rate > 5%, latency p99 > threshold\n- Kubernetes: kubectl rollout undo\n- Feature flags cho instant disable\n\nObservability: Prometheus + Grafana, distributed tracing (Jaeger), centralized logging (ELK).',
    keywords: ['canary', 'rolling update', 'parallel', 'Docker', 'Kubernetes', 'readiness probe', 'rollback', 'error rate', 'Prometheus', 'Grafana', 'feature flag']
},
{
    id: 'd-l-4', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'lead', round: 1,
    title: 'Thiết kế event-driven architecture cho hệ thống order processing. Events: OrderPlaced, PaymentProcessed, InventoryReserved, OrderShipped. Ensure consistency.',
    interviewer: 'Event-driven là powerful nhưng complex. Consistency, ordering, error handling — show me you understand the pitfalls.',
    answerType: 'multi',
    parts: [
        { label: 'Event flow & service boundaries', placeholder: 'Choreography vs Orchestration...' },
        { label: 'Consistency & error handling', placeholder: 'Saga, compensation, dead letter...' },
        { label: 'Infrastructure & monitoring', placeholder: 'Message broker, idempotency, tracing...' }
    ],
    hint: 'Choreography (pub/sub) vs Orchestration (saga coordinator). Compensation events for rollback. Dead letter queue for failed messages.',
    explanation: 'Event flow:\nOrderPlaced → Payment Service → PaymentProcessed → Inventory Service → InventoryReserved → Shipping Service → OrderShipped\n\nChoreography vs Orchestration:\n- Choreography: services react to events independently. Simple nhưng hard to trace, debug.\n- Orchestration (Saga): OrderSaga coordinator manages flow. Explicit, visible, nhưng single point of failure.\n→ Recommendation: Orchestration cho critical flows (orders), Choreography cho non-critical (notifications, analytics).\n\nConsistency (Saga pattern):\n- Compensation: PaymentProcessed fail → publish PaymentRefunded → Inventory release stock\n- Each step has a compensating action\n- Saga state persisted in DB\n\nError handling:\n- Retry with backoff per consumer\n- Dead letter queue (DLQ) cho messages fail sau N retries\n- DLQ monitoring + alerts\n\nInfrastructure: RabbitMQ/Kafka, idempotent consumers (dedup by EventId), distributed tracing (correlation ID), event sourcing optional.',
    keywords: ['choreography', 'orchestration', 'saga', 'compensation', 'dead letter', 'DLQ', 'RabbitMQ', 'Kafka', 'idempotent', 'correlation ID', 'event sourcing']
},
{
    id: 'l-l-4', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 2,
    title: 'CTO yêu cầu giảm 40% infrastructure cost trong 3 tháng. Team đang maintain 8 microservices, 3 databases, Redis cluster, Kubernetes cluster. Approach?',
    interviewer: 'Cost optimization yêu cầu balance giữa savings và performance/reliability. Show me your analytical approach.',
    answerType: 'single', placeholder: 'Approach giảm cost...',
    hint: 'Right-sizing, reserved instances, consolidate services, optimize queries, auto-scaling, spot instances.',
    explanation: 'Week 1-2: Audit & Analysis\n- Cloud cost breakdown per service (Cost Explorer/Billing)\n- Resource utilization metrics: CPU, memory, network per service\n- Identify: over-provisioned instances, idle resources, unused storage\n\nQuick wins (Month 1, ~20% savings):\n- Right-size instances (most common: 50% CPU unused → downgrade)\n- Reserved instances/Savings Plans cho stable workloads (30-60% savings)\n- Delete unused resources: old snapshots, unattached volumes, idle load balancers\n- Auto-scaling: scale down off-hours (if not 24/7)\n\nMedium effort (Month 2, ~15% savings):\n- Consolidate microservices: nếu 2-3 services luôn deploy cùng nhau → merge\n- Database optimization: read replicas → caching, query optimization → smaller instance\n- Spot/Preemptible instances cho non-critical workloads (batch processing, dev/staging)\n\nLong-term (Month 3, ~5% savings):\n- Kubernetes pod resource limits tuning\n- Implement request-based auto-scaling (KEDA)\n- Storage tiering: hot → warm → cold\n\nRisk: KHÔNG sacrifice reliability cho cost. Set performance SLOs, monitor after each change.',
    keywords: ['right-size', 'reserved instances', 'auto-scaling', 'spot instances', 'consolidate', 'utilization', 'SLO', 'KEDA', 'cost explorer', 'storage tiering']
},
{
    id: 'l-l-5', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 4,
    title: 'Bạn build engineering culture cho team mới (10 người, mix senior/junior). Bạn sẽ establish những practices gì? Code quality, knowledge sharing, và team rituals?',
    interviewer: 'Culture eats strategy. Bạn muốn team hoạt động như thế nào?',
    answerType: 'single', placeholder: 'Engineering culture practices...',
    hint: 'Code review, pair programming, tech talks, blameless postmortem, documentation, on-call rotation.',
    explanation: 'Code Quality:\n- Mandatory code review (ít nhất 1 approval)\n- PR template: what, why, how to test\n- CI/CD gates: tests pass, lint clean, coverage >= threshold\n- Coding standards document (team agreement, không phải dictation)\n\nKnowledge Sharing:\n- Weekly tech talks (team members rotate presenting)\n- Pair programming sessions (senior + junior)\n- Architecture Decision Records (ADRs) cho big decisions\n- Internal wiki/Notion cho runbooks, onboarding\n\nTeam Rituals:\n- Daily standup (15 min max, async option)\n- Sprint retro (bi-weekly): what went well, what to improve\n- Blameless postmortem sau incidents\n- Quarterly tech debt sprint\n\nGrowth:\n- 1-on-1 bi-weekly per team member\n- Individual development plan\n- Conference/learning budget\n- Internal open-source: share libraries across teams\n\nKey principle: trust + autonomy + accountability. Không micromanage.',
    keywords: ['code review', 'pair programming', 'tech talks', 'ADR', 'retro', 'blameless postmortem', 'tech debt', '1-on-1', 'autonomy', 'accountability']
},
{
    id: 's-l-1', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'lead', round: 3,
    title: 'Hệ thống bạn quản lý bị data breach. Customer PII (tên, email, SĐT) bị leak. Bạn handle thế nào — cả technical response và communication?',
    interviewer: 'Data breach = crisis mode. Leadership, communication, và technical response cùng lúc. Walk me through.',
    answerType: 'multi',
    parts: [
        { label: 'Immediate response (giờ đầu tiên)', placeholder: 'Contain, assess, notify...' },
        { label: 'Technical investigation & fix', placeholder: 'Root cause, forensics, patch...' },
        { label: 'Communication & prevention', placeholder: 'Stakeholders, customers, legal, prevent recurrence...' }
    ],
    hint: 'Contain first (stop bleeding), investigate second, communicate third. Legal obligations (GDPR?).',
    explanation: 'Hour 1 - Contain:\n- Identify attack vector → close immediately (revoke tokens, block IP, disable endpoint)\n- Preserve evidence (logs, snapshots) trước khi fix\n- Activate incident response team\n- Notify: CTO, Security team, Legal\n\nInvestigation (Day 1-3):\n- Forensics: access logs, audit trail, scope of breach (how many records?)\n- Root cause: SQL injection? leaked credentials? insider? misconfigured S3?\n- Patch vulnerability immediately\n- Scan for similar vulnerabilities across system\n\nCommunication:\n- Internal: all-hands briefing, clear timeline\n- Legal: PDPA/GDPR obligations (72h notification requirement)\n- Customers: transparent notification — what happened, what data, what we\'re doing\n- Public: press statement nếu cần\n\nPrevention:\n- Security audit toàn bộ system\n- Implement: encryption at rest, WAF, SIEM monitoring\n- Regular penetration testing\n- Security training cho dev team\n- Incident response playbook update',
    keywords: ['contain', 'forensics', 'root cause', 'evidence', 'GDPR', 'PDPA', 'notification', 'encryption', 'WAF', 'penetration testing', 'incident response']
},
{
    id: 's-l-2', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'lead', round: 3,
    title: 'Black Friday sale: traffic dự kiến tăng 10x so với ngày thường. Bạn có 2 tuần chuẩn bị. Plan?',
    interviewer: 'Scalability under pressure. 2 tuần không nhiều. Priorities?',
    answerType: 'single', placeholder: 'Kế hoạch chuẩn bị...',
    hint: 'Load test, auto-scaling, caching, CDN, feature flags, circuit breakers, war room.',
    explanation: 'Week 1 - Prepare & Test:\n- Load testing: simulate 10x traffic (k6, JMeter). Identify bottlenecks.\n- Database: read replicas, connection pool tuning, query optimization for hot paths\n- Caching: aggressive caching cho product catalog, homepage (Redis, CDN)\n- Auto-scaling: configure HPA (Kubernetes), verify scaling triggers\n- Feature flags: prepare to disable non-critical features (recommendations, analytics)\n- Static assets: CDN, pre-warm cache\n\nWeek 2 - Harden & Rehearse:\n- Circuit breakers: Polly policies cho mọi external calls\n- Rate limiting: per-user, per-endpoint\n- Queue-based checkout: nếu cart/checkout quá tải → queue system\n- Database read replicas verified\n- Rehearsal: full load test at 10x, measure + fix\n- Runbook: documented procedures cho every failure scenario\n\nD-Day:\n- War room: team on-call, Slack channel, dashboard monitors\n- Staged rollout: open traffic gradually\n- Kill switches ready cho non-essential features\n- Celebrate + postmortem after 🎉',
    keywords: ['load test', 'auto-scaling', 'caching', 'CDN', 'circuit breaker', 'rate limiting', 'queue', 'read replica', 'war room', 'kill switch', 'HPA']
},
{
    id: 's-l-3', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'lead', round: 3,
    title: 'Team 2 senior developers có technical disagreement lớn: một người muốn dùng gRPC cho inter-service communication, người kia muốn REST + message queue. Debate kéo dài 2 tuần, block cả sprint. Bạn resolve thế nào?',
    interviewer: 'Technical leadership ≠ picking a side. How do you facilitate a decision that everyone can commit to?',
    answerType: 'single', placeholder: 'Cách resolve...',
    hint: 'Structured decision framework. Evaluation criteria. Timeboxed discussion. Disagree-and-commit.',
    explanation: 'Step 1: Acknowledge both perspectives (cả 2 approaches đều có merit)\n\nStep 2: Define evaluation criteria TRƯỚC khi evaluate options:\n- Performance requirements (latency, throughput)\n- Team expertise (learning curve)\n- Debugging/observability complexity\n- Use case fit (sync vs async communication)\n- Future flexibility\n\nStep 3: Structured comparison:\n- Both developers present their case (15 min each) với data/benchmarks\n- Map to evaluation criteria\n- Identify: có thể dùng BOTH? (gRPC for sync, message queue for async)\n\nStep 4: Decision\n- Nếu clear winner → adopt\n- Nếu tie → Tech Lead makes final call (accountable for the decision)\n- Document decision as ADR (Architecture Decision Record)\n\nStep 5: Disagree-and-commit\n- "We\'ve heard both sides. This is our decision. We commit as a team."\n- Set review point: revisit after 3 months with real data.\n\nKey: timeboxed, data-driven, documented. Never let technical debates become personal.',
    keywords: ['evaluation criteria', 'ADR', 'disagree-and-commit', 'timeboxed', 'data-driven', 'structured', 'both', 'review point', 'benchmark']
},

// ──── BỔ SUNG — SENIOR (thêm câu cho đủ rounds) ────
{
    id: 'k-s-5', type: 'knowledge', typeName: 'KIẾN THỨC', level: 'senior', round: 1,
    title: 'So sánh gRPC vs REST vs GraphQL. Khi nào dùng cái nào trong .NET microservices?',
    interviewer: 'Mỗi protocol có trade-offs. Đừng nói "gRPC nhanh hơn" — tôi muốn nghe WHY và WHEN.',
    answerType: 'single', placeholder: 'gRPC vs REST vs GraphQL...',
    hint: 'gRPC: internal service-to-service, streaming. REST: public API, CRUD. GraphQL: flexible queries, mobile BFF.',
    explanation: 'REST:\n- Pros: simple, cacheable (HTTP cache), universally understood, tooling\n- Cons: over-fetching, under-fetching, no streaming\n- Use: public APIs, CRUD-heavy, third-party integration\n\ngRPC:\n- Pros: fast (HTTP/2, protobuf binary), strongly typed, bidirectional streaming, code generation\n- Cons: not browser-friendly, harder to debug, protobuf learning curve\n- Use: internal microservice communication, high-throughput, real-time streaming\n\nGraphQL:\n- Pros: client specifies exactly what data needed, single endpoint, great for mobile (bandwidth)\n- Cons: complexity, N+1 problem, caching harder, security (query depth attacks)\n- Use: BFF (Backend for Frontend), mobile apps, complex data relationships\n\n.NET: REST (ASP.NET Core Web API), gRPC (Grpc.AspNetCore), GraphQL (HotChocolate/GraphQL.NET).',
    keywords: ['gRPC', 'REST', 'GraphQL', 'HTTP/2', 'protobuf', 'streaming', 'over-fetching', 'BFF', 'HotChocolate', 'binary']
},
{
    id: 'rev-s-1', type: 'review', typeName: 'CODE REVIEW', level: 'senior', round: 2,
    title: 'Review architecture này:\n\nAPI Gateway → Auth Service → User Service → SQL Server\n                           → Order Service → SQL Server\n                           → Payment Service → External Payment API\n                           → Notification Service → Email/SMS\n\nTất cả communication là synchronous HTTP. Tìm vấn đề.',
    interviewer: 'Architecture review ở level Senior. Tôi muốn thấy bạn identify systemic issues, không chỉ code-level bugs.',
    answerType: 'single', placeholder: 'Các vấn đề architecture...',
    hint: 'Synchronous everywhere, shared databases, single point of failure, coupling.',
    explanation: 'Vấn đề:\n1. Synchronous coupling: Payment Service gọi external API (chậm, timeout) → cascade failure đến Order Service → toàn bộ hệ thống slow.\n2. Notification Service: email/SMS nên async (không cần real-time response) → dùng message queue.\n3. No circuit breaker: nếu 1 service down → tất cả dependent services fail.\n4. Shared SQL Server? Nếu cùng DB instance → coupling, single point of failure.\n5. Auth Service giữa mọi request → bottleneck. Nên: JWT validation tại Gateway, Auth Service chỉ cho login/token refresh.\n6. No event-driven: Order placed → cần notify + update inventory → nên dùng events, không sync calls.\n\nFix:\n- Async cho: notifications, non-critical flows (message broker)\n- Circuit breaker + retry cho external calls\n- Database per service\n- API Gateway handles JWT validation\n- Event-driven cho cross-service workflows.',
    keywords: ['synchronous', 'cascade', 'circuit breaker', 'async', 'message queue', 'coupling', 'bottleneck', 'JWT', 'Gateway', 'event-driven', 'database per service']
},
{
    id: 'rev-s-2', type: 'review', typeName: 'CODE REVIEW', level: 'senior', round: 2,
    title: 'Review cách implement caching này:\n\npublic class ProductService\n{\n    private static Dictionary<int, Product> _cache = new();\n    public Product GetProduct(int id)\n    {\n        if (!_cache.ContainsKey(id))\n            _cache[id] = _db.Products.Find(id);\n        return _cache[id];\n    }\n}',
    interviewer: 'Trông simple nhưng rất nhiều vấn đề. Tìm hết.',
    answerType: 'single', placeholder: 'Vấn đề với caching code...',
    hint: 'Thread safety, memory leak, stale data, static...',
    explanation: 'Vấn đề:\n1. Thread safety: Dictionary không thread-safe. Concurrent access → exception hoặc data corruption. Dùng ConcurrentDictionary hoặc lock.\n2. Memory leak: static Dictionary → cache grow forever, không có eviction. OOM risk.\n3. Stale data: không bao giờ invalidate → data cũ mãi mãi.\n4. No TTL: cache entries sống vĩnh viễn.\n5. Static = singleton behavior nhưng không được quản lý bởi DI → hard to test, hard to reset.\n6. null issue: nếu product not found, cache[id] = null → mọi request sau trả về null.\n\nFix: dùng IMemoryCache (built-in ASP.NET Core):\n_cache.GetOrCreate(id, entry => {\n    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);\n    return _db.Products.Find(id);\n});\n\nHoặc IDistributedCache (Redis) cho multi-instance deployment.',
    keywords: ['thread-safe', 'ConcurrentDictionary', 'memory leak', 'stale', 'eviction', 'TTL', 'IMemoryCache', 'static', 'null', 'IDistributedCache']
},
{
    id: 's-s-4', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'senior', round: 3,
    title: 'Bạn phát hiện tech debt nghiêm trọng: service chính dùng .NET Framework 4.8, không upgrade được lên .NET 8. Team muốn rewrite nhưng business không cho thời gian. Bạn approach thế nào?',
    interviewer: 'Tech debt negotiation với business là daily reality của Senior. Bạn sell thế nào?',
    answerType: 'single', placeholder: 'Approach...',
    hint: 'Strangler fig pattern. Business case bằng số. Incremental migration. Risk quantification.',
    explanation: 'Approach:\n1. Quantify impact (nói bằng tiếng business):\n   - Security: .NET 4.8 sắp EOL → no security patches → compliance risk\n   - Performance: .NET 8 nhanh hơn 30-50% → giảm infra cost\n   - Hiring: devs không muốn làm .NET Framework → khó tuyển\n   - Features: không dùng được minimal APIs, native AOT, gRPC\n\n2. Strangler Fig Pattern (NOT big-bang rewrite):\n   - API Gateway routing: new features → .NET 8 service\n   - Gradually extract modules từ monolith sang .NET 8 services\n   - Old service shrinks over time, không cần stop business\n\n3. Sell to business:\n   - "Không phải dừng feature development"\n   - "Mỗi sprint dành 20% cho migration"\n   - ROI: tính tiền saved từ hosting, developer productivity, security insurance\n   - Timeline: 6-12 months incremental, không disruption\n\n4. Start small: migrate 1 non-critical module first → prove concept → expand.',
    keywords: ['Strangler Fig', 'incremental', 'EOL', 'business case', 'ROI', '20%', 'quantify', 'compliance', 'API Gateway', 'non-critical']
},
{
    id: 'l-s-3', type: 'leadership', typeName: 'LEADERSHIP', level: 'senior', round: 4,
    title: 'Bạn được giao mentor 2 junior developers. Một người rất proactive nhưng code chất lượng thấp. Người kia code tốt nhưng rất passive, chỉ làm khi được giao. Approach khác nhau cho mỗi người?',
    interviewer: 'Different people need different leadership styles. Show me you can adapt.',
    answerType: 'single', placeholder: 'Approach cho mỗi người...',
    hint: 'Situational leadership. Proactive person: channel energy, teach quality. Passive person: find motivation, give ownership.',
    explanation: 'Dev 1 (Proactive, low quality):\n- Strengths: motivation, initiative → DON\'T kill this energy\n- Problem: thiếu kỹ năng, không thiếu ý chí\n- Approach:\n  1. Pair programming: code cùng nhau, teach quality in context\n  2. Code review chi tiết: explain WHY, không chỉ WHAT to fix\n  3. Give them ownership of small features (end-to-end) với clear quality bar\n  4. Recommend resources: Clean Code, unit testing fundamentals\n\nDev 2 (Good code, passive):\n- Strengths: quality, attention to detail\n- Problem: thiếu initiative, có thể: bored, unclear expectations, fear of making mistakes\n- Approach:\n  1. 1-on-1: understand root cause (afraid? bored? unclear priorities?)\n  2. Give ownership: "This module is yours. You decide the approach."\n  3. Stretch assignments: slightly challenging tasks to build confidence\n  4. Recognize publicly khi they take initiative\n  5. Clear expectations: "Tôi expect bạn proactively identify improvements"\n\nBoth: weekly 1-on-1, clear goals, regular feedback (both positive and constructive).',
    keywords: ['pair programming', '1-on-1', 'ownership', 'motivation', 'quality', 'situational leadership', 'stretch', 'recognize', 'feedback', 'root cause']
},

// ──── BỔ SUNG — LEAD (thêm câu cho đủ rounds) ────
{
    id: 'd-l-5', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'lead', round: 1,
    title: 'Thiết kế hệ thống logging & monitoring cho 15 microservices. Yêu cầu: centralized logging, distributed tracing, alerting, dashboard.',
    interviewer: 'Observability là nền tảng của production-ready systems. Show me your stack choice và rationale.',
    answerType: 'multi',
    parts: [
        { label: 'Logging architecture', placeholder: 'Structured logging, aggregation, storage...' },
        { label: 'Distributed tracing', placeholder: 'Correlation ID, trace propagation...' },
        { label: 'Alerting & dashboards', placeholder: 'Metrics, alerts, SLOs...' }
    ],
    hint: 'ELK/Loki for logs, Jaeger/Zipkin for tracing, Prometheus + Grafana for metrics. Structured logging with Serilog.',
    explanation: 'Logging:\n- Structured logging: Serilog with JSON output (contextual data, not just messages)\n- Ship: Filebeat/Fluentd → Elasticsearch (hoặc Loki for cost-effective)\n- Kibana/Grafana for search & visualization\n- Correlation ID: propagate across all services (HttpClient middleware)\n- Log levels: Information for business events, Warning for recoverable, Error for failures\n\nDistributed Tracing:\n- OpenTelemetry SDK (vendor-neutral)\n- Export to: Jaeger, Zipkin, hoặc Application Insights\n- Auto-instrument: HTTP requests, DB queries, message broker\n- Custom spans cho business operations\n\nMetrics & Alerting:\n- Prometheus: scrape metrics from each service (/metrics endpoint)\n- Grafana dashboards: per-service, per-endpoint latency/error rate/throughput\n- SLOs: 99.9% availability, p99 latency < 500ms\n- Alerts: PagerDuty/Slack khi SLO breach\n- RED method: Rate, Errors, Duration per service\n\n.NET: OpenTelemetry.Instrumentation.AspNetCore, Serilog.Sinks.Elasticsearch.',
    keywords: ['Serilog', 'structured logging', 'Elasticsearch', 'Loki', 'OpenTelemetry', 'Jaeger', 'Prometheus', 'Grafana', 'SLO', 'RED method', 'correlation ID']
},
{
    id: 'l-l-6', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 2,
    title: 'Team velocity giảm 40% trong 3 sprints liên tiếp. Management gây áp lực. Bạn investigate và fix thế nào?',
    interviewer: 'Số liệu giảm nhưng root cause có thể nhiều. Data-driven approach, không blame.',
    answerType: 'single', placeholder: 'Investigation và action plan...',
    hint: 'Tech debt accumulation? Unclear requirements? Team burnout? Process overhead? Context switching?',
    explanation: 'Investigation (data-driven, không giả định):\n1. Metrics analysis:\n   - Sprint burndown charts: work not finishing hoặc scope creep?\n   - PR lead time: tăng? → code review bottleneck\n   - Bug rate: tăng? → quality issues causing rework\n   - Deployment frequency: giảm? → CI/CD problems\n\n2. Team input (anonymous survey + 1-on-1):\n   - Burnout indicators?\n   - Unclear requirements từ PO?\n   - Tech debt making everything slower?\n   - Too many meetings/interruptions?\n   - Context switching giữa nhiều projects?\n\n3. Common root causes & fixes:\n   - Tech debt: dedicate 20-30% capacity per sprint\n   - Unclear requirements: better refinement sessions, acceptance criteria\n   - Burnout: reduce WIP, protect focus time, sustainable pace\n   - Context switching: assign dedicated owners per feature\n   - Process overhead: cut unnecessary meetings, async standup option\n\n4. Communicate to management:\n   - Show data (not opinions)\n   - Present root cause + action plan + expected timeline\n   - "Pushing harder will make it worse" — explain sustainable pace',
    keywords: ['velocity', 'burndown', 'tech debt', 'burnout', 'context switching', 'WIP', 'data-driven', 'sustainable pace', 'root cause', '1-on-1']
},
{
    id: 'l-l-7', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 2,
    title: 'Bạn cần evaluate và chọn giữa 2 approaches cho new project: build in-house vs buy/integrate third-party solution. Quyết định process?',
    interviewer: 'Build vs buy là one of the most impactful decisions a tech lead makes. Framework?',
    answerType: 'single', placeholder: 'Decision framework...',
    hint: 'Total cost of ownership, core competency, time to market, lock-in risk, customization needs.',
    explanation: 'Decision framework:\n\n1. Core competency test:\n   - Là core business differentiator? → Build (competitive advantage)\n   - Là commodity/supporting function? → Buy (logging, auth, email)\n\n2. Total Cost of Ownership (3-5 years):\n   Build: development + maintenance + ops + opportunity cost\n   Buy: license + integration + customization + migration risk\n   → Thường build rẻ hơn short-term, buy rẻ hơn long-term\n\n3. Evaluation matrix:\n   - Time to market: buy thường nhanh hơn\n   - Customization: build linh hoạt hơn\n   - Vendor lock-in risk: buy = dependent on vendor\n   - Team expertise: build cần hiring/training?\n   - Security/compliance: buy đã certified? build phải tự audit\n\n4. Hybrid option: buy + extend (API integration, plugins)\n\n5. Decision: score mỗi criteria (1-5), weighted by importance → tổng điểm\n\n6. Document: ADR với rationale, revisit trigger conditions\n\nKey: "Build what differentiates, buy what doesn\'t."',
    keywords: ['build vs buy', 'TCO', 'core competency', 'vendor lock-in', 'ADR', 'total cost of ownership', 'time to market', 'hybrid', 'evaluation matrix', 'differentiate']
},
{
    id: 's-l-4', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'lead', round: 3,
    title: 'Database migration trên production thất bại giữa chừng. Table có 50 triệu records, migration đã alter 30 triệu rows, còn 20 triệu chưa xong. Application đang down. Options?',
    interviewer: 'Production crisis với data at risk. Every minute = business loss. Walk me through your decision tree.',
    answerType: 'single', placeholder: 'Decision tree và action...',
    hint: 'Rollback possible? Continue forward? Read-only mode? Data integrity check?',
    explanation: 'Immediate assessment (first 5 minutes):\n1. Is migration reversible? Có backward-compatible DOWN migration không?\n2. Data integrity: 30M rows đã migrate đúng format chưa?\n3. Failure reason: disk space? lock timeout? connection drop?\n\nOptions (decision tree):\n\nOption A: Continue forward (IF):\n- Fix root cause (more disk, increase timeout)\n- Resume migration cho remaining 20M rows\n- Total downtime estimate?\n- Risk: nếu fail lại → worse situation\n\nOption B: Rollback (IF):\n- DOWN migration exists và tested\n- Roll back 30M altered rows\n- Risk: rollback cũng mất thời gian, data loss nếu DOWN migration buggy\n\nOption C: Partial workaround:\n- Application code handle BOTH old and new format\n- Deploy app first → restore service\n- Complete migration in background (online migration)\n\nBest practice for next time:\n- Online migration: pt-online-schema-change, gh-ost (zero-downtime)\n- Blue-green database deployment\n- Test migration on production-size dataset first\n- Maintenance window communication\n- Rollback plan tested trước khi migrate.',
    keywords: ['rollback', 'forward', 'data integrity', 'online migration', 'pt-online-schema-change', 'blue-green', 'downtime', 'backward-compatible', 'maintenance window', 'decision tree']
},
{
    id: 'l-l-8', type: 'leadership', typeName: 'LEADERSHIP', level: 'lead', round: 4,
    title: 'Company muốn mở engineering office ở thành phố khác (distributed team). Bạn là Tech Lead chịu trách nhiệm setup remote engineering culture. Plan?',
    interviewer: 'Remote/distributed teams là reality. Bạn build collaboration across locations thế nào?',
    answerType: 'single', placeholder: 'Remote engineering culture plan...',
    hint: 'Async-first communication, documentation culture, timezone overlap, tooling, onboarding.',
    explanation: 'Communication:\n- Async-first: decisions in writing (RFC, ADR, Notion/Confluence), không phụ thuộc meetings\n- Overlap hours: 4h minimum timezone overlap cho sync discussions\n- Communication channels: Slack (quick), GitHub/Linear (work), Notion (knowledge)\n- Meeting hygiene: agenda required, recorded, notes shared\n\nCollaboration:\n- Code ownership shared across locations (không silo theo location)\n- Pair programming cross-location (weekly rotation)\n- PR reviews cross-location (mandatory: ít nhất 1 reviewer từ office khác)\n\nOnboarding:\n- Comprehensive documentation: architecture, runbooks, setup guides\n- Buddy system: new hire paired với experienced member\n- First week: video calls với every team member\n\nCulture:\n- Quarterly in-person meetups (team bonding)\n- Virtual social events (game nights, coffee chats)\n- Blameless postmortem culture\n- Equal voice: remote members phải participate equally in decisions\n\nTooling: GitHub, Slack, Linear/Jira, Notion, Zoom, Miro (whiteboarding).\n\nKey principle: nếu không accessible cho remote → không tồn tại.',
    keywords: ['async-first', 'documentation', 'overlap hours', 'RFC', 'pair programming', 'cross-location', 'onboarding', 'buddy system', 'meetup', 'remote']
},

// ──── BỔ SUNG — LẤP CHỖ THIẾU ────

// Fresher: cần thêm 1 refactor
{
    id: 'ref-f-3', type: 'refactor', typeName: 'REFACTOR', level: 'fresher', round: 3,
    title: 'Refactor đoạn code sau:\n\npublic string GetDayName(int day)\n{\n    if (day == 1) return "Thứ Hai";\n    if (day == 2) return "Thứ Ba";\n    if (day == 3) return "Thứ Tư";\n    if (day == 4) return "Thứ Năm";\n    if (day == 5) return "Thứ Sáu";\n    if (day == 6) return "Thứ Bảy";\n    if (day == 7) return "Chủ Nhật";\n    return "Không hợp lệ";\n}',
    interviewer: 'Nhiều cách refactor. Bạn chọn cách nào và tại sao?',
    answerType: 'single', placeholder: 'Code sau khi refactor...',
    hint: 'Có thể dùng array/dictionary lookup, switch expression, hoặc enum.',
    explanation: 'Cách 1 - Array lookup:\nprivate static readonly string[] Days = { "", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật" };\npublic string GetDayName(int day) =>\n    day >= 1 && day <= 7 ? Days[day] : "Không hợp lệ";\n\nCách 2 - Switch expression:\nreturn day switch {\n    1 => "Thứ Hai", 2 => "Thứ Ba", ..., _ => "Không hợp lệ"\n};\n\nCách 3 - Dùng DayOfWeek enum (tốt nhất):\nDùng CultureInfo("vi-VN") để get tên ngày theo locale.\n\nLoại bỏ chuỗi if/else dài, dễ maintain và mở rộng.',
    keywords: ['array', 'dictionary', 'switch expression', 'enum', 'DayOfWeek', 'lookup', 'pattern matching']
},

// Mid: cần thêm 1 bug
{
    id: 'b-m-5', type: 'bug', typeName: 'TÌM BUG', level: 'mid', round: 2,
    title: 'Tìm vấn đề trong code background job:\n\npublic class EmailService\n{\n    private readonly SmtpClient _client = new SmtpClient("smtp.company.com");\n    \n    public async Task SendBulkEmails(List<string> emails, string subject, string body)\n    {\n        foreach (var email in emails)\n        {\n            await _client.SendMailAsync(new MailMessage("noreply@company.com", email, subject, body));\n        }\n    }\n}',
    interviewer: 'Code này chạy OK với 10 emails. Nhưng production gửi 10,000 emails/ngày. Vấn đề gì?',
    answerType: 'single', placeholder: 'Các vấn đề...',
    hint: 'SmtpClient lifetime, MailMessage disposal, sequential processing, error handling.',
    explanation: 'Vấn đề:\n1. SmtpClient không thread-safe và không nên reuse cho bulk operations. SmtpClient cũ deprecated → dùng MailKit.\n2. MailMessage không được Dispose → memory leak khi gửi 10K emails.\n3. Sequential processing: gửi từng email một → cực chậm. Cần batch/parallel hoặc queue.\n4. No error handling: 1 email fail → toàn bộ process dừng. Cần try-catch per email + retry.\n5. No rate limiting: SMTP server có thể block nếu gửi quá nhanh.\n\nFix:\n- Dùng MailKit thay SmtpClient\n- Dispose MailMessage (using statement)\n- Queue-based: đẩy vào message queue, worker consume\n- Retry với exponential backoff\n- Rate limiting (ví dụ 100 emails/phút)',
    keywords: ['SmtpClient', 'Dispose', 'MailMessage', 'memory leak', 'sequential', 'queue', 'rate limiting', 'retry', 'MailKit', 'thread-safe']
},

// Mid: cần thêm 1 design
{
    id: 'd-m-3', type: 'design', typeName: 'THIẾT KẾ HỆ THỐNG', level: 'mid', round: 3,
    title: 'Thiết kế hệ thống URL shortener (giống bit.ly). Yêu cầu: tạo short URL, redirect, tracking clicks, expiration.',
    interviewer: 'Classic system design question. Tôi muốn thấy cách bạn nghĩ từ data model đến scaling.',
    answerType: 'multi',
    parts: [
        { label: 'Data model & Short URL generation', placeholder: 'Schema, algorithm tạo short code...' },
        { label: 'Redirect flow & Performance', placeholder: 'Lookup, caching, redirect...' },
        { label: 'Analytics & Expiration', placeholder: 'Click tracking, cleanup...' }
    ],
    hint: 'Base62 encoding, hash hoặc counter-based ID. Redis cache cho hot URLs. Async tracking.',
    explanation: 'Data model:\n- Table: ShortUrls (Id, ShortCode, OriginalUrl, CreatedAt, ExpiresAt, UserId)\n- Table: ClickStats (Id, ShortCodeId, ClickedAt, IP, UserAgent, Referrer)\n\nShort URL generation:\n- Counter-based: auto-increment ID → Base62 encode (0-9, a-z, A-Z) → "abc123"\n- 6 chars Base62 = 62^6 = 56 billion URLs đủ dùng\n- Hoặc hash-based: MD5/SHA256 → lấy 6 chars đầu → check collision\n\nRedirect flow:\n1. GET /abc123 → lookup Redis cache first\n2. Cache miss → query DB → cache result\n3. Return 301 (permanent) hoặc 302 (temporary) redirect\n4. Async: publish click event to queue → analytics service\n\nPerformance: Redis cache cho hot URLs (TTL 1 hour). Read:Write ratio rất cao (1000:1).\n\nExpiration: background job scan expired URLs, soft delete hoặc archive.',
    keywords: ['Base62', 'counter', 'hash', 'Redis', 'cache', '301', '302', 'redirect', 'async', 'click tracking', 'expiration', 'TTL']
},

// Lead: cần thêm bug-lead cho round 3
{
    id: 'b-l-1', type: 'bug', typeName: 'TÌM BUG', level: 'lead', round: 3,
    title: 'Production monitoring alert: Kubernetes pod liên tục bị OOMKilled (Out of Memory) mỗi 2-3 giờ. Service là .NET 8 API, memory limit 512MB. Logs không có exception trước khi crash. Investigate?',
    interviewer: 'K8s OOMKill là silent killer — process bị kill bởi OS, không phải application. Walk me through investigation.',
    answerType: 'single', placeholder: 'Từng bước investigate...',
    hint: 'Memory profiling, GC settings, LOH fragmentation, connection leaks, caching without eviction.',
    explanation: 'Investigation steps:\n1. Confirm: kubectl describe pod → OOMKilled, check memory limit (512MB). Check if limit quá thấp.\n2. Metrics: Grafana/Prometheus → memory usage over time. Linear growth = leak. Sawtooth = GC working but growing.\n3. Capture diagnostics TRƯỚC khi crash:\n   - dotnet-counters: GC heap size, Gen0/1/2 counts\n   - dotnet-dump collect: capture heap dump khi memory ~400MB\n   - dotnet-gcdump: GC-specific dump, lighter weight\n\n4. Analyze dump:\n   - dumpheap -stat: top objects by size\n   - Common culprits: string[], byte[], List<T> grow unbounded\n\n5. Common .NET causes:\n   - Event handlers not unsubscribed\n   - IDisposable not disposed (HttpClient, DbContext)\n   - Static collections growing forever\n   - Caching without eviction policy\n   - LOH fragmentation (objects > 85KB)\n   - gRPC/SignalR connections not cleaned up\n\n6. Fix options:\n   - Increase limit if legitimately needed\n   - Fix leak (usually #5 above)\n   - Enable Server GC: <ServerGarbageCollection>true</ServerGarbageCollection>\n   - Set GCHeapHardLimit in runtimeconfig.json',
    keywords: ['OOMKilled', 'dotnet-dump', 'dotnet-counters', 'GC', 'heap', 'memory leak', 'IDisposable', 'LOH', 'static', 'eviction', 'ServerGC']
},
{
    id: 'b-l-2', type: 'bug', typeName: 'TÌM BUG', level: 'lead', round: 3,
    title: 'Production database CPU đột ngột tăng từ 20% lên 95%. App vẫn chạy nhưng response time tăng 10x. Đây là ngày bình thường, không có deployment mới. Investigate?',
    interviewer: 'Database performance crisis — không có code change gần đây. Root cause hunting.',
    answerType: 'single', placeholder: 'Từng bước investigate...',
    hint: 'Query plan regression, parameter sniffing, index rebuild, statistics stale, lock escalation, long-running transaction.',
    explanation: 'Immediate:\n1. Check running queries: sys.dm_exec_requests → tìm query chiếm CPU cao nhất\n2. Check blocking: sys.dm_exec_requests → blocking_session_id. Long-running transaction lock?\n3. Check wait stats: sys.dm_os_wait_stats → CPU (SOS_SCHEDULER_YIELD) hay IO hay lock?\n\nCommon causes (no deployment):\n1. Parameter sniffing: cached plan bị stale. Query plan compiled cho 1 parameter, perform tệ cho parameter khác.\n   → Fix: OPTION(RECOMPILE), sp_recompile, plan guides\n\n2. Statistics outdated: auto-update statistics chưa trigger.\n   → Fix: UPDATE STATISTICS, enable auto-update\n\n3. Index fragmentation: large table vượt fragmentation threshold.\n   → Fix: ALTER INDEX REBUILD\n\n4. Data volume spike: table grow đến tipping point, query plan switch từ index seek → scan.\n   → Fix: add/optimize indexes\n\n5. Runaway query: scheduled job hoặc report query chạy full table scan.\n   → Fix: kill session, optimize query, move to read replica\n\n6. TempDB contention: too many temp tables/sorts.\n\nPrevention: baseline metrics, query store enabled, alert on CPU > 70%.',
    keywords: ['parameter sniffing', 'statistics', 'index fragmentation', 'query plan', 'blocking', 'wait stats', 'RECOMPILE', 'table scan', 'tempdb', 'query store']
},

// Senior: thêm situation để round 4 không trùng round 3
{
    id: 's-s-5', type: 'situation', typeName: 'TÌNH HUỐNG', level: 'senior', round: 4,
    title: 'Team vừa release feature mới. 1 tuần sau, customer support report: 5% users bị mất data (orders biến mất). Không có error logs rõ ràng. Investigate và handle?',
    interviewer: 'Data loss = top severity incident. Cách bạn handle vừa technical vừa communication.',
    answerType: 'single', placeholder: 'Investigation và handling...',
    hint: 'Scope assessment, data recovery, root cause analysis, customer communication.',
    explanation: 'Immediate (first hours):\n1. Stop bleeding: feature flag disable feature mới nếu suspected cause\n2. Scope assessment: chính xác bao nhiêu users affected? query DB compare trước/sau release\n3. Preserve evidence: backup current state, audit logs, application logs around release time\n\nInvestigation:\n4. Diff code changes in release: tìm mọi query có DELETE, UPDATE, hoặc logic filter data\n5. Check: race condition? eventual consistency bug? soft-delete logic sai? query filter sai timezone?\n6. Common culprit: migration script, background job cleanup chạy sai condition, cache invalidation\n7. Test reproduce trên staging với production-like data\n\nData recovery:\n8. Soft-deleted? → restore IsDeleted = false\n9. Hard-deleted? → restore từ backup (point-in-time recovery)\n10. Partial data? → reconstruct từ audit logs, event store, hoặc related tables\n\nCommunication:\n11. Internal: incident channel, status updates mỗi 30 phút\n12. Customers: transparent notification — what happened, timeline, what we\'re doing\n13. Post-recovery: blameless postmortem, action items\n\nPrevention: soft-delete by default, audit trails, staging test with production data volume.',
    keywords: ['feature flag', 'scope', 'audit log', 'backup', 'point-in-time', 'soft-delete', 'postmortem', 'race condition', 'data recovery', 'communication']
}
];

// ===== STATE =====
let selectedPosition = null;
let currentQuestions = [];
let currentIndex = 0;
let currentRound = 0;
let answers = {};
let scores = {};
let hintUsed = {};
let timerInterval = null;
let elapsedSeconds = 0;

// ===== POSITION SELECTION =====
function selectPosition(el) {
    document.querySelectorAll('.iv-pos-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedPosition = el.dataset.pos;

    const cfg = positionConfig[selectedPosition];
    const totalQ = cfg.rounds.reduce((s, r) => s + r.count, 0);

    document.getElementById('selectedInfo').innerHTML = `
        <h3>Ứng tuyển: ${cfg.title}</h3>
        <p>Mức lương: <strong>${cfg.salary}</strong> · ${cfg.rounds.length} vòng phỏng vấn · ${totalQ} câu hỏi · Điểm đỗ: ${cfg.passScore}/100</p>
    `;
    document.getElementById('startArea').style.display = 'block';
    document.getElementById('startArea').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== START INTERVIEW =====
function startInterview() {
    if (!selectedPosition) return;

    const cfg = positionConfig[selectedPosition];
    currentQuestions = [];
    currentRound = 0;

    // Build question set per round — prioritize questions at the correct level
    const levelOrder = ['fresher', 'junior', 'mid', 'senior', 'lead'];
    const posIdx = levelOrder.indexOf(selectedPosition);
    const usedIds = new Set();

    cfg.rounds.forEach((round, ri) => {
        // 1) Exact level questions first
        const exactLevel = questionBank.filter(q =>
            round.types.includes(q.type) && q.level === selectedPosition && !usedIds.has(q.id)
        );

        // 2) One level below (for positions that share some overlap)
        const oneLevelBelow = posIdx > 0 ? questionBank.filter(q =>
            round.types.includes(q.type) && q.level === levelOrder[posIdx - 1] && !usedIds.has(q.id)
        ) : [];

        // 3) Combine: exact first, then one-below as fallback
        const pool = [...shuffleArray(exactLevel), ...shuffleArray(oneLevelBelow)];
        const selected = pool.slice(0, round.count);

        selected.forEach(q => {
            usedIds.add(q.id);
            currentQuestions.push({ ...q, roundIndex: ri, roundName: round.name });
        });
    });

    if (currentQuestions.length === 0) {
        alert('Lỗi: không đủ câu hỏi cho vị trí này.');
        return;
    }

    currentIndex = 0;
    answers = {};
    scores = {};
    hintUsed = {};
    elapsedSeconds = 0;

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('testArea').style.display = 'block';
    document.getElementById('resultScreen').style.display = 'none';

    // Start timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
        const s = String(elapsedSeconds % 60).padStart(2, '0');
        document.getElementById('ivTimer').textContent = `${m}:${s}`;
    }, 1000);

    renderQuestion();
}

// ===== RENDER QUESTION =====
function renderQuestion() {
    const q = currentQuestions[currentIndex];
    const total = currentQuestions.length;
    const cfg = positionConfig[selectedPosition];

    // Progress
    document.getElementById('progFill').style.width = ((currentIndex) / total * 100) + '%';
    document.getElementById('progText').textContent = `Câu ${currentIndex + 1}/${total}`;
    document.getElementById('progCat').textContent = q.roundName;

    // Round label
    const roundNum = q.roundIndex + 1;
    document.getElementById('ivRoundLabel').textContent = `Vòng ${roundNum} — ${q.roundName}`;

    // Type class
    const typeClass = 'type-' + q.type;
    const roundClass = 'round-' + roundNum;

    let html = `
        <p class="iv-prefix">${q.interviewer || 'Câu hỏi tiếp theo:'}</p>
        <span class="iv-round-tag ${roundClass}">VÒNG ${roundNum}</span>
        <span class="st-q-type ${typeClass}">${q.typeName}</span>
        <h3 class="st-q-title">${q.title}</h3>
    `;

    if (q.description) {
        html += `<p class="st-q-desc">${q.description.replace(/\n/g, '<br>')}</p>`;
    }

    if (q.code) {
        html += `<div class="st-code-block"><span class="st-code-label">${q.codeLang || 'C#'}</span><pre><code>${escapeHtml(q.code)}</code></pre></div>`;
    }

    document.getElementById('questionArea').innerHTML = html;

    // Answer area
    let answerHtml = '';
    if (q.answerType === 'multi' && q.parts) {
        answerHtml = '<div class="st-answer-group">';
        q.parts.forEach((part, i) => {
            const saved = answers[q.id] ? answers[q.id][i] || '' : '';
            answerHtml += `<div class="st-answer-part"><label>${part.label}</label><textarea data-part="${i}" placeholder="${part.placeholder}">${saved}</textarea></div>`;
        });
        answerHtml += '</div>';
    } else {
        const saved = answers[q.id] || '';
        answerHtml = `<label class="st-answer-label">Câu trả lời của bạn:</label><textarea class="st-answer-textarea" id="mainAnswer" placeholder="${q.placeholder || 'Nhập câu trả lời...'}">${saved}</textarea>`;
    }
    document.getElementById('answerArea').innerHTML = answerHtml;

    // Buttons
    document.getElementById('btnSubmit').style.display = 'inline-block';
    document.getElementById('btnNext').style.display = 'none';
    document.getElementById('btnHint').style.display = 'inline-block';
    document.getElementById('btnSkip').style.display = 'inline-block';
    document.getElementById('feedbackArea').style.display = 'none';
    document.getElementById('feedbackArea').innerHTML = '';

    const oldHint = document.querySelector('.st-hint');
    if (oldHint) oldHint.remove();

    document.getElementById('testArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== HINT =====
function showHint() {
    const q = currentQuestions[currentIndex];
    if (!q.hint) return;
    hintUsed[q.id] = true;

    const existing = document.querySelector('.st-hint');
    if (existing) { existing.remove(); return; }

    const div = document.createElement('div');
    div.className = 'st-hint';
    div.innerHTML = `<strong>Gợi ý (-15 điểm):</strong> ${q.hint}`;
    document.getElementById('answerArea').before(div);
}

// ===== SKIP =====
function skipQuestion() {
    const q = currentQuestions[currentIndex];
    answers[q.id] = '(Bỏ qua)';
    scores[q.id] = { score: 0, matched: 0, total: (q.keywords || []).length, matchedKeywords: [] };

    showFeedback(q, scores[q.id], true);
    document.getElementById('btnSubmit').style.display = 'none';
    document.getElementById('btnHint').style.display = 'none';
    document.getElementById('btnSkip').style.display = 'none';
    document.getElementById('btnNext').style.display = 'inline-block';
    if (currentIndex === currentQuestions.length - 1) {
        document.getElementById('btnNext').textContent = 'Xem kết quả →';
    }
}

// ===== SUBMIT =====
function submitAnswer() {
    const q = currentQuestions[currentIndex];

    if (q.answerType === 'multi' && q.parts) {
        const parts = [];
        document.querySelectorAll('.st-answer-part textarea').forEach(ta => parts.push(ta.value.trim()));
        answers[q.id] = parts;
        if (parts.every(p => p === '')) { alert('Vui lòng nhập ít nhất một phần!'); return; }
    } else {
        const val = document.getElementById('mainAnswer').value.trim();
        if (!val) { alert('Vui lòng nhập câu trả lời!'); return; }
        answers[q.id] = val;
    }

    const score = gradeAnswer(q, answers[q.id]);
    scores[q.id] = score;

    showFeedback(q, score, false);

    document.getElementById('btnSubmit').style.display = 'none';
    document.getElementById('btnHint').style.display = 'none';
    document.getElementById('btnSkip').style.display = 'none';
    document.getElementById('btnNext').style.display = 'inline-block';
    if (currentIndex === currentQuestions.length - 1) {
        document.getElementById('btnNext').textContent = 'Xem kết quả →';
    }
}

// ===== GRADING — STRICT =====
function gradeAnswer(q, answer) {
    let text = Array.isArray(answer) ? answer.join(' ').toLowerCase() : (answer || '').toLowerCase();
    if (!text) return { score: 0, matched: 0, total: (q.keywords || []).length, matchedKeywords: [] };

    const keywords = q.keywords || [];
    let matched = 0;
    const matchedKeywords = [];

    keywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) { matched++; matchedKeywords.push(kw); }
    });

    let score = 0;
    if (keywords.length > 0) {
        score = Math.round((matched / keywords.length) * 100);
    }

    // Strict: minimal bonus
    if (text.length > 300) score = Math.min(100, score + 5);

    // Penalty for hint — HARSH
    if (hintUsed[q.id]) score = Math.max(0, score - 15);

    // Short answer penalty
    if (text.length < 20 && score > 30) score = 30;

    return { score, matched, total: keywords.length, matchedKeywords };
}

// ===== FEEDBACK =====
function showFeedback(q, scoreObj, isSkipped) {
    const score = scoreObj.score;
    const fb = document.getElementById('feedbackArea');
    fb.style.display = 'block';

    let verdict = 'FAIL';
    let verdictClass = 'fail';
    let scoreClass = 'score-fail';
    let commentClass = '';

    if (score >= 70) { verdict = 'PASS'; verdictClass = 'pass'; scoreClass = 'score-pass'; commentClass = 'positive'; }
    else if (score >= 45) { verdict = 'BORDERLINE'; verdictClass = 'borderline'; scoreClass = 'score-borderline'; }

    let interviewerComment = '';
    if (isSkipped) {
        interviewerComment = 'Bỏ qua câu hỏi. Trong phỏng vấn thật, bạn nên thử trả lời — ngay cả khi không chắc chắn, cách bạn approach vấn đề cũng có giá trị.';
    } else if (score >= 70) {
        interviewerComment = 'Tốt. Bạn nắm được những điểm quan trọng. Đây là câu trả lời ở mức chấp nhận được.';
    } else if (score >= 45) {
        interviewerComment = 'Bạn hiểu một phần nhưng thiếu chiều sâu. Trong phỏng vấn thật, tôi sẽ hỏi thêm follow-up để xác nhận.';
    } else {
        interviewerComment = 'Câu trả lời chưa đạt yêu cầu. Bạn cần ôn lại kiến thức ở phần này trước khi phỏng vấn.';
    }

    let html = `
        <div class="st-fb-header">
            <span class="st-fb-score ${scoreClass}">${score}/100</span>
            <span class="iv-verdict ${verdictClass}">${verdict}</span>
        </div>
        <div class="iv-comment ${commentClass}"><strong>Nhà tuyển dụng:</strong> ${interviewerComment}</div>
        <div class="st-fb-explain">${q.explanation.replace(/\n/g, '<br>')}</div>
    `;

    if (q.keywords && q.keywords.length > 0) {
        html += '<div class="st-fb-keywords"><strong style="font-size:0.75rem;color:var(--text-muted);margin-right:8px;">Keywords cần đề cập:</strong>';
        q.keywords.forEach(kw => {
            const isMatched = scoreObj.matchedKeywords.includes(kw);
            html += `<span class="st-fb-kw ${isMatched ? 'matched' : 'missed'}">${isMatched ? '✓ ' : ''}${kw}</span>`;
        });
        html += '</div>';
    }

    fb.innerHTML = html;
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== NEXT =====
function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        showResults();
    }
}

// ===== RESULTS =====
function showResults() {
    clearInterval(timerInterval);
    document.getElementById('testArea').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';

    const cfg = positionConfig[selectedPosition];

    // Overall score
    let totalScore = 0, count = 0;
    const roundScores = {};

    currentQuestions.forEach(q => {
        const s = scores[q.id] ? scores[q.id].score : 0;
        totalScore += s; count++;

        const rk = q.roundIndex;
        if (!roundScores[rk]) roundScores[rk] = { total: 0, count: 0, name: q.roundName };
        roundScores[rk].total += s;
        roundScores[rk].count++;
    });

    const avgScore = count > 0 ? Math.round(totalScore / count) : 0;
    const passed = avgScore >= cfg.passScore;

    // Check if any round is below 40 → auto fail
    let roundFail = false;
    Object.values(roundScores).forEach(r => {
        if (Math.round(r.total / r.count) < 35) roundFail = true;
    });

    const finalPass = passed && !roundFail;
    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (avgScore / 100) * circumference;

    // Time
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;

    // Interviewer comment
    let commentKey = finalPass ? 'pass' : (avgScore >= cfg.passScore - 10 ? 'borderline' : 'fail');
    const comment = cfg.interviewerComments[commentKey];

    // Round breakdown
    let roundHtml = '';
    Object.entries(roundScores).forEach(([ri, rs]) => {
        const avg = Math.round(rs.total / rs.count);
        let fillClass = 'fill-fail', rvClass = 'rv-fail', rvText = 'FAIL';
        if (avg >= 65) { fillClass = 'fill-pass'; rvClass = 'rv-pass'; rvText = 'PASS'; }
        else if (avg >= 45) { fillClass = 'fill-borderline'; rvClass = 'rv-borderline'; rvText = 'SÁT'; }

        roundHtml += `<div class="iv-round-row">
            <span class="iv-round-name">Vòng ${+ri + 1}: ${rs.name}</span>
            <div class="iv-round-bar"><div class="iv-round-fill ${fillClass}" style="width:${avg}%"></div></div>
            <span class="iv-round-pct" style="color:${avg >= 65 ? 'var(--success)' : avg >= 45 ? 'var(--warning)' : 'var(--danger)'}">${avg}%</span>
            <span class="iv-round-verdict ${rvClass}">${rvText}</span>
        </div>`;
    });

    // Strengths & weaknesses
    const goodQs = currentQuestions.filter(q => scores[q.id] && scores[q.id].score >= 70);
    const badQs = currentQuestions.filter(q => !scores[q.id] || scores[q.id].score < 40);

    let strengthHtml = goodQs.slice(0, 3).map(q => `<div class="iv-point">${q.typeName}: ${q.title.substring(0, 60)}...</div>`).join('');
    let weakHtml = badQs.slice(0, 3).map(q => `<div class="iv-point">${q.typeName}: ${q.title.substring(0, 60)}...</div>`).join('');

    if (!strengthHtml) strengthHtml = '<div class="iv-point">Chưa có câu nào đạt mức tốt</div>';
    if (!weakHtml) weakHtml = '<div class="iv-point">Không có điểm yếu rõ rệt</div>';

    // Review
    let reviewHtml = '';
    currentQuestions.forEach(q => {
        const s = scores[q.id] ? scores[q.id].score : 0;
        let cl = 'review-fail', scl = 'low';
        if (s >= 70) { cl = 'review-pass'; scl = 'good'; }
        else if (s >= 45) { cl = 'review-borderline'; scl = 'mid'; }

        const ua = Array.isArray(answers[q.id]) ? answers[q.id].join('\n---\n') : (answers[q.id] || '(Chưa trả lời)');
        reviewHtml += `<div class="st-review-item ${cl}">
            <div class="st-review-q">[Vòng ${q.roundIndex + 1}] ${q.typeName}: ${q.title.substring(0, 80)}</div>
            <div class="st-review-your">${escapeHtml(ua)}</div>
            <span class="st-review-score ${scl}">${s}/100</span>
        </div>`;
    });

    // Advice
    const adviceMap = {
        knowledge: { icon: '📘', title: 'Ôn lại kiến thức nền tảng', text: 'C# fundamentals, OOP, async/await, DI, SOLID. Đây là nền tảng bắt buộc.' },
        read: { icon: '🔍', title: 'Luyện trace code', text: 'Đọc code nhiều hơn — GitHub repos, colleague code reviews. Trace execution path trong đầu.' },
        bug: { icon: '🐛', title: 'Luyện debugging', text: 'Practice tìm bugs: race conditions, memory leaks, N+1 queries. Đọc production incident reports.' },
        refactor: { icon: '🔧', title: 'Học Clean Code & Patterns', text: 'SOLID principles, Design Patterns (Strategy, Factory). Refactor code hàng ngày.' },
        review: { icon: '👁️', title: 'Practice Code Review', text: 'Review PRs trong team. Chú ý security, performance, design. Đọc OWASP Top 10.' },
        design: { icon: '📐', title: 'Học System Design', text: 'Đọc "Designing Data-Intensive Applications". Practice trên system design interview websites.' },
        situation: { icon: '🚨', title: 'On-call & Incident Experience', text: 'Tham gia on-call rotation. Viết postmortems. Học từ production incidents.' },
        leadership: { icon: '👥', title: 'Phát triển Leadership', text: 'Mentor juniors, lead initiatives, facilitate technical discussions. Đọc "The Manager\'s Path".' }
    };

    const weakTypes = {};
    badQs.forEach(q => { weakTypes[q.type] = true; });
    let adviceHtml = Object.keys(weakTypes).slice(0, 4).map(t => {
        const a = adviceMap[t] || adviceMap.knowledge;
        return `<div class="st-advice-item"><span class="st-advice-icon">${a.icon}</span><div><strong>${a.title}</strong><p>${a.text}</p></div></div>`;
    }).join('');

    if (!adviceHtml) adviceHtml = `<div class="st-advice-item"><span class="st-advice-icon">🎯</span><div><strong>Excellent performance!</strong><p>Thử ứng tuyển vị trí cao hơn để challenge bản thân.</p></div></div>`;

    document.getElementById('resultContent').innerHTML = `
        <div class="st-result-header">
            <h2>Kết Quả Phỏng Vấn</h2>
            <p>Vị trí: ${cfg.title} · ${count} câu hỏi · ${mins} phút ${secs} giây</p>
        </div>

        <div class="iv-big-verdict ${finalPass ? 'pass' : 'fail'}">${finalPass ? 'PASS' : 'FAIL'}</div>
        <p class="iv-verdict-desc">${finalPass ? `Chúc mừng! Bạn đạt yêu cầu cho vị trí ${cfg.title}.` : roundFail ? `Bạn fail ở ít nhất 1 vòng phỏng vấn (dưới 35%). Cần đạt tối thiểu ở mỗi vòng.` : `Điểm tổng ${avgScore}/100 chưa đạt ngưỡng ${cfg.passScore} để pass.`}</p>

        <div class="st-score-circle">
            <svg viewBox="0 0 130 130">
                <defs><linearGradient id="stGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${finalPass ? '#66BB6A' : '#FF5252'}"/>
                    <stop offset="100%" style="stop-color:${finalPass ? '#00D2FF' : '#FF9F43'}"/>
                </linearGradient></defs>
                <circle class="st-score-bg" cx="65" cy="65" r="60"/>
                <circle class="st-score-fill" cx="65" cy="65" r="60" stroke="url(#stGrad)"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" id="scoreCircle"/>
            </svg>
            <div class="st-score-val">
                <span class="st-score-num ${finalPass ? 'pass-color' : 'fail-color'}">${avgScore}</span>
                <span class="st-score-label">/ 100</span>
            </div>
        </div>

        <div class="iv-round-results">
            <h3>Kết Quả Từng Vòng</h3>
            ${roundHtml}
        </div>

        <div class="iv-final-comment">
            <h3>Nhận Xét Từ Nhà Tuyển Dụng</h3>
            <p>${comment}</p>
            <div class="iv-strengths"><h4>Điểm mạnh:</h4>${strengthHtml}</div>
            <div class="iv-weaknesses"><h4>Cần cải thiện:</h4>${weakHtml}</div>
        </div>

        <div class="st-advice"><h3>Lời Khuyên Cụ Thể</h3>${adviceHtml}</div>

        <div class="st-result-actions">
            <button class="st-result-btn btn-retry" onclick="retryTest()">Phỏng vấn lại</button>
            <button class="st-result-btn btn-detail" onclick="toggleDetail()">Xem chi tiết từng câu</button>
            ${finalPass ? `<button class="st-result-btn btn-higher" onclick="tryHigher()">Thử vị trí cao hơn</button>` : ''}
        </div>

        <div class="st-detail-review" id="detailReview">
            <h3>Chi Tiết Từng Câu Hỏi</h3>
            ${reviewHtml}
        </div>
    `;

    setTimeout(() => {
        const el = document.getElementById('scoreCircle');
        if (el) el.style.strokeDashoffset = offset;
    }, 100);

    saveResult(avgScore, finalPass, cfg.title);
    document.getElementById('resultScreen').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== ACTIONS =====
function retryTest() {
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDetail() {
    document.getElementById('detailReview').classList.toggle('show');
}

function tryHigher() {
    const levels = ['fresher', 'junior', 'mid', 'senior', 'lead'];
    const nextIdx = levels.indexOf(selectedPosition) + 1;
    if (nextIdx < levels.length) {
        document.getElementById('resultScreen').style.display = 'none';
        document.getElementById('startScreen').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            const card = document.querySelector(`[data-pos="${levels[nextIdx]}"]`);
            if (card) { card.click(); card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }, 300);
    }
}

function saveResult(score, passed, title) {
    const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    history.push({
        date: new Date().toISOString(),
        position: title, positionKey: selectedPosition,
        score, passed,
        time: elapsedSeconds,
        questionCount: currentQuestions.length
    });
    if (history.length > 20) history.splice(0, history.length - 20);
    localStorage.setItem('interviewHistory', JSON.stringify(history));
}

// ===== HELPERS =====
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

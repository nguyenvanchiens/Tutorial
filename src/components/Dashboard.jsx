const STATS = [
  { id: 'be-roadmap', icon: '\u2699', gradient: 'linear-gradient(135deg,#667eea,#764ba2)', title: '.NET Backend Mastery', desc: '7 trang: Roadmap 20/80, Kinh Nghiem, AI Era, Loi Khuyen, Lo Trinh A-Z, Phong Van, Backend Path' },
  { id: 'sql', icon: '\uD83D\uDDC3', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', title: 'SQL Database Mastery', desc: 'SELECT, JOIN, GROUP BY, Subquery, CTE, Index, Transaction, Thiet ke DB, Sai lam, Nang cao' },
  { id: 'redis-roadmap', icon: '\uD83D\uDD34', gradient: 'linear-gradient(135deg,#dc382d,#ff8c42)', title: 'Redis Mastery', desc: '5 trang: Roadmap, 9 data types, 10 patterns thực chiến, Production (HA/Cluster), 30+ câu phỏng vấn' },
  { id: 'micro-roadmap', icon: '🕸', gradient: 'linear-gradient(135deg,#00d2ff,#6c5ce7)', title: 'Microservices Mastery', desc: '6 trang: Roadmap, Cơ bản (DDD/Bounded Context), 12 Patterns (Saga/CQRS/Outbox), Giao tiếp (gRPC/Kafka), Production (K8s), 40+ câu phỏng vấn' },
  { id: 'build-overview', icon: '\uD83D\uDE80', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', title: 'Build & Deploy', desc: '10 trang riêng biệt: Git, CI/CD, Jenkins, Docker, Hosting, Cloud, Domain, SSL, Monitoring, Workflow' },
  { id: 'tutorial', icon: '\uD83D\uDCBB', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)', title: 'Backend Languages 80/20', desc: '6 ngon ngu: C#/.NET, Go, Rust, TypeScript, Python, Java/Kotlin - so sanh chi tiet' },
  { id: 'english', icon: '\uD83C\uDF0D', gradient: 'linear-gradient(135deg,#fa709a,#fee140)', title: 'English A-Z', desc: '12 phan: Mindset, Lo trinh 6T, Phat am, Tu vung, Ngu phap, Nghe, Noi, Doc, Viet, Resources' },
  { id: 'todo-main', icon: '\uD83D\uDCCB', gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', title: 'Master Plan 6 Thang', desc: '26 tuan chi tiet tung ngay, Vocabulary tracker, Focus Mode chong tri hoan' },
  { id: 'ai-learn', icon: '\uD83E\uDD16', gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)', title: 'Hoc AI', desc: 'AI Mastery - Hoc AI tu co ban den ung dung thuc te' },
  { id: 'react-roadmap', icon: '\u269B', gradient: 'linear-gradient(135deg,#61dafb,#764ba2)', title: 'ReactJS Mastery', desc: '7 trang Beginner → Master: Cơ bản, Hooks, Nâng cao, Patterns, Ecosystem, 50+ câu phỏng vấn' },
  { id: 'git-sourcetree', icon: '\uD83C\uDF33', gradient: 'linear-gradient(135deg,#6c5ce7,#a29bfe)', title: 'GitHub & Sourcetree', desc: 'Clone, Branch, Merge, PR, Stash, Rebase, Cherry Pick, Conflict - moi thao tac A-Z' },
  { id: 'tips-screenshot', icon: '\uD83D\uDCA1', gradient: 'linear-gradient(135deg,#ff9a9e,#fad0c4)', title: 'Tips & Tricks', desc: 'Chia sẻ những thủ thuật hay: chụp full website, DevTools tricks và nhiều hơn nữa' },
]

const PHASES = [
  { color: '#667eea', title: 'Phase 1: Nen Tang (Tuan 1-8)', desc: '.NET nang cao, SQL mastery, Git + Docker + Nginx + Jenkins, English A1' },
  { color: '#f5576c', title: 'Phase 2: Mo Rong (Tuan 9-16)', desc: 'Go + TypeScript, Jenkins + CI/CD + Cloud, React basics, English A2' },
  { color: '#43e97b', title: 'Phase 3: Chuyen Sau (Tuan 17-26)', desc: 'Rust + Python + Kotlin, System Design, AI Integration, English B1' },
]

const TAGS = [
  { label: 'C#', cls: 'tag-primary' }, { label: '.NET 8', cls: 'tag-primary' },
  { label: 'SQL Server', cls: 'tag-secondary' }, { label: 'PostgreSQL', cls: 'tag-secondary' },
  { label: 'Docker', cls: 'tag-accent' }, { label: 'Kubernetes', cls: 'tag-accent' },
  { label: 'React', cls: 'tag-info' }, { label: 'TypeScript', cls: 'tag-info' },
  { label: 'Go', cls: 'tag-warn' }, { label: 'Rust', cls: 'tag-warn' },
  { label: 'Redis', cls: 'tag-danger' }, { label: 'RabbitMQ', cls: 'tag-danger' },
  { label: 'EF Core', cls: 'tag-primary' }, { label: 'CI/CD', cls: 'tag-secondary' },
  { label: 'Azure', cls: 'tag-accent' }, { label: 'AWS', cls: 'tag-info' },
  { label: 'Python', cls: 'tag-warn' }, { label: 'gRPC', cls: 'tag-danger' },
  { label: 'Serilog', cls: 'tag-primary' }, { label: 'MediatR', cls: 'tag-secondary' },
  { label: 'Polly', cls: 'tag-accent' }, { label: 'Dapper', cls: 'tag-info' },
]

const LEVELS = [
  { badge: 'L0', color: 'linear-gradient(135deg,#667eea,#764ba2)', title: 'Beginner', time: '0-6 thang', salary: '8-12M', items: ['C# co ban, OOP', 'SQL queries, CRUD', 'Git basics', 'HTTP & REST', 'First console app'] },
  { badge: 'L1', color: 'linear-gradient(135deg,#4facfe,#00f2fe)', title: 'Fresher', time: '6th - 1.5 nam', salary: '8-15M', items: ['ASP.NET Core Web API', 'EF Core + Migrations', 'Unit Testing (xUnit)', 'Docker basics', 'Authentication JWT'] },
  { badge: 'L2', color: 'linear-gradient(135deg,#43e97b,#38f9d7)', title: 'Junior', time: '1.5 - 3 nam', salary: '15-25M', items: ['SOLID & Design Patterns', 'Clean Architecture', 'CI/CD Pipeline', 'SQL Optimization', 'Security (OWASP)'] },
  { badge: 'L3', color: 'linear-gradient(135deg,#fa709a,#fee140)', title: 'Mid-Level', time: '3 - 5 nam', salary: '25-40M', items: ['System Design', 'Microservices/Modular', 'Cloud (Azure/AWS)', 'Caching (Redis)', 'Monitoring & Logging'] },
  { badge: 'L4', color: 'linear-gradient(135deg,#f093fb,#f5576c)', title: 'Senior', time: '5 - 8 nam', salary: '40-60M', items: ['Architecture decisions', 'Mentoring team', 'Performance at scale', 'Business understanding', 'Tech strategy'] },
  { badge: 'L5', color: 'linear-gradient(135deg,#ffecd2,#fcb69f)', title: 'Tech Lead', time: '8+ nam', salary: '60M+', items: ['Team leadership', 'Architecture vision', 'Stakeholder mgmt', 'Engineering culture', 'Hiring & growing talent'] },
]

const BE_PAGES = [
  { id: 'be-roadmap', title: 'Roadmap 20/80', desc: 'Pareto principle: 8 core + 12 extended + Lead skills, Quiz kiem tra' },
  { id: 'be-wisdom', title: 'Kinh Nghiem Song Con', desc: 'C# Language, .NET Ecosystem, Architecture, Database, API Design, Performance, Career, Team Lead' },
  { id: 'be-ai', title: 'Hoc trong AI Era', desc: '3 tang kien thuc, 8 AI-era skills, 5 anti-patterns, timeline to mastery' },
  { id: 'be-advice', title: '55+ Loi Khuyen', desc: 'Early Career, Mid-level, Senior, Tech Lead, Universal advice, Salary ranges' },
  { id: 'be-roadmap-detail', title: 'Lo Trinh A-Z', desc: '4 career levels, 40+ topics, 100+ resources, Self-assessment checklist' },
  { id: 'be-interview', title: 'Phong Van Thu', desc: '5 vi tri x 4 vong = 80+ cau hoi, scoring, real-world scenarios' },
  { id: 'be-path', title: 'Backend Path', desc: '4 pillars: Data, API, Infrastructure, Architecture - Level 0 den 5' },
]

export default function Dashboard({ sections, onNavigate }) {
  return (
    <>
      <div className="section-hero">
        <h1>Developer Learning Hub</h1>
        <p className="hero-sub">Tong hop TAT CA tai lieu hoc tap tu Fresher den Tech Lead - 100% noi dung goc</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.id} className="stat-card" onClick={() => onNavigate(s.id)}>
            <div className="stat-icon" style={{ background: s.gradient }}>{s.icon}</div>
            <div className="stat-info">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
            <span className="stat-arrow">&rarr;</span>
          </div>
        ))}
      </div>

      {/* BE Quick Links */}
      <div className="overview-card" style={{ marginBottom: '1.5rem' }}>
        <h3>.NET Backend - 7 Trang Chi Tiet</h3>
        <div className="be-links-grid">
          {BE_PAGES.map(p => (
            <div key={p.id} className="be-link-card" onClick={() => onNavigate(p.id)}>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="overview-grid">
        <div className="overview-card">
          <h3>Loi Trinh Hoc Tap 6 Thang</h3>
          <div className="timeline-mini">
            {PHASES.map((p, i) => (
              <div className="tl-item" key={i}>
                <span className="tl-dot" style={{ background: p.color }} />
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overview-card">
          <h3>Tech Stack Tong Quat</h3>
          <div className="tags-cloud">
            {TAGS.map((t, i) => <span key={i} className={`tag ${t.cls}`}>{t.label}</span>)}
          </div>
        </div>
      </div>

      {/* Career */}
      <div className="career-section">
        <h2>Career Roadmap: Fresher &rarr; Tech Lead</h2>
        <div className="career-levels">
          {LEVELS.map((l, i) => (
            <div className="level-card" key={i}>
              <div className="level-badge" style={{ background: l.color }}>{l.badge}</div>
              <h4>{l.title}</h4>
              <p>{l.time}</p>
              <p className="salary-tag">{l.salary}</p>
              <ul>
                {l.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

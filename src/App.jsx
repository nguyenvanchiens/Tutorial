import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import IframeSection from './components/IframeSection'
import ClaudeNews from './components/ClaudeNews'
import { useCheckbox } from './hooks/useCheckbox'

const SECTIONS = [
  { id: 'dashboard', icon: '\u2630', label: 'Dashboard' },
  { id: 'backend', icon: '\u2699', label: '.NET Backend', children: [
    { id: 'be-roadmap', label: 'Roadmap 20/80', src: '/BE/index.html' },
    { id: 'be-wisdom', label: 'Kinh Nghiem', src: '/BE/wisdom.html' },
    { id: 'be-ai', label: 'AI Era', src: '/BE/ai-era.html' },
    { id: 'be-advice', label: 'Loi Khuyen', src: '/BE/advice.html' },
    { id: 'be-roadmap-detail', label: 'Lo Trinh A-Z', src: '/BE/roadmap-detail.html' },
    { id: 'be-interview', label: 'Phong Van', src: '/BE/skill-test.html' },
    { id: 'be-path', label: 'Backend Path', src: '/BE/backend-path.html' },
    { id: 'be-unit-test', label: 'Unit Test', src: '/BE/aspnet-testing.html' },
  ]},
  { id: 'sql', icon: '\uD83D\uDDC3', label: 'SQL Database', src: '/SQL/index.html' },
  { id: 'redis', icon: '\uD83D\uDD34', label: 'Redis', children: [
    { id: 'redis-roadmap',    label: 'Roadmap',     src: '/REDIS/index.html' },
    { id: 'redis-basics',     label: 'Cơ Bản',      src: '/REDIS/basics.html' },
    { id: 'redis-patterns',   label: 'Patterns',    src: '/REDIS/patterns.html' },
    { id: 'redis-production', label: 'Production',  src: '/REDIS/production.html' },
    { id: 'redis-interview',  label: 'Phỏng Vấn',   src: '/REDIS/interview.html' },
  ]},
  { id: 'microservice', icon: '🕸', label: 'Microservices', children: [
    { id: 'micro-roadmap',       label: 'Roadmap',       src: '/MICROSERVICE/index.html' },
    { id: 'micro-basics',        label: 'Cơ Bản',        src: '/MICROSERVICE/basics.html' },
    { id: 'micro-patterns',      label: 'Patterns',      src: '/MICROSERVICE/patterns.html' },
    { id: 'micro-communication', label: 'Giao Tiếp',     src: '/MICROSERVICE/communication.html' },
    { id: 'micro-production',    label: 'Production',    src: '/MICROSERVICE/production.html' },
    { id: 'micro-interview',     label: 'Phỏng Vấn',     src: '/MICROSERVICE/interview.html' },
  ]},
  { id: 'build', icon: '\uD83D\uDE80', label: 'Build & Deploy', children: [
    { id: 'build-overview',   label: 'Tổng Quan',        src: '/BUILD/index.html' },
    { id: 'build-git',        label: 'Git & Workflow',   src: '/BUILD/git.html' },
    { id: 'build-cicd',       label: 'CI/CD',            src: '/BUILD/cicd.html' },
    { id: 'build-jenkins',    label: 'Jenkins',          src: '/BUILD/jenkins.html' },
    { id: 'build-docker',     label: 'Docker',           src: '/BUILD/docker.html' },
    { id: 'build-hosting',    label: 'Hosting',          src: '/BUILD/hosting.html' },
    { id: 'build-cloud',      label: 'Cloud Platforms',  src: '/BUILD/cloud.html' },
    { id: 'build-domain',     label: 'Domain & DNS',     src: '/BUILD/domain.html' },
    { id: 'build-ssl',        label: 'SSL & Security',   src: '/BUILD/ssl.html' },
    { id: 'build-monitoring', label: 'Monitoring',       src: '/BUILD/monitoring.html' },
    { id: 'build-workflow',   label: 'Workflow Thực Tế', src: '/BUILD/workflow.html' },
  ]},
  { id: 'tutorial', icon: '\uD83D\uDCBB', label: 'Backend Languages', src: '/TUTORIAL%20WEB/index.html' },
  { id: 'english', icon: '\uD83C\uDF0D', label: 'English', children: [
    { id: 'english-main', label: 'Lộ Trình A-Z', src: '/ENGLISH/index.html' },
    { id: 'english-test', label: 'Test Trình Độ (AI)', src: '/ENGLISH/level-test.html' },
  ]},
  { id: 'todo', icon: '\uD83D\uDCCB', label: 'Learning Plan', children: [
    { id: 'todo-main', label: 'Lich Trinh 6 Thang', src: '/TODO/index.html' },
    { id: 'todo-vocab', label: 'Vocabulary', src: '/TODO/vocab.html' },
    { id: 'todo-focus', label: 'Focus Mode', src: '/TODO/focus.html' },
  ]},
  { id: 'ai', icon: '\uD83E\uDD16', label: 'Hoc AI', children: [
    { id: 'ai-learn', label: 'AI cho Developer', src: '/AI/learn.html' },
    { id: 'ai-course', label: 'Claude Code Masterclass', src: '/AI/claude-course.html' },
    { id: 'cc-roadmap',     label: 'Claude Code · Roadmap',      src: '/CLAUDE-CODE/index.html' },
    { id: 'cc-basics',      label: 'Claude Code · Cơ Bản',       src: '/CLAUDE-CODE/basics.html' },
    { id: 'cc-commands',    label: 'Claude Code · Commands',     src: '/CLAUDE-CODE/commands.html' },
    { id: 'cc-customize',   label: 'Claude Code · Customize',    src: '/CLAUDE-CODE/customize.html' },
    { id: 'cc-integrations',label: 'Claude Code · Integrations', src: '/CLAUDE-CODE/integrations.html' },
    { id: 'cc-tips',        label: 'Claude Code · Tips & FAQ',   src: '/CLAUDE-CODE/tips.html' },
    { id: 'ai-skills', label: 'AI Skills Nâng Cao', src: '/AI-SKILLS/index.html' },
    { id: 'ai-quiz', label: 'Trắc Nghiệm Claude', src: '/AI/quiz.html' },
  ]},
  { id: 'claude-live', icon: '\u2728', label: 'AI Claude Live', component: 'ClaudeNews' },
  { id: 'react', icon: '\u269B', label: 'ReactJS Mastery', children: [
    { id: 'react-roadmap', label: 'Roadmap A-Z', src: '/REACT/index.html' },
    { id: 'react-basics', label: 'Cơ Bản', src: '/REACT/basics.html' },
    { id: 'react-hooks', label: 'Hooks', src: '/REACT/hooks.html' },
    { id: 'react-advanced', label: 'Nâng Cao', src: '/REACT/advanced.html' },
    { id: 'react-patterns', label: 'Design Patterns', src: '/REACT/patterns.html' },
    { id: 'react-ecosystem', label: 'Ecosystem', src: '/REACT/ecosystem.html' },
    { id: 'react-interview', label: 'Phỏng Vấn', src: '/REACT/interview.html' },
  ]},
  { id: 'git-sourcetree', icon: '\uD83C\uDF33', label: 'GitHub & Sourcetree', children: [
    { id: 'git-guide', label: 'Hướng Dẫn A-Z', src: '/GIT/index.html' },
    { id: 'git-quiz', label: 'Trắc Nghiệm Git', src: '/GIT/quiz.html' },
  ]},
  { id: 'tips', icon: '\uD83D\uDCA1', label: 'Tips & Tricks', children: [
    { id: 'tips-screenshot', label: 'Chụp Full Website', src: '/TIPS/screenshot.html' },
  ]},
]

function flattenSections(sections) {
  const result = []
  sections.forEach(s => {
    if (s.children) s.children.forEach(c => result.push(c))
    else if (s.src || s.component) result.push(s)
  })
  return result
}

const COMPONENT_REGISTRY = {
  ClaudeNews: ClaudeNews,
}

const ALL_PAGES = flattenSections(SECTIONS)

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [todoUnlocked, setTodoUnlocked] = useState(() => sessionStorage.getItem('todo-unlocked') === '1')
  const { progress } = useCheckbox()

  const navigate = useCallback((id) => {
    const todoIds = ['todo', 'todo-main', 'todo-vocab', 'todo-focus']
    if (todoIds.includes(id) && !todoUnlocked) {
      const key = prompt('Nhập mã key để xem Learning Plan:')
      if (key === '123456') {
        setTodoUnlocked(true)
        sessionStorage.setItem('todo-unlocked', '1')
      } else {
        alert('Sai mã key!')
        return
      }
    }
    setActiveSection(id)
    setMobileOpen(false)
  }, [todoUnlocked])

  const currentPage = ALL_PAGES.find(p => p.id === activeSection)

  const handleToggle = () => {
    if (window.innerWidth <= 900) {
      setMobileOpen(v => !v)
    } else {
      setSidebarHidden(v => !v)
    }
  }

  return (
    <div className={`app-layout ${sidebarHidden ? 'sidebar-collapsed' : ''}`}>
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <Sidebar
        sections={SECTIONS}
        active={activeSection}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        progress={progress}
      />

      <button className="sidebar-toggle" onClick={handleToggle}>
        <span className="toggle-icon">{sidebarHidden ? '\u2630' : '\u276E'}</span>
      </button>

      <main className="main-content">
        {activeSection === 'dashboard' ? (
          <div className="content-section active">
            <Dashboard sections={SECTIONS} onNavigate={navigate} />
            <footer className="main-footer">
              <p>Dev Learning Hub &copy; 2024</p>
            </footer>
          </div>
        ) : currentPage ? (
          currentPage.component ? (() => {
            const Comp = COMPONENT_REGISTRY[currentPage.component]
            return Comp ? <Comp key={currentPage.id} /> : null
          })() : (
            <IframeSection key={currentPage.id} src={currentPage.src} title={currentPage.label} />
          )
        ) : (() => {
          const parent = SECTIONS.find(s => s.id === activeSection)
          if (parent?.children?.[0]) {
            return <IframeSection key={parent.children[0].id} src={parent.children[0].src} title={parent.children[0].label} />
          }
          return null
        })()}
      </main>
    </div>
  )
}

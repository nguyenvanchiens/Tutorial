import { useState } from 'react'
import { useClaudeBadge } from '../hooks/useClaudeBadge'

export default function Sidebar({
  sections, active, onNavigate,
  mobileOpen, onMobileClose, progress
}) {
  const [expanded, setExpanded] = useState({})
  const claudeNewCount = useClaudeBadge()

  const isChildActive = (s) => s.children?.some(c => c.id === active) || false
  const isMenuOpen = (s) => expanded[s.id] ?? isChildActive(s)

  return (
    <nav className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">&#9883;</span>
          <span className="logo-text">Dev Hub</span>
        </div>
        <button className="sidebar-mobile-close" onClick={onMobileClose}>&times;</button>
      </div>

      <ul className="nav-menu">
        {sections.map(s => {
          const hasChildren = !!s.children
          const childActive = isChildActive(s)
          const itemActive = active === s.id || childActive
          const menuOpen = isMenuOpen(s)

          return (
            <li key={s.id}>
              <div
                className={`nav-item ${itemActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (hasChildren) {
                    setExpanded(prev => ({ ...prev, [s.id]: !menuOpen }))
                    if (!childActive) onNavigate(s.children[0].id)
                  } else {
                    onNavigate(s.id)
                  }
                }}
              >
                <span className="nav-icon">{s.icon}</span>
                <span className="nav-label">{s.label}</span>
                {s.id === 'claude-live' && claudeNewCount > 0 && (
                  <span className="nav-badge" title={`${claudeNewCount} release mới`}>
                    {claudeNewCount}
                  </span>
                )}
                {hasChildren && (
                  <span className={`nav-arrow ${menuOpen ? 'open' : ''}`}>&#9656;</span>
                )}
              </div>

              {hasChildren && menuOpen && (
                <ul className="nav-submenu">
                  {s.children.map(c => (
                    <li
                      key={c.id}
                      className={`nav-subitem ${active === c.id ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); onNavigate(c.id) }}
                    >
                      {c.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="progress-summary">
          <div className="progress-label">Tien do tong</div>
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>
    </nav>
  )
}

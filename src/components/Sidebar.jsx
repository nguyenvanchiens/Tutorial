import { useState } from 'react'
import { useClaudeBadge } from '../hooks/useClaudeBadge'

// True if `active` matches this node or any of its descendants.
const containsActive = (node, active) =>
  node.children ? node.children.some(c => containsActive(c, active)) : node.id === active

// First leaf (page) reachable from this node — what we navigate to on open.
const firstLeaf = (node) => (node.children ? firstLeaf(node.children[0]) : node)

function NavSubmenu({ nodes, active, onNavigate, expanded, setExpanded, depth }) {
  return (
    <ul className={`nav-submenu nav-submenu-depth-${depth}`}>
      {nodes.map(node => {
        const hasChildren = !!node.children
        const descActive = hasChildren && node.children.some(c => containsActive(c, active))
        const menuOpen = expanded[node.id] ?? descActive

        if (!hasChildren) {
          return (
            <li
              key={node.id}
              className={`nav-subitem ${active === node.id ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onNavigate(node.id) }}
            >
              {node.label}
            </li>
          )
        }

        return (
          <li key={node.id}>
            <div
              className={`nav-subitem nav-subgroup ${descActive ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(prev => ({ ...prev, [node.id]: !menuOpen }))
                if (!descActive) onNavigate(firstLeaf(node).id)
              }}
            >
              <span className="nav-label">{node.label}</span>
              <span className={`nav-arrow ${menuOpen ? 'open' : ''}`}>&#9656;</span>
            </div>
            {menuOpen && (
              <NavSubmenu
                nodes={node.children}
                active={active}
                onNavigate={onNavigate}
                expanded={expanded}
                setExpanded={setExpanded}
                depth={depth + 1}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Sidebar({
  sections, active, onNavigate,
  mobileOpen, onMobileClose, progress
}) {
  const [expanded, setExpanded] = useState({})
  const claudeNewCount = useClaudeBadge()

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
          const childActive = hasChildren && s.children.some(c => containsActive(c, active))
          const itemActive = active === s.id || childActive
          const menuOpen = expanded[s.id] ?? childActive

          return (
            <li key={s.id}>
              <div
                className={`nav-item ${itemActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (hasChildren) {
                    setExpanded(prev => ({ ...prev, [s.id]: !menuOpen }))
                    if (!childActive) onNavigate(firstLeaf(s).id)
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
                <NavSubmenu
                  nodes={s.children}
                  active={active}
                  onNavigate={onNavigate}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  depth={1}
                />
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

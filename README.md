# DevHub - Developer Learning Hub

Cổng học tập dành cho developer, tổng hợp kiến thức từ Backend, SQL, Build & Deploy, Git, AI cho đến English - tất cả trong một giao diện sidebar dễ dùng.

## Demo

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## Tính năng

- **.NET Backend** — Roadmap 20/80, kinh nghiệm, lời khuyên, phỏng vấn, lộ trình A-Z
- **SQL Database** — Kiến thức SQL từ cơ bản đến nâng cao
- **Build & Deploy** — Git, CI/CD, Docker, Hosting, Cloud, Domain, SSL, Monitoring
- **Backend Languages** — Tổng hợp ngôn ngữ lập trình backend
- **English** — Từ vựng và kỹ năng tiếng Anh cho developer
- **Learning Plan** — Lịch trình học 6 tháng, vocabulary, focus mode (bảo vệ bằng mã key)
- **AI Skills** — Claude Code Masterclass từ zero đến production
- **Hoc AI** — Kiến thức AI cho developer
- **GitHub & Sourcetree** — Hướng dẫn A-Z và trắc nghiệm Git
- **Tips & Tricks** — Mẹo hữu ích (chụp full website, ...)
- **Dashboard** — Tổng quan tiến độ học tập, career roadmap, tech stack
- **Progress Tracking** — Theo dõi tiến độ qua checkbox lưu localStorage

## Tech Stack

- **React 19** + **Vite 8**
- Plain JSX (không TypeScript)
- State-driven navigation (không dùng router)
- localStorage cho progress tracking
- Dark theme UI

## Cài đặt & Chạy

```bash
# Clone repo
git clone https://github.com/nguyenvanchiens/Document.git
cd Document

# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build
```

## Cấu trúc dự án

```
src/
├── App.jsx              # Central hub - navigation, sections config
├── components/
│   ├── Sidebar.jsx      # Sidebar navigation với progress
│   ├── Dashboard.jsx    # Landing page với stats
│   └── IframeSection.jsx # Wrapper load HTML content
├── hooks/
│   └── useCheckbox.js   # localStorage progress tracker
└── index.css            # Global styles

public/
├── AI/                  # AI learning content
├── AI-SKILLS/           # Claude Code Masterclass
├── BE/                  # .NET Backend content
├── BUILD/               # Build & Deploy guide
├── ENGLISH/             # English for developers
├── GIT/                 # GitHub & Sourcetree guide
├── SQL/                 # SQL Database content
├── TIPS/                # Tips & Tricks
├── TODO/                # Learning Plan (protected)
└── TUTORIAL WEB/        # Backend Languages
```

## Tác giả

**Nguyen Van Chien** - [GitHub](https://github.com/nguyenvanchiens)

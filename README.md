# 🎮 Whoo Inject System

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0--beta-cyan?style=for-the-badge)
![Status](https://img.shields.io/badge/status-BETA%20UNRELEASED-purple?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Windows-blue?style=for-the-badge)
![Electron](https://img.shields.io/badge/electron-30.x-teal?style=for-the-badge)

**Advanced Game Launcher & Management Interface**

*Internal Use Only*

</div>

---

## 📋 Overview

Whoo Inject System is a modern Windows desktop launcher application built with a dark futuristic gaming UI aesthetic. It provides a sleek interface for game management with features like Steam integration, shared accounts, and manifest management.

## ✨ Features

- 🎨 **Dark Futuristic UI** - Neon cyan, purple, and pink glow accents with glassmorphism
- 🖥️ **Custom Titlebar** - Draggable window with minimize/maximize/close controls
- 🔑 **License System** - Secure login with license key verification
- 🎮 **Game Management** - Add/remove games by Steam AppID
- 👥 **Shared Accounts** - Browse available game accounts with search
- ⚙️ **Settings Panel** - Toggles for dark mode, auto-update, Discord integration
- 🔄 **Smooth Animations** - Framer Motion powered transitions everywhere
- 📦 **Steam Integration** - Auto-detect Steam installation path
- 🌐 **ManifestHub API** - Connected to Steam Depot Manifest Cache

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Electron | Desktop application framework |
| React 18 | UI library |
| TailwindCSS 3 | Utility-first CSS framework |
| Framer Motion | Animation library |
| Lucide React | Modern icon set |
| React Router | Client-side routing |
| Vite | Build tool & dev server |
| Electron Builder | EXE packaging |

## 📁 Project Structure

```
WhooInject/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script (IPC bridge)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── TitleBar.jsx
│   │   └── Sidebar.jsx
│   ├── pages/           # Application pages
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SharedAccounts.jsx
│   │   └── Settings.jsx
│   ├── layouts/         # Page layouts
│   │   └── MainLayout.jsx
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   │   └── globals.css
│   ├── assets/          # Static assets
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Public static files
├── .github/
│   └── workflows/
│       └── build.yml    # GitHub Actions CI/CD
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .eslintrc.cjs
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [npm](https://www.npmjs.com/) 9+
- Windows 10/11 (for full Electron features)

### Development

```bash
# Clone the repository
git clone https://github.com/felixsmkid/WhooInject.git
cd WhooInject

# Install dependencies
npm install

# Start development server (Vite + Electron)
npm run dev
```

The app will open automatically in an Electron window with hot-reload enabled.

### Build for Production

```bash
# Build Windows EXE installer
npm run dist

# Build for all platforms
npm run dist:all
```

Output will be in the `release/` directory.

## 📄 Pages

### 🔐 Login Page
- Split layout with branding and login form
- License key input with verification
- Device ID display
- Animated gradient background
- Discord & Website footer links

### 🎮 Dashboard (Bang Menu)
- Steam path detection badge
- Game AppID input & management
- Add/Delete game controls
- Feature cards: Instant Access, Safe to Use, Easy Revert
- Action buttons: Restart, Close

### 👥 Shared Accounts
- Search bar with real-time filtering
- Responsive game cards grid
- Game banner images from Steam CDN
- AppID and account count display
- Expand/collapse card details
- Hover animations

### ⚙️ Settings
- Toggle switches for preferences
- Appearance: Dark Mode
- General: Auto Update, Notifications, Auto Close
- Integration: Discord Rich Presence, Stealth Mode
- App version info and build status

## 🌐 ManifestHub API Integration

Connected to [ManifestHub](https://github.com/SteamAutoCracks/ManifestHub) for Steam Depot Manifest Cache.

```
API Endpoint: https://api.manifesthub1.filegear-sg.me/manifest
Parameters: apikey, depotid, manifestid
```

## 🏗️ CI/CD

The project uses GitHub Actions for automated builds:

1. **Trigger**: Push a tag matching `v*` pattern (e.g., `v0.1.0-beta`)
2. **Build**: Compiles on Windows with Node.js 20
3. **Package**: Creates Windows installer using electron-builder
4. **Release**: Creates a GitHub Release with the installer attached

### Creating a Release

```bash
# Tag the version
git tag v0.1.0-beta
git push origin v0.1.0-beta
```

The GitHub Action will automatically:
- Build the Windows EXE
- Create a draft pre-release on GitHub
- Upload the installer to the release

## 📌 Version History

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0-beta | BETA UNRELEASED | Initial internal release |
| 1.0.0 | Planned | First stable release |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |

### Electron Builder Config

The build configuration is in `package.json` under the `"build"` key:
- **App ID**: `com.whoo.inject`
- **Product Name**: Whoo Inject System
- **Target**: NSIS installer (Windows x64)
- **Icon**: `public/icon.png`

## ⚠️ Disclaimer

This application is for **internal use only**. It is a launcher and game management interface.

---

<div align="center">

**Built with ❤️ by WhooInject Team**

*BETA UNRELEASED v0.1.0*

</div>

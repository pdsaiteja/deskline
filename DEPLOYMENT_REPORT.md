# Deskline — AWS App Runner Deployment Report

**Student:** [Your Name]  
**Course:** [Course Name]  
**Date:** July 26, 2026  
**App:** Deskline — RAG Support Chatbot  
**IDE:** Cursor with AI Agent

---

## Live Application URL

**App Runner URL:** [Paste your live URL here, e.g. https://xxxxx.us-east-1.awsapprunner.com]

**Status:** [ ] Loads successfully  [ ] All features work  [ ] Tested on mobile

---

## GitHub Repository

**Repository URL:** [Paste your GitHub repo URL here, e.g. https://github.com/yourusername/deskline]

**Branch:** `main`

---

## Deployment Summary

Deskline is a Vite + React support chatbot migrated from a Claude Artifact. It was prepared for AWS App Runner with:

- **Build command:** `npm install && npm run build`
- **Start command:** `npm start` (serves `dist/` on port 8080 via `serve`)
- **Config file:** `apprunner.yaml` in the repository root
- **Region:** `us-east-1`

### Steps Completed (via Cursor AI)

1. **App preparation**
   - Added `serve` dependency and `"start": "serve -s dist -l 8080"` script
   - Created `apprunner.yaml` with Node.js 22 runtime, build, and run settings
   - Verified `npm run build` succeeds locally

2. **Tools installed**
   - AWS CLI 2.36.8 (configured, account `401811812346`)
   - Git 2.55.0
   - GitHub CLI 2.96.0

3. **Git repository**
   - Initialized git in `C:\Users\pdsai\deskline`
   - Committed all source files (excluding `node_modules` and `dist` via `.gitignore`)
   - Default branch renamed to `main`

4. **Remaining steps (require your action)**
   - GitHub login (`gh auth login`)
   - Push code to GitHub
   - Activate App Runner in AWS Console (first-time subscription)
   - Connect GitHub to App Runner (one-time OAuth)
   - Create App Runner service from repo

---

## Deployment Steps (Full Process)

### Phase 1: GitHub (one-time)

```powershell
cd C:\Users\pdsai\deskline
gh auth login
gh repo create deskline --public --source=. --remote=origin --push
```

### Phase 2: Activate App Runner (one-time, in browser)

1. Log in to [AWS Console](https://console.aws.amazon.com)
2. Search for **App Runner** and open the service
3. Accept any prompts to enable/activate the service (fixes `SubscriptionRequiredException`)

### Phase 3: Connect GitHub to App Runner (one-time, in browser)

1. In App Runner → **Connections** → **Add connection**
2. Choose **GitHub** → authorize AWS Connector
3. Name it (e.g. `github-deskline`) and save the connection

### Phase 4: Create App Runner Service

1. App Runner → **Create service**
2. **Source:** Source code repository → select your GitHub connection
3. **Repository:** `deskline`, branch `main`
4. **Deployment:** Automatic
5. **Build settings:** Use configuration file (`apprunner.yaml`)
6. **Service name:** `deskline`
7. **CPU/Memory:** 0.25 vCPU, 0.5 GB (free tier friendly)
8. Create and deploy

### Phase 5: Verify

```powershell
aws apprunner list-services --region us-east-1
```

Visit the service URL in the App Runner console.

---

## Screenshots Required

| # | Screenshot | Filename |
|---|------------|----------|
| 1 | App running on App Runner URL | `apprunner-live-app.png` |
| 2 | AWS App Runner console — service status "Running" | `apprunner-console.png` |
| 3 | GitHub repository with code | `github-repo.png` |

---

## Challenges and How AI Helped

### Challenge 1: Vite vs Create React App
The assignment assumes `npm start` for development, but Deskline uses Vite (`npm run dev`). AI added a production `start` script using `serve` to host the built `dist/` folder on port 8080 for App Runner.

### Challenge 2: Norton SSL scanning
AWS CLI failed with SSL errors due to Norton Antivirus HTTPS scanning. Disabling Norton SSL scanning temporarily fixed `aws sts get-caller-identity`.

### Challenge 3: Git identity without changing global config
Initial commit failed without git user identity. AI used environment variables for author info instead of modifying git config.

### Challenge 4: App Runner subscription not active
AWS CLI returned `SubscriptionRequiredException` — App Runner must be activated once in the AWS Console before CLI/API access works.

### Challenge 5: GitHub authentication
GitHub CLI requires interactive login (`gh auth login`) which only the user can complete in their terminal.

---

## App Runner Configuration Reference

**apprunner.yaml:**

```yaml
version: 1.0
runtime: nodejs22
build:
  commands:
    build:
      - npm install
      - npm run build
run:
  command: npm start
  network:
    port: 8080
  env:
    - name: NODE_ENV
      value: production
```

**package.json scripts:**

```json
"build": "vite build",
"start": "serve -s dist -l 8080"
```

---

## Free Tier Notes

- App Runner free tier: ~2 million requests/month (student projects are well within limits)
- Use smallest instance size (0.25 vCPU / 0.5 GB)
- Pause or delete the service when not needed to avoid charges
- Set billing alert at $5 (from Assignment 3.3)

---

## Verification Checklist

- [ ] GitHub repo created and code pushed
- [ ] App Runner service created and status is **Running**
- [ ] Live URL loads Deskline in browser
- [ ] FAQ ingestion, chat, and admin panel work online
- [ ] Screenshots captured
- [ ] This report submitted with live URL

---

*Security note: AWS access keys and GitHub tokens were never committed to the repository or shared in AI chat.*

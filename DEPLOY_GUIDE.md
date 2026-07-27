# Quick Deploy Guide — Run These Steps

Everything is prepared. Complete these 4 steps in order.

---

## Step 1: Log in to GitHub (2 min)

Open Cursor terminal and run:

```powershell
cd C:\Users\pdsai\deskline
gh auth login
```

Choose:
- GitHub.com
- HTTPS
- Login with a web browser (easiest)

---

## Step 2: Push to GitHub (1 min)

```powershell
gh repo create deskline --public --source=. --remote=origin --push
```

If the repo name is taken, use your username:

```powershell
gh repo create YOURUSERNAME-deskline --public --source=. --remote=origin --push
```

Save your repo URL — you'll need it for the report.

---

## Step 3: Activate App Runner + Connect GitHub (5 min, in browser)

1. Go to https://console.aws.amazon.com/apprunner
2. If prompted, **enable/activate App Runner** (fixes subscription error)
3. Click **Connections** → **Create connection** → **GitHub**
4. Authorize AWS and name the connection `github-deskline`

---

## Step 4: Create App Runner Service (5 min, in browser)

1. **Create service**
2. Source: **Repository** → your GitHub connection → repo `deskline` → branch `main`
3. Deployment: **Automatic**
4. Build: **Use a configuration file** (reads `apprunner.yaml` automatically)
5. Service name: `deskline`
6. CPU/Memory: **0.25 vCPU, 0.5 GB**
7. **Create & deploy**

Wait 5–10 minutes. Copy your live URL from the service page.

---

## Step 5: Verify in terminal

```powershell
$env:Path += ";C:\Program Files\Amazon\AWSCLIV2"
aws apprunner list-services --region us-east-1
```

---

## Step 6: Finish your report

Open `DEPLOYMENT_REPORT.md` and fill in:
- Your name
- Live App Runner URL
- GitHub repo URL
- Attach 3 screenshots

---

## Troubleshooting

**"SubscriptionRequiredException"** → Open App Runner in AWS Console first (Step 3)

**"Permission denied" for App Runner** → You're using root account; should have full access. Try re-enabling App Runner in console.

**Build fails on App Runner** → Check deployment logs in console; ensure `apprunner.yaml` is in repo root

**App shows blank page** → Build may have failed; check that `npm run build` creates `dist/` folder

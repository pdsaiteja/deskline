# AWS Connection Verification — Assignment 3.3

**Student:** [Your Name]  
**Course:** [Course Name]  
**Date:** July 26, 2026  
**IDE:** Cursor with AI Agent (Composer)

---

## Confirmation: AWS CLI Installed via Cursor

I installed AWS CLI using Cursor's integrated terminal with:

```powershell
winget install --id Amazon.AWSCLI -e --source winget --accept-source-agreements --accept-package-agreements
```

I verified the installation with:

```powershell
aws --version
```

**Success message:**

```
aws-cli/2.36.8 Python/3.14.6 Windows/11 exe/AMD64
```

This confirms AWS CLI is installed and available in Cursor's terminal.

---

## Confirmation: Cursor Can Access My AWS Account Through CLI

I configured AWS CLI in Cursor's terminal using:

```powershell
aws configure
```

Settings used:
- **Default region:** `us-east-1`
- **Default output format:** `json`
- **Access keys:** entered securely in the terminal (not shared in chat or documents)

To test the connection, I ran:

```powershell
aws sts get-caller-identity
```

**Success message:**

```json
{
    "UserId": "401811812346",
    "Account": "401811812346",
    "Arn": "arn:aws:iam::401811812346:root"
}
```

---

## What This Success Message Means

The `aws sts get-caller-identity` command successfully returned my AWS account information. This confirms that:

1. **AWS CLI is installed** in Cursor and working correctly.
2. **My credentials are valid** and accepted by AWS.
3. **Cursor's terminal can access my AWS account** through the CLI.
4. **I am authenticated** and ready for the next assignment (AWS App Runner deployment).

No errors were returned. The JSON response with `UserId`, `Account`, and `Arn` is the expected success output for a working AWS CLI connection.

---

## Summary

| Requirement | Status |
|-------------|--------|
| AWS CLI installed via Cursor | Yes |
| AWS CLI configured with credentials | Yes |
| Connection tested with `aws sts get-caller-identity` | Yes |
| Success message received | Yes |
| Ready for Assignment 3.4 | Yes |

---

## Screenshots Submitted

1. `aws-cli-install.png` — Cursor terminal showing `aws --version`
2. `aws-sts-identity.png` — Cursor terminal showing `aws sts get-caller-identity` success message
3. `aws-console-dashboard.png` — AWS Console dashboard (if required)

---

*Security note: Access keys were entered only in the terminal during `aws configure` and were not pasted into AI chat or committed to git.*

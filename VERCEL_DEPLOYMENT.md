# Vercel Deployment Guide for Shuleka Admin

## Quick Deploy (2 minutes)

### Step 1: Go to Vercel
1. Open https://vercel.com/new
2. Click "Import Git Repository"
3. Select `alfredmaganga/shuleka-admin`

### Step 2: Configure Environment Variables
1. Click "Environment Variables"
2. Add this variable:
   - **Name**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: (paste the entire contents of `firebase-service-account.json` file)

### Step 3: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your admin panel will be live at: `https://shuleka-admin.vercel.app`

## Important Notes

- The `FIREBASE_SERVICE_ACCOUNT` environment variable should contain the entire JSON file content
- Make sure to deploy to Production (not Preview) for notifications to work
- After deployment, test by creating a post and checking if users receive notifications

## Troubleshooting

If notifications don't work:
1. Check Vercel Function Logs in the dashboard
2. Verify the Firebase Service Account JSON is correct
3. Make sure Firebase project has Cloud Messaging enabled

# Deployment Guide

## Quick Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## Deploy via GitHub

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

## Environment Variables

No environment variables required for basic functionality.

## Build Commands

- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

## Post-Deployment

Your app will be available at:
- Production: `https://your-project.vercel.app`
- Custom domain: Configure in Vercel dashboard

## Troubleshooting

**Build fails**: Ensure all dependencies are in package.json
**404 errors**: Check Next.js routing configuration
**API errors**: Verify API routes are in `src/app/api/`

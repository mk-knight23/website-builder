# Website Builder

AI-powered website generator built with Next.js. Input your business details and get a responsive website instantly.

## What It Does

- Takes business name, type, and description as input
- Generates a complete HTML website with styling
- Provides live preview of generated site
- Responsive design with dark mode support

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

No environment variables required for basic functionality. See `.env.example` for optional configuration.

## Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Project Structure

```
src/
├── app/
│   ├── api/generate/     # Website generation API
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/ui/        # Reusable UI components
└── lib/utils.ts          # Utility functions
```

## Common Issues

**Build fails**: Run `npm install` to ensure all dependencies are installed

**Type errors**: Run `npm run type-check` to identify issues

**Port in use**: Change port with `PORT=3001 npm run dev`

## Git Workflow

```bash
# Feature development
git checkout -b feature/your-feature
git commit -m "feat: add feature"
git push origin feature/your-feature

# Hotfix
git checkout -b hotfix/issue-name
git commit -m "fix: resolve issue"
git push origin hotfix/issue-name
```

## License

MIT

## Current Limitations

- Website generation uses template-based approach (not true AI)
- No user authentication or project persistence
- No custom domain support
- Single-page websites only

## Future Enhancements

- Real AI integration (OpenAI/Anthropic)
- Multi-page website support
- User accounts and project saving
- Custom domain deployment
- Template marketplace

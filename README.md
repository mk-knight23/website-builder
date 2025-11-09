# Website Builder - Modern Web Development Platform

A comprehensive, modern website builder built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a drag-and-drop interface for creating professional websites with a rich component library.

## 🚀 Features

### Core Functionality
- **Drag & Drop Builder**: Intuitive interface for building websites by dragging components
- **Component Library**: Pre-built components including text, headings, images, buttons, cards, lists, contact info, and testimonials
- **Real-time Preview**: Live preview of your website as you build
- **Properties Panel**: Dynamic property editor for customizing component attributes
- **Component Management**: Duplicate, delete, and manage components with ease

### Component Categories
- **Content**: Text, Headings, Lists
- **Layout**: Cards, Containers
- **Media**: Images, Videos
- **Interactive**: Buttons, Forms
- **Business**: Contact Info, Testimonials, Pricing

### Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **Responsive Design**: Mobile-first responsive design
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Component System**: Modular, reusable component architecture
- **State Management**: Efficient state handling for complex interactions

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Next.js with Turbopack
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm 9+

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd website-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── website-builder.tsx # Main builder component
│   ├── content-generator.tsx
│   ├── template-gallery.tsx
│   └── analytics-dashboard.tsx
├── lib/                  # Utility libraries
│   ├── openrouter.ts     # OpenRouter API integration
│   ├── openrouter-service.ts
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## 🎨 Usage Guide

### Getting Started
1. **Launch the Application**: Open your browser and navigate to `http://localhost:3000`
2. **Access the Builder**: The website builder loads automatically on the home page
3. **Start Building**: Drag components from the left panel to the main canvas

### Building Your Website
1. **Select Components**: Browse the component library in the left panel
2. **Drag & Drop**: Drag components onto the main canvas
3. **Customize**: Select components to edit their properties in the right panel
4. **Preview**: Use the preview button to see your website in action
5. **Publish**: Deploy your website when ready

### Component Types

#### Content Components
- **Text**: Add paragraph text with customizable styling
- **Heading**: Add headings (H1-H6) with alignment options
- **List**: Create ordered and unordered lists

#### Layout Components
- **Card**: Content containers with title and description
- **Container**: Wrapper components for layout structure

#### Media Components
- **Image**: Add images with alt text and sizing options
- **Video**: Embed videos (when implemented)

#### Interactive Components
- **Button**: Various button styles and sizes
- **Form**: Contact forms and input fields (when implemented)

#### Business Components
- **Contact**: Display contact information with icons
- **Testimonial**: Customer testimonials with author info
- **Pricing**: Pricing tables (when implemented)

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Adding New Components
1. **Define Component**: Add to `availableComponents` array in `website-builder.tsx`
2. **Add Icon**: Import from lucide-react
3. **Create Render Function**: Define how the component renders
4. **Add Properties**: Define default props and property editor

### Customizing Styles
- **Global Styles**: Edit `src/app/globals.css`
- **Component Styles**: Use Tailwind classes in component files
- **Theme**: Modify `tailwind.config.js` for custom themes

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
- **Netlify**: Connect your Git repository for automatic deployments
- **GitHub Pages**: Use Next.js export for static deployment
- **Docker**: Use the included Dockerfile for containerized deployment

### Environment Variables
Create a `.env.local` file for any environment-specific variables:
```env
OPENROUTER_API_KEY=your_api_key_here
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🔍 API Integration

### OpenRouter Service
The application includes integration with OpenRouter for AI-powered content generation:
- **Content Generation**: AI-generated text content
- **Template Suggestions**: Smart template recommendations
- **SEO Optimization**: Automated SEO improvements

### Analytics
Built-in analytics dashboard for tracking:
- **User Interactions**: Component usage statistics
- **Performance Metrics**: Page load times and optimization
- **Usage Patterns**: User behavior analysis

## 🎯 Future Enhancements

### Planned Features
- [ ] **Template Gallery**: Pre-designed website templates
- [ ] **Advanced Components**: Forms, galleries, sliders
- [ ] **Multi-page Support**: Create multi-page websites
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **Version Control**: Track and revert changes
- [ ] **Custom Domains**: Connect custom domains
- [ ] **E-commerce**: Shopping cart and payment integration
- [ ] **SEO Tools**: Advanced SEO optimization
- [ ] **Performance Analytics**: Core Web Vitals tracking
- [ ] **Theme System**: Customizable design themes

### Component Roadmap
- [ ] **Navigation**: Menus and navigation bars
- [ ] **Forms**: Contact forms, surveys, lead capture
- [ ] **Media**: Image galleries, carousels, videos
- [ ] **E-commerce**: Product cards, shopping carts
- [ ] **Social**: Social media feeds, sharing buttons
- [ ] **Interactive**: Tabs, accordions, modals

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation for changes
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join our community discussions
- **Email**: Contact support at support@websitebuilder.com

### Common Issues
- **Build Errors**: Ensure all dependencies are installed
- **Type Errors**: Check TypeScript configuration
- **Performance**: Use React DevTools for debugging
- **Styling**: Verify Tailwind CSS classes are correct

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **shadcn/ui**: For the component library inspiration
- **Lucide**: For the beautiful icon set
- **OpenRouter**: For AI-powered content generation

---

**Built with ❤️ by the Website Builder Team**

For more information, visit our [documentation site](https://docs.websitebuilder.com) or follow us on [Twitter](https://twitter.com/websitebuilder).

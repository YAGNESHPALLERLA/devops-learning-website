# 🚀 DevOps Learning Website

A comprehensive, interactive learning platform for DevOps concepts, tools, and best practices. Built with modern web technologies and featuring video tutorials for hands-on learning.

## 🌟 Features

- **📚 12 Comprehensive Topics**: From basics to advanced DevOps concepts
- **🎥 Video Tutorials**: Integrated YouTube videos for each topic
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Dark theme with beautiful gradients and animations
- **⚡ Fast Performance**: Static site generation with Next.js
- **🔍 Easy Navigation**: Sidebar navigation and table of contents

## 📖 Topics Covered

| Topic | Description | Videos |
|-------|-------------|--------|
| 🐳 **Docker** | Containerization and container management | 3 videos |
| ⚙️ **Kubernetes** | Container orchestration and scaling | 3 videos |
| 🔧 **Jenkins** | CI/CD pipelines and automation | 2 videos |
| 🐧 **Linux Basics** | Command line and system administration | 2 videos |
| ☁️ **Cloud Computing** | AWS, Azure, and cloud platforms | 2 videos |
| 📊 **Monitoring** | Prometheus, Grafana, and observability | 2 videos |
| 🔐 **Infrastructure as Code** | Terraform, Ansible, and automation | 2 videos |
| 📝 **Scripting Languages** | Bash, Python for DevOps | 2 videos |
| 🔄 **Version Control** | Git, GitHub, and collaboration | 2 videos |
| 🛠️ **DevOps Tools** | Essential tools and integrations | 2 videos |
| 💡 **DevOps Concepts** | Microservices, SRE, and best practices | 2 videos |
| ❓ **What is DevOps?** | Introduction and cultural aspects | 2 videos |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/devops-learning-website.git
cd devops-learning-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build static site
npm run build

# The built files will be in the 'out' directory
```

## 🎥 Video Tutorial System

Each topic includes carefully curated video tutorials with:
- **Thumbnail Previews**: High-quality YouTube thumbnails
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Duration**: Clear time estimates
- **Tags**: Categorization for easy filtering
- **Direct Links**: Click to open in new tab

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **Deployment**: GitHub Pages (Static Export)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── docs/              # Topic pages
│   │   ├── docker/        # Docker tutorials
│   │   ├── kubernetes/    # Kubernetes tutorials
│   │   └── ...            # Other topics
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── VideoTutorial.tsx  # Video card component
│   ├── VideoSection.tsx   # Video grid component
│   └── docs-layout.tsx    # Documentation layout
└── data/                  # Data and configuration
    └── videoTutorials.ts  # Video data and metadata
```

## 🎨 Customization

### Adding New Topics
1. Create a new page in `src/app/docs/[topic]/page.tsx`
2. Add video data to `src/data/videoTutorials.ts`
3. Import and use `VideoSection` component

### Adding New Videos
1. Add video metadata to `videoTutorialsData` in `src/data/videoTutorials.ts`
2. Include: title, description, duration, thumbnail URL, video URL, difficulty, tags

### Styling
- Modify `src/app/globals.css` for global styles
- Use Tailwind CSS classes for component styling
- Update `tailwind.config.js` for custom configurations

## 🚀 Deployment

### GitHub Pages
This project is configured for GitHub Pages deployment:

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "Deploy from a branch" → "main" branch
4. Your site will be available at `https://YOUR_USERNAME.github.io/devops-learning-website`

### Other Platforms
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `out` folder
- **AWS S3**: Upload `out` folder contents to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Video content from various YouTube creators
- Icons and graphics from various sources
- Built with love for the DevOps community

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation in each topic
- Watch the video tutorials for hands-on learning

---

**Happy Learning! 🎓**

*Master DevOps concepts with interactive tutorials and hands-on video content.*
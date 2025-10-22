# Docker Showcase

A modern React + TypeScript + Vite application showcasing Docker sample applications from the dockersamples organization. Browse, search, and filter through Docker samples with enhanced features for labspace repositories.

🌐 **Live Demo**: [https://dockershowcase.vercel.app](https://dockershowcase.vercel.app)

## ✨ Features

- 📦 **Browse Docker Samples**: Explore 100+ sample applications from dockersamples
- 🔍 **Smart Search**: Search by repository name or description
- 🏷️ **Filter by Products**: Filter samples by Docker products (Scout, DHI, Testcontainers, etc.)
- 🧪 **Filter by Labspace**: Dedicated filter for interactive learning environments
- 🧪 **Labspace Support**: Special support for Docker Labspace repositories
  - One-click Docker Compose commands
  - Direct Docker Extension integration
  - Copy-to-clipboard functionality
- 🎨 **Modern UI**: Built with Shadcn UI and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## 🧪 Labspace Integration

Labspace repositories are interactive learning environments that can be launched directly from the showcase:

### Quick Start Command
For labspace repositories (e.g., `labspace-container-supported-development`), you'll see:
```bash
docker compose -f oci://dockersamples/labspace-container-supported-development up -d
```

### Docker Extension
Click the **"Open in Docker"** button to launch the labspace directly in Docker Desktop.

### Features for Labspaces:
- 🏷️ Special "Labspace" badge on cards
- 📋 One-click copy of Docker Compose commands
- 🔗 Direct link to Docker Extension marketplace
- 🔍 Dedicated "Filter by Labspace" section (separate from product filters)

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop

### Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/ajeetraina/dockershowcase.git
cd dockershowcase

# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:3000`

### Build Docker Image Only

```bash
# Build the Docker image
docker build -t dockershowcase:latest .

# Run the container
docker run -d -p 3000:80 --name dockershowcase dockershowcase:latest
```

## 🛠️ Development

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Docker Configuration

### Multi-Stage Build
The Dockerfile uses a multi-stage build approach:
1. **Builder Stage**: Uses Node.js to install dependencies and build the application
2. **Production Stage**: Uses Nginx Alpine to serve the static files

### Architecture
- **Base Image**: Node 20 Alpine (builder), Nginx Alpine (production)
- **Port**: 80 (mapped to 3000 on host)
- **Web Server**: Nginx with optimized SPA routing configuration
- **Size**: Optimized multi-stage build for minimal image size

## 🔧 Configuration Files

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose orchestration
- `nginx.conf` - Nginx configuration for SPA routing
- `.dockerignore` - Files to exclude from Docker build context

## 🌟 Available Filters

### Filter by Labspace
- **Labspace** - Interactive learning environments and workshops

### Filter by Products
- **Docker Scout** - Security and vulnerability scanning
- **DHI** - Docker Hub integration
- **Testcontainers** - Testing with containers
- **Compose Watch** - Live reload with Docker Compose
- **Docker Build Cloud** - Cloud-based builds
- **Docker Cagent** - Coding agents
- **Docker MCP Toolkit** - Model Context Protocol
- **Docker Model Runner** - AI/ML model deployment

## 📝 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Container**: Docker + Docker Compose
- **Web Server**: Nginx

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Related Links

- [Docker Samples Organization](https://github.com/dockersamples)
- [Docker Documentation](https://docs.docker.com)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

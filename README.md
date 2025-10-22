# Docker Showcase

A modern React + TypeScript + Vite application with Shadcn UI components, fully containerized with Docker.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker installed on your system
- Docker Compose (included with Docker Desktop)

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

## 🌟 Features

- ⚡ Vite for fast development and optimized builds
- ⚛️ React 18 with TypeScript
- 🎨 Shadcn UI components
- 🔧 Radix UI primitives
- 📱 Responsive design with Tailwind CSS
- 🐳 Fully containerized with Docker
- 🚀 Nginx for production-ready serving

## 📝 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **Container**: Docker + Docker Compose
- **Web Server**: Nginx

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

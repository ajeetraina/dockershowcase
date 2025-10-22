# Docker Showcase

A modern React + TypeScript + Vite application fully containerized with Docker.

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


## 📝 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Container**: Docker + Docker Compose
- **Web Server**: Nginx

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



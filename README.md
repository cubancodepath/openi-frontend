# Air Quality Dashboard Frontend

A React-based dashboard for visualizing air quality data.

## Prerequisites

- Docker
- Docker Compose
- The backend API running on port 3001

## Quick Start

1. Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

2. Make sure the backend API is running on port 3001

3. Build and run the frontend

```bash
docker-compose up --build
```

The application will be available at http://localhost

## Development

If you want to run the application locally for development:

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Project Structure

```
.
├── src/                # Source code
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf        # Nginx configuration
└── README.md         # This file
```

## Important Notes

- The API URL is configured to `http://localhost:3000` during build time
- Make sure your backend API is running before starting the frontend
- The application runs on port 80 by default

## Technical Stack

- React
- TypeScript
- Vite
- Shadcn/ui
- TanStack Query (React Query)
- Docker
- Nginx

## Commands

```bash
# Start the application in Docker
docker-compose up --build

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

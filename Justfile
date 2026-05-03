# Show available commands
default:
    @just --list

# Build all docker images
build:
    docker-compose -f docker-compose.dev.yml build

# Start all services
up:
    docker-compose -f docker-compose.dev.yml up -d

# Stop all services
down:
    docker-compose -f docker-compose.dev.yml down

# Restart all services
restart: down up

# Rebuild and restart frontend with fresh dependencies
rebuild-frontend:
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build frontend
    docker-compose -f docker-compose.dev.yml up -d

# Rebuild and restart backend with fresh dependencies
rebuild-backend:
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build backend
    docker-compose -f docker-compose.dev.yml up -d

# Rebuild and restart frontend and backend
rebuild: rebuild-frontend rebuild-backend

# View logs from all services
logs:
    docker-compose -f docker-compose.dev.yml logs

# Follow logs from all services
logs-f:
    docker-compose -f docker-compose.dev.yml logs -f

# Run database migrations
migrate:
    docker-compose -f docker-compose.dev.yml exec backend bun run migrate

# Build test environment
test-up:
    docker-compose -f docker-compose.test.yml --env-file .env.test -p test up -d

# Run tests
test:
    docker-compose -f docker-compose.test.yml --env-file .env.test -p test exec backend bun --no-env-file test

# Stop test environment
test-down:
    docker-compose -f docker-compose.test.yml -p test down

# Remove all containers, images, and volumes
[confirm("Are you sure you want to delete all containers, images, and volumes?")]
clean:
    docker-compose -f docker-compose.dev.yml down -v --rmi all --remove-orphans
    docker-compose -f docker-compose.test.yml -p test down -v --rmi all --remove-orphans
    -docker rm -f $(docker ps -aq)
    -docker rmi -f $(docker images -q)
    docker system prune -af --volumes
    @echo "Cleanup completed successfully."

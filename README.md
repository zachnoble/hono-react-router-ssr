## Project setup

1. **Install dependencies:**

    ```bash
    bun install && bun run setup && brew install just
    ```

2. **Set environment variables:**

    ```bash
    cp .env.example .env
    ```

## Running services

1. **Build and start all services:**

    ```bash
    just up
    ```

2. **Run DB migrations:**

    ```bash
    just migrate
    ```

3. **Access the application:**
    - Frontend: http://localhost:5173
    - Backend: http://localhost:8080
    - Postgres: localhost:5432
    - Valkey: localhost:6379

## Running Tests

1. **Set test environment variables:**

    ```bash
    cp .env.test.example .env.test
    ```

2. **Start test services:**

    ```bash
    just test-up
    ```

3. **Run tests:**

    ```bash
    just test
    ```

4. **Stop test services:**
    ```bash
    just test-down
    ```

## Deployment to AWS

### Prerequisites

**Create ECR repositories** for both frontend and backend:

```bash
aws ecr create-repository --repository-name backend --region your-region
aws ecr create-repository --repository-name frontend --region your-region
```

### GitHub Action Config

Set the following secrets in your GitHub repo settings:

- `AWS_ACCESS_KEY_ID`: Your CI IAM User's AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your CI IAM User's AWS secret access key
- `AWS_REGION`: The AWS region where your services are deployed (e.g., `us-east-1`)

### IAM Permissions

The AWS user/role needs the following permissions:

- `ecr:GetAuthorizationToken`
- `ecr:BatchCheckLayerAvailability`
- `ecr:GetDownloadUrlForLayer`
- `ecr:BatchGetImage`
- `ecr:PutImage`
- `ecr:InitiateLayerUpload`
- `ecr:UploadLayerPart`
- `ecr:CompleteLayerUpload`

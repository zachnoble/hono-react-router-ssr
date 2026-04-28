## Running services

1. **Set environment variables:**

    ```bash
    cp .env.example .env
    ```

2. **Build and start all services:**

    ```bash
    make up
    ```

3. **Run DB migrations:**

    ```bash
    make migrate
    ```

4. **Access the application:**
    - Frontend: http://localhost:5173
    - Backend: http://localhost:8080
    - Postgres: localhost:5432
    - Valkey: localhost:6379

### Running Tests

1. **Set test environment variables:**

    ```bash
    cp .env.test.example .env.test
    ```

2. **Start test services:**

    ```bash
    make test-up
    ```

3. **Run tests:**

    ```bash
    make test
    ```

4. **Stop test services:**
    ```bash
    make test-down
    ```

## Deployment to AWS

GitHub Actions are used to automate deploying to AWS.

The backend will always be deployed before the frontend. If the backend deployment fails, the frontend will not be deployed.

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

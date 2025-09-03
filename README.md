# ALX Polly

A simple polling application built with Next.js that allows users to create and vote on polls.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Testing

During development, modifications were made to the `PollCreateForm` component to include required validation for the poll question and options. This required updates to the corresponding unit and integration tests.

Specifically:
- The `PollCreateForm` component in <mcfile name="components/polls/poll-create-form.tsx" path="components/polls/poll-create-form.tsx"></mcfile> was updated to use `zod` for schema validation, ensuring the `title` field (Poll Question) and `options.text` fields are required.
- The unit tests in <mcfile name="app/polls/__tests__/PollCreateForm.test.tsx" path="app/polls/__tests__/PollCreateForm.test.tsx"></mcfile> and integration tests in <mcfile name="app/polls/__tests__/integration/PollCreateForm.integration.test.tsx" path="app/polls/__tests__/integration/PollCreateForm.integration.test.tsx"></mcfile> were updated to reflect these validation changes.
- A recurring `ReferenceError: React is not defined` in the test files was resolved by ensuring `import React from 'react';` was correctly placed at the top of both `PollCreateForm.test.tsx` and `PollCreateForm.integration.test.tsx`.

To run the tests, use the following command:

```bash
npm test
```

This will execute all unit and integration tests, verifying the form's functionality and validation rules.



### Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env.local` file in the root directory with the following variables:

```
# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_SIGNUP_ENABLED=true

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Database (placeholder values - replace with actual credentials in production)
DATABASE_URL=postgresql://username:password@localhost:5432/polly_db

# JWT Secret (used for authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Application
NEXT_PUBLIC_APP_NAME=ALX Polly
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Feature flags
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=false
NEXT_PUBLIC_ENABLE_POLL_ANALYTICS=true
```

### Running the Development Server

After setting up your environment variables, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|--------|
| `NEXT_PUBLIC_AUTH_ENABLED` | Enable/disable authentication features | `true` |
| `NEXT_PUBLIC_SIGNUP_ENABLED` | Enable/disable user registration | `true` |
| `NEXT_PUBLIC_API_URL` | URL for API endpoints | `http://localhost:3001/api` |
| `DATABASE_URL` | Database connection string | - |
| `JWT_SECRET` | Secret key for JWT token generation | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `ALX Polly` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3001` |
| `NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN` | Enable/disable social login options | `false` |
| `NEXT_PUBLIC_ENABLE_POLL_ANALYTICS` | Enable/disable poll analytics features | `true` |

### Using Environment Variables

In the application, environment variables are accessed through utility functions in `lib/env.ts` to provide type safety and default values:

```typescript
// Example usage in a component
import { getAppConfig, getAuthConfig } from '@/lib/env';

function MyComponent() {
  const { appName } = getAppConfig();
  const { authEnabled } = getAuthConfig();
  
  return (
    <div>
      <h1>{appName}</h1>
      {authEnabled && <LoginButton />}
    </div>
  );
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

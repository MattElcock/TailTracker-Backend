# Tail Tracker Backend

Backend service for Tail Tracker, an app designed to help pet owners manage the health of their companions.

## 🧰 Technologies

- [Knexjs](https://knexjs.org/)
- [Node.js](https://nodejs.org/en) v22
- [Typescript](https://www.typescriptlang.org/)
- [yarn](https://classic.yarnpkg.com/en/)
- [Express](https://expressjs.com/)
- [Apollo GraphQL](https://www.apollographql.com/)

## 🚀 Getting Started

Follow these steps to set up your local development environment:

### 1. Configure Project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.  
   _(It doesn’t matter whether Gemini or Google Analytics is enabled.)_
2. Navigate to **Authentication** and click **Get Started**.
3. Under **Sign-in method**, select **Email/Password**.
4. Enable **Email/Password** and click **Save**.
5. Open **Project Settings** (the ⚙️ icon beside _Project Overview_).
6. Navigate to **Service Accounts** → **Generate new private key**.
7. A JSON file will be downloaded:
   - Rename it to `firebaseAdminKey.json`.
   - Place it in the **root** of the project.
8. Create a new `.env` file in the root of the project and copy the contents of `.env.example` into it.

### 2. Start the Database & Adminer

Start the Postgres database and Adminer UI using Docker Compose:

```bash
docker compose up db adminer
```

- Postgres runs on http://localhost:5432
- Adminer runs on http://localhost:8080 for database management

### 2. Install dependencies

Install Node.js dependencies

```bash
yarn
```

### 3. Start the development server

Install Node.js dependencies

```bash
yarn start
```

The GraphQL API runs on http://localhost:4000

## 🔐 Authenticating Requests

All API requests must include a valid Firebase **ID token** in the `Authorization` header:

```http
Authorization: Bearer <TOKEN>
```

If using GraphiQL, you can load the token in by:

1. Open http://localhost:4000/
2. In the top-bar, to the left of 'Publish', click the settings cog
3. Click 'New shared header'
4. For **header key**, enter `Authorization`.
5. For **value**, enter the ID token.
6. Click **Save**.

The header will be applied to all requests.

### Getting an ID Token

1. In Firebase, navigate to **Authentication** then **Users**.
2. Click **Add user** and fill in the form.
3. Open **Project Settings** (the ⚙️ icon beside _Project Overview_).
4. Navigate to **General** and make a note of the **Web API key**.
5. Make the following `GET` request (e.g. in Postman).

```bash
curl --location 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<YOUR_API_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "<USER_EMAIL>",
    "password": "<USER_PASSWORD>",
    "returnSecureToken": true
  }'
```

Where

- `<YOUR_API_KEY>` is your **Web API Key** from Firebase
- `<USER_EMAIL>` is the **email address** of a user in Firebase
- `<USER_PASSWORD>` is the **password** of the user in Firebase

The response will contain the `idToken`.

# Navnelykke

Navnelykke is a web application that helps Norwegian parents find the perfect baby name. It provides searchable lists of names, inspiration articles and tools such as polls and favorites. The site is built with **React**, **TypeScript** and **Vite**, styled with **Tailwind CSS**, and stores data in Supabase.

## Setup

1. Install [Node.js](https://nodejs.org/) (version 18 or later).
2. Clone this repository and navigate into the project folder:

   ```bash
   git clone <repo-url>
   cd navnelykke
   ```
3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env` and replace the placeholder values with the
   details from your [Supabase](https://supabase.com) project. These variables
   configure the application's connection to Supabase:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `SUPABASE_URL` to your project URL and
   `SUPABASE_PUBLISHABLE_KEY` to the publishable key found in your Supabase
   dashboard.

## Running the app

Start the development server with hot reloading:

```bash
npm run dev
```

Vite will serve the application on <http://localhost:5173> by default.

## Building for production

Create an optimized production build:

```bash
npm run build
```

Preview the build locally (useful for testing the production bundle):

```bash
npm run preview
```

There is also a lint script available:

```bash
npm run lint
```

## Testing

Install dependencies and run the test suite:

```bash
npm install
npm test
```

Jest runs the files under `tests/`.


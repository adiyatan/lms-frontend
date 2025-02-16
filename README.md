# Vite React Project

This project is a React application created with [Vite](https://vitejs.dev/), which provides a fast and modern development environment.

## Requirements

Ensure you have the following installed on your machine:

- **Node.js**: v22.13.0
- **npm**: 10.9.2

You can verify your versions by running:

```sh
node -v
npm -v
```

## Getting Started

### 1. Clone the repository:

```sh
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Start the development server:

```sh
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 4. Build for production:

```sh
npm run build
```

This will generate production-ready files in the `dist` directory.

### 5. Preview the production build:

```sh
npm run preview
```

## Project Structure

```
├── public/         # Static assets
├── src/
│   ├── assets/     # Images, icons, styles
│   ├── components/ # Reusable components
│   ├── hooks/      # Custom hooks
│   ├── pages/      # Application pages
│   ├── routes/     # Application routes
│   ├── App.tsx     # Main application component
│   └── main.tsx    # Entry point
└── vite.config.js  # Vite configuration
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.

## Tech Stack

- **React**: UI library
- **Vite**: Build tool for fast development
- **TypeScript (tsx)**: Type-safe JavaScript
- **npm**: Package manager

## License

This project is licensed under the MIT License. Feel free to use it for your own projects!

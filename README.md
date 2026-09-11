# Age Calculator 🎂

A clean, modern Age Calculator web app built with React and Tailwind CSS.

## Features

- **Clean UI**: Centered card layout with soft light gray background (#f4f4f4)
- **Smart Input**: Three separate input fields (Year, Month, Day) with auto-focus navigation
- **Input Validation**: 
  - Numeric-only input
  - Auto-focus shifts when fields are completed
  - Backspace navigation between fields
  - Month limited to 1-12, Day limited to 1-31
- **Age Calculation**: Accurate age calculation showing years, months, and days
- **Error Handling**: Validates dates (e.g., catches February 31st) and shows inline error messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Transitions**: Focus highlights and hover effects for better UX

## Tech Stack

- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter your birth year (4 digits) - auto-focuses to month when complete
2. Enter your birth month (2 digits) - auto-focuses to day when complete
3. Enter your birth day (2 digits)
4. Click "Calculate Age" to see your age in years, months, and days

## Project Structure

```
age-calculator/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main component
    └── index.css       # Global styles with Tailwind directives
```

## License

MIT

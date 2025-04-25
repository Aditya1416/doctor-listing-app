# Doctor Listing Application

A modern web application for listing and filtering doctors, built with React and TypeScript.

Created by: Aditya Sharma (RA2211026010295)  
Institution: SRM Institute of Science and Technology, Kattankulathur

## Features

- Search doctors by name
- Filter by specialties
- Sort by fees and experience
- Pagination with 25 doctors per page
- Responsive design for all devices
- Real-time search suggestions
- URL-based filters and search parameters

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React (for icons)
- Vite (build tool)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doctor-listing-app
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and visit `http://localhost:5173`

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. The build output will be in the `dist` directory

3. To preview the production build:
```bash
npm run preview
```

## Project Structure

```
doctor-listing-app/
├── src/
│   ├── api/           # API related functions
│   ├── components/    # React components
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## Environment Variables

No environment variables are required to run this project.

## API Integration

The application fetches doctor data from a JSON API endpoint. The response includes:
- Doctor's name
- Specialties
- Experience
- Consultation fees

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.
# Adree Task Manager

A modern, full-featured task management application built with React.js, Redux, and TypeScript.

## Features

- **Task Management**: Create, read, update, and delete tasks with ease
- **Due Dates**: Set and track task deadlines
- **Dashboard Analytics**: Visualize task metrics with interactive charts
- **Form Validation**: Comprehensive client-side validation with helpful error messages
- **Error Handling**: Robust error handling with user-friendly notifications
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom React Components
- **Charts**: Recharts
- **Testing**: Vitest with Testing Library
- **Icons**: Lucide React

## Getting Started

### Installation

\`\`\`bash

# Clone the repository

git clone <repository-url>

# Install dependencies

npm install

# Run the development server

npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── src/
│ ├── components/
│ │ ├── shared/ # Reusable UI components
│ │ │ ├── Button.tsx # Custom button component
│ │ │ ├── Card.tsx # Card container component
│ │ │ ├── Modal.tsx # Modal dialog component
│ │ │ └── Toast.tsx # Notification component
│ │ └── layout/ # Layout components
│ ├── modules/
│ │ ├── dashboard/ # Dashboard feature module
│ │ │ ├── components/
│ │ │ └── views/
│ │ └── tasks/ # Tasks feature module
│ │ ├── components/
│ │ └── views/
│ └── store/ # Redux store configuration
│ ├── index.ts # Store setup
│ └── slices/ # Redux slices
├── utils/ # Utility functions
│ ├── validation.ts # Form validation
│ └── helpers.ts # Helper functions
├── types/ # TypeScript types
│ └── index.ts # Type definitions
├── **tests**/ # Test files
│ └── validation.test.ts
└── public/ # Static assets
├── images/
└── icons/
\`\`\`

## Features in Detail

### Task Management

- Create new tasks with title, description, status, priority, and due date
- Edit existing tasks
- Delete tasks with confirmation
- View all tasks or filter by status

### Dashboard

- View task statistics (total, completed, in progress)
- Visualize task distribution by status (pie chart)
- Analyze priority breakdown (bar chart)
- Track completion rate trends (line chart)
- Monitor task creation trends (area chart)

### Validation

- Title: Required, 3-100 characters
- Description: Optional, max 500 characters
- Due Date: Must be today or in the future
- Real-time validation feedback

### Error Handling

- Form validation errors displayed inline
- API error notifications with toast messages
- Error boundary for unexpected errors
- Helpful error messages for users

## Testing

Run the test suite:

\`\`\`bash
npm test
\`\`\`

Tests cover:

- Form validation logic
- Error handling
- Component rendering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

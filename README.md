# Package Sorting Center - Frontend

A professional React application for managing package sorting using Queue (FIFO) and Stack (LIFO) data structures.

## Project Structure

```
frontend/
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── components/
│   │   ├── common/                 # Reusable components
│   │   │   ├── Notification.jsx    # Toast notifications
│   │   │   └── StatsCard.jsx       # Statistics display cards
│   │   ├── package/                # Package-related components
│   │   │   └── PackageCard.jsx     # Individual package display
│   │   ├── operations/             # Operations tab components
│   │   │   ├── ControlPanel.jsx    # Main control panel
│   │   │   ├── QueueDisplay.jsx    # Queue visualization
│   │   │   └── StackDisplay.jsx    # Stack visualization
│   │   ├── analytics/              # Analytics tab components
│   │   │   ├── Analytics.jsx       # Main analytics container
│   │   │   ├── PerformanceCharts.jsx  # Chart components
│   │   │   ├── MetricsTable.jsx    # Performance metrics table
│   │   │   └── ComplexityInfo.jsx  # Algorithm complexity info
│   │   └── layout/                 # Layout components
│   │       ├── Header.jsx          # Page header
│   │       ├── Footer.jsx          # Page footer
│   │       └── TabNavigation.jsx   # Tab navigation
│   ├── services/
│   │   └── api.service.js          # API communication layer
│   ├── hooks/
│   │   └── usePackageSystem.js     # Custom hook for state management
│   ├── utils/
│   │   └── helpers.js              # Utility functions
│   ├── App.jsx                     # Main App component
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
└── README.md                       # This file
```

## Component Hierarchy

```
App
├── Header
├── Notification (conditional)
├── StatsCard (×4)
├── TabNavigation
├── Operations Tab
│   ├── ControlPanel
│   ├── QueueDisplay
│   │   └── PackageCard (multiple)
│   └── StackDisplay
│       └── PackageCard (multiple)
└── Analytics Tab
    ├── PerformanceCharts
    ├── MetricsTable
    └── ComplexityInfo
└── Footer
```

## Features by Component

### **Common Components**

- `Notification.jsx` - Auto-dismissing toast notifications
- `StatsCard.jsx` - Reusable statistic display cards

### **Package Components**

- `PackageCard.jsx` - Display individual package info (priority, weight, destination)

### **Operations Components**

- `ControlPanel.jsx` - All action buttons and sorting controls
- `QueueDisplay.jsx` - FIFO queue visualization
- `StackDisplay.jsx` - LIFO stack visualization

### **Analytics Components**

- `Analytics.jsx` - Main container for analytics
- `PerformanceCharts.jsx` - Bar charts for time, comparisons, and swaps
- `MetricsTable.jsx` - Detailed performance metrics table
- `ComplexityInfo.jsx` - Algorithm complexity information cards

### **Layout Components**

- `Header.jsx` - Application title and description
- `Footer.jsx` - Copyright and information
- `TabNavigation.jsx` - Switch between Operations and Analytics

### **Services**

- `api.service.js` - Centralized API calls to Flask backend

### **Hooks**

- `usePackageSystem.js` - Custom hook managing all state and actions

### **Utils**

- `helpers.js` - Utility functions (colors, formatting, algorithm info)

## Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm start
   ```

3. **Make sure Flask backend is running:**
   ```bash
   # In backend directory
   python app.py
   ```

## API Endpoints Used

- `POST /api/packages/random` - Add random packages
- `GET /api/queue` - Get queue data
- `GET /api/stack` - Get stack data
- `POST /api/queue/process` - Move package from queue to stack
- `POST /api/stack/unload` - Remove package from stack
- `POST /api/queue/sort` - Sort queue by priority
- `POST /api/stack/sort` - Sort stack by weight
- `POST /api/compare` - Compare all sorting algorithms
- `GET /api/stats` - Get system statistics
- `POST /api/reset` - Reset the system

## Sorting Algorithms

1. **Bubble Sort** - O(n²) time, O(1) space
2. **Quick Sort** - O(n log n) time, O(log n) space
3. **Merge Sort** - O(n log n) time, O(n) space
4. **Insertion Sort** - O(n²) time, O(1) space

## Technologies

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Fetch API** - HTTP requests

## Development Tips

- Each component is self-contained and reusable
- State management is centralized in the custom hook
- API calls are abstracted in the service layer
- Styling uses Tailwind utility classes
- Components follow single responsibility principle

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.
\*/

// ============================================================================
// INSTALLATION COMMANDS
// ============================================================================

/\*

STEP-BY-STEP SETUP:

1. Create React App:
   npx create-react-app package-sorting-frontend
   cd package-sorting-frontend

2. Install Dependencies:
   npm install recharts lucide-react

3. Install Tailwind CSS:
   npm install -D tailwindcss
   npx tailwindcss init

4. Create all component files as shown in the structure above

5. Update src/index.css with Tailwind directives

6. Start the application:
   npm start

The app will run on http://localhost:3000

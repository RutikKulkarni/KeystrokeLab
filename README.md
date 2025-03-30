# KeystrokeLab - Advanced Typing Test Application

KeystrokeLab is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that offers an advanced typing test experience. Users can take timed typing tests, track their performance metrics, and receive psychological insights based on their typing patterns.

Live Demo: [KeystrokeLab](https://keystroke-lab.vercel.app/)

## Features

### Core Functionality

- **Timed Typing Tests**: 15 and 30-second test options
- **Real-time Performance Metrics**:
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Error tracking
- **User Authentication**: Secure login and registration system
- **Performance Dashboard**: Comprehensive view of typing history and statistics

### Advanced Analytics

- **Psychological Insights**:
  - Impulsivity measurement
  - Cognitive load analysis
  - Resilience tracking
  - Anxiety indicators
- **Detailed Error Analysis**: Track common mistakes and error patterns
- **Progress Tracking**: Historical performance data and improvement metrics

## Technology Stack

### Frontend

- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication
- Lucide React for icons

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RutikKulkarni/KeystrokeLab
cd KeystrokeLab
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:

```env
PORT=8080
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/user` - Get authenticated user details

### Typing Sessions

- `POST /api/sessions` - Save completed typing session
- `GET /api/sessions/:userId` - Get user's session history
- `GET /api/analysis/:sessionId` - Get detailed session analysis

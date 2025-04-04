# AI Interview Bot 🤖

An intelligent interview preparation platform powered by AI that provides real-time interview practice and instant feedback. Practice technical interviews, improve your skills, and boost your confidence with our AI-powered interview simulator.

## Features ✨

- **AI-Powered Interviews**: Dynamic interview sessions with intelligent AI interviewer
- **Real-time Feedback**: Get instant feedback on your responses
- **Multiple Tech Stacks**: Practice interviews for various technologies and roles
- **Interview History**: Track your progress with detailed interview history
- **User Authentication**: Secure sign-up and sign-in functionality
- **Responsive Design**: Beautiful UI that works across all devices

## Tech Stack 🛠️

- **Frontend**: Next.js 15.2, React 19, TypeScript
- **Styling**: TailwindCSS, Radix UI components
- **Authentication**: Firebase Authentication
- **Database**: Firebase
- **AI Integration**: VAPI AI SDK
- **Form Handling**: React Hook Form, Zod validation
- **UI Components**: Custom components with Tailwind animations

## Prerequisites 📋

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Firebase account and project setup

## Installation 🚀

1. Clone the repository:
```bash
git clone <repository-url>
cd interview_bot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Firebase and VAPI AI configurations:

```env
# Firebase Config
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# VAPI AI Config
VAPI_API_KEY=your_vapi_api_key
```

## Available Scripts 📜

- **Development server**:
```bash
npm run dev
```
Runs the app in development mode with Turbopack. Open [http://localhost:3000](http://localhost:3000)

- **Build**:
```bash
npm run build
```
Builds the app for production

- **Production server**:
```bash
npm start
```
Runs the built app in production mode

- **Linting**:
```bash
npm run lint
```
Runs ESLint to check code quality

## Project Structure 📁

```
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   ├── constants/   # Constants and configurations
│   ├── firebase/    # Firebase setup and utilities
│   ├── lib/         # Utility functions and actions
│   └── types/       # TypeScript type definitions
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, please open an issue in the GitHub repository.

# (Next Hire )AI Interview Bot 🤖

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
- VAPI AI account
- Google Cloud account with Generative AI API enabled

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
Create a `.env.local` file in the root directory with the following configurations:

```env
# VAPI AI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id

# Google Generative AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_generative_ai_api_key

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
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

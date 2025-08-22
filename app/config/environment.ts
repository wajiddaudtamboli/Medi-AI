// Environment configuration for React Native app
// In production, these values should be loaded from secure storage or environment variables

export const config = {
  GOOGLE_AI_API_KEY:
    process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || 'your-google-ai-api-key',
  FIREBASE_API_KEY:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'your-firebase-api-key',
  FIREBASE_AUTH_DOMAIN:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'your-project.firebaseapp.com',
  FIREBASE_PROJECT_ID:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  FIREBASE_STORAGE_BUCKET:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'your-project.appspot.com',
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
};

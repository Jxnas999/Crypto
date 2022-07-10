/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "crypto-site-3090f.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBpX1sG5sqcrFpg9vFGgHuN3_j_TJGVh9k",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "crypto-site-3090f",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "crypto-site-3090f.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "107966126794",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:107966126794:web:e3f8a1a262f6bc1016b233",
  },
};

module.exports = nextConfig;

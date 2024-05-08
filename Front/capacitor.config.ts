import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.appp',
  appName: 'KCALPP',
  webDir: 'dist',
  ios: {
    path: "ios"
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;

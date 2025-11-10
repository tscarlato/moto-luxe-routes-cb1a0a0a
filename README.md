# MotoMap

Premium motorcycle route planning application with Firebase integration.

## Features

- **Route Planning** - Click the map or search to add waypoints
- **Route Optimization** - Choose scenic routes, avoid highways
- **Trip Metrics** - Distance, duration, and detailed route information
- **Save & Share** - Save trips to your account and share with unique links
- **User Accounts** - Email/password or Google Sign-In authentication
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** shadcn/ui, Tailwind CSS
- **Backend:** Firebase (Auth + Firestore)
- **Maps:** Google Maps API (Maps, Directions, Geocoding, Places)
- **Deployment:** Railway

## Development

### Prerequisites

- Node.js 18+ (with npm)
- Google Maps API key with enabled APIs:
  - Maps JavaScript API
  - Directions API
  - Geocoding API
  - Places API
- Firebase project with Firestore and Authentication enabled

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd moto-luxe-routes-cb1a0a0a
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with your credentials:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual API keys
```

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

Required environment variables (see `.env.local.example`):

- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID (optional)

## Deployment

This app is configured to deploy on Railway. When deploying:

1. Set all environment variables in Railway dashboard
2. Railway will automatically detect the project and run:
   - `npm install`
   - `npm run build`
   - `npm start`

## License

Private - All rights reserved

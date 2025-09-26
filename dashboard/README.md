# SAMADHAAN Dashboard

A high-performance Next.js dashboard application for Jharkhand government services with AI-powered chatbot and interactive maps.

## Features

- **High Performance**: Server-side rendering (SSR) and static generation (SSG) for optimal performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Strict type checking for improved code quality
- **AI-Powered Chatbot**: Integrated with Supabase for context data and multilingual support
- **Interactive Maps**: Focused on Jharkhand region with service location data
- **Shared Authentication**: Single login page for both admin and client users
- **Real-time Data**: Efficient data fetching and real-time updates

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Database**: Supabase
- **AI**: OpenAI API integration
- **Maps**: Leaflet with React-Leaflet
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Supabase account with project setup

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SAMADHAAN_2/dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_JWT_SECRET=your_supabase_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
dashboard/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── (auth)/     # Authentication routes
│   │   ├── (dashboard)/# Dashboard routes
│   │   ├── api/        # API routes
│   ├── components/     # Reusable components
│   │   ├── chatbot/    # Chatbot components
│   │   ├── dashboard/  # Dashboard UI components
│   │   ├── map/        # Map components
│   ├── lib/            # Utility libraries
│   │   ├── supabase.ts # Supabase client
```

## Database Schema

The application uses the following Supabase tables:

- **users**: User accounts with role information
- **chat_history**: Stores chat interactions
- **knowledge_base**: Contains information for the chatbot
- **service_locations**: Stores location data for the map

## Authentication

The application uses Supabase Authentication with email/password login. Users are assigned roles (admin or client) which determine their access to different parts of the dashboard.

## Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to your preferred hosting platform (Vercel recommended for Next.js applications).

## Performance Optimization

- Implements code splitting for reduced bundle size
- Uses Next.js Image component for optimized image loading
- Implements caching strategies for API responses
- Utilizes incremental static regeneration for dynamic content

## Testing

- Unit tests with Jest
- End-to-end testing with Cypress
- Lighthouse score target: ≥90

## License

[MIT License](LICENSE)

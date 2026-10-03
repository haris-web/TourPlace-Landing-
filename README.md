# Wanderly

A responsive travel discovery frontend built with React, TypeScript, Vite, React Router, and lucide-react.

## Pages

- Home, trip booking, destination details, and curated tours
- Founder story, travel journal, and contact
- Demo sign-in, profile, saved places, and checkout confirmation

Favorites, demo profile details, and confirmed trips are saved in this browser with `localStorage`. The login is a frontend demo; it does not authenticate against a service. Contact messages and newsletter subscriptions are not sent to a server, and checkout does not collect payment card details.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then preview it with `npm run preview`.

Destination and promotional photography is loaded from Unsplash. The booking and newsletter forms demonstrate the page interactions and do not submit to a booking or mailing-list service.

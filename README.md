# Infinite Monkeys Typewriter

A vintage typewriter simulator for Reddit's platform. Experience the charm of a classic typewriter with a modern twist.

## Features

- Vintage typewriter interface
- Keyboard input with on-screen keys
- Letter counter and monkey counter
- Auto text wrapping
- Authentic typewriter sounds
- Reddit integration

## Installation

1. Create a new Reddit app at https://www.reddit.com/prefs/apps
2. Set the redirect URI to your deployment URL + `/auth/callback`
3. Copy `.env.example` to `.env` and fill in your Reddit credentials
4. Install dependencies: `npm install`
5. Run locally: `npm run dev`
6. Build: `npm run build`

## Reddit Integration

This app uses Reddit's OAuth2 for authentication. Users can:
- Sign in with their Reddit account
- Save their typing progress
- Share their work on Reddit

## License

MIT
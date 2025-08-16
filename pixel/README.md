# Pixel Arena - Web3 Gaming Interface

A promotional/educational gaming interface featuring pixel arena battles with Web3 aesthetics.

## Features

🎮 **Arena Gameplay**
- Interactive challenger selection system
- Click-to-attack mechanics with visual feedback
- Success tracking with celebration modal

🎨 **Web3 Design**
- Dark theme with neon accents and glow effects
- Glassmorphism elements with backdrop blur
- Space Grotesk typography for modern appeal
- Responsive design with smooth animations

✨ **Interactive Effects**
- Red flash attack animations on defender clicks
- "BUY" text effects appear on any mouse click
- Hover effects and smooth transitions
- Framer Motion animations throughout

## Game Mechanics

1. **Select Challenger**: Click on any of the 7 challenger images (1.png - 7.png)
2. **Enter Arena**: Selected challenger moves to face the defender (main.png)
3. **Attack**: Click the defender to trigger attack animations
4. **Victory**: After 3 successful attacks, victory message appears
5. **Reset**: Click "再来一次" to start over with a new challenger

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` to view the application.

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Web3 theme
- **Animations**: Framer Motion
- **Images**: Next.js Image optimization

## Compliance

⚠️ **Disclaimer**: This is a promotional/educational interface only, not financial advice. No trading or financial functionality is included.

## File Structure

```
pixel/
├── images/           # Game assets
│   ├── background.png    # Full-screen background
│   ├── main.png         # Defender character
│   └── 1.png - 7.png    # Challenger characters
├── app/
│   ├── components/
│   │   └── PixelArena.tsx   # Main game component
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page
└── config files...
```

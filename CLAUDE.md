# CLAUDE.md

## Project Overview
This is a browser-based game built with Phaser.js. The game will be hosted on Netlify and linked from a Squarespace website for a Foundation. Target platform is desktop browsers (PC and Mac).

## Tech Stack
- **Game Engine:** Phaser.js (v3)
- **Language:** JavaScript
- **Package Manager:** npm
- **Hosting:** Netlify
- **Version Control:** GitHub

## Development Environment
- Windows 11
- VS Code
- Node.js

## Common Commands
```bash
npm install      # Install dependencies
npm run dev      # Start local dev server
npm run build    # Build for production
```

## Project Structure
```
/src             # Game source code
  /scenes        # Phaser scenes
  /assets        # Images, audio, spritesheets
  /config        # Game configuration
/public          # Static files
/dist            # Build output (gitignored)
```

## Coding Guidelines
- Use ES6+ syntax
- Keep scenes modular — one file per scene
- Preload assets in a dedicated Preloader scene
- Use meaningful names for game objects and variables
- Comment complex game logic

## Deployment
- Push to GitHub triggers Netlify auto-deploy
- Build command: `npm run build`
- Publish directory: `dist`

## Collaboration
- Two developers (father and son)
- Use GitHub for async work
- Use VS Code Live Share for real-time collaboration
- Always pull before starting work
- Commit frequently with descriptive messages

## Notes for Claude
- Suggest performant solutions suitable for browser games
- Consider mobile-friendliness as a future goal
- Prioritize clean, readable code over cleverness
- Explain Phaser concepts when introducing new features

## TASKS

### TASK 1: Loukoumi background - basic page

- Go to the Loukoumi Make a Difference Foundation Page https://www.loukoumifoundation.org/, based on the background and colors on this page, create a basic screen for the game that utilizes the same background and colors
- Using those colors, create a very basic game based on Phaser.js engine with one character that is controlled by keyboard and an obstacle that the character can move around the screen.
- This is just meant to be a very basic test.
- Orginize the folders of this game as they should be organized based on the Phaser.js documentation
- Utilize Javascript (not Typescript) if possible.
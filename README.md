<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

<!-- EMOJIFY -->

# EMOJIFY ⚡

A fast-paced emoji clicking game built with React. Click as fast as you can in 10 seconds and beat your high score!

## 🎮 Live Demo

[Play the game here](https://emojify-z88j.vercel.app)

## ✨ Features

- ⏱️ 10-second speed clicking challenge
- 🔥 Combo multiplier + heat meter
- 🌌 Animated starfield + floating emoji particles
- 🏅 Milestone badges that unlock as you score
- 📊 Stats sidebar with clicks per second
- 💾 Best score saved permanently
- 🎨 5 colour themes to choose from
- 🔊 Sound effects using Web Audio API
- 👑 Rank system from Sleepy to Legend

## 🛠️ Built With

- React 18
- CSS3 Animations
- Web Audio API
- localStorage API
- HTML5 Canvas

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
   git clone https://github.com/Rakshana2205/EMOJIFY.git

2. Go into the project folder
   cd EMOJIFY

3. Install dependencies
   npm install

4. Start the development server
   npm start

5. Open http://localhost:3000 in your browser

## 📁 Project Structure

src/
├── App.js # Main component — game logic + state
├── App.css # All styles + animations
├── ScoreCard.js # In-game HUD (score, timer, best)
├── ResultScreen.js # End screen with rank + confetti
├── ComboBar.js # Heat meter + combo tracker
├── ThemeSwitcher.js # Colour theme picker
└── useSound.js # Custom hook for sound effects

## 🎯 React Concepts Used

- useState — game state, score, timer, combo
- useEffect — timer, localStorage, combo reset
- useRef — canvas animation, score reference
- useCallback — optimised click handler
- Custom hooks — useSound
- Props — data flow between components
- Conditional rendering — idle / playing / ended screens
- CSS variables — dynamic theming

## 👨‍💻 Author

Made by RAKSHANA S

## 📄 Licence

MIT

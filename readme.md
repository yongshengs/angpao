# Angpao Game
This is a simple command-line game that helps distribute money randomly across a set number of people.

## Pre-requisites
- Node.js (v20)
- npm

## Setup 
1. Clone this repository into your local machine / directory.

Global dependencies
- npm install -g typescript ts-node jest ts-jest

Project dependencies
- npm install --save-dev @types/node @types/jest jest @jest/globals ts-jest tsconfig-paths
- npm install --save-dev @tsconfig/node20

Verify installations
- npx tsc --version
- npx ts-node --version
- npx jest --version

## Starting the program 
1. Check that you're in the correct directory (should be /angpao), depending on which directory you cloned this repo to.
2. Run 'npm start'
- the program will provide instructions in the command line
- follow the instructions to play the game

## Testing the program 
1. Run 'npm test'
- this will start Jest in watch mode and it automatically re-runs the tests when files change
- to exit, press 'q' or 'Ctrl + C' 

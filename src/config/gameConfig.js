import Phaser from 'phaser';
import { PreloaderScene } from '../scenes/PreloaderScene.js';
import { MainScene } from '../scenes/MainScene.js';

// Loukoumi Foundation inspired color palette
export const COLORS = {
    background: 0xFFF8F0,      // Warm off-white
    primary: 0xC41E3A,         // Crimson red (heart color)
    secondary: 0x1E3A5F,       // Navy blue
    accent: 0xFFD700,          // Warm gold
    white: 0xFFFFFF,
    lightGray: 0xF5F5F5
};

export const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: COLORS.background,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloaderScene, MainScene]
};

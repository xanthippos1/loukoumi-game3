import Phaser from 'phaser';
import { COLORS } from '../config/gameConfig.js';

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#C41E3A'
        });
        loadingText.setOrigin(0.5);

        // Progress bar background
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x1E3A5F, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 30);

        // Update progress bar as assets load
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(COLORS.primary, 1);
            progressBar.fillRect(width / 2 - 155, height / 2 + 5, 310 * value, 20);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Generate player texture (a heart shape for Loukoumi theme)
        this.createPlayerTexture();

        // Generate obstacle texture
        this.createObstacleTexture();
    }

    createPlayerTexture() {
        // Create Loukoumi the lamb character using graphics
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        const size = 64;
        const centerX = size / 2;
        const centerY = size / 2;

        // Fluffy cream/white wool color
        const woolColor = 0xFFF5E6;
        const woolShadow = 0xF5E6D3;
        const skinColor = 0xFFD4C4;
        const eyeColor = 0x4A3728;
        const noseColor = 0xFFB6A3;

        // Draw fluffy wool body (multiple overlapping circles for fluffy effect)
        graphics.fillStyle(woolShadow, 1);
        // Body shadow circles
        graphics.fillCircle(centerX - 8, centerY + 12, 14);
        graphics.fillCircle(centerX + 8, centerY + 12, 14);
        graphics.fillCircle(centerX, centerY + 16, 12);

        graphics.fillStyle(woolColor, 1);
        // Main body fluff
        graphics.fillCircle(centerX - 6, centerY + 8, 13);
        graphics.fillCircle(centerX + 6, centerY + 8, 13);
        graphics.fillCircle(centerX, centerY + 12, 11);

        // Draw fluffy head wool (overlapping circles)
        graphics.fillStyle(woolShadow, 1);
        graphics.fillCircle(centerX - 10, centerY - 8, 10);
        graphics.fillCircle(centerX + 10, centerY - 8, 10);
        graphics.fillCircle(centerX, centerY - 14, 9);

        graphics.fillStyle(woolColor, 1);
        graphics.fillCircle(centerX - 8, centerY - 10, 9);
        graphics.fillCircle(centerX + 8, centerY - 10, 9);
        graphics.fillCircle(centerX, centerY - 12, 8);
        graphics.fillCircle(centerX - 5, centerY - 6, 8);
        graphics.fillCircle(centerX + 5, centerY - 6, 8);

        // Face (cream colored oval)
        graphics.fillStyle(skinColor, 1);
        graphics.fillEllipse(centerX, centerY - 2, 18, 20);

        // Ears (pink inner, cream outer)
        graphics.fillStyle(woolColor, 1);
        graphics.fillEllipse(centerX - 18, centerY - 8, 8, 12);
        graphics.fillEllipse(centerX + 18, centerY - 8, 8, 12);
        graphics.fillStyle(noseColor, 0.6);
        graphics.fillEllipse(centerX - 18, centerY - 8, 5, 8);
        graphics.fillEllipse(centerX + 18, centerY - 8, 5, 8);

        // Eyes (dark brown)
        graphics.fillStyle(eyeColor, 1);
        graphics.fillCircle(centerX - 5, centerY - 6, 3);
        graphics.fillCircle(centerX + 5, centerY - 6, 3);

        // Eye highlights
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(centerX - 4, centerY - 7, 1);
        graphics.fillCircle(centerX + 6, centerY - 7, 1);

        // Cute eyelashes (small lines)
        graphics.lineStyle(1, eyeColor, 0.7);
        graphics.lineBetween(centerX - 7, centerY - 9, centerX - 8, centerY - 11);
        graphics.lineBetween(centerX + 7, centerY - 9, centerX + 8, centerY - 11);

        // Pink nose
        graphics.fillStyle(noseColor, 1);
        graphics.fillEllipse(centerX, centerY + 2, 6, 4);

        // Smile
        graphics.lineStyle(2, 0x8B6B5B, 1);
        graphics.beginPath();
        graphics.arc(centerX, centerY + 2, 6, 0.2, Math.PI - 0.2, false);
        graphics.strokePath();

        // Little feet at bottom
        graphics.fillStyle(skinColor, 1);
        graphics.fillEllipse(centerX - 8, centerY + 26, 6, 4);
        graphics.fillEllipse(centerX + 8, centerY + 26, 6, 4);

        graphics.generateTexture('player', size, size);
        graphics.destroy();
    }

    createObstacleTexture() {
        // Create a star-shaped obstacle
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        graphics.fillStyle(COLORS.secondary, 1);
        graphics.fillRect(0, 0, 60, 60);

        // Add a border
        graphics.lineStyle(3, COLORS.accent, 1);
        graphics.strokeRect(0, 0, 60, 60);

        graphics.generateTexture('obstacle', 60, 60);
        graphics.destroy();
    }

    create() {
        // Transition to main scene
        this.scene.start('MainScene');
    }
}

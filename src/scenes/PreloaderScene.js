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
        // Create a heart-shaped player using graphics
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // Draw a heart using two circles and a triangle
        graphics.fillStyle(COLORS.primary, 1);

        // Left circle of heart
        graphics.fillCircle(15, 15, 12);
        // Right circle of heart
        graphics.fillCircle(35, 15, 12);
        // Triangle for bottom of heart
        graphics.fillTriangle(3, 18, 47, 18, 25, 45);

        graphics.generateTexture('player', 50, 50);
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

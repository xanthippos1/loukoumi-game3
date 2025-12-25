import Phaser from 'phaser';
import { COLORS } from '../config/gameConfig.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.obstacle = null;
        this.cursors = null;
        this.playerSpeed = 200;
    }

    create() {
        // Add title text
        this.add.text(400, 30, 'Loukoumi Game', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#C41E3A',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Add instructions
        this.add.text(400, 70, 'Use arrow keys to move the heart around!', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#1E3A5F'
        }).setOrigin(0.5);

        // Create player (heart) in the center
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // Create obstacle
        this.obstacle = this.physics.add.sprite(600, 400, 'obstacle');
        this.obstacle.setImmovable(true);

        // Add collision between player and obstacle
        this.physics.add.collider(this.player, this.obstacle, this.onCollision, null, this);

        // Setup keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add decorative elements (small hearts in corners)
        this.addDecorations();
    }

    addDecorations() {
        const graphics = this.add.graphics();

        // Draw corner decorations using Loukoumi colors
        graphics.fillStyle(COLORS.accent, 0.3);

        // Top-left corner arc
        graphics.beginPath();
        graphics.arc(0, 0, 80, 0, Math.PI / 2);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        // Top-right corner arc
        graphics.beginPath();
        graphics.arc(800, 0, 80, Math.PI / 2, Math.PI);
        graphics.lineTo(800, 0);
        graphics.closePath();
        graphics.fillPath();

        // Bottom-left corner arc
        graphics.beginPath();
        graphics.arc(0, 600, 80, -Math.PI / 2, 0);
        graphics.lineTo(0, 600);
        graphics.closePath();
        graphics.fillPath();

        // Bottom-right corner arc
        graphics.beginPath();
        graphics.arc(800, 600, 80, Math.PI, -Math.PI / 2);
        graphics.lineTo(800, 600);
        graphics.closePath();
        graphics.fillPath();
    }

    onCollision() {
        // Simple visual feedback on collision
        this.cameras.main.shake(100, 0.01);
    }

    update() {
        // Reset velocity
        this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }

        // Normalize diagonal movement
        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {
            this.player.body.velocity.normalize().scale(this.playerSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 720;

	class InputHandler {
		constructor() {
			this.keys = [];
			window.addEventListener('keydown', (e) => {
				if (
					(e.key === 's' ||
						e.key === 'w' ||
						e.key === 'a' ||
						e.key === 'd') &&
					this.keys.indexOf(e.key) === -1
				) {
					this.keys.push(e.key);
				}
			});
			window.addEventListener('keyup', (e) => {
				if (
					e.key === 's' ||
					e.key === 'w' ||
					e.key === 'a' ||
					e.key === 'd'
				) {
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	class Player {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 200;
			this.height = 200;
			this.x = 0;
			this.y = this.gameHeight - this.height;
			this.image = document.getElementById('playerImage');
			this.frameX = 0;
			this.frameY = 0;
			this.speed = 0;
			this.vy = 0;
			this.weight = 1;
		}
		update(input) {
			if (input.keys.indexOf('d') > -1) {
				this.speed = 5;
			} else if (input.keys.indexOf('a') > -1) {
				this.speed = -5;
			} else if (input.keys.indexOf('w') > -1 && this.onGround()) {
				this.vy -= 25;
			} else {
				this.speed = 0;
			}
			// horizontal movment
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.x > this.gameWidth - this.width) {
				this.x = this.gameWidth - this.width;
			}
			this.x += this.speed;
			// vertical movment
			this.y += this.vy;
			if (!this.onGround()) {
				this.vy += this.weight;
				this.frameY = 1;
			} else {
				this.vy = 0;
				this.frameY = 0;
			}
			if (this.y > this.gameHeight - this.height)
				this.y = this.gameHeight - this.height;
		}
		onGround() {
			return this.y >= this.gameHeight - this.height;
		}
		draw(context) {
			context.drawImage(
				this.image,
				this.width * this.frameX,
				this.height * this.frameY,
				this.width,
				this.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}
	class BackGround {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.image = document.getElementById('backgroundImage');
			this.x = 0;
			this.y = 0;
			this.width = 2400;
			this.height = 720;
			this.speed = 7;
		}
		draw(context) {
			context.drawImage(
				this.image,
				this.x,
				this.y,
				this.width,
				this.height
			);
			context.drawImage(
				this.image,
				this.x + this.width - this.speed,
				this.y,
				this.width,
				this.height
			);
		}
		update() {
			this.x -= this.speed;
			if (this.x < 0 - this.width) this.x = 0;
		}
	}

	class Enemy {}

	function handleEnemies() {}

	function displayStatusText() {}

	const input = new InputHandler();
	const player = new Player(canvas.width, canvas.height);
	const backgrund = new BackGround(canvas.width, canvas.height);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		backgrund.draw(ctx);
		backgrund.update();
		player.draw(ctx);
		player.update(input);
		requestAnimationFrame(animate);
	}
	animate();
});

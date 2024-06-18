class SnowFall {
	constructor(snow = {}) {
		this.flakeSize = snow.flakeSize || 5;
		this.fallSpeed = snow.fallSpeed || 2;
		this.flakes = [];
		this.mouseX = -100; // 初始化鼠标位置
		this.mouseY = -100;
		this.initCanvas();
		this.calculateOptimalFlakes();
		this.createFlakes();
		requestAnimationFrame(() => this.drawSnow());
	}

	initCanvas() {
		const snowcanvas = document.createElement("canvas");
		snowcanvas.id = "snowfall";
		this.adjustCanvasSize(snowcanvas);
		snowcanvas.style.cssText =
			"position: fixed; top: 0; left: 0; z-index: 100; pointer-events: none;";
		document.body.appendChild(snowcanvas);
		this.canvas = snowcanvas;
		this.ctx = snowcanvas.getContext("2d");
		window.addEventListener("resize", this.onResize.bind(this));
		document.addEventListener("mousemove", this.onMouseMove.bind(this));
	}

	adjustCanvasSize(canvas) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	calculateOptimalFlakes() {
		const pixels = window.innerWidth * window.innerHeight;
		this.maxFlake = Math.round(pixels / 70000); // 每500000个像素点有一个雪花
	}

	createFlakes() {
		this.flakes = [];
		for (let i = 0; i < this.maxFlake; i++) {
			this.flakes.push(
				new FlakeMove(
					this.canvas.width,
					this.canvas.height,
					this.flakeSize,
					this.fallSpeed,
					this.mouseX,
					this.mouseY,
					this // Pass the SnowFall instance to the FlakeMove constructor
				)
			);
		}
	}

	drawSnow() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.flakes.forEach((flake) => {
			flake.update();
			flake.render(ctx);
		});
		requestAnimationFrame(() => this.drawSnow());
	}

	onResize() {
		this.adjustCanvasSize(this.canvas);
		this.calculateOptimalFlakes();
		this.createFlakes();
	}

	onMouseMove(event) {
		if (this.isMobileDevice()) {
			// 移动端不显示鼠标影响
		} else {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		}
	}

	isMobileDevice() {
		return navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		);
	}
}

class FlakeMove {
	constructor(
		canvasWidth,
		canvasHeight,
		flakeSize,
		fallSpeed,
		mouseX,
		mouseY,
		snowfall
	) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.maxSize = flakeSize;
		this.fallSpeed = fallSpeed;
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.snowfall = snowfall;
		this.reset(true);
	}

	reset(initial = false) {
		this.x = Math.random() * this.canvasWidth;
		this.y = initial
			? Math.random() * this.canvasHeight - this.canvasHeight
			: -this.maxSize;
		this.size = Math.random() * this.maxSize + 2;
		this.speed = Math.random() * 1 + this.fallSpeed;
		this.velY = this.speed;
		this.velX = Math.random() * 2 - 1;
		this.stepSize = Math.random() * 5;
		this.step = 0;
	}

	update() {
		const dx = this.snowfall.mouseX - this.x;
		const dy = this.snowfall.mouseY - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const minDist = 150; // Minimum distance related to mouse position

		if (!this.snowfall.isMobileDevice()) {
			const force = minDist / (distance * distance);
			const xComponent = dx / distance;
			const yComponent = dy / distance;

			this.velX -= force * xComponent;
			this.velY -= force * yComponent;
		}
		if (distance < minDist) {
			const force = minDist / (distance * distance);
			const xComponent = dx / distance;
			const yComponent = dy / distance;
			this.velX -= force * xComponent;
			this.velY -= force * yComponent;
		}
		this.velX *= 0.98;
		this.velY = this.speed;
		this.y += this.velY;
		this.x += this.velX;
		this.step += this.stepSize;
		if (
			this.x > this.canvasWidth + this.maxSize ||
			this.x < -this.maxSize ||
			this.y > this.canvasHeight
		) {
			this.reset();
		}
	}

	render(ctx) {
		const gradient = ctx.createRadialGradient(
			this.x,
			this.y,
			0,
			this.x,
			this.y,
			this.size
		);
		gradient.addColorStop(0, "rgba(255, 192, 203, 0.9)");
		gradient.addColorStop(0.8, "rgba(255, 192, 203, 0.5)");
		gradient.addColorStop(1, "rgba(255, 192, 203, 0.3)");
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

if (!new SnowFall().isMobileDevice()) {
	new SnowFall();
}

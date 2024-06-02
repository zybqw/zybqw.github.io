class SnowFall {
	constructor(snow = {}) {
		this.maxFlake = snow.maxFlake || 70; // 默认值将被动态计算覆盖
		this.flakeSize = snow.flakeSize || 10;
		this.fallSpeed = snow.fallSpeed || 2;
		this.flakes = [];
		this.initCanvas();
		this.calculateOptimalFlakes(); // 动态计算最佳雪花数量
		this.createFlakes();
	}

	initCanvas() {
		const snowcanvas = document.createElement("canvas");
		snowcanvas.id = "snowfall";
		this.adjustCanvasSize(snowcanvas);
		snowcanvas.style.cssText =
			"position: fixed; top: 0; left: 0; z-index: 1; pointer-events: none;";
		document.body.appendChild(snowcanvas);
		this.canvas = snowcanvas;
		this.ctx = snowcanvas.getContext("2d");
		window.addEventListener("resize", this.onResize.bind(this));
	}

	adjustCanvasSize(canvas) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	calculateOptimalFlakes() {
		const pixels = window.innerWidth * window.innerHeight;
		this.maxFlake = Math.round(pixels / 150000); // 每150000个像素点有一个雪花
		this.flakes = []; // 重置雪花数组以避免重复
		this.createFlakes(); // 基于新的maxFlake值创建雪花
	}

	createFlakes() {
		for (let i = 0; i < this.maxFlake; i++) {
			this.flakes.push(
				new FlakeMove(
					this.canvas.width,
					this.canvas.height,
					this.flakeSize,
					this.fallSpeed
				)
			);
		}
	}

	drawSnow() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.flakes.forEach((flake) => {
			flake.update();
			flake.render(this.ctx);
		});
		requestAnimationFrame(() => this.drawSnow());
	}

	start() {
		this.drawSnow();
	}

	onResize() {
		this.adjustCanvasSize(this.canvas);
		this.calculateOptimalFlakes(); // 窗口调整大小时重新计算雪花数量
	}
}

class FlakeMove {
	constructor(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.maxSize = flakeSize;
		this.fallSpeed = fallSpeed;
		this.reset(true);
	}

	reset(initial = false) {
		this.x = Math.floor(Math.random() * this.canvasWidth);
		this.y = initial
			? Math.floor(Math.random() * this.canvasHeight) - this.canvasHeight
			: -this.maxSize;
		this.size = Math.random() * this.maxSize + 2;
		this.speed = Math.random() * 1 + this.fallSpeed;
		this.velY = this.speed;
		this.velX = Math.random() * 2 - 1; // 随机初始化水平速度，使雪花左右飘动
		this.stepSize = Math.random() * 5; // 调整步长，使飘动更明显
		this.step = 0;
	}

	update() {
		this.velX *= 0.98;
		this.velY = this.speed; // 保持垂直速度不变
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
		gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)"); // 中心白色
		gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)"); // 中心白色
		gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)"); // 边缘透明
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// 初始化雪花效果
const snow = new SnowFall(); // 移除maxFlake参数，以便使用动态计算的值
snow.start();

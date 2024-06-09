document.addEventListener("DOMContentLoaded", function () {
	var loadAnimation = document.getElementById("Loadanimation");
	if (loadAnimation) {
		var fadeEffect = setInterval(function () {
			if (!loadAnimation.style.opacity) {
				loadAnimation.style.opacity = 1;
			}
			if (loadAnimation.style.opacity > 0) {
				loadAnimation.style.opacity -= 0.05;
			} else {
				clearInterval(fadeEffect);
				loadAnimation.style.display = "none";
			}
		}, 25); // 设置每次递减的间隔时间
	}
});

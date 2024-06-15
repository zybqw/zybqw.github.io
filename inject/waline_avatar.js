document.addEventListener("DOMContentLoaded", function () {
	// 通用函数替换图片源
	function replaceImageSrc(img) {
		if (
			img.src ===
			"https://seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e"
		) {
			img.src =
				"https://seccdn.libravatar.org/avatar/ef166b47449cc7e4e71cec1a2f826a70?s=100";
		}
	}

	// 使用 MutationObserver 等待特定元素出现在DOM中
	function waitForElement(selector, callback) {
		const observer = new MutationObserver(function (mutations, obs) {
			const target = document.querySelector(selector);
			if (target) {
				callback(target);
				obs.disconnect(); // 元素已找到，断开观察
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}

	// 当目标元素可用时，设置观察者
	waitForElement("#waline > div > div.wl-cards", function (target) {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				mutation.addedNodes.forEach((node) => {
					const images =
						node.getElementsByTagName &&
						node.getElementsByTagName("img");
					if (images) {
						Array.from(images).forEach((image) => {
							if (!image.complete) {
								image.onload = () => replaceImageSrc(image);
							} else {
								replaceImageSrc(image);
							}
						});
					}
				});
			});
		});
		observer.observe(target, { childList: true, subtree: true });
	});
});

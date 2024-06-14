document.addEventListener("DOMContentLoaded", function () {
	// 图片加载后替换其src属性
	function replaceImageSrc(img) {
		img.onload = function () {
			if (
				img.src ===
				"https://seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e"
			) {
				img.src =
					"https://seccdn.libravatar.org/avatar/ef166b47449cc7e4e71cec1a2f826a70?s=100";
			}
		};
	}

	// 等待特定元素出现在DOM中
	function waitForElement(selector, callback) {
		var target = document.querySelector(selector);
		if (target) {
			callback(target);
		} else {
			// 如果元素不存在，稍后重试
			setTimeout(function () {
				waitForElement(selector, callback);
			}, 100); // 每100毫秒重试一次
		}
	}

	// 当目标元素可用时，设置观察者
	waitForElement("#waline > div > div.wl-cards", function (target) {
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				// 检查是否有子节点被添加
				if (
					mutation.type === "childList" &&
					mutation.addedNodes.length
				) {
					mutation.addedNodes.forEach((node) => {
						// 如果节点包含getElementsByTagName方法
						if (node.getElementsByTagName) {
							var images = node.getElementsByTagName("img");
							Array.from(images).forEach((image) => {
								// 如果图片还未加载完成，设置加载后替换src
								if (!image.complete) {
									replaceImageSrc(image);
								} else {
									// 如果图片已加载且src符合条件，直接替换src
									if (
										image.src ===
										"https://seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e"
									) {
										image.src =
											"https://seccdn.libravatar.org/avatar/ef166b47449cc7e4e71cec1a2f826a70?s=100";
									}
								}
							});
						}
					});
				}
			});
		});

		var config = { childList: true, subtree: true };
		observer.observe(target, config);
	});
});

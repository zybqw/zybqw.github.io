// 写在前面: 想修改waline中的默认图片，根据官方指引修改GRAVATAR_STR,发现根据QQ邮箱获取头像功能失效，又去尝试seccdn.libavatar.org的默认图片替换功能，结果不理想

document.addEventListener("DOMContentLoaded", function () {
	// 获取所有具有特定前缀的ID的元素
	var elements = document.querySelectorAll(
		"#waline > div > div.wl-cards > div.wl-card"
	);

	elements.forEach(function (element) {
		// 查找每个wl-card元素内的所有<img>标签
		var imgs = element.getElementsByTagName("img");

		for (var i = 0; i < imgs.length; i++) {
			// 检查<img>标签的src属性是否包含特定的链接
			if (
				imgs[i].src.indexOf(
					"https://seccdn.libravatar.org/avatar/d41d8cd"
				) === 0
			) {
				// 替换为百度网址
				imgs[i].src = "https://www.baidu.com";
			}
		}
	});
});

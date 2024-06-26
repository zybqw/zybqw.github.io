function getIeVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isIE =
		userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isIE11 =
		userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion > 6) {
			return fIEVersion;
		} else {
			return 6;
		}
	} else if (isEdge) {
		return "edge"; //edge
	} else if (isIE11) {
		return 11; //IE11
	} else {
		return -1; //不是ie浏览器
	}
}

//自定义设置剪贴板内容
function setClipboardText(event, maxCount) {
	var IEVersion = getIeVersion();
	//阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。
	if (IEVersion > -1 && IEVersion != "edge" && IEVersion < 11) {
		//IE
		window.event.returnValue = false;
	} else {
		event.preventDefault();
	}

	var textData = "";
	var htmlData = "";
	if (IEVersion > -1 && IEVersion != "edge" && IEVersion < 11) {
		//低版本IE
		//选择的文本
		textData = document.selection.createRange().text;
		//选择的html
		htmlData = document.selection.createRange().htmlText;
	} else {
		var selectRange = window.getSelection().getRangeAt(0);

		//选择的文本
		textData = selectRange.toString();

		//选择的html
		var node = document.createElement("div");
		node.appendChild(selectRange.cloneContents());
		htmlData = node.innerHTML;
	}

	//如果复制的内容超过maxCount个字符则添加版权信息
	if (textData.length >= maxCount) {
		var url = window.location.href;
		//文章类型：original原创、repirnt转载，如果你的博客有这个要求，则根据你博客
		//的具体判断方法，来设置article_type的值，这里我就直接写死原创original了
		var article_type = "original";
		// var article_type = 'reprint';
		var copyright = "";
		if (article_type == "original") {
			copyright = "本文为博主原创文章，转载请附上博文链接！";
		} else {
			copyright =
				"本文为转载文章，版权归原作者所有，转载请附上博文链接！";
		}
		//附加到复制内容后面的版权内容
		var appendText =
			"\n------------------------------------\n" +
			"作者：Aurzex\n" +
			"来源：猫鱼a's Blog\n" +
			"原文：" +
			url +
			"\n" +
			copyright +
			"\n\n";

		//文本格式附加版权信息
		textData += appendText;
		//html格式附加版权信息
		htmlData = "<div>" + htmlData + appendText.replace(/\n/g, "<br>");
		+"</div>";
	}

	//注意，IE11虽然大部分功能已经符合w3c标准，但是仍然只能使用window.clipboardData，
	//而无event.clipboardData，至于edge那已经不是IE了，完全遵循w3c标准(使用IE11测试)
	//使用edge模拟IE11，却又不支持window.clipboardData，反而支持event.clipboardData，报错
	//SCRIPT5007: Unable to get property 'createRange' of undefined or null reference，
	//但我们以真实IE11为准，所以用edge模拟的IE11报错是正常的
	//非常怪异的是，edge如果用window.clipboardData则正常，但如果用event.clipboardData，
	//则开启控制台调试的时候可以，但关闭控制台就不行，关闭控制台复制后，再开启控制台，可以看到
	//控制台写着SCRIPT5: SCRIPT5: Access is denied. 可见edge还是没完全开放event.clipboardData
	if (IEVersion > -1 && IEVersion != "edge") {
		//IE
		return window.clipboardData.setData("text", textData);
	} else {
		//setData(剪贴板格式, 数据) 给剪贴板赋予指定格式的数据。返回 true 表示操作成功。
		//注意html与普通文本两种都要设置，如果只设置html，你可以往有道云笔记
		//之类的富文本编辑器里粘贴，但如果你粘贴到纯文本编辑器，比如sublime就
		//无法粘贴内容，所以还要设置text/plain版本(即普通文本)
		event.clipboardData.setData("text/html", htmlData);
		event.clipboardData.setData("text/plain", textData);
	}
}

//监听copy事件（为了兼容IE，就不用addEventListener了）
document.body.oncopy = function (e) {
	setClipboardText(e, 120);
};

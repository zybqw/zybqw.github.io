function doStuff() {
	var flag = 0;
	try {
		ap = aplayers[0]; //aplayer对象的存放位置挺离谱的
		ap.list;
		flag = 1;
	} catch {
		setTimeout(doStuff, 50); //等待aplayer对象被创建（没找到初始化实例的地方只能这样了，这个判断代码是StackOverflow上面扒的（因为自己是个蒟蒻
		return;
	}
	if (flag) {
		ap.lrc.hide(); //自带播放暂停时显隐歌词，可以删
		document.getElementsByClassName("aplayer-icon-menu")[0].click();
		if (localStorage.getItem("musicIndex") != null) {
			musicIndex = localStorage.getItem("musicIndex");
			ap.list.switch(musicIndex);
			//歌曲可以本地储存下次访问体验更好
		}
		if (sessionStorage.getItem("musicTime") != null) {
			window.musict = sessionStorage.getItem("musicTime");
			ap.setMode(sessionStorage.getItem("musicMode"));
			if (sessionStorage.getItem("musicPaused") != "1") {
				ap.play();
			}
			// setTimeout(function(){
			//     ap.seek(window.musict); //seek炸了我很久，最后决定加个延时（本来要用canplay但是莫名鬼畜了）
			// },500);
			var g = true; //加个变量以防鬼畜但是不知道怎么节流qwq
			ap.on("canplay", function () {
				if (g) {
					ap.seek(window.musict);
					g = false; //如果不加oncanplay的话会seek失败就这原因炸很久
				}
			});
		} else {
			sessionStorage.setItem("musicPaused", 1);
			ap.setMode("mini"); //新版添加了保存展开状态功能
		}
		if (sessionStorage.getItem("musicVolume") != null) {
			ap.audio.volume = Number(sessionStorage.getItem("musicVolume"));
		}
		ap.on("pause", function () {
			sessionStorage.setItem("musicPaused", 1);
			ap.lrc.hide();
		}); //原基础上加了个检测暂停免得切换页面后爆零(bushi)（指社死）
		ap.on("play", function () {
			sessionStorage.setItem("musicPaused", 0);
			ap.lrc.show();
		}); //自带播放暂停时显隐歌词，后面那句可以删，上同
		ap.audio.onvolumechange = function () {
			sessionStorage.setItem("musicVolume", ap.audio.volume);
		}; //新版增加保存音量免得切换页面爆零（doge
		setInterval(function () {
			musicIndex = ap.list.index;
			musicTime = ap.audio.currentTime;
			localStorage.setItem("musicIndex", musicIndex);
			//保存播放进度
			sessionStorage.setItem("musicTime", musicTime);
			sessionStorage.setItem("musicMode", ap.mode);
			//保存展开状态
		}, 200); //节流，200ms精度感知不大qwq
	}
}
doStuff();

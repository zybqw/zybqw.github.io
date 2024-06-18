ap = null;
Object.defineProperty(document.querySelector("meting-js"), "aplayer", {
	set: function (aplayer) {
		ap = aplayer;
		ready();
	},
});

isRecover = false;
function ready() {
	ap.on("canplay", function () {
		if (!isRecover) {
			if (localStorage.getItem("musicIndex") != null) {
				musicIndex = localStorage.getItem("musicIndex");
				musicTime = localStorage.getItem("musicTime");
				if (ap.list.index != musicIndex) {
					ap.list.switch(musicIndex);
				} else {
					ap.seek(musicTime);
					ap.play();
					localStorage.clear();
					isRecover = true;
				}
			} else {
				isRecover = true;
			}
		}
	});
}

window.onbeforeunload = function (event) {
	if (!ap.audio.paused) {
		musicIndex = ap.list.index;
		musicTime = ap.audio.currentTime;
		localStorage.setItem("musicIndex", musicIndex);
		localStorage.setItem("musicTime", musicTime);
	}
};

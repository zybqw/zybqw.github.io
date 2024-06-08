const ap = new APlayer({
	container: document.getElementById("aplayer"),
	volume: 0.5,
	fixed: true,
	autoplay: true, //自动播放
	audio: [
		{
			name: "光与影的对白",
			artist: "洛天依",
			url: "http://music.163.com/song/media/outer/url?id=1963053471.mp3",
			cover: "http://p1.music.126.net/BgJWQTjYHjNkznwAw6VWjg==/109951167656373279.jpg?param=300x300",
			//lrc: "https://api.injahow.cn/meting/?type=lrc&id=1963053471",
		},
	],
});
//具体参数学习请看APlayer官方文档（已在学习链接中）
//简述一下关键：url填音乐的真实外部链接。cover就是封面图片真实链接。

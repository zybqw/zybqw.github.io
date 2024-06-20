// Keep a hold of the original console.log function
var HoldLog = console.log;

// Temporarily suppress console.log messages
console.log = function () {};

// Your custom logging setup
queueMicrotask(() => {
	const Log = function () {
		HoldLog.apply(console, arguments);
	};

	// Your logging messages
	const ascll = [
		`

--   █████╗ ██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
--  ██╔══██╗██║   ██║██╔══██╗╚══███╔╝██╔════╝╚██╗██╔╝
--  ███████║██║   ██║██████╔╝  ███╔╝ █████╗   ╚███╔╝ 
--  ██╔══██║██║   ██║██╔══██╗ ███╔╝  ██╔══╝   ██╔██╗ 
--  ██║  ██║╚██████╔╝██║  ██║███████╗███████╗██╔╝ ██╗
--  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
--                                                                                                                                                          
    `,
		"©2023 By Aurzex",
	];
	const ascll2 = [
		`NCC2-036`,
		`调用前置摄像头拍照成功，识别为【小笨蛋】.`,
		`Photo captured: `,
		`🤪`,
	];

	// Set up your logging calls
	setTimeout(
		Log.bind(
			console,
			`%c ${ascll[0]} %c ${ascll[1]}`,
			"color:#425AEF",
			"color:#425AEF"
		)
	);
	setTimeout(
		Log.bind(
			console,
			`%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}\n`,
			"color:white; background-color:#4fd953",
			"",
			"",
			"font-size:450%"
		)
	);
	setTimeout(
		Log.bind(
			console,
			"%c WELCOME %c 你好，小笨蛋.",
			"color:white; background-color:#4f90d9",
			""
		)
	);
	setTimeout(
		console.warn.bind(
			console,
			"%c ⚡ Powered by Aurzex %c 你正在访问 猫鱼a 的博客.",
			"color:white; background-color:#f0ad4e",
			""
		)
	);
	setTimeout(
		Log.bind(
			console,
			"%c W23-12 %c 你已打开控制台.",
			"color:white; background-color:#4f90d9",
			""
		)
	);

	// Restore the original console.log function
	console.log = HoldLog;
});

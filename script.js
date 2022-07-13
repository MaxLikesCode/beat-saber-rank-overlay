document.addEventListener("DOMContentLoaded", () => {
	let params = new URL(document.location).searchParams;
	let user_id = params.get("user-id");
	let opacity = params.get("opacity");
	let color = params.get("color");

	function minmax(value, min, max) {
		if (parseFloat(value) < min || isNaN(value)) return 0;
		else if (parseFloat(value) > max) return 100;
		else return value;
	}

	const background = document.getElementById("bg");
	if (opacity != undefined) {
		background.style.backgroundColor =
			"rgba(0, 0, 0, " + minmax(opacity, 0, 1) + ")";
	}

	const stats = document.getElementsByClassName("stat");
	if (color != undefined) {
		console.log(color);
		Array.from(stats).forEach((stat) => {
			stat.style.color = "#" + color;
		});
	}

	function parseStats() {
		$.ajax({
			url: "https://new.scoresaber.com/api/player/" + user_id + "/full",
			dataType: "json",
			type: "GET",
			cache: false,
			success: function (user) {
				$(user.playerInfo).each(function (index, value) {
					$("div#rank").html("#" + value.rank);
				});
				$(user.playerInfo).each(function (index, value) {
					$("div#countryRank").html("#" + value.countryRank);
				});
				$(user.playerInfo).each(function (index, value) {
					var num = value.pp;
					var n = num.toFixed(2);
					$("div#pp").html(n);
				});
			},
			error: function () {
				background.style.visibility = "Hidden";
				document.body.innerHTML = "";
				const error = document.createElement("h1");
				error.innerText = "Wrong User ID";
				document.body.append(error);
			},
		});
	}
	parseStats();
	window.setInterval(function () {
		parseStats();
	}, 60000);
});

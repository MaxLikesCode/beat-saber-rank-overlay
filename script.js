document.addEventListener("DOMContentLoaded", () => {
	let params = new URL(document.location).searchParams;
	let user_id = params.get("user-id");
	let bgcolor = params.get("bgcolor");
	let textcolor = params.get("textcolor");
	let statscolor = params.get("statscolor");
	let sabers = params.get("sabers");
	let country = params.get("country");

	const background = document.getElementById("bg");
	if (bgcolor != undefined) {
		background.style.backgroundColor = "#" + bgcolor;
	}

	const stats = document.getElementsByClassName("stat");
	if (statscolor != undefined) {
		Array.from(stats).forEach((stat) => {
			stat.style.color = "#" + statscolor;
		});
	}

	const sabers_images = document.getElementsByClassName("sabers");
	if (sabers != undefined) {
		if (sabers == 0) {
			Array.from(sabers_images).forEach((saber) => {
				saber.style.display = "none";
			});
		}
	}

	const txt = document.getElementsByClassName("txt");
	if (textcolor != undefined) {
		Array.from(txt).forEach((text_element) => {
			text_element.style.color = "#" + textcolor;
		});
	}

	const country_flag = document.getElementById("country-flag");
	async function fetch_flag() {
		if (country != undefined) {
			try {
				const response = await fetch(
					"https://flagcdn.com/256x192/" + country + ".png"
				);
				if (!response.ok) {
					console.log(response);
					throw new Error(`Error! status: ${response.status}`);
				}
				country_flag.src = response.url;
			} catch (err) {
				country_flag.style.display = "none";
			}
		}
	}
	fetch_flag();

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
					$("div#country-rank").html("#" + value.countryRank);
				});
				$(user.playerInfo).each(function (index, value) {
					var num = value.pp;
					var n = num.toFixed(2);
					$("div#pp").html(n);
				});
			},
			error: function () {
				background.style.display = "none";
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


var monstersConfig = {
	"monsters": {
		"Goblin": {
			"health": 100,
			"speed": 2,
			"abilities": ["fast"],
			"img": "goblin.jpg",
			"multiplier": 1.5
		},
		"Orc": {
			"health": 350,
			"speed": 1,
			"abilities": ["strong"],
			"img": "orc.jpg",
			"multiplier": 2.3
		},
		"Troll": {
			"health": 300,
			"speed": 1,
			"abilities": ["regenerate"],
			"img": "troll.jpg",
			"multiplier": 1.8
		},
		"Vampire": {
			"health": 150,
			"speed": 3,
			"abilities": ["shield"],
			"img": "vampire.jpg",
			"multiplier": 2.7
		},
		"Werewolf": {
			"health": 250,
			"speed": 2,
			"abilities": ["transform", "fast"],
			"img": "werewolf.jpg",
			"multiplier": 2.0
		},
		"Zombie": {
			"health": 120,
			"speed": 0.5,
			"abilities": ["infect"],
			"img": "zombie.jpg",
			"multiplier": 1.2
		},
		"Skeleton": {
			"health": 80,
			"speed": 1.5,
			"abilities": ["lowHp"],
			"img": "skeleton.jpg",
			"multiplier": 1.0
		}
	},
	"bosses": {
		"Dragon": {
			"health": 1000,
			"speed": 1,
			"abilities": ["fireBreath"],
			"img": "dragon.jpg",
			"multiplier": 2.5
		},
		"Giant": {
			"health": 1500,
			"speed": 0.5,
			"abilities": ["strong"],
			"img": "giant.jpg",
			"multiplier": 2.8
		},
		"Hydra": {
			"health": 2000,
			"speed": 0.8,
			"abilities": ["regenerateHeads", "poisonBreath"],
			"img": "hydra.jpg",
			"multiplier": 2.9
		}
	}
};

var game = {
	ticks: 0,
	_ticks: 0,
	_tick: 0,
	ticker: -1,
	run: [],
	fast: false,
	paused: true,

	wave: 0,
	_wave: 0,

	creeps: [],
	hp: 1,
	hpinc: 1.3,
	lives: 10,

	turrets: [],
	spent: 0,
	bossesKilled: 0,
	wavesCompleted: 0,
	totalDamageDealt: 0,
	kills: 0,
	cash: 500000, // Изменено на 100
	selection: false,

	tiles: {},

	tick: function () {
		// fps
		if (game.ticks - game._ticks === 60) {
			ui.fps.textContent = Math.round(60000 / (Date.now() - game._tick));
			game._tick = Date.now();
			game._ticks = game.ticks;
		}

		// wave
		if ((game.ticks - game._wave) % 30 === 29) {
			ui.timer.style.opacity = 1 - (((game.ticks - game._wave) / 60) * 0.05);
		}

		if (game._wave + 1200 === game.ticks) {
			ui.wave.textContent = ++game.wave;

			game.hpinc = { 10: 1.2, 25: 1.1, 50: 1.06, 100: 1.04, 150: 1.02, 200: 1.01 }[game.wave] || game.hpinc;
			game.hp *= game.hpinc;

			var numBosses = Math.floor(game.wave / 50) + 1;
			var isBossWave = game.wave % 10 === 0;

			game.hpinc = { 10: 1.2, 25: 1.1, 50: 1.06, 100: 1.04, 150: 1.02, 200: 1.01 }[game.wave] || game.hpinc;
			game.hp *= game.hpinc;

			if (isBossWave) {
				for (var i = 1; i <= numBosses; i++) {
					const boss = getRandomBoss();
					game.creeps.push({
						x: -(i * 20) - 10,
						y: game.map[0].y,
						offset: Math.rand(14),
						nextpoint: 0,
						speed: boss.speed,
						slowfor: 0,
						hp: boss.health + 12,
						_hp: boss.health + 12,
						burning: false,
						cash: game.wave * boss.multiplier * 10,
						isBoss: true,
						img: new Image(),
					});
					game.creeps[game.creeps.length - 1].img.src = `images/bosses/${boss.img}`;
				}
			} else {
				for (var i = 1; i <= 10; i++) {
					const monster = getRandomMonster();
					game.creeps.push({
						x: -(i * 20) - 10,
						y: game.map[0].y,
						offset: Math.rand(14),
						nextpoint: 0,
						speed: monster.speed,
						slowfor: 0,
						hp: monster.health + 10,
						_hp: monster.health + 10,
						burning: false,
						cash: Math.floor((game.wave + 50) * monster.multiplier),
						isBoss: false,
						img: new Image(),
					});
					game.creeps[game.creeps.length - 1].img.src = `images/monsters/${monster.img}`;
				}
			}

			game._wave = game.ticks;
		}

		// map
		canvas.fillStyle = "#000";
		canvas.fillRect(0, 0, 800, 500);

		var map = game.map.slice(1), start = game.map[0];
		canvas.lineWidth = 40;
		canvas.strokeStyle = "#00F";
		canvas.beginPath();
		canvas.moveTo(start.x, start.y);
		map.forEach(function (cur, i) {
			canvas.lineTo(cur.x, cur.y);
		});
		canvas.stroke();
		canvas.lineWidth = 30;
		canvas.strokeStyle = "#004";
		canvas.beginPath();
		canvas.moveTo(start.x, start.y);
		map.forEach(function (cur, i) {
			canvas.lineTo(cur.x, cur.y);
		});
		canvas.stroke();

		// creeps
		game.creeps = game.creeps.filter(function (creep, i, a) {
			var _hp = creep.hp;
			var burning = creep.burning;

			if (burning) {
				creep.hp -= 30;
			}

			if (creep.hp <= 0) {
				if (_hp > 0) {
					burning.kills++;
				}

				game.kills++;
				game.cash += creep.cash;

				ui.action.refresh();

				// Если убит босс, запускаем следующую волну врагов
				if (creep.isBoss) {
					for (var j = 1; j <= 10; j++) {
						const monster = getRandomMonster();
						game.creeps.push({
							x: -(j * 20) - 10,
							y: game.map[0].y,
							offset: Math.rand(14),
							nextpoint: 0,
							speed: monster.speed,
							slowfor: 0,
							hp: monster.health,
							_hp: monster.health,
							burning: false,
							cash: game.wave,
							isBoss: false,
							img: new Image(),
						});
						game.creeps[game.creeps.length - 1].img.src = `images/monsters/${monster.img}`;
					}
				}
				return false;
			} else if (creep.nextpoint === game.map.length) {
				ui.lives.textContent = --game.lives;

				if (!game.lives) {
					game.end();
				}
				return false;
			} else {
				if (--creep.slowfor <= 0) {
					creep.speed = 1;
				}

				var waypoint = game.map[creep.nextpoint];
				var hue = (creep.speed < 1 || burning) ? (burning ? (creep.speed < 1 ? 300 : 33) : 240) : 0;
				var sat = 100 * (creep.hp / creep._hp);

				if (Math.move(creep, { x: waypoint.x - 7 + creep.offset, y: waypoint.y - 7 + creep.offset }, creep.speed)) {
					creep.nextpoint++;
				}

				canvas.fillStyle = "hsl(" + hue + "," + sat + "%,50%)";
				canvas.fillRect(creep.x - 5, creep.y - 5, 10, 10);

				// Draw health bar
				canvas.fillStyle = "#FF0000";
				canvas.fillRect(creep.x - 5, creep.y + 6, 10, 2);
				canvas.fillStyle = "#00FF00";
				canvas.fillRect(creep.x - 5, creep.y + 6, 10 * (creep.hp / creep._hp), 2);

				// Draw BOSS label
				if (creep.isBoss) {
					canvas.fillStyle = "#FF0000";
					canvas.font = "bold 12px Arial";
					canvas.fillText("BOSS", creep.x - 10, creep.y - 10);
				}

				// Draw creep image
				canvas.drawImage(creep.img, creep.x - 10, creep.y - 10, 20, 20);

				return true;
			}
		});

		// turrets
		game.turrets.forEach(function (turret) {
			if (turret.lastshot + turret.rate <= game.ticks) {
				var creeps = game.creeps.filter(function (creep) {
					return Math.inRadius(creep, turret, turret.range);
				});

				if (creeps.length > 0) {
					turret.shoot(creeps);
					turret.lastshot = game.ticks;
				}
			}

			canvas.drawImage(turret.img, turret.x - 12.5, turret.y - 12.5);
		});

		var selection = game.selection;
		var turret = selection.turret;
		if (selection) {
			canvas.beginPath();
			canvas.fillStyle = selection.status === "selected" || selection.placeable ? "rgba(255, 255, 255, .3)" : "rgba(255, 0, 0, .3)";
			canvas.arc(turret.x, turret.y, turret.range, 0, Math.PI * 2, true);
			canvas.fill();

			canvas.drawImage(turret.img, turret.x - 12.5, turret.y - 12.5);
		}

		// finish
		game.run = game.run.filter(function (something) {
			return something.what() !== false && --something.until !== 0;
		});

		game.ticks++;
	},
	start: function () {
		game._ticks = game.ticks;
		game._tick = Date.now();
		game.ticker = window.setInterval(game.tick, 1000 / (game.fast ? 180 : 60));
		game.paused = false;
		game.tick();
	},
	pause: function () {
		window.clearInterval(game.ticker);
		game.paused = true;
	},
	end: function () {
		game.pause();
		document.removeEventListener("keydown", ui.handleshortcuts, false);
		window.removeEventListener("beforeunload", ui.handleunload, false);

		var map = game.map.name;
		var kills = game.kills;
		var spent = game.spent;
		var score = kills * spent;
		var text = score + " (" + kills + " kills, $" + spent + " spent)";
		var top = JSON.parse(localStorage.scores || '{"Loopy":[],"Backtrack":[],"Dash":[]}');
		var topmap = top[map];

		if (score > (topmap.length === 5 && topmap[4].score)) {
			topmap.splice(4, 1);
			topmap.push({ score: score, kills: kills, spent: spent, date: Date.now() });
			topmap.sort(function (a, b) { return b.score - a.score; });
			localStorage.scores = JSON.stringify(top);
			ui.action.scores();
		}

		var overlayContent = $("overlay-content");
		overlayContent.innerHTML = `
			<h1>Game Over</h1>
			<p>Score: ${score}</p>
			<p>Kills: ${kills}</p>
			<p>Spent: $${spent}</p>
			<button id="overlay-button"onclick="location.reload()">Play Again</button>
		`;

		$("pages-overlay").style.display = "block";
	}
};

function getRandomMonster() {
	const monsterNames = Object.keys(monstersConfig.monsters);
	const randomIndex = Math.floor(Math.random() * monsterNames.length);
	return monstersConfig.monsters[monsterNames[randomIndex]];
}

function getRandomBoss() {
	const bossNames = Object.keys(monstersConfig.bosses);
	const randomIndex = Math.floor(Math.random() * bossNames.length);
	return monstersConfig.bosses[bossNames[randomIndex]];
}

var Defs = {};


///////////////////////////////////////////////////////////////////////////////
// Maps
///////////////////////////////////////////////////////////////////////////////
Defs.maps = {
	Loopy: [
		{ x: 0, y: 70 },
		{ x: 730, y: 70 },
		{ x: 730, y: 430 },
		{ x: 70, y: 430 },
		{ x: 70, y: 160 },
		{ x: 640, y: 160 },
		{ x: 640, y: 340 },
		{ x: 160, y: 340 },
		{ x: 160, y: 250 },
		{ x: 800, y: 250 }
	],

	Backtrack: [
		{ x: 0, y: 170 },
		{ x: 120, y: 170 },
		{ x: 120, y: 415 },
		{ x: 460, y: 415 },
		{ x: 460, y: 185 },
		{ x: 230, y: 185 },
		{ x: 230, y: 70 },
		{ x: 345, y: 70 },
		{ x: 345, y: 300 },
		{ x: 700, y: 300 },
		{ x: 700, y: 0 }
	],

	Dash: [
		{ x: 0, y: 250 },
		{ x: 800, y: 250 }
	]
};


///////////////////////////////////////////////////////////////////////////////
// Turrets
///////////////////////////////////////////////////////////////////////////////
Defs.turrets = {};

Defs.turrets.Laser = {
	cost: 50,
	damage: 50,
	rate: 20,
	range: 100,
	upgrades: [
		{ damage: 150, rate: 18, range: 105, cost: 100 },
		{ damage: 250, rate: 16, range: 110, cost: 200 },
		{ damage: 350, rate: 14, range: 115, cost: 400 },
		{ damage: 450, rate: 12, range: 120, cost: 800 },
		{ damage: 550, rate: 10, range: 125, cost: 1600 },
		{ damage: 650, rate: 9, range: 130, cost: 3200 },
		{ damage: 750, rate: 8, range: 135, cost: 6400 },
		{ damage: 850, rate: 7, range: 140, cost: 12800 },
		{ damage: 1000, rate: 6, range: 145, cost: 25600 },
		{ damage: 1500, rate: 5, range: 150, cost: 51200 }
	],
	shoot: function (creeps) {
		var turret = this;
		var creep = creeps[0];
		var _hp = creep.hp;

		if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
			turret.kills++;
		}

		game.run.push({
			what: function () {
				canvas.lineCap = "round";
				canvas.lineWidth = 2;
				canvas.strokeStyle = "#FF0000";
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
			}, until: 6
		});
	}
};

// Добавляем новую турель "Turel"
Defs.turrets.Turel = {
	cost: 10000,
	damage: 800,
	rate: 50,
	range: 100,
	multipleBullets: false, // Default value
	upgrades: [
		{ damage: 1962, rate: 45, range: 105, cost: 1000 },
		{ damage: 2000, rate: 40, range: 110, cost: 12000 },
		{ damage: 2100, rate: 35, range: 115, cost: 12500 },
		{ damage: 3100, rate: 30, range: 120, cost: 13100 },
		{ damage: 3430, rate: 25, range: 125, cost: 14200 },
		{ damage: 4900, rate: 20, range: 130, cost: 17211 },
		{ damage: 5402, rate: 15, range: 135, cost: 19312 },
		{ damage: 6802, rate: 10, range: 140, cost: 21521 },
		{ damage: 9520, rate: 5, range: 145, cost: 29512 },
		{ damage: 25000, rate: 1, range: 150, cost: 35000 }
	],
	personalUpgrades: {
		multipleBullets: {
			cost: 10000,
			description: "Shoots multiple bullets at once."
		}
	},
	shoot: function (creeps) {
		var turret = this;
		var targets = turret.multipleBullets ? creeps.slice(0, 3) : [creeps[0]]; // Shoots multiple targets if upgraded

		targets.forEach(function (creep) {
			var _hp = creep.hp;

			if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
				turret.kills++;
			}

			game.run.push({
				what: function () {
					canvas.lineCap = "round";
					canvas.lineWidth = 2;
					canvas.strokeStyle = "#FF0000";
					canvas.beginPath();
					canvas.moveTo(turret.x, turret.y);
					canvas.lineTo(creep.x, creep.y);
					canvas.stroke();
				}, until: 6
			});
		});
	}
};

Defs.turrets.Missile = {
	cost: 150,
	damage: 80,
	rate: 60,
	range: 150,
	upgrades: [
		{ damage: 200, rate: 55, range: 155, cost: 600 },
		{ damage: 350, rate: 50, range: 160, cost: 1200 },
		{ damage: 500, rate: 45, range: 165, cost: 1800 },
		{ damage: 650, rate: 40, range: 170, cost: 2400 },
		{ damage: 800, rate: 35, range: 175, cost: 3000 },
		{ damage: 950, rate: 30, range: 180, cost: 3600 },
		{ damage: 1100, rate: 25, range: 185, cost: 4200 },
		{ damage: 1250, rate: 20, range: 190, cost: 4800 },
		{ damage: 1400, rate: 15, range: 195, cost: 5400 },
		{ damage: 1550, rate: 10, range: 200, cost: 6000 },
		{ damage: 1700, rate: 8, range: 205, cost: 6600 },
		{ damage: 1850, rate: 6, range: 210, cost: 7200 },
		{ damage: 1900, rate: 4, range: 215, cost: 7800 },
		{ damage: 1925, rate: 2, range: 220, cost: 8400 },
		{ damage: 1950, rate: 1, range: 225, cost: 9000 }
	],
	shoot: function (creeps) {
		var turret = this;
		var creep = creeps[0];
		var _hp = creep.hp;

		if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
			turret.kills++;
		}

		game.run.push({
			what: function () {
				canvas.lineCap = "round";
				canvas.lineWidth = 2;
				canvas.strokeStyle = "#FF0000";
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
			}, until: 6
		});
	}
};

Defs.turrets.Tazer = {
	cost: 170,
	damage: 62,
	rate: 40,
	range: 60,
	upgrades: [
		{ damage: 170, rate: 38, range: 62, cost: 714 },
		{ damage: 255, rate: 36, range: 64, cost: 1071 },
		{ damage: 340, rate: 34, range: 66, cost: 1428 },
		{ damage: 425, rate: 32, range: 68, cost: 1785 },
		{ damage: 510, rate: 30, range: 70, cost: 2142 },
		{ damage: 595, rate: 29, range: 75, cost: 2499 },
		{ damage: 680, rate: 28, range: 80, cost: 2856 },
		{ damage: 765, rate: 27, range: 85, cost: 3213 },
		{ damage: 850, rate: 26, range: 90, cost: 3570 },
		{ damage: 1020, rate: 24, range: 95, cost: 4284 },
		{ damage: 1190, rate: 22, range: 100, cost: 4998 },
		{ damage: 1360, rate: 20, range: 105, cost: 5712 },
		{ damage: 1530, rate: 4, range: 110, cost: 6426 },
		{ damage: 1700, rate: 3, range: 115, cost: 7140 },
		{ damage: 2040, rate: 1, range: 120, cost: 8925 }
	],
	shoot: function (creeps) {
		var creep = creeps.sort(function (a, b) { return b.speed - a.speed; })[0];
		var _hp = creep.hp;
		var turret = this;
		var speed = 0.9 - (turret.damage / 1000);
		var slowfor = 60 + turret.damage;

		if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
			turret.kills++;
		}

		creep.speed = creep.speed > speed ? speed : creep.speed;
		creep.slowfor = turret.levels.full ? Infinity : (creep.slowfor < slowfor ? slowfor : creep.slowfor);

		game.run.push({
			what: function () {
				canvas.lineCap = "round";
				canvas.lineWidth = 3;
				canvas.strokeStyle = "#00F";
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
				canvas.strokeStyle = "#FFF";
				canvas.lineWidth = 2;
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
			}, until: 6
		});
	}
};

Defs.turrets.Mortar = {
	cost: 250,
	damage: 90,
	rate: 120,
	range: 200,
	upgrades: [
		{ damage: 150, rate: 115, range: 205, cost: 570 },
		{ damage: 210, rate: 110, range: 210, cost: 855 },
		{ damage: 270, rate: 105, range: 215, cost: 1140 },
		{ damage: 330, rate: 100, range: 220, cost: 1425 },
		{ damage: 390, rate: 96, range: 225, cost: 1710 },
		{ damage: 450, rate: 92, range: 230, cost: 1995 },
		{ damage: 510, rate: 88, range: 235, cost: 2280 },
		{ damage: 570, rate: 84, range: 240, cost: 2565 },
		{ damage: 630, rate: 80, range: 245, cost: 2850 },
		{ damage: 690, rate: 75, range: 250, cost: 3135 },
		{ damage: 750, rate: 70, range: 255, cost: 3420 },
		{ damage: 1000, rate: 65, range: 260, cost: 3800 },
		{ damage: 1500, rate: 60, range: 265, cost: 4750 },
		{ damage: 2000, rate: 55, range: 270, cost: 5700 },
		{ damage: 2500, rate: 50, range: 275, cost: 6650 }
	],
	shoot: function (creeps) {
		var creep = creeps[0];
		var turret = this;
		var target = { x: creep.x, y: creep.y };
		var shell = { x: turret.x, y: turret.y };
		var radius = 25 + (turret.damage / 150);

		game.run.push({
			what: function () {
				if (Math.move(shell, target, 1.5)) {
					game.creeps.forEach(function (creep) {
						if (Math.inRadius(creep, target, radius)) {
							var _hp = creep.hp;

							if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
								turret.kills++;
							}

							if (turret.levels.full && !creep.burning) {
								creep.burning = turret;
							}
						}
					});

					game.run.push({
						what: function () {
							canvas.fillStyle = "#FF0";
							canvas.beginPath();
							canvas.moveTo(target.x, target.y);
							canvas.arc(target.x, target.y, radius, 0, Math.PI * 2, true);
							canvas.fill();
						}, until: 3
					});

					return false;
				} else {
					canvas.fillStyle = "#808080";
					canvas.fillRect(shell.x - 3, shell.y - 3, 6, 6);
				}
			}, until: Infinity
		});
	}
};

Defs.turrets.Medic = {
	cost: 30,
	damage: 0,
	rate: 40,
	range: 100,
	hp: 100,
	upgrades: [
		{ damage: 0, rate: 38, range: 105, cost: 10 },
		{ damage: 0, rate: 36, range: 110, cost: 20 },
		{ damage: 0, rate: 34, range: 115, cost: 30 },
		{ damage: 0, rate: 32, range: 120, cost: 40 },
		{ damage: 0, rate: 30, range: 125, cost: 50 },
		{ damage: 0, rate: 28, range: 130, cost: 60 },
		{ damage: 0, rate: 26, range: 135, cost: 70 },
		{ damage: 0, rate: 24, range: 140, cost: 80 },
		{ damage: 0, rate: 22, range: 145, cost: 90 },
		{ damage: 0, rate: 20, range: 150, cost: 100 }
	],
	shoot: function (creeps) {
		var creep = creeps.sort(function (a, b) { return b.speed - a.speed; })[0];
		var _hp = creep.hp;
		var turret = this;
		var speed = 0.9 - (turret.damage / 1000);
		var slowfor = 60 + turret.damage;

		if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
			turret.kills++;
		}

		creep.speed = creep.speed > speed ? speed : creep.speed;
		creep.slowfor = turret.levels.full ? Infinity : (creep.slowfor < slowfor ? slowfor : creep.slowfor);

		game.run.push({
			what: function () {
				canvas.lineCap = "round";
				canvas.lineWidth = 3;
				canvas.strokeStyle = "#00F";
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
				canvas.strokeStyle = "#FFF";
				canvas.lineWidth = 2;
				canvas.beginPath();
				canvas.moveTo(turret.x, turret.y);
				canvas.lineTo(creep.x, creep.y);
				canvas.stroke();
			}, until: 6
		});
	}
};

Defs.turrets.Rocketlauncher = {
	cost: 300,
	damage: 120,
	rate: 50,
	range: 150,
	hp: 100,
	upgrades: [
		{ damage: 400, rate: 48, range: 155, cost: 756 },
		{ damage: 680, rate: 46, range: 160, cost: 1512 },
		{ damage: 960, rate: 44, range: 165, cost: 2268 },
		{ damage: 1240, rate: 42, range: 170, cost: 3024 },
		{ damage: 1520, rate: 40, range: 175, cost: 3780 },
		{ damage: 1800, rate: 38, range: 180, cost: 4536 },
		{ damage: 2080, rate: 36, range: 185, cost: 5292 },
		{ damage: 2360, rate: 34, range: 190, cost: 6048 },
		{ damage: 2640, rate: 32, range: 195, cost: 6804 },
		{ damage: 2920, rate: 30, range: 200, cost: 7560 },
		{ damage: 3200, rate: 28, range: 205, cost: 8316 },
		{ damage: 3480, rate: 26, range: 210, cost: 9072 },
		{ damage: 3760, rate: 24, range: 215, cost: 9828 },
		{ damage: 4040, rate: 22, range: 220, cost: 10584 },
		{ damage: 4320, rate: 20, range: 225, cost: 11340 },
		{ damage: 4600, rate: 18, range: 230, cost: 12096 },
		{ damage: 4880, rate: 16, range: 235, cost: 12852 },
		{ damage: 5160, rate: 14, range: 240, cost: 13608 },
		{ damage: 5440, rate: 12, range: 245, cost: 14364 },
		{ damage: 5720, rate: 10, range: 250, cost: 15120 },
		{ damage: 5800, rate: 8, range: 255, cost: 18900 }
	],
	shoot: function (creeps) {
		var turret = this;
		var creep = creeps[0];
		var target = { x: creep.x, y: creep.y };
		var rocket = { x: turret.x, y: turret.y };
		var explosionRadius = 25;

		game.run.push({
			what: function () {
				if (Math.move(rocket, target, 3)) {
					game.creeps.forEach(function (creep) {
						if (Math.inRadius(creep, target, explosionRadius)) {
							var _hp = creep.hp;

							if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
								turret.kills++;
							}
						}
					});

					game.run.push({
						what: function () {
							canvas.fillStyle = "#FFA500";
							canvas.beginPath();
							canvas.arc(target.x, target.y, explosionRadius, 0, Math.PI * 2, true);
							canvas.fill();
						}, until: 3
					});

					return false;
				} else {
					canvas.fillStyle = "#808080";
					canvas.fillRect(rocket.x - 3, rocket.y - 3, 6, 6);
				}
			}, until: Infinity
		});
	}
};

Defs.turrets.Sniper = {
	cost: 60,
	damage: 90,
	rate: 80,
	range: 200,
	hp: 100,
	upgrades: [
		{ damage: 120, rate: 75, range: 550, cost: 150 },
		{ damage: 150, rate: 70, range: 725, cost: 200 },
		{ damage: 180, rate: 65, range: 950, cost: 250 },
		{ damage: 210, rate: 60, range: 950, cost: 300 },
		{ damage: 240, rate: 55, range: 950, cost: 360 },
		{ damage: 270, rate: 50, range: 950, cost: 420 },
		{ damage: 300, rate: 45, range: 950, cost: 510 },
		{ damage: 350, rate: 40, range: 950, cost: 601 },
		{ damage: 400, rate: 35, range: 950, cost: 900 },
		{ damage: 450, rate: 30, range: 950, cost: 1200 },
		{ damage: 500, rate: 28, range: 950, cost: 1500 },
		{ damage: 550, rate: 26, range: 950, cost: 1800 },
		{ damage: 600, rate: 24, range: 950, cost: 2100 },
		{ damage: 700, rate: 22, range: 950, cost: 2500 },
		{ damage: 800, rate: 20, range: 950, cost: 3000 },
		{ damage: 900, rate: 18, range: 950, cost: 3500 },
		{ damage: 1000, rate: 16, range: 950, cost: 4000 },
		{ damage: 1200, rate: 14, range: 950, cost: 5000 },
		{ damage: 1500, rate: 12, range: 950, cost: 6000 },
		{ damage: 1800, rate: 10, range: 950, cost: 7000 },
		{ damage: 2200, rate: 8, range: 950, cost: 9000 },
		{ damage: 2600, rate: 6, range: 950, cost: 12000 },
		{ damage: 3000, rate: 4, range: 950, cost: 15000 },
		{ damage: 4000, rate: 2, range: 950, cost: 20000 },
		{ damage: 6000, rate: 1, range: 950, cost: 45000 }
	],
	shoot: function (creeps) {
		var turret = this;
		var targets = [creeps[0]];
		var _hp;
		var originalDamage = turret.damage;

		if (Math.random() < 0.15) {
			var numTargets = Math.floor(Math.random() * 5) + 1;
			targets = creeps.slice(0, numTargets);
			turret.damage += originalDamage * 19;
		}

		targets.forEach(function (creep) {
			_hp = creep.hp;

			if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
				turret.kills++;
			}

			game.run.push({
				what: function () {
					canvas.lineCap = "round";
					canvas.lineWidth = 2;
					canvas.strokeStyle = "#FF0000";
					canvas.beginPath();
					canvas.moveTo(turret.x, turret.y);
					canvas.lineTo(creep.x, creep.y);
					canvas.stroke();
				}, until: 6
			});
		});

		turret.damage = originalDamage;
	}
};

Defs.turrets.Engineer = {
	cost: 300,
	damage: 20,
	rate: 50,
	range: 150,
	hp: 100,
	upgrades: [
		{ damage: 50, rate: 48, range: 155, cost: 1000 },
		{ damage: 80, rate: 46, range: 160, cost: 2000 },
		{ damage: 110, rate: 44, range: 165, cost: 4000 },
		{ damage: 140, rate: 42, range: 170, cost: 8000 },
		{ damage: 170, rate: 40, range: 175, cost: 12000 },
		{ damage: 200, rate: 38, range: 180, cost: 16000 },
		{ damage: 250, rate: 36, range: 185, cost: 20000 },
		{ damage: 300, rate: 34, range: 190, cost: 24000 },
		{ damage: 350, rate: 32, range: 195, cost: 28000 },
		{ damage: 400, rate: 30, range: 200, cost: 32000 },
		{ damage: 500, rate: 28, range: 205, cost: 36000 },
		{ damage: 600, rate: 26, range: 210, cost: 40000 },
		{ damage: 700, rate: 24, range: 215, cost: 44000 },
		{ damage: 800, rate: 22, range: 220, cost: 48000 },
		{ damage: 900, rate: 20, range: 225, cost: 52000 },
		{ damage: 1000, rate: 18, range: 230, cost: 56000 },
		{ damage: 1100, rate: 16, range: 235, cost: 60000 },
		{ damage: 1200, rate: 14, range: 240, cost: 64000 },
		{ damage: 1300, rate: 12, range: 245, cost: 68000 },
		{ damage: 1400, rate: 10, range: 250, cost: 72000 },
		{ damage: 1500, rate: 1, range: 255, cost: 75000 }
	],
	shoot: function (creeps) {
		var turret = this;
		var creep = creeps[0];
		var target = { x: creep.x, y: creep.y };
		var rocket = { x: turret.x, y: turret.y };
		var explosionRadius = 15;
		var baseDamage = turret.damage;

		// Check for nearby Engineer turrets and apply damage bonus
		var nearbyEngineers = game.turrets.filter(function (t) {
			return t.type === 'Engineer' && Math.inRadius(t, turret, turret.range);
		});
		var damageBonus = Math.pow(1.2, nearbyEngineers.length - 1);
		turret.damage *= damageBonus;

		game.run.push({
			what: function () {
				if (Math.move(rocket, target, 2)) {
					game.creeps.forEach(function (creep) {
						if (Math.inRadius(creep, target, explosionRadius)) {
							var _hp = creep.hp;

							if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
								turret.kills++;
							}
						}
					});

					game.run.push({
						what: function () {
							canvas.fillStyle = "#FFA500";
							canvas.beginPath();
							canvas.arc(target.x, target.y, explosionRadius, 0, Math.PI * 2, true);
							canvas.fill();
						}, until: 3
					});

					return false;
				} else {
					canvas.fillStyle = "#808080";
					canvas.fillRect(rocket.x - 3, rocket.y - 3, 6, 6);
				}
			}, until: Infinity
		});

		// Reset damage to base value after shooting
		turret.damage = baseDamage;
	}
};

// console.log(Defs.turrets)

ui.action.upgrade = function (stat) {
	var turret = game.selection.turret;
	var levels = turret.levels;
	var cost;

	if (stat === 'multipleBullets') {
		if (turret.type === 'Turel' && !turret.multipleBullets) {
			cost = Defs.turrets.Turret.personalUpgrades.multipleBullets.cost;
			if (game.cash >= cost) {
				game.cash -= cost;
				turret.multipleBullets = true;
				console.log("Turret upgraded with Multiple Bullets!");
				ui.action.refresh();
			} else {
				console.log("Not enough money for Multiple Bullets upgrade.");
			}
		}
		return;
	}

	var level = levels[stat];
	if (level === undefined || level >= turret.upgrades.length) {
		return; // If level is undefined or exceeds the number of upgrades, exit
	}
	cost = turret.upgrades[level].cost; // Use personal prices for other upgrades

	if (game.selection.status === "selected" && cost && game.cash >= cost) {
		levels[stat]++;
		turret[stat] = turret.upgrades[levels[stat] - 1][stat];
		levels.full = levels.damage === 10 && levels.rate === 10 && levels.range === 10;
		turret.cost += cost;
		game.cash -= cost;
		game.spent += cost;
		ui.action.refresh();
	}
};
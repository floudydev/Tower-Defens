# Tower Defense Game 🏰💥

Welcome to the **Tower Defense Game**! This project is a classic tower defense game where players build and upgrade turrets to defend against waves of creeps and bosses. 🌊👹

## Table of Contents 📚

- [Introduction](#Introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Game Mechanics](#game-mechanics)
  - [Monsters](#monsters)
  - [Bosses](#bosses)
  - [Turrets](#turrets)
- [Controls](#controls)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction 🙊

This project is based on an open-source tower defense game. I have made significant changes to the mechanics and other aspects of the game to enhance the gameplay experience. Below, you will find detailed information about the game, including the mechanics, controls, and future updates.

## Installation ⚙️

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/tower-defense-game.git
    ```

2. Navigate to the project directory:
    ```bash
    cd tower-defense-game
    ```

3. Open [index.html](http://_vscodecontentref_/0) in your preferred web browser. 🖥️

## Usage 🎮

Once the game is loaded, you can start playing by selecting turrets and placing them on the map. Defend against waves of creeps and bosses by strategically placing and upgrading your turrets. 🛡️💣

## Game Mechanics 🛠️

### Monsters 👹

Monsters are the primary enemies in the game. Each monster has unique attributes such as health, speed, abilities, and a multiplier for the cash reward. The monsters are defined in the [monstersConfig.json](http://_vscodecontentref_/1) file.

- **Goblin**
  - Health: 100
  - Speed: 2
  - Abilities: Fast
  - Multiplier: 1.5
  
- **Orc**
  - Health: 350
  - Speed: 1
  - Abilities: Strong
  - Multiplier: 2.3

- **Troll**
  - Health: 300
  - Speed: 1
  - Abilities: Regenerate
  - Multiplier: 1.8

- **Vampire**
  - Health: 150
  - Speed: 3
  - Abilities: Shield
  - Multiplier: 2.7

- **Werewolf**
  - Health: 250
  - Speed: 2
  - Abilities: Transform, Fast
  - Multiplier: 2.0

- **Zombie**
  - Health: 120
  - Speed: 0.5
  - Abilities: Infect
  - Multiplier: 1.2

- **Skeleton**
  - Health: 80
  - Speed: 1.5
  - Abilities: LowHp
  - Multiplier: 1.0

### Bosses 👑

Bosses are stronger enemies that appear at specific waves. They have higher health and unique abilities. The bosses are also defined in the [monstersConfig.json](http://_vscodecontentref_/2) file.

- **Dragon**
  - Health: 1000
  - Speed: 1
  - Abilities: FireBreath
  - Multiplier: 2.5

- **Giant**
  - Health: 1500
  - Speed: 0.5
  - Abilities: Strong
  - Multiplier: 2.8

- **Hydra**
  - Health: 2000
  - Speed: 0.8
  - Abilities: RegenerateHeads, PoisonBreath
  - Multiplier: 2.9

### Turrets 🛠️

Turrets are your primary defense against the creeps. Each turret has unique attributes like cost, damage, rate of fire, and range. Turrets can be upgraded to improve their attributes. The turrets are defined in the `defs.js` file.

- **Laser**
  - Cost: 50
  - Damage: 50
  - Rate: 20
  - Range: 100
  - Upgrades: 10 levels
  - Mechanic: Shoots a laser beam at the target, dealing instant damage.
  
- **Missile**
  - Cost: 150
  - Damage: 80
  - Rate: 60
  - Range: 150
  - Upgrades: 15 levels
  - Mechanic: Fires a missile that explodes, dealing area damage.
  
- **Tazer**
  - Cost: 170
  - Damage: 62
  - Rate: 40
  - Range: 60
  - Upgrades: 15 levels
  - Mechanic: Shoots an electric bolt that slows down the target.
  
- **Mortar**
  - Cost: 250
  - Damage: 90
  - Rate: 120
  - Range: 200
  - Upgrades: 15 levels
  - Mechanic: Fires a mortar shell that explodes on impact, dealing area damage.
  
- **Turel**
  - Cost: 10000
  - Damage: 800
  - Rate: 50
  - Range: 100
  - Upgrades: 10 levels
  - Mechanic: Shoots multiple bullets at once if upgraded with the "Multiple Bullets" upgrade.
  
- **Medic**
  - Cost: 30
  - Damage: 0
  - Rate: 40
  - Range: 100
  - Upgrades: 10 levels
  - Mechanic: Heals nearby turrets.

- **Rocketlauncher**
  - Cost: 300
  - Damage: 120
  - Rate: 50
  - Range: 150
  - Upgrades: 20 levels
  - Mechanic: Fires a rocket that explodes on impact, dealing area damage.
  
- **Sniper**
  - Cost: 60
  - Damage: 90
  - Rate: 80
  - Range: 200
  - Upgrades: 25 levels
  - Mechanic: Shoots a high-damage bullet at a single target, with a chance to hit multiple targets.

- **Engineer**
  - Cost: 300
  - Damage: 20
  - Rate: 50
  - Range: 150
  - Upgrades: 20 levels
  - Mechanic: Provides a damage bonus to nearby turrets.

## Controls ⌨️

- **1**: Upgrade damage
- **2**: Upgrade rate
- **3**: Upgrade range
- **4**: Move turret
- **Shift + 8**: Sell turret
- **=**: Fast forward
- **Esc**: Deselect / Cancel / Pause
- **Enter**: Send wave

## Project Structure 📂

- [images](http://_vscodecontentref_/3): Contains images for bosses, monsters, and turrets.
- [index.css](http://_vscodecontentref_/4): Global styles for the project.
- [index.html](http://_vscodecontentref_/5): Main HTML file for the game.
- [monstersConfig.json](http://_vscodecontentref_/6): Configuration file for monsters and bosses.
- [scripts](http://_vscodecontentref_/7): Contains JavaScript files for game logic, UI, and utilities.
- [styles](http://_vscodecontentref_/8): Contains additional CSS files.

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository and create a pull request with your changes. Make sure to follow the coding standards and test your changes thoroughly before submitting. 🛠️

## License 📄

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Future Updates Checklist 📋

- [ ] Add new types of turrets with unique abilities.
- [ ] Introduce new monsters with different mechanics.
- [ ] Implement a leveling system for players.
- [ ] Add multiplayer support.
- [ ] Create new maps with varying difficulties.
- [ ] Enhance the UI for better user experience.
- [ ] Add sound effects and background music.
- [ ] Implement achievements and leaderboards.
- [ ] Optimize performance for smoother gameplay.

Enjoy the game! 🎮👾 Let the tower defense begin!
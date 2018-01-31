$(document).ready(function () {
  var main = {
    rooms: {
      one: "You, a young adventurer, have come to this cave seeking glory and fortune. Your mission is to eliminate the orc tribe that has been attacking travelers using this cave as a base. To the NORTH is a solid oak door that appears to lead further into the cave. To the SOUTH is the mouth of the cave from which you entered.",
      two: "After opening the door, you seem to have entered an old mine shaft. To your horror, a giant bat flies down from the stalactites above and attacks you! You enter combat!"
    },
    combatState: false,
    playerStats: {
      hp: 100,
      maxHp: 100,
      attack: 5
    },
    enemyStats: {
      bat: {
        name: "Bat",
        hp: 20,
        maxHp: 20,
        attack: 3
      },
      skeleton: {
        name: "Skeleton",
        hp: 30,
        maxHp: 30,
        attack: 7
      },
      orc: {
        name: "Orc",
        hp: 50,
        maxHp: 50,
        attack: 10
      },
      orcChief: {
        name: "Orc Chief",
        hp: 75,
        maxHp: 75,
        attack: 15
      }
    },
    inventory: {
      potions: 5
    }
  };

  var currentEnemy = "";
  var currentRoom = "one";
  console.log(currentRoom);
  function roomText() {
    $("#display-text").html(main.rooms[currentRoom]);
  };

  roomText();

  $("#input-btn").on('click', function () {
    var inputString = $("#input").val();
    inputString = inputString.toLowerCase().split(" ");
    if (main.combatState == false) {
      nonCombat(inputString);
    } else if (main.combatState == true) {
      combat(inputString, main.enemyStats[currentEnemy]);
    }
  });

  function nonCombat(input) {
    if (input[0] == "go") {
      go(input[1]);
    } else if (input[0] == "repeat") {
      roomText();
    } else {
      invalid();
    }
  }

  function combat(input, enemy) {
    enemyStatDisplay(enemy);
    if (input == "attack") {
      enemy.hp -= main.playerStats.attack;
      main.playerStats.hp -= enemy.attack;
      $("#display-text").html("You attack the " + enemy.name + " for " + main.playerStats.attack + " damage.<br> The " + enemy.name + " hits you for " + enemy.attack + " damage.");
      playerStatDisplay();
      enemyStatDisplay(enemy);
      if (enemy.hp <= 0) {
        $("#display-text").append("<br>You win!");
      }
    }
  }

  function go(direction) {
    if (currentRoom == "one") {
      switch (direction) {
        case "north":
          currentRoom = "two";
          roomText();
          currentEnemy = "bat";
          main.combatState = true;
          enemyStatDisplay(main.enemyStats[currentEnemy]);
          break;
        case "south":
          $("#display-text").text("You exit the cave and go back to your mommy like a coward. Try again?");
          break;
        case "east":
          $("#display-text").text("There is a wall to the east.");
          break;
        case "west":
          $("#display-text").text("There is a wall to the west.");
          break;
        default:
          $("#display-text").text("Please enter a valid direction to go in.");
      }
    }
  };

  function playerStatDisplay() {
    $("#playerHp").text("HP: " + main.playerStats.hp + ' / ' + main.playerStats.maxHp);

    $("#playerAtk").text("ATK: " + main.playerStats.attack);
  };

  playerStatDisplay();

  function enemyStatDisplay(enemy) {
    $("#enemyName").text(enemy.name);
    $("#enemyHp").text("HP: " + enemy.hp + ' / ' + enemy.maxHp);
    $("#enemyAtk").text("ATK: " + enemy.attack);
  };

  function invalid() {
    $("#display-text").text("Please enter a valid input.");
  };
});
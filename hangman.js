let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "M", "O", "P",
"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
let word_dict = {"Comittee": "a group of people appointed for a specific function, typically consisting of members of a larger group.",
                 "Tattoo": "a form of body modification where a design is made by inserting ink",
                 "Electricity" : "the set of physical phenomena associated with the presence and motion of electric charge.",
                 "Amendment": "a minor change or addition designed to improve a text, piece of legislation, etc."
                
                
                }
let guesses = []
let counter = 0
let space = 0
let lives = 7

function startGame (){
    document.getElementById("start").style.display = "none"
    document.getElementById("restart").style.display = "initial"
    let keys = Object.keys(word_dict)
    let word = keys[Math.floor(Math.random() * keys.length)]
    let definition = word_dict[word]
    document.getElementById("lives").innerHTML = "You have " + lives + " lives";
    generateButtons(word)
    getWord(word, definition)
}

function generateButtons (word) {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');
    letters.id = 'alphabet';

    for (let i = 0; i < alphabet.length; i++) {
        list = document.createElement('li');
        list.id = 'letter';
        list.class = 'all'
        list.innerHTML = alphabet[i];
        check(word)
        myButtons.appendChild(letters);
        letters.appendChild(list);
    }
}


// Create geusses ul
function getWord (word, definition) {
    wordHolder = document.getElementById('hidden');
    correct = document.createElement('ul');

    for (let i = 0; i < word.length; i++) {
        correct.id = "myWord";
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
            guess.innerHTML = "-";
            space = 1;
        } 
        else {
            guess.innerHTML = "_";
        }

    guesses.push(guess);
    wordHolder.appendChild(correct);
    document.getElementById("definition").innerHTML = "definition: " + definition
    correct.appendChild(guess);
    }
}


// OnClick Function
check = function (word) {
    list.onclick = function () {
        let geuss = (this.innerHTML);
        let j = 0
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
            if (word[i].toLowerCase() === geuss.toLowerCase()) {
            guesses[i].innerHTML = geuss;
            counter += 1;
            j += 1
            } 
        }
        if (j === 0) {
            lives -= 1;
            update();
        } 
        else {
            update();
        }
    }
}

// Show lives
function update() {
    document.getElementById("lives").innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
        document.getElementById("lives").innerHTML = "Game Over";
      //Change to game over screen
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        document.getElementById("lives").innerHTML = "You Win!";
      }
    }
  }

function restartGame() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    guesses = []
    counter = 0
    space = 0
    lives = 7
    startGame()
}

document.getElementById("start").onclick = startGame
document.getElementById("restart").onclick = restartGame
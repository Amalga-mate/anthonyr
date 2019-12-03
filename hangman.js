// Letters for the game to create buttons & change lines
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "M", "O", "P",
"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]

// Word dictionary to get words & dictionarys from
let word_dict = {"Comittee": "a group of people appointed for a specific function, typically consisting of members of a larger group.",
                 "Tattoo": "a form of body modification where a design is made by inserting ink",
                 "Electricity" : "the set of physical phenomena associated with the presence and motion of electric charge.",
                 "Amendment": "a minor change or addition designed to improve a text, piece of legislation, etc.",
                 "Computer": "an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program.",
                 "Programming": "The process of developing and implementing various sets of instructions to enable a computer to do a certain task.",
                 "Variable": "an element, feature, or factor that is liable to vary or change.",
                 "sarcasm": "the use of irony to mock or convey contempt.",
                 "Philippines": "an archipelago consisting of the 3 island groups Luzon, Visayas, and Mindanao",
                 "Javascript": "an object-oriented computer programming language commonly used to create interactive effects within web browsers."
                }
let hangman_life = new Array();
hangman_life[0] = "images/im1.png";
hangman_life[1] = "images/im7.png";
hangman_life[2] = "images/im6.png";
hangman_life[3] = "images/im5.png";
hangman_life[4] = "images/im4.png";
hangman_life[5] = "images/im3.png";
hangman_life[6] = "images/im2.png"; 
                

// Global Counters and word to guess
let guesses = []
let counter = 0
let space = 0
let lives = 7


// 1: Display or not display each object
// 2: Get word and definition
// 3: Update Game
// 4: Create Buttons 
// 5: Create Lines
function startGame (){
    document.getElementById("start").style.display = "none"
    document.getElementById("title").style.display = "none"
    document.getElementById("winner").style.display = "none"
    document.getElementById("loser").style.display = "none"
    document.getElementById("again").style.display = "none"
    document.getElementById("p_ag").style.display = "none"
    document.getElementById("p_win").style.display = "none"
    


    document.getElementById("restart").style.display = "initial"
    document.getElementById("lives").style.display = "block"
    document.getElementById("definition").style.display = "block"
    document.getElementById("life_img").style.display = "initial"

    let keys = Object.keys(word_dict)
    let word = keys[Math.floor(Math.random() * keys.length)]
    let definition = word_dict[word]
    
    update()
    generateButtons(word)
    getWord(word, definition)
}


// Create buttons, attach onClick function to them
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


// Create lines for guessing
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
    document.getElementById("definition").innerHTML = "DEFINITION : " + definition
    correct.appendChild(guess);
    }
}


// Onclick, check if letter in word.
// If Yes, use update function
// If No, lose a life, then use update function
function check(word) {
    list.onclick = function () {
        let geuss = (this.innerHTML);
        let j = 0;
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
            document.getElementById("life_img").src = hangman_life[lives];
        } 
        else {
            update();
        }
    }
}


// Update Lives & Check if player won or lost
function update() {
    document.getElementById("lives").innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
        loser();
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        winner()
      }
    }
  }


// Display Win Screen & Play Again button
function winner(){
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    
    document.getElementById("lives").style.display = "none"
    document.getElementById("definition").style.display = "none"
    document.getElementById("restart").style.display = "none"
    document.getElementById("life_img").style.display = "none"

    document.getElementById("winner").style.display = "initial"
    document.getElementById("p_win").style.display = "initial"
    document.getElementById("again").style.display = "initial"
}


// Display Lose screen & play again button
function loser(){
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    
    document.getElementById("lives").style.display = "none"
    document.getElementById("definition").style.display = "none"
    document.getElementById("restart").style.display = "none"
    document.getElementById("life_img").style.display = "none"

    document.getElementById("loser").style.display = "initial"
    document.getElementById("p_ag").style.display = "initial"
    document.getElementById("again").style.display = "initial"
    
}


// Essentially modified restart button
function playAgain() {
    guesses = []
    counter = 0
    space = 0
    lives = 7
    document.getElementById("life_img").src = hangman_life[0];
    startGame()
    
}


// Restart Game while ingame
function restartGame() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    guesses = []
    counter = 0
    space = 0
    lives = 7
    document.getElementById("life_img").src = hangman_life[0];
    startGame()
    
}


// onClick functions for game states (start, restart, play again)
document.getElementById("start").onclick = startGame
document.getElementById("restart").onclick = restartGame
document.getElementById("again").onclick = playAgain

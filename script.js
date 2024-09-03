const display = document.querySelector(".letter-line-container");
const keyboardContainer = document.querySelector(".keyboard-buttons-container");
const hangmanimg = document.querySelector("#hangman-img");
let currentWord;
let guessedLetters = new Set(); // To keep track of guessed letters
let counter = 0;
const maxGuesses = 6;

document.addEventListener("DOMContentLoaded", () => {
    const getRandomWord = () => {
        const { word, hint } = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
        console.log("Selected word:", word);
        currentWord = word.toLowerCase();
        console.log("Hint:", hint);
        document.querySelector("#hint h1").innerText = `Hint: ${hint}`;
        display.innerHTML = currentWord.split("").map(() => `<span class="letter">_</span>`).join(" ");
        counter = 0;
        guessedLetters.clear(); // Clear guessed letters
        hangmanimg.src = `assets/hangman-${counter}.svg`; // Reset hangman image
        updateCounter();
    };

    const initGame = (button, letterClicked) => {
        if (guessedLetters.has(letterClicked)) {
            return; // Ignore already guessed letters
        }
        
        guessedLetters.add(letterClicked); // Add letter to guessed letters

        console.log(button, letterClicked);

        if (currentWord && currentWord.includes(letterClicked)) {
            console.log("correct");

            [...currentWord].forEach((letter, index) => {
                if (letter === letterClicked) {
                    display.querySelectorAll(".letter")[index].innerText = letter;
                    display.querySelectorAll(".letter")[index].classList.add("guessed");
                }
            });

            // Check if the word is fully guessed
            const allGuessed = [...currentWord].every(letter => guessedLetters.has(letter));
            if (allGuessed) {
                alert("Congratulations! You've guessed the word!");
                getRandomWord(); // Start a new game
            }

        } else {
            counter++;
            updateCounter();
            hangmanimg.src = `assets/hangman-${counter}.svg`; // Update hangman image

            // Check if the hangman is complete
            if (counter >= maxGuesses) {
                alert("Game Over! You've reached the maximum number of incorrect guesses. The correct word was: " + currentWord);
                getRandomWord(); // Reset the game
            }
        }
    };

    const updateCounter = () => {
        document.querySelector("#guess-counter h1").innerText = `Incorrect Guesses: ${counter}/${maxGuesses}`;
    };

    // Generate keyboard buttons for letters a-z
    for (let index = 97; index <= 122; index++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(index);
        keyboardContainer.appendChild(button);
        button.addEventListener("click", e => initGame(e.target, e.target.textContent.toLowerCase()));
    }

    document.querySelector(".button1").addEventListener("click", getRandomWord);
});

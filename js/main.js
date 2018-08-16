var colors;
var pickedColor;
var numSquares = 6;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

init();

// This function will run when the pages loads
function init(){
modeButtonListeners();
squareListeners();
reset();
}

function modeButtonListeners(){
    for(var i = 0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener('click', function(){
        modeButtons[0].classList.remove('selected');
        modeButtons[1].classList.remove('selected');
        this.classList.add('selected');
        // If button textContent is true or false
        this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
        reset();
        });
    }
}

function squareListeners(){
    for(var i = 0; i<squares.length; i++){
        // Add click listeners to squares
        squares[i].addEventListener('click', function(){
            // Grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // Compare clickedColor to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = 'Correct!';
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = 'Play Again?';
            } else{
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Nope';
            }
        });
    }
}



function reset(){
    // Change reset button textContent
    resetButton.textContent = 'New Colors';
    // Resets to default text
    messageDisplay.textContent = '';
    // Generate new colors
    colors = generateRandomColors(numSquares);
    // Pick new color from array
    pickedColor = pickColor();
    // Changes the text to the picked color
    colorDisplay.textContent = pickedColor;
    // Resets h1 background color
    h1.style.backgroundColor = 'steelblue'
    // Change colors of squares
    for(var i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else{
            squares[i].style.display = 'none';
        }
    }
        
}

// This event runs when you click the reset button
resetButton.addEventListener('click', function(){
    reset();
});

// This function runs when you win the game
function changeColors(color){
    // Loop through all squares
    for(var i = 0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

// Randomize a picked color
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generates random colors
function generateRandomColors(num){
    // Make an array
    var arr = [];
    // Repeat num times(either 3 or 6)
    for(var i = 0; i<num; i++){
        arr.push(randomColor());
    }
    // Return the array
    return arr;
}

// Generates the rgb values
function randomColor(){
    // Pick a red from 0 - 255
    var r = Math.floor(Math.random() * 256);
    // Pick a green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    // Pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
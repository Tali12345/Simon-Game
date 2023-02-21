var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = 0;
var level = 0;
var delayInMilliseconds = 1000; //1 second

$(document).keypress(function() {
    if (start === 0) {
        nextSequence();
        start = 1;
    }
})

$(".btn").click(function(event) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(this, "pressed", 100);
    if (gamePattern.length > userClickedPattern.length) {
        if (!(checkAnswer())) {
            startOver();
        }
        return;
    }
    if (gamePattern.length < userClickedPattern.length) {
        startOver();
        return;
    }
    if (gamePattern.length === userClickedPattern.length) {
        if (checkAnswer()) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
                }, delayInMilliseconds);
        }
        else {
            startOver();
        }
    }
})

function nextSequence() {
    setTimeout(function() {
    }, delayInMilliseconds);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    level++;
    $("#"+"level-title").text("Level "+level);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour, state, ms) {
    $(currentColour).addClass(state);
    setTimeout(function() {
        $(currentColour).removeClass(state);
      }, ms);

}

function checkAnswer() {
    if (gamePattern[userClickedPattern.length-1] !== userClickedPattern[userClickedPattern.length-1]) {
        return false
    }
    return true
}

function startOver() {
    playSound("wrong");
    animatePress("body", "game-over", 200);
    $("#"+"level-title").text("Game Over, Press Any Key To Restart");
    start = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
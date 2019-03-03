var cvs = document.getElementById("canvas");


cvs.style.width = window.innerWidth + "px";

setTimeout(function () {
    cvs.style.height = window.innerHeight + "px";
}, 0);


var ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;


ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, cvs.width, cvs.height);

var ground = new Image();
ground.src = "images/ground.png";
ground.width = 5;

var pipesUp = new Image();
pipesUp.src = "images/pipe.png";
var pipesDown = new Image();
pipesDown.src = "images/pipe2.png";

var pipesArray = [];

var character = new Image();
character.src = "images/down.png";


var character1 = new Image();
character1.src = "images/down1.png";

var goinUp = false;
var dead = false;
draw();

var characterY = cvs.height / 2;
var animation = 10;

pipesArray.push({
    x: cvs.width,
    y: (Math.random() * cvs.height) + character.height * 2
});

var questions = [];
var startQuestions = false;
var QuestionNumber = -1;
var correct = false;
var questionsCorrect = 5;

questions.push({
    ques: "Reprocessing is a?",
    current: false,
    choices1: "Reduce",
    choices2: "Reuse",
    choices3: "Recycle",
    choices4: "Recreate",
    correct: 3,
});
questions.push({
    ques: "Who can help recycle?",
    current: false,
    choices1: "You",
    choices2: "Adults",
    choices3: "Everyone",
    choices4: "No one",
    Correct:3
});
questions.push({
    ques: "Who can help recycle?",
    current: false,
    choices1: "You",
    choices2: "Adults",
    choices3: "Everyone",
    choices4: "No one",
    Correct:3
});

questions.push({
    ques: "Is recycling useful?",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "Very",
    choices4: "Choice 1 and 3",
    Correct:4
});

qquestions.push({
    ques: "Is recycling useful?",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "Very",
    choices4: "Choice 1 and 3",
    Correct:4
});
qquestions.push({
    ques: "Is recycling useful?",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "Very",
    choices4: "Choice 1 and 3",
    Correct:4
});
questions.push({
    ques: "Which is most recyclable?",
    current: false,
    choices1: "Shredded Paper",
    choices2: "Plastic Bottles",
    choices3: "Plastic Bags",
    choices4: "Choice 2 and 3",
    Correct:2
});
questions.push({
    ques: "Which is creating less waste?",
    current: false,
    choices1: "Reducing",
    choices2: "Reusing",
    choices3: "Recycling",
    choices4: "Choice 3",
    Correct:1
});

function draw() {

    ctx.fillStyle = "#ff9b2d";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    if (!dead) {
        drawPipes();

        ctx.drawImage(ground, 0, cvs.height - ground.height + 70);
        if (goinUp) {
            ctx.drawImage(character1, 40, characterY);
            animation--;
            if (animation === 0) {
                animation = 10;
                goinUp = false;
            }
        } else {
            ctx.drawImage(character, 40, characterY);
            characterY += 2;
        }

        collision();

    } else {
        showQuestions();
    }
    ctx.stroke();
    ctx.restore();
    requestAnimationFrame(draw);
}

function showQuestions() {
    if (QuestionNumber === -1) {
        var random = Math.floor(Math.random() * questions.length);
        QuestionNumber = random;
    }

    ctx.fillStyle = "red";
    ctx.font = "40px Impact";
    ctx.fillText(questions[QuestionNumber].ques, 30, 50);

    ctx.fillStyle = "blue";
    ctx.font = "40px Impact";
    ctx.fillText(questions[QuestionNumber].choices1, 30, 100);
    ctx.fillText(questions[QuestionNumber].choices2, 30, 150);
    ctx.fillText(questions[QuestionNumber].choices3, 30, 200);
    ctx.fillText(questions[QuestionNumber].choices4, 30, 235);


}

function showCoords(event) {
    if (!dead) {
        var y = event.clientY;
        var coords = "Y coords: " + y;
        console.log(coords);
        if (y < cvs.height / 2) {
            goinUp = true;
            characterY -= 40;
        }
        if (y >= cvs.height / 2) {
            goinUp = false;
            characterY += 40;
        }
    } else {
        dead = false;
        window.location.reload();
    }
}

function drawPipes() {

    for (let i = 0; i < pipesArray.length; i++) {
        if (pipesArray[i].y > cvs.height) pipesArray[i] = cvs.height - 150;
        if (pipesArray[i].y > 0 && pipesArray[i].y <= character.height * 2) pipesArray[i] = character.height * 2;

        ctx.drawImage(pipesUp, pipesArray[i].x, pipesArray[i].y);
        ctx.drawImage(pipesDown, pipesArray[i].x, pipesArray[i].y - (character.height * 2) - pipesDown.height);

        if (i === pipesArray.length - 1 && pipesArray[i].x <= cvs.width - (cvs.width / 2)) {
            console.log("new Col");
            pipesArray.push({
                x: cvs.width,
                y: (Math.random() * cvs.height) + character.height * 2
            });
        }
        pipesArray[i].x--;
    }

}

function collision() {
    for (let i = 0; i < pipesArray.length; i++) {
        if (character.y <= pipesArray[i].y - ((character.height * 2) - pipesDown.height)) {
            if (40 >= pipesArray[i].x && 40 < +pipesArray[i].x + pipesUp.width)
                gameOver();
            if (40 + pipesUp.width >= pipesArray[i].x && 40 + pipesUp.width <= pipesArray[i].x + pipesUp.width)
                gameOver();
            if (characterY > cvs.height - ground.height + 70) {
                gameOver();
            }
        }
    }
}

function gameOver() {
    dead = true;
}

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keys = [];

function keysPressed(e) {
    // store an entry for every key pressed

    keys[e.keyCode] = true;
    //   var key = e.keyCode ? e.keyCode : e.which;
    if (keys[32]) {
        goinUp = true;
        characterY -= 40;
    }

}

function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}

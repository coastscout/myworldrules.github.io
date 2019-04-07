var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Load in images
var character = new Image();
character.src = "images/character.png";

var gameOverImage = new Image();
gameOverImage.src = "images/gameOver.png";

var instro = new Image();
instro.src = "images/free.png";
//Character move variables
var charX = (cvs.width / 2) - 20;
var charY = (cvs.height / 2) - 20;
var charSpeed = 10;
var charHitPoints = 1;
//Character Laserbeams
var laser = [];
var laserSpeed = 5;
var laserWidth = 40;
var laserHeight = 10;

//Enemy
var enemy = new Image();
enemy.src = "images/alien.png";
var enemys = [];
var enemySpeed = 5;
var score = 0;

//Questions
var questions = [];
draw();

var startQuestions = false;
var QuestionNumber = -1;
var correct = false;

var questionsCorrect = 5;

questions.push({
    ques: "What is the best way to limit your debt?",
    current: false,
    choices1: "Paying small debts first",
    choices2: "Never paying debts ",
    choices3: "Paying large debts first",
    choices4: "Taking on more debt",
    correct: 1
});
questions.push({
    ques: "Should you create a budget?",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "",
    choices4: "",
    correct: 1
});
questions.push({
    ques: "Which of the following is  the best payment method",
    current: false,
    choices1: "Pigeon",
    choices2: "Cash",
    choices3: "Check",
    choices4: "Credit Card",
    correct: 2
});
questions.push({
    ques: "Which should NOT be in your budget?",
    current: false,
    choices1: "Personal Expenses",
    choices2: "Rent",
    choices3: "Debt Payments",
    choices4: "All of these should be in a budget",
    correct: 2
});

questions.push({
    ques: "What is the best way to limit your debt?",
    current: false,
    choices1: "Paying small debts first",
    choices2: "Never paying debts ",
    choices3: "Paying large debts first",
    choices4: "Taking on more debt",
    correct: 1
});

questions.push({
    ques: "Should you create a budget?",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "",
    choices4: "",
    correct: 1
});

questions.push({
    ques: "Which of the following is  the best payment method",
    current: false,
    choices1: "Pigeon",
    choices2: "Cash",
    choices3: "Check",
    choices4: "Credit Card",
    correct: 2
});

questions.push({
    ques: "Which should NOT be in your budget?",
    current: false,
    choices1: "Personal Expenses",
    choices2: "Rent",
    choices3: "Debt Payments",
    choices4: "All of these should be in a budget",
    correct: 2
});
questions.push({
    ques: "Is a financial aid worth the cost?",
    current: false,
    choices1: "Rarely",
    choices2: "No, never",
    choices3: "Yes, always",
    choices4: "Yes, if you are struggling",
    correct: 4
});
questions.push({
    ques: "Should you always trust what a financial assistant says?",
    current: false,
    choices1: "Yes, always",
    choices2: "No, never",
    choices3: "Yes, as long as it makes sense",
    choices4: "No, they are actually leprechauns trying to steal your money",
    correct: 3
});

questions.push({
    ques: "How much should you put into savings?",
    current: false,
    choices1: "70% of your gross income",
    choices2: "20% of net income",
    choices3: "20% of your gross income",
    choices4: "Whatever is left after personal spendings",
    correct: 2
});

questions.push({
    ques: "How much money should you invest?",
    current: false,
    choices1: "Your entire savings",
    choices2: "Begin with a very small amount",
    choices3: "50% of you income",
    choices4: "25% of your income",
    correct: 2
});

questions.push({
    ques: "When is it okay to be in debt?",
    current: false,
    choices1: "Never",
    choices2: "Always",
    choices3: "If you cannot afford to pay it off",
    choices4: "If you want a large loan for a car",
    correct: 3
});

questions.push({
    ques: "What is a good way to reach your goals?",
    current: false,
    choices1: "",
    choices2: "",
    choices3: "",
    choices4: "",
    correct: 2
});

questions.push({
    ques: "Which is the best financial strategy?",
    current: false,
    choices1: "Save as much money as you can",
    choices2: "Spend all your income every month",
    choices3: "Spend 95% of your monthly income",
    choices4: "Invest 50% of your income",
    correct: 1
});

questions.push({
    ques: "Which is not a necessary purchase?",
    current: false,
    choices1: "Clothes",
    choices2: "Food",
    choices3: "Water",
    choices4: "Hulu Plus",
    correct: 4
});

questions.push({
    ques: "Are automatic transactions effective?",
    current: false,
    choices1: "Yes, they make sure you pay on time",
    choices2: "No, they are a waste of time",
    choices3: "No, they cost too much to set up",
    choices4: "",
    correct: 1
});
questions.push({
    ques: "When is a good time to start investing?",
    current: false,
    choices1: "When you turn 50",
    choices2: "When you buy your first house",
    choices3: "As soon as possible",
    choices4: "Never",
    correct: 3
});
questions.push({
    ques: "Why do people invest money?",
    current: false,
    choices1: "To make more money",
    choices2: "Its a safe place to keep money",
    choices3: "To lose money",
    choices4: "Very few people invest money",
    correct: 1
});

function gameOver() {
    //   location.reload();
    laser = [];
    enemys = [];
    charHitPoints = 1;
    score = 0;
}

function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    if (charHitPoints > 0) {
        ctx.drawImage(character, charX, charY);
        laserMove();
        spawnEnemies();
        enemyMove();
        enemyLaserSpawn();
        collision();
    } else {
        /* ctx.fillStyle = "red";
         ctx.font = "100px Arial";
         ctx.textAlign = "center";
         ctx.fillText("Game Over", cvs.width / 2, cvs.height / 2);
         document.getElementById("restart").style.display = 'block';*/
        questionsScene();
    }

    document.getElementById("scoreText").innerHTML = "Score: " + score;
    ctx.stroke();
    ctx.restore();
    requestAnimationFrame(draw);
}

function questionsScene() {
    if (questionsCorrect === 0){
        questionsCorrect =6;
        startQuestions = false;
        gameOver();
    }
    if (!startQuestions) {
        ctx.drawImage(gameOverImage, (cvs.width / 2) - (gameOverImage.width / 2), (cvs.height / 2) - gameOverImage.height - 40);
        ctx.drawImage(instro, (cvs.width / 2) - (instro.width / 2), (cvs.height / 2));
    } else {
        ctx.fillStyle = "white";
        ctx.font = "50px Impact";
        if (correct){
            questionsCorrect--;
            correct = false;
            QuestionNumber = -1;
        }
        if (QuestionNumber === -1) {
            var random = Math.floor(Math.random() * questions.length);
            QuestionNumber = random;

        }
        ctx.font = "40px Impact";
        ctx.fillText(questions[QuestionNumber].ques, 10, 50);
        ctx.font = "50px Impact";
        ctx.fillText(questions[QuestionNumber].choices1, 60, 150);
        ctx.fillText(questions[QuestionNumber].choices2, 60, 250);
        ctx.fillText(questions[QuestionNumber].choices3, 60, 350);
        ctx.fillText(questions[QuestionNumber].choices4, 60, 450);

        ctx.fillStyle = "red";
        ctx.fillText("1)", 10, 150);
        ctx.fillText("2)", 10, 250);
        ctx.fillText("3)", 10, 350);
        ctx.fillText("4)", 10, 450);

        if(questionsCorrect === 5)  ctx.fillText("Questions Correct: " + 0, 10, 550);
        if(questionsCorrect === 4)  ctx.fillText("Questions Correct: " + 1, 10, 550);
        if(questionsCorrect === 3)  ctx.fillText("Questions Correct: " + 2, 10, 550);
        if(questionsCorrect === 2)  ctx.fillText("Questions Correct: " + 3, 10, 550);
        if(questionsCorrect === 1)  ctx.fillText("Questions Correct: " + 4, 10, 550);
        if(questionsCorrect === 0)  ctx.fillText("Questions Correct: " + 5, 10, 550);


    }
}

function collision() {
    for (let i = 0; i < laser.length; i++) {
        for (let y = 0; y < enemys.length; y++) {
            if (laser[i].safe && enemys[y].hitPoints > 0) {
                if ((laser[i].x < enemys[y].x && (laser[i].x + laserWidth) > enemys[y].x)
                    && (laser[i].y + (laserHeight / 2) >= enemys[y].y && (laser[i].y + laserHeight) <= (enemys[y].y) + enemy.height)) { // Laser left of enemy
                    enemys[y].hitPoints--;
                    score++;

                } else if ((laser[i].x + laserWidth > enemys[y].x + enemy.width && laser[i].x < enemys[y].x + enemy.width)
                    && (laser[i].y + (laserHeight / 2) >= enemys[y].y && (laser[i].y + laserHeight) <= (enemys[y].y) + enemy.height)) { // Laser right of enemy
                    enemys[y].hitPoints--;
                    score++;
                }
            }
            if (!laser[i].safe) {
                if ((laser[i].x < charX && (laser[i].x + laserWidth) > charX)
                    && (laser[i].y + (laserHeight / 2) >= charY && (laser[i].y + laserHeight) <= (charY) + character.height)) { // Laser left of enemy
                    charHitPoints--;

                } else if ((laser[i].x + laserWidth > charX + enemy.width && laser[i].x < charX + enemy.width)
                    && (laser[i].y + (laserHeight / 2) >= charY && (laser[i].y + laserHeight) <= (charY) + character.height)) { // Laser right of enemy
                    charHitPoints--;
                }
            }

        }
    }
}

function enemyMove() {
    if (enemys.length > 0) {
        for (let i = 0; i < enemys.length; i++) {
            if (enemys[i].hitPoints > 0) {
                ctx.drawImage(enemy, enemys[i].x, enemys[i].y);
                switch (enemys[i].dir) {
                    case 0:
                        enemys[i].x += enemySpeed;
                        break;
                    case 1:
                        enemys[i].x -= enemySpeed;
                        break;
                    case 2:
                        enemys[i].y += enemySpeed;
                        break;
                    case 3:
                        enemys[i].y -= enemySpeed;
                        break;
                }
                var keep = true;
                if (enemys[i].x < 0) {
                    while (keep) {
                        enemys[i].dir = Math.floor(Math.random() * 4);
                        if (enemys[i].dir !== 1) keep = false;
                    }
                } else if (enemys[i].x > cvs.width - enemy.width) {
                    while (keep) {
                        enemys[i].dir = Math.floor(Math.random() * 4);
                        if (enemys[i].dir !== 0) keep = false;
                    }
                } else if (enemys[i].y < 0) {
                    while (keep) {
                        enemys[i].dir = Math.floor(Math.random() * 4);
                        if (enemys[i].dir !== 3) keep = false;
                    }
                } else if (enemys[i].y > cvs.height - enemy.height) {
                    while (keep) {
                        enemys[i].dir = Math.floor(Math.random() * 4);
                        if (enemys[i].dir !== 2) keep = false;
                    }
                }
            }

        }
    }


}

function laserMove() {
    //Lasers
    for (let i = 0; i < laser.length; i++) {
        if (laser[i].safe) {
            ctx.fillStyle = "#00ffff";
        } else {
            ctx.fillStyle = "#ff001a";

        }
        switch (laser[i].dir) {
            case 1:
                ctx.fillRect(laser[i].x + (character.width / 2), laser[i].y + (character.width / 2), laserWidth, laserHeight);
                laser[i].x += laserSpeed;
                break;
            case 0:
                ctx.fillRect(laser[i].x - (character.width / 2), laser[i].y + (character.width / 2), laserWidth, laserHeight);
                laser[i].x -= laserSpeed;
                break;
            case 2:
                ctx.fillRect(laser[i].x + (character.width / 2), laser[i].y - (character.width / 2), laserHeight, laserWidth);
                laser[i].y -= laserSpeed;
                break;
            case 3:
                ctx.fillRect(laser[i].x + (character.width / 2), laser[i].y + (character.width / 2), laserHeight, laserWidth);
                laser[i].y += laserSpeed;
                break;
        }
    }

}

function enemyLaserSpawn() {
    for (let i = 0; i < enemys.length; i++) {
        if (enemys[i].hitPoints > 0 && Math.floor(Math.random() * 10) === 1) {
            laser.push({
                x: enemys[i].x,
                y: enemys[i].y,
                dir: Math.floor(Math.random() * 4) + 1,
                safe: false,
            });
        }
    }
}

function spawnEnemies() {
    if (Math.floor(Math.random() * 100) === 4) {
        enemys.push({
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            dir: Math.floor(Math.random() * 4),
            special: Math.floor(Math.random() * 20),
            hitPoints: 1,
            time: 0
        })
    }
}

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keys = [];

function keysPressed(e) {
    // store an entry for every key pressed

    keys[e.keyCode] = true;
    //   var key = e.keyCode ? e.keyCode : e.which;

    if (startQuestions) {
        if (keys[49] && questions[QuestionNumber].correct === 1) {
            correct = true;
        }
        if (keys[50] && questions[QuestionNumber].correct === 2) {
            correct = true;
        }
        if (keys[51] && questions[QuestionNumber].correct === 3) {
            correct = true;
        }
        if (keys[52] && questions[QuestionNumber].correct === 4) {
            correct = true;
        }
        if (keys[49] && questions[QuestionNumber].correct !== 1) {
            QuestionNumber = -1;
        }
        if (keys[50] && questions[QuestionNumber].correct !== 2) {
            QuestionNumber = -1;
        }
        if (keys[51] && questions[QuestionNumber].correct !== 3) {
            QuestionNumber = -1;
        }
        if (keys[52] && questions[QuestionNumber].correct !== 4) {
            QuestionNumber = -1;
        }
    }


    if (keys[39] && keys[87]) { //R
        right();
        wKey();
    } else if (keys[39] && keys[65]) {
        right();
        aKey();
    } else if (keys[39] && keys[83]) {
        right();
        sKey();
    } else if (keys[39] && keys[68]) {
        right();
        dKey();
    }

    // -----------------
    else if (keys[38] && keys[87]) {
        up();
        wKey();
    } else if (keys[38] && keys[65]) {
        up();
        aKey();
    } else if (keys[38] && keys[83]) {
        up();
        sKey();
    } else if (keys[38] && keys[68]) {
        up();
        dKey();
    }
    //-----
    else if (keys[37] && keys[87]) {
        left();
        wKey();
    } else if (keys[37] && keys[65]) {
        left();
        aKey();
    } else if (keys[37] && keys[83]) {
        left();
        sKey();
    } else if (keys[37] && keys[68]) {
        left();
        dKey();
    }
    //---
    else if (keys[40] && keys[87]) {
        down();
        wKey();
    } else if (keys[40] && keys[65]) {
        down();
        aKey();
    } else if (keys[40] && keys[83]) {
        down();
        sKey();
    } else if (keys[40] && keys[68]) {
        down();
        dKey();
    }
    ///----
    else if (keys[40]) {
        down();
    } else if (keys[39]) {
        right();
    } else if (keys[38]) {
        up();
    } else if (keys[37]) {
        left();
    }
//---
    else if (keys[87]) {
        wKey();
    } else if (keys[65]) {
        aKey();
    } else if (keys[83]) {
        sKey()
    } else if (keys[68]) {
        dKey();
    } else if (keys[32] && charHitPoints <= 0 && startQuestions === false) {
        console.log("test");
        startQuestions = true;
    }


}

function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}


function right() {//39
    if (charX + character.width < cvs.width) charX += charSpeed;
}

function up() {//38
    if ((charY > 0)) charY -= charSpeed;

}

function left() { //37
    if (charX > 0) charX -= charSpeed;
}

function down() { //40
    if (charY + character.height < cvs.height) charY += charSpeed;
}

function wKey() {//87
    laser.push({
        x: charX,
        y: charY,
        dir: 2,
        safe: true,
    });
}

function aKey() {//65
    laser.push({
        x: charX,
        y: charY,
        dir: 0,
        safe: true,
    });
}

function sKey() { //83
    laser.push({
        x: charX,
        y: charY,
        dir: 3,
        safe: true,
    });
}

function dKey() { //68
    laser.push({
        x: charX,
        y: charY,
        dir: 1,
        safe: true,
    });
}



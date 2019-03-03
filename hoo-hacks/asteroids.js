var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Load in images
var character = new Image();
character.src = "images/hoo.png";

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
enemy.src = "images/bag.png";
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
        ques: "Re-processing materials to make another product?",
        current: false,
        choices1: "Reduce",
        choices2: "Reuse",
        choices3: "Recycle",
        choices4: "Recreate",
        correct: 3,
});
questions.push({ //-
    ques: "What are the 3 R’s of recycling?",
    current: false,
    choices1: "Risk, Reinsurance, Relativity",
    choices2: "Recycle, Recreate, Represent",
    choices3: "Reduce, Reuse, Recycle",
    choices4: "Math, Arithmetic, Algebra",
    correct: 3
});
questions.push({ //--
    ques: "Which is not one of the four recycling categories?",
    current: false,
    choices1: "Chemicals",
    choices2: "Paper",
    choices3: "Plastic",
    choices4: "Glass",
    correct: 1
});
questions.push({//-
    ques: "Which is an example of reusing",
    current: false,
    choices1: "Using less napkins when you eat",
    choices2: "Using less water when you shower",
    choices3: "Washing ziploc bags and using them again",
    choices4: "putting cans in the recycling bin",
    correct: 3
});
questions.push({
    ques: "Which of the following cannot be recycled?",
    current: false,
    choices1: "Styrofoam",
    choices2: "Bulbs and batteries",
    choices3: "Paper",
    choices4: "Plastic",
    correct: 1
});

questions.push({//-
    ques: "Which is a benefit to reducing landfills?",
    current: false,
    choices1: "More water pollution",
    choices2: "More free land",
    choices3: "Less jobs",
    choices4: "All of the above",
    correct: 2
});
questions.push({
    ques: "Which can be recycled",
    current: false,
    choices1: "soda bottle",
    choices2: "plastic spoons",
    choices3: "cans",
    choices4: "all of the above",
    correct:4
});
questions.push({
    ques: "Which of the following is reducing",
    current: false,
    choices1: "Limiting how much trash you throw away",
    choices2: "Putting cans in the recycling bin",
    choices3: "cleaning a ziplock bag",
    choices4: "eating pineapple pizza",
    correct:1
});
questions.push({
    ques: "What is sometimes considered the 4th R of recycling",
    current: false,
    choices1: "Repurpose",
    choices2: "Relegating",
    choices3: "Rhinoceros",
    choices4: "Raw potatoes",
    correct:1
});
questions.push({
    ques: "Which can’t be recycled",
    current: false,
    choices1: "Shredded Paper",
    choices2: "Soda cans",
    choices3: "Plastic water bottles",
    choices4: "Paper",
    correct:1
});
questions.push({
    ques: "Which of these are an example of recycling",
    current: false,
    choices1: "Placing soda cans in the trash",
    choices2: "Eating rotten eggs",
    choices3: "Using less waste products",
    choices4: "None of the above",
    correct:4
});
questions.push({
    ques: "Which is a reason to recycle?",
    current: false,
    choices1: "Allows us to reuse materials",
    choices2: "Have less landfills",
    choices3: "Create less waste",
    choices4: "All of the above",
    correct:4
});
questions.push({
    ques: "Who should recycle",
    current: false,
    choices1: "Adults",
    choices2: "Kids",
    choices3: "Everyone",
    choices4: "No one",
    correct:3
});
questions.push({
    ques: "Which way you can help your environment?",
    current: false,
    choices1: "Pick up litter",
    choices2: "Don’t litter",
    choices3: "Reduce your waste output",
    choices4: "All of the above",
    correct:4
});
questions.push({
    ques: "Which of the following is the cleanest energy",
    current: false,
    choices1: "natural gas",
    choices2: "wind",
    choices3: "oil",
    choices4: "synthetic gas",
    correct:2
});
questions.push({
    ques: "Which is a completely clean energy source?",
    current: false,
    choices1: "Wind power",
    choices2: "Solar power",
    choices3: "Both 1 and 2",
    choices4: "Natural gas",
    correct:3
});
questions.push({
    ques: "Which organization helps with recycling",
    current: false,
    choices1: "Keep America Beautiful",
    choices2: "Make America Great",
    choices3: "Keep American Clean",
    choices4: "Make America Beautiful",
    correct:1
});
questions.push({
    ques: "How can you help your community recycle?",
    current: false,
    choices1: "Advertise a local recycling center",
    choices2: "Litter",
    choices3: "Go on a diet",
    choices4: "Use the landfill more",
    correct:1
});
questions.push({
    ques: "How can you help your community recycle?",
    current: false,
    choices1: "Advertise a local recycling center",
    choices2: "Litter",
    choices3: "Go on a diet",
    choices4: "Use the landfill more",
    correct:1
});
questions.push({
    ques: "How can you help recycle?",
    current: false,
    choices1: "Set up a few local recycling bins",
    choices2: "Write a local blog or website",
    choices3: "Print messages on recycled paper",
    choices4: "All fo the above",
    correct:4
});
questions.push({
    ques: "Can you raise awareness at City Council Meetings",
    current: false,
    choices1: "Yes",
    choices2: "No",
    choices3: "",
    choices4: "",
    correct:1
});

questions.push({
    ques: "What would help people learn about recycling?",
    current: false,
    choices1: "An educational flyer or pamphlet",
    choices2: "A poster stuck at a local school",
    choices3: "Both 1 and 2",
    choices4: "",
    correct:3
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



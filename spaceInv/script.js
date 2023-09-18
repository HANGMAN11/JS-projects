
import enemyController from "./enemyController.js";
import Player from "./player.js";
import BulletController from "./BulletController.js";
const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;
const background = new Image();
background.src = 'images/space.png';
let isGameOver = false;
let didWin = false;

const playerBulletController = new BulletController(canvas,10,"red",true);
const enemyBulletController = new BulletController(canvas,4,"white",false);
const EnemyController = new enemyController(canvas, enemyBulletController,playerBulletController);
const player = new Player(canvas,3,playerBulletController);

function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displaygameOver();
    if (!isGameOver){
        EnemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displaygameOver(){
    if(isGameOver){
        let text = didWin ? "You Win" : "Game Over";
        let textOffSet = didWin ? 3.5:5;
        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width/textOffSet, canvas.height / 2);
    }
}

function checkGameOver(){
    if(isGameOver){
        return;
    }
    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }
    if(EnemyController.collideWith(player)){
        isGameOver = true;
    }
    if (EnemyController && EnemyController.enemyRows && EnemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    } 
}

setInterval(game, 1000 / 60);
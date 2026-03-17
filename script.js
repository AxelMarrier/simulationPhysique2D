import { Wall } from "./class/Wall.js";
import { Canvas } from "./class/Canvas.js";
import { Ball } from "./class/Ball.js";
const balls = []
const walls = []
const objects = []
const ball_size = 10

const width = 750;
const height = 515;
const MAX_COLUMN = Math.ceil(width / (ball_size*2));
const MAX_ROW = Math.ceil(height / (ball_size*2))

let grid = Array.from(
    { length: MAX_COLUMN },
    () => Array.from(
        { length: MAX_ROW },
        () => []
    )
);

let editor_mode = true 
let canvas = new Canvas(width, height);

document.addEventListener("DOMContentLoaded", function(){
    eventHandler();
    
    // INIT CANVA
    canvas.bgChange(200, 200, 200);

    let floor = new Wall(width, height, 0, height);
    let wall1 = new Wall(0, height, 0, 0);
    let wall2 = new Wall(width, 0, width, height);
    let ceiling = new Wall(0, 0, width, 0);

    walls.push(floor, wall1, wall2, ceiling);

    walls.forEach(object => { //dessine les objets
        object.draw(canvas);
    });
})

function update(){
    canvas.bgChange(200, 200, 200); //efface l'ecran

    objects.forEach(object => { //dessine les objets
        object.draw(canvas);
    });

    balls.forEach(ball => { //fait bouger les objets
        ball.update();
    });

    /*
    walls.forEach(wall => { //affiche la direction des murs
        wall.drawNormal(canvas);
    });
    */

    //détection collision (répété 3 fois pour plus de précision)

    for (let index = 0; index < 3; index++) {
        balls.forEach(ball => {
            ball.collision(objects);
        });
    }

    //vider la grille
    grid = Array.from(
        { length: MAX_COLUMN },
        () => Array.from(
            { length: MAX_ROW },
            () => []
        )
    );

    //recalculer la grille
    balls.forEach(ball => {
        let column = Math.min(Math.max(Math.floor(ball.position.x/(ball_size*2))-1, 0), MAX_COLUMN)
        let row = Math.min(Math.max(Math.floor(ball.position.y/(ball_size*2))-1,0), MAX_ROW)
        
        grid[column][row].push(ball)
        console.log(column, row)
        console.log(grid[column][row])
    });
    
}


function debutSimulation(){
    console.log(grid)
    if(editor_mode == true){
        console.log("Début de la simultation")
        editor_mode = false

        let nb_balls = Number(document.querySelector('#nbBalls input').value);

        for (let index = 1; index < nb_balls + 1; index++) {
            let ball = new Ball(width/nb_balls * index, height/5, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, ball_size);
            balls.push(ball);

            let column = Math.min(Math.max(Math.floor(ball.position.x/(ball_size*2))-1, 0), MAX_COLUMN)
            let row = Math.min(Math.max(Math.floor(ball.position.y/(ball_size*2))-1,0), MAX_ROW)
            
            grid[column][row].push(ball)
        }

        
        objects.push(...balls, ...walls);

        //update gravity
        Ball.setGravity(document.querySelector("#nbGravity input").value)

        setInterval(() => {
            update()
        }, 10);
    }    
}

function getBallsNear(ball){
    let column = Math.min(Math.max(Math.floor(ball.position.x/(ball_size*2))-1, 0), MAX_COLUMN)
    let row = Math.min(Math.max(Math.floor(ball.position.y/(ball_size*2))-1,0), MAX_ROW)

    console.log("Base : " + column + ", " + row)

    for (let i = column - 1; i < column + 1; i++) {
        for (let j = row - 1; j < row + 1; j++) {
            console.log(i, j)
        }
    }

}



function eventHandler(){
    //Bouton démarrer
    document.querySelector("#DebutSimu").addEventListener('click', debutSimulation);

    //Conteur de balles
    document.querySelector("#nbBalls input").addEventListener('input', function(){
        document.querySelector('#nbBalls label').innerHTML = this.value;
    });

    //Conteur gravité
    document.querySelector("#nbGravity input").addEventListener('input', function(){
        document.querySelector('#nbGravity label').innerHTML = this.value;
        Ball.setGravity(this.value);
    });

    //Détection click pour les balles
    canvas.canvas.addEventListener("click", function(e){
        if(document.querySelector('#editorSelect').value == "ball" && editor_mode == true){
            let ball = new Ball(e.offsetX, e.offsetY, 0, 0, ball_size)
            balls.push(ball);
            ball.draw(canvas);
        }
    })

    let wallStep = 0
    let wallX1 = 0
    let wallY1 = 0
    //Détection click pour les murs 1
    canvas.canvas.addEventListener("mousedown", function(e){
        if(document.querySelector('#editorSelect').value == "wall" && editor_mode == true){
            if(wallStep == 0){
                wallStep = 1
                wallX1 = e.offsetX
                wallY1 = e.offsetY
            } else{
                wallStep = 0
                let newWall1 = new Wall(wallX1, wallY1, e.offsetX, e.offsetY);
                let newWall2 = new Wall(e.offsetX, e.offsetY, wallX1, wallY1);

                newWall1.draw(canvas)
                newWall2.draw(canvas)

                walls.push(newWall1)
                walls.push(newWall2)
            }
        }
    })
}
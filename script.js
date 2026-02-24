import { Wall } from "./class/Wall.js";
import { Canvas } from "./class/Canvas.js";
import { Ball } from "./class/Ball.js";

const width = 750;
const height = 515;
let canvas = new Canvas(width, height);

const balls = []
const walls = []
const objects = []

let editor_mode = true

document.addEventListener("DOMContentLoaded", function(){
    canvas.bgChange(200, 200, 200);

    let floor = new Wall(width, height, 0, height);
    let wall1 = new Wall(0, height, 0, 0);
    let wall2 = new Wall(width, 0, width, height);
    let ceiling = new Wall(0, 0, width, 0);

    walls.push(floor, wall1, wall2, ceiling);
    
    objects.push(...walls);

    objects.forEach(object => { //dessine les objets
        object.draw(canvas);
    });

    canvas.canvas.addEventListener("mousemove",(e)=>{
        document.querySelector('#posX mark').innerHTML = e.offsetX
        document.querySelector('#posY mark').innerHTML = e.offsetY
    })

    SetupControlUI();
})

function SetupControlUI(){
    console.log("Début du setup de l'UI pour le controle de la simulation")
    let btnStart = document.createElement("button")
    document.querySelector("body").appendChild(btnStart)
    btnStart.innerText = "Démarrer la simulation"
    btnStart.addEventListener("click", debutSimulation)
}

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
    
    
    
}

function debutSimulation(){
    if(editor_mode == true){
        editor_mode = false

        let nb_balls = Number(document.querySelector('#nbBalls input').value);

        for (let index = 1; index < nb_balls + 1; index++) {
            let ball = new Ball(width/nb_balls * index, height/5, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 10);
            balls.push(ball);
        }

        objects.push(...balls);

        setInterval(() => {
            update()
        }, 10);
    }     
}

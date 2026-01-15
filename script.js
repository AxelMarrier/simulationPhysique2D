import { Wall } from "./class/Wall.js";
import { Canvas } from "./class/Canvas.js";
import { Ball } from "./class/Ball.js";

const width = 750;
const height = 515;
let canvas = new Canvas(width, height);

const balls = []
const walls = []
const objects = []

let simu_debut = false

document.addEventListener("DOMContentLoaded", function(){
    canvas.bgChange(200, 200, 200);

    let floor = new Wall(width, height, 0, height);
    let wall1 = new Wall(0, 0, 0, height);
    let wall2 = new Wall(width, height, width, 0,);
    let ceiling = new Wall(0, 0, width, 0);

    
    for (let index = 1; index < 20; index++) {
        let ball = new Ball(width/20 * index, height/5, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 10);
        let ball2 = new Ball(width/20 * index, height/5 * 2, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 11);
        let ball3 = new Ball(width/20 * index, height/5 * 3, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 12);
        let ball4 = new Ball(width/20 * index, height/5 * 4, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 13);
        balls.push(ball)
        balls.push(ball2)
        balls.push(ball3)
        balls.push(ball4)
    }

    walls.push(floor, wall1, wall2, ceiling);
    objects.push(...walls, ...balls);

    objects.forEach(object => { //dessine les objets
        object.draw(canvas);
    });

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

    // walls.forEach(wall => { //affiche la direction des murs
    //     wall.drawNormal(canvas);
    // });

    //détection collision
    balls.forEach(ball => {
        ball.collision(objects);
    });
    balls.forEach(ball => {
        ball.collision(objects);
    });
    balls.forEach(ball => {
        ball.collision(objects);
    }); 
}

function debutSimulation(){
    if(simu_debut == 0){
        simu_debut = 1

        setInterval(() => {
            update()
        }, 10);
    }     
}

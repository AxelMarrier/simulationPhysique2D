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

var output;

document.addEventListener("DOMContentLoaded", function(){
    canvas.bgChange(200, 200, 200);

    let floor = new Wall(width, height, 0, height);
    let wall1 = new Wall(0, 0, 0, height);
    let wall2 = new Wall(width, height, width, 0,);
    let ceiling = new Wall(0, 0, width, 0);

    walls.push(floor, wall1, wall2, ceiling);

    walls.forEach(wall => { //dessine les objets
        wall.draw(canvas);
    });

    SetupControlUI();
})

function SetupControlUI(){
    let btnStart = document.createElement("button")
    document.querySelector("body").appendChild(btnStart)
    btnStart.innerText = "Démarrer la simulation"
    btnStart.addEventListener("click", debutSimulation)

    console.log("Btn nb balls")
    let btnNb = document.createElement("input")
    btnNb.type = "range"
    btnNb.id = "btnNb"
    btnNb.min = 0
    btnNb.value = 0
    btnNb.step = 1 
    btnNb.max = 1000
    document.querySelector("body").appendChild(btnNb)

    let outputNb = document.createElement("output")
    outputNb.value = "0"   
    document.querySelector("body").appendChild(outputNb)
    btnNb.addEventListener("input", () => {
        outputNb.value = btnNb.value;
    });
}

function init(){
    

    output = document.querySelector("output")
    if(output != null){
        output = Number(output.value) + 1   
        console.log(output)
    }
    
    for (let index = 1; index < output; index++) {
        let ball = new Ball(width/output * index, height/5, (Math.random() * 2 -1)*3, (Math.random() * 2 -1)*3, 10);
        balls.push(ball)
    }

   
    objects.push(...walls, ...balls);

    objects.forEach(object => { //dessine les objets
        object.draw(canvas);
    });
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

        init()

        setInterval(() => {
            update()
        }, 10);
    }     
}

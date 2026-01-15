import { Wall } from "./class/Wall.js";
import { Canvas } from "./class/Canvas.js";
import { Ball } from "./class/Ball.js";

document.addEventListener("DOMContentLoaded", function(){

    //SETUP
    let width = 750;
    let height = 515;
    let canvas = new Canvas(width, height);
    canvas.bgChange(200, 200, 200);

    let floor = new Wall(width, height, 0, height);
    let wall1 = new Wall(0, 0, 0, height);
    let wall2 = new Wall(width, height, width, 0,);
    let ceiling = new Wall(0, 0, width, 0);

    const balls = []
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

    const walls = [floor, wall1, wall2, ceiling];
    const objects = [...walls, ...balls];

    //REFRESH
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

    setInterval(() => {
        update()
    }, 10);
})

//UNIFIER LES FONCTIONS DE COLLISION ENTRE WALL ET BALL
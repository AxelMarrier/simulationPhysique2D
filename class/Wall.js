import { Vector, dot, vectAdd, vectSub, vectMult, vectDiv } from "./Vector.js"

export class Wall {
    constructor(Ax, Ay, Bx, By) {
        this.type = "Wall"
        //coordonnées
        this.A = new Vector(Ax, Ay)
        this.B = new Vector(Bx, By)

        //vecteur directeur
        this.directeur = vectSub(this.B, this.A)

        //normal normalisé
        this.normal = new Vector(this.directeur.y, this.directeur.x).normalise();
    }

    draw(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.lineWidth = 10;
        canvas.ctx.strokeStyle = "black";
        canvas.ctx.moveTo(this.A.x, this.A.y);
        canvas.ctx.lineTo(this.B.x, this.B.y);
        canvas.ctx.stroke();
    }

    drawNormal(canvas){
        let midPoint = new Vector((this.A.x + this.B.x) / 2, (this.A.y + this.B.y) / 2 );
        let normalEnd = new Vector((midPoint.x + this.normal.x * 50), (midPoint.y + this.normal.y * 50));
        canvas.ctx.beginPath();
        canvas.ctx.lineWidth = 2;
        canvas.ctx.strokeStyle = "red";
        canvas.ctx.moveTo(midPoint.x, midPoint.y);
        canvas.ctx.lineTo(normalEnd.x, normalEnd.y);
        canvas.ctx.stroke();
    }

    update(){
    }
}
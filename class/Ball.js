import { Vector, dot, vectAdd, vectSub, vectMult, vectDiv } from "./Vector.js"

export class Ball {
    constructor(xPos, yPos, xMov, yMov, size){
        this.type = "Ball"
        this.position = new Vector(xPos,yPos)
        this.size = size
        this.mouvement = new Vector(xMov, yMov)
    }

    static vectConstructor(position, mouvement, size){
        return new Ball(position.x, position.y,mouvement.x, mouvement.y, size)
    }

    draw(canvas, full = true){
        canvas.ctx.beginPath()
        canvas.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
        if(full == false){
            canvas.ctx.stroke();
        } else{
            canvas.ctx.fillStyle = "rgb(0 0 0)";
            canvas.ctx.fill();
        }
        
    }

    update(){
        this.mouvement.y += 0.07
        this.position = vectAdd(this.position, this.mouvement)
    }

    collision(objects){
        objects.forEach(object => {
            if(object.type == "Wall"){ 
                let proj = vectSub(this.position, object.A)
                let t = dot(proj, object.directeur) / dot(object.directeur, object.directeur)
                t = Math.max(0, Math.min(t, 1))
                let proche = new Vector(object.A.x + t * object.directeur.x, object.A.y + t * object.directeur.y)
                
                let vectDist = vectSub(this.position, proche)
                let dist = Math.sqrt(vectDist.x**2 + vectDist.y**2)
                if(dist > 0 && dist < this.size + 5){
                    let Dot = dot(object.normal, this.mouvement)
                    if(Dot < 0){
                        this.mouvement.x -= 2 * (Dot * 0.95) * object.normal.x  
                        this.mouvement.y -= 2 * (Dot * 0.95) * object.normal.y

                        let penetration = this.size + 5 - dist
                        
                        this.position.x += object.normal.x * penetration
                        this.position.y += object.normal.y * penetration
                    }
                }

            } else if (object.type === "Ball" && object !== this) {

                // Connaitre la distance entre les 2 sphères
                let vectDist = vectSub(object.position, this.position)
                let dist = Math.sqrt(vectDist.x ** 2 + vectDist.y ** 2);

                if (dist > 0 && dist < this.size + object.size) {
                    let vecteurRel = vectSub(this.mouvement, object.mouvement)
                    let colNormal = vectDist.normalise();
                    let Dot = dot(vecteurRel, colNormal)
                    if(Dot > 0){
                        this.mouvement.x -= (Dot * 0.95) * colNormal.x
                        this.mouvement.y -= (Dot * 0.95) * colNormal.y

                        object.mouvement.x += (Dot * 0.95) * colNormal.x
                        object.mouvement.y += (Dot * 0.95) * colNormal.y

                        let correction = 0.5 * (this.size + object.size - dist);
                        this.position.x -= colNormal.x * correction;
                        this.position.y -= colNormal.y * correction;

                        object.position.x += colNormal.x * correction;
                        object.position.y += colNormal.y * correction;

                    }
                }
            }

        });
    }
}
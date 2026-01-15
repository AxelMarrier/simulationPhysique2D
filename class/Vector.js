export class Vector{
    constructor(x, y){
        this.x = x
        this.y = y 
    }

    normalise(){
        const sum = Math.sqrt(this.x**2 + this.y**2)
        this.x = this.x/sum
        this.y = this.y/sum
        return this
    }
}

export function dot(vect1, vect2){
    return vect1.x * vect2.x + vect1.y * vect2.y
}

export function vectAdd(vect1, vect2){
    const newX = vect1.x + vect2.x
    const newY = vect1.y + vect2.y
    return new Vector(newX, newY)
}

export function vectSub(vect1, vect2){
    const newX = vect1.x - vect2.x
    const newY = vect1.y - vect2.y
    return new Vector(newX, newY)
}

export function vectMult(vect1, vect2){
    const newX = vect1.x * vect2.x
    const newY = vect1.y * vect2.y
    return new Vector(newX, newY)
}

export function vectDiv(vect1, vect2){
    const newX = vect1.x / vect2.x
    const newY = vect1.y / vect2.y
    return new Vector(newX, newY)
}
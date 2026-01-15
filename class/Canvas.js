export class Canvas {
    constructor(width, height){
        this.canvas = document.createElement("canvas")
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);
    }

    bgChange(red, green, blue){
        this.ctx.fillStyle = "rgb(" + red + " " + green + " " + blue + ")";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
import { Shape } from "./shape";

export class Parallelogram implements Shape {
    a : number;
    h : number;
    angle : number;

    constructor(a : number, h : number, angle : number){
        this.a = a;
        this.h = h;
        this.angle = angle;
    }

    getCircumference() : number {
        return this.a * 2.0 + this.h * 2.0;
    }
    getArea() : number{
        return Math.abs(this.a * this.h * Math.sin(this.angle * 3.1415 / 180));
    }
}

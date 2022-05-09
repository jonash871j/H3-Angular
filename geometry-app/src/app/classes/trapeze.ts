import { Shape } from "./shape";

export class Trapeze implements Shape {
    a1: number;
    a2: number;
    h: number;

    constructor(a1 : number, a2 : number, h : number){
        this.a1 = a1;
        this.a2 = a2;
        this.h = h;
    }

    getCircumference() : number {
        let triangleA : number = Math.abs(this.a2 - this.a1) / 2.0;
        let triangleB : number = this.h;
        let hypotenuse = Math.sqrt(triangleA^2 + triangleB^2);

        return this.a1 + this.a2 + hypotenuse * 2.0;    
    }

    getArea() : number{
        return 0.5 * this.h * (this.a1 + this.a2);
    }
}

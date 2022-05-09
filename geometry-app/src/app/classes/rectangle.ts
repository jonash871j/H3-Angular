import { Shape } from "./shape";

export class Rectangle implements Shape {
    a: number;
    b: number;
    
    constructor(a : number, b : number){
        this.a = a;
        this.b = b;
    }

    getCircumference() : number {
        return this.a * 2.0 + this.b * 2.0;
    }
    getArea() : number{
        return this.a * this.b;
    }
}

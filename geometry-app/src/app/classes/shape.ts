export abstract class Shape
{
    abstract getCircumference() : number;
    abstract getArea() : number;

    toString() : string{
        return "O = " + this.getCircumference() + " | A = " +  this.getArea();
    }
}
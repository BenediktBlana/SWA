// Immutable - OO
// Class
class ImmutablePoint {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getX() { return this.x}

    getY() { return this.y}

    moveTo(a, b){
        this.x = a
        this.y = b
    }

    toString(){
        return "X:" + this.x + " Y:" + this.y
    }

    copy(){
        return new ImmutablePoint(this.x, this .y)
    }
}


class ImmutableCircle{
    constructor(point, radius){
        this.point = point
        this.radius = radius
    }

    getCenter() { return this.point}

    getRadius() {return this.radius}

    moveTo(a, b){
        this.point.x = a
        this.point.y = b
    }

    toString(){
        return "Point: " + this.point.toString() + " Radius: " + this.radius
    }

}

let pointA = new ImmutablePoint('10', '10')
// let pointB = pointA.copy()

// console.log(pointA.toString())
// pointA.moveTo('11', '11')
// console.log(pointA.toString())

// console.log(pointB.toString())
// pointB.moveTo('12', '12')
// console.log(pointB.toString())


let circle1 = new ImmutableCircle(pointA.copy(), '15')
console.log(circle1.toString())
circle1.moveTo('20', '20')
console.log(circle1.toString())

console.log(pointA.toString())


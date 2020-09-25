function Point(x, y) {
    function GetX() {
        return x;
    };

    function GetY() {
        return y;
    };

    function MoveTo(a, b) {
        x = a;
        y = b;
    };

    function ToString() {
        return "X: " + x + " Y: " + y;
    };

    function Copy() {
        return Point(x, y);
    };

    return { GetX, GetY, MoveTo, ToString, Copy };
};

function Circle(center, radius) {
    function GetCenter() {
        return center;
    };

    function GetRadius() {
        return radius;
    };

    function MoveTo(x, y) {
        center.MoveTo(x, y);
    };

    function ToString() {
        return "Center: " + center.ToString() + " Radius: " + radius;
    };

    return { GetCenter, GetRadius, MoveTo, ToString };
};

// function Circle(x, y, radius) {
//     const circle = Circle(point, radius);

//     return { GetCenter: circle.GetCenter() , GetRadius: circle.GetRadius(), MoveTo: circle.MoveTo(), ToString: circle.ToString() };
// };


const pointSomething = Point(10, 12);
const circleSomething = Circle(pointSomething, 10);

console.log(pointSomething.ToString());
pointSomething.MoveTo(12, 10);
console.log(pointSomething.ToString());
const point2 = pointSomething.Copy();
console.log(point2.ToString());
console.log(circleSomething.ToString());

const circleSomething1 = Circle(pointSomething, 10);
const circleSomething2 = Circle(pointSomething, 11);
const circleSomething3 = Circle(pointSomething, 12);
const circleSomething4 = Circle(pointSomething, 13);
const circleSomething5 = Circle(pointSomething, 14);

const arrayOfCircles = [circleSomething1, circleSomething2, circleSomething3, circleSomething4, circleSomething5];

const radiuses = arrayOfCircles.map(x => x.GetRadius());

console.log(radiuses);

console.log(arrayOfCircles.map(x => x.ToString()));


const circleUsual = Circle(pointSomething, 10); 
// const circleOverload = Circle(10, 12, 10); 

console.log(circleUsual.ToString());
// console.log(circleOverload.ToString());

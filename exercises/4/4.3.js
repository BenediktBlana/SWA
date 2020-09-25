// a)
function raiser(n) {
    return function () {
        return n ** n
    };
}
let two = raiser(2)
let three = raiser(3)
console.log(two())
console.log(three())

// b)
function fibonacci() {
    let x = 0;
    let y = 1;
    let z = 0;
    return function getNext() {
        [z, x, y] = [x, y, x + y];
        return z;
    };
}

let fun = fibonacci();

let numbers = ""
for (let i = 0; i < 10; i++) {
    numbers += fun() + " ";
}
console.log(numbers)

const f = (x, y) => x + y
const curried_f = x => y => x + y // The curried version of f

const g = curried_f(2)
const h = curried_f(4)
console.log(g(2))
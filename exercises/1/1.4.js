console.log(2 +2 === 4) //true
console.log(2 +2 === '4') //false
console.log(2 +2 == '4') //true
console.log(Number('4')) //4
console.log(Number('0')) //0
console.log(NaN) //NaN
console.log(NaN != NaN) //true
console.log(Infinity == Infinity) //true
console.log(1/0 == 2/0) //true
console.log(2 * null) //0
console.log(2 + null) //2
console.log(7) //7
console.log(null || 7) //7
console.log('4') //4
console.log('') //empty space

for(i=1; i<11; i++){
    console.log(i)
}
console.log('-------------------------')

var a = 0;
console.log(a)
for(i=1; i<11; i++){
    a= a + i;
}
console.log(a)


console.log('-------------------------')
let factorial = 1;
for(i=1; i<11; i++){
    factorial *= i;
}
console.log(factorial)
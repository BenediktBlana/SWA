//Closures

function add(x) {
    function g(y){
        return x + y
    }
    return g
}

let h = add(2) //the function g with x = 2 in its scope
console.log(h)
let hh = add(-1) //the function g with x = -1 in its scope

console.log(h(2))
console.log(hh(10))

// x works as a private "instance variable" for the function

function adder(addend){
    function getAdded(){
        return addend
    }
    function add(x){
        return addend + x
    }

 //Long form:   return { getAdded: getAdded, add: add}
 return {getAdded, add}
}

const a = adder(100)
console.log(a.getAdded())
console.log(a.add(17))

function log(f){
    console.log(f())
}

log(a.getAdded)



//Steps
function name(firstName, lastName) { // 1
    // 2 is here if needed - not this time
    // 3:
    const getFirtName = () => firstName
    const getLastName = () => lastName
    const getFullName = () => firstName + " " + lastName
    //4:
    return { getFirtName, getLastName, getFullName}
}

const n = name("Arnas", "Cicinskas")
n.firstName = "Joe" //No effect
console.log(n.getFirtName())
log(n.getFullName)
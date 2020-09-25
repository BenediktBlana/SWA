//Deconstruction and spread in objects:
const o1 = {x: 100, y: 200}
const o2 = {z: 300}
const {x, y} = o1 // Declares x, y and initializes them to o1.x and o1.y

const f = ({x, y}) => x + y
console.log(f(o1))

const o3 = {...o1, z: 300}
console.log(o3)

const o4 = {...o1, ...o2}
console.log(o4)

//Concatenative inheritance
function NPC(options) {
    function move (x, y) {
        console.log(`${options.name} moved to ({$x}, ${y})`)
    }

    return {move}
}


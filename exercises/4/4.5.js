//4.5
function add(n, m) { 
    return n + m 
}

const curried_add = n => m => n + m

function subtract(n, m) { 
    return n - m 
}

const curried_subtract = n => m => n - m

function greater(n, m) { 
    return n > m 
}

const curried_greater = n => m => n > m

function get(attr, o) { 
    return o[attr] 
}

const curried_get = o => attr => o[attr]

function pipe(f, g) { 
    return function (x) { 
        let r = f(x) 
        return g(r) 
    }
}

const curried_pipe = (f, g) => (x) => g(f(x));

const arny = curried_add(1)
console.log(arny(99))
const beny = curried_greater(5)
console.log(beny(4))

let adm = { age: 10, dlzkaCiciny : '33cm'}
const x = curried_get(adm)
console.log(x('age'))
console.log(x('dlzkaCiciny'))

const kdh = curried_subtract(5)

const z = curried_pipe(arny, kdh)
console.log(z(1))
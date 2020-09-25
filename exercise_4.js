// 4.1
function names(persons) {
    let ns = []
    persons.map(p => ns.push(p.name))
    return ns
}

function adults(persons) {
    return persons.filter(p => p.age >= 18)
}

function oldest_person(persons) {
    let oldest = null
    persons.map(p => {
        if( oldest == null || p.age > oldest.age)
            oldest = p
    })
    return `oldest is ${oldest.name} (${oldest.age})` 
}

let person = { name: "Global", age: 16, salary: 999 };
let person2 = { name: "N00b", age: 20, salary: 57 };
let person3 = { name: "Robo", age: 60, salary: 22 };
let person4 = { name: "Stevo", age: 75, salary: 10 };

let persons = []
persons.push(person, person4, person2, person3)

// console.log(names(persons))
// console.log(adults(persons))
// console.log("oldest: " + oldest_person(persons))

function total_salaries_of_seniors(persons) {
    let total = 0
    persons.filter(p => p.age >= 60).map(p => {
        total += p.salary
    })
    return total
}

console.log(total_salaries_of_seniors(persons))

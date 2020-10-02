// 4.1
function names(persons) {
    let ns = []
    persons.map(p => ns.push(p.name))
    return ns
}

const curried_names = persons => persons.map(p => p.name)

function adults(persons) {
    return persons.filter(p => p.age >= 18)
}

const curried_adults = persons => persons.filter(p => p.age >= 18)

function oldest_person(persons) {
    let oldest = null
    persons.map(p => {
        if( oldest == null || p.age > oldest.age)
            oldest = p
    })
    return `oldest is ${oldest.name} (${oldest.age})` 
}
// (lemons) ? alert("please give me a lemonade") : alert("then give me a beer");
const curried_oldest_person = persons => persons.map(p => (oldest == null || p.age > oldest.age) ? oldest = p : oldest = oldest) 

let person = { name: "Global", age: 16, salary: 999 };
let person2 = { name: "N00b", age: 20, salary: 57 };
let person3 = { name: "Robo", age: 60, salary: 22 };
let person4 = { name: "Stevo", age: 75, salary: 10 };

let persons = []
persons.push(person, person4, person2, person3)

// console.log(adults(persons))
// console.log("oldest: " + oldest_person(persons))

function total_salaries_of_seniors(persons) {
    let total = 0
    persons.filter(p => p.age >= 60).map(p => {
        total += p.salary
    })
    return total
}

// console.log(total_salaries_of_seniors(persons))
console.log(names(persons))
console.log(curried_names(persons))
console.log(adults(persons))
console.log(curried_adults(persons))
console.log(oldest_person(persons))
console.log(curried_oldest_person(persons))
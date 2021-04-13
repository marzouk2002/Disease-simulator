
//Classes
class Person {
    constructor() {
        this.state = 'fine'
    }
}

//Globale variables
let localSsilumationState= false
let arrPopulation;
let size;
let vaccineP;
let casesP;
let fatalityP;
let contagiosityP;
let timeBeforeDeath;
let fps;

//helper function 
function getRandomNum(range) {
    return Math.floor(Math.random()*range)
}

function getRandomState(rate) {
    let num = Math.floor(Math.random()*100)
    return rate>=num ? true : false
}

function getRandomIndexes(size, rate) {
    const arrLen = Math.round(size*(rate/100))
    const Arr = Array(arrLen).fill(0).map(n=>Math.floor(Math.random()*size))
    return Arr
}

// SELECTORS
    // grid
const Grid = document.querySelector('.population')
    // form
const form = document.querySelector('#input-form')
const sizeInput = document.querySelector('#size-f')
const vaccineInput = document.querySelector('#vaccine')
const casesInput = document.querySelector('#cases-f')
const fatalityInput = document.querySelector('#fatality-f')
const contagiosityInput = document.querySelector('#contagiosity-f')
const timeBeforeDeathInput = document.querySelector('#time-b-d')
const timeBeforeHealingInput = document.querySelector('#time-b-h')
const fpsInput = document.querySelector('#fps')
    // buttons
const btnStart = document.querySelector('.btn-start')
const btnReset = document.querySelector('.btn-reset')
    // state
const populationSpan = document.querySelector('#population')
const casesSpan = document.querySelector('#cases')
const deathsSpan = document.querySelector('#deaths')
const immuneSpan = document.querySelector('#immune')
const activeSpan = document.querySelector('#a-cases')

// Main functions
function setAllItems() {
    let pixelsNum= sizeInput.value
    vaccineP= vaccineInput.value
    casesP= casesInput.value
    fatalityP= fatalityInput.value
    contagiosityP= contagiosityInput.value
    timeBeforeDeath= timeBeforeDeathInput.value
    timeBeforeHealing= timeBeforeHealingInput.value
    fps= fpsInput.value

    size = Math.round(500 /pixelsNum)
    Grid.style.setProperty('--num-row', size)

    arrPopulation = Array(Math.pow(size, 2)).fill(0).map(x=>new Person())

    const totalPopulation = Math.pow(size, 2)
    
    const arrImmune = getRandomIndexes(totalPopulation, vaccineInput.value)
    arrImmune.forEach(num=>{
        arrPopulation[num].state = 'immune'
    })
    
    for(let i = 0; i < casesInput.value; i++) {
        let randomIndex = getRandomNum(totalPopulation)
        arrPopulation[randomIndex].state = 'sick'
    }

    handleDisplay()

}

function handleDisplay() {
    arrPopulation.forEach(person=>{
        let cell = document.createElement('div')
        cell.classList.add('person')
        switch(person.state) {
            case 'fine':
                cell.style.backgroundColor = 'rgb(1, 241, 1)'
                break
            case 'immune':
                cell.style.backgroundColor = 'rgb(0, 47, 255)'
                break
            case 'dead':
                cell.style.backgroundColor = 'black'
                break
            case 'sick':
                cell.style.backgroundColor = 'red'
                break
        }
        Grid.appendChild(cell)
    })
}

form.addEventListener('input',()=>{
    setAllItems()
    handleDisplay()
})

setAllItems()
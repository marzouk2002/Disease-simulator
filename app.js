
//Classes
class Person {
    constructor() {
        this.state = 'fine'
    }
}

//Globale variables
localStorage.setItem('localSsilumationState', false)

//helper function 
function getRandomNum(range) {
    return Math.round(Math.random()*range)
}

function getRandomState(rate) {
    let num = Math.round(Math.random()*100)
    return rate>=num ? true : false
}

function getRandomIndexes(size, rate) {
    const arrLen = Math.round(size*(rate/100))
    const Arr = Array(arrLen).fill(0).map(n=>Math.floor(Math.random()*size))
    return Arr
}

// SELECTORS
    // grid
const Grid = document.querySelector('population')
    // form
const form = document.querySelector('#input-form')
const sizeInput = document.querySelector('#size-f')
const vaccineInput = document.querySelector('#vaccine')
const casesInput = document.querySelector('#cases-f')
const fatalityInput = document.querySelector('#fatality-f')
const contagiosityInput = document.querySelector('#contagiosity-f')
const timeBeforeDeath = document.querySelector('#time-b-d')
const timeBeforeHealing = document.querySelector('#time-b-h')
const fps = document.querySelector('#fps')
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
    localStorage.setItem('size', sizeInput.value)
    localStorage.setItem('vaccineP', vaccineInput.value)
    localStorage.setItem('casesP', casesInput.value)
    localStorage.setItem('fatalityP', fatalityInput.value)
    localStorage.setItem('contagiosityP', contagiosityInput.value)
    localStorage.setItem('timeBeforeDeath', timeBeforeDeath.value)
    localStorage.setItem('timeBeforeHealing', timeBeforeHealing.value)
    localStorage.setItem('fps', fps.value)

    let size = sizeInput.value
    Grid.style.setProperty('--num-row', size)

    let arrPopulation = Array(Math.pow(size, 2)).fill(new Person())

    const totalPopulation = Math.pow(size, 2)

    const arrImmune = getRandomIndexes(totalPopulation, vaccineInput.value)
    arrImmune.forEach(num=>{
        arrPopulation[num].state = 'immune'
    })

    const arrCase = getRandomIndexes(totalPopulation, casesInput.value)
    arrCase.forEach(num => {
        arrPopulation[num].state = 'sick'
    })

    localStorage.setItem('arrPopulation', JSON.stringify(arrPopulation))
}

function handleDisplay() {
    const arrPopulation = localStorage.getItem('arrPopulation')

    arrPopulation.forEach(person=>{
        let cell = document.createElement('div')
        cell.classList.add('person')
        switch(person.state) {
            case 'fine':
                cell.style.backgroundColor = 'rgb(0, 47, 255)'
                break
            case 'immune':
                cell.style.backgroundColor = 'rgb(1, 241, 1)'
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
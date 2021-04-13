
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
}

function handleDisplay() {
    
}
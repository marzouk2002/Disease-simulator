
//Classes
class Person {
    constructor() {
        this.state = 'fine'
    }
}

//Globale variables
let SilumationState= false
let arrPopulation;
let size;
let vaccineP;
let casesP;
let fatalityP;
let contagiosityP;
let timeBeforeDeath;
let fps;
let intervalSimu;
let deaths = 0
let curred = 0
let currentCases = 0
let cases = 0

//helper function 
function getRandomNum(range) {
    return Math.floor(Math.random()*range)
}

function getRandomState(rate) {
    if(rate==0) return false
    let num = Math.floor(Math.random()*100)
    return rate>=num
}

function getRandomIndexes(size, rate) {
    const arrLen = Math.round(size*(rate/100)*1.1)
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
    SilumationState = false
    clearInterval(intervalSimu)
    let pixelsNum= sizeInput.value || 10
    vaccineP= vaccineInput.value || 10
    casesP= casesInput.value || 1
    fatalityP= fatalityInput.value 
    contagiosityP= contagiosityInput.value
    timeBeforeDeath= timeBeforeDeathInput.value
    timeBeforeHealing= timeBeforeHealingInput.value
    fps= fpsInput.value || 10

    deaths = 0
    cases = Number(casesP)
    currentCases = casesP


    size = Math.round(500 /pixelsNum)
    Grid.style.setProperty('--num-row', size)

    arrPopulation = Array(Math.pow(size, 2)).fill(0).map(x=>new Person())

    const totalPopulation = Math.pow(size, 2)
    
    const arrImmune = getRandomIndexes(totalPopulation, vaccineInput.value)
    const immuneSet = new Set(arrImmune)
    curred = immuneSet.size
    arrImmune.forEach(num=>{
        arrPopulation[num].state = 'immune'
    })

    for(let i = 0; i < casesInput.value; i++) {
        let randomIndex = getRandomNum(totalPopulation)
        arrPopulation[randomIndex].state = 'sick'
        let dies = getRandomState(fatalityP)
        if(dies) {
            arrPopulation[randomIndex].dies = true
            arrPopulation[randomIndex].timer = timeBeforeDeath
        } else {
            arrPopulation[randomIndex].dies = false
            arrPopulation[randomIndex].timer = timeBeforeHealing
        }
    }


    handleDisplay()

}

function handleDisplay() {
    // statistic stuff
    populationSpan.innerHTML = Math.pow(size,2)
    console.log(cases)
    casesSpan.innerHTML = cases
    deathsSpan.innerHTML = deaths
    immuneSpan.innerHTML = curred
    activeSpan.innerHTML = currentCases

    //grid stuff
    Grid.innerHTML=''
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

function simulator() {
    if(!SilumationState) {
        SilumationState = true
        const interval = Math.floor(1000/fps)
        intervalSimu = setInterval(()=>{
            let isThereAny= false
            let copyArr=[...arrPopulation]
            let newCases = 0
            currentCases = 0
            copyArr.forEach((person, index) => {
                switch(person.state) {
                    case 'fine': {
                            let counter = 0

                            arrPopulation[index+size]?.state == 'sick' ? counter++ : counter
                            arrPopulation[index-size]?.state == 'sick' ? counter++ : counter

                            if( index%size !== 0 ) {
                                arrPopulation[index-1]?.state == 'sick' ? counter++ : counter
                                arrPopulation[index-size-1]?.state == 'sick' ? counter++ : counter
                                arrPopulation[index+size-1]?.state == 'sick' ? counter++ : counter
                            }
                            
                            if (index%size !== size-1) {
                                arrPopulation[index+1]?.state == 'sick' ? counter++ : counter
                                arrPopulation[index+size+1]?.state == 'sick' ? counter++ : counter
                                arrPopulation[index-size+1]?.state == 'sick' ? counter++ : counter
                            }

                            let getSeak = getRandomState(contagiosityP*counter)
                            if(getSeak) {
                                person.state = 'sick'
                                newCases++
                                let ifDies = getRandomState(fatalityP)
                                if(ifDies) {
                                    person.dies = true
                                    person.timer = timeBeforeDeath
                                } else {
                                    person.dies = false
                                    person.timer = timeBeforeHealing
                                }
                            }
                            break
                    }
                    case 'sick': {
                            isThereAny= true
                            person.timer--
                            currentCases++
                            if(person.timer<=0) {
                                if(person.dies) {
                                    person.state='dead'
                                    deaths++
                                } else {
                                    person.state='immune'
                                    curred++
                                }
                            }
                            break
                    }
                    
                }
            })
            cases = cases+ newCases
            if(!isThereAny) {
                clearInterval(intervalSimu)
            }
            handleDisplay()
        }, interval)
    }
}


form.addEventListener('input', setAllItems)

btnStart.addEventListener('click', simulator)

btnReset.addEventListener('click', setAllItems)

setAllItems()
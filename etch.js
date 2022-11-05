const pad = document.querySelector('.pad');
let largestDiv;
const penStateForm = document.querySelector('.penstateform');
const randomButton = document.querySelector('.random');
const colorDiv = document.querySelector('.colorpicker');
const colorSelect = document.querySelector('.colorselect');
const clearButton = document.querySelector('.clear');
const gridForm = document.querySelector('.gridform');
const popup = document.querySelector('.popup-wrapper')
const popupClose = document.querySelector('.popup-close');
const title = document.querySelector('h1');
const changeGrid = document.querySelector('.change');
let disableRandom = document.createElement('button');
let gridWidth;
let gridLength;


// check if random color option is selected
randomButton.addEventListener('click', () => {
    colorSelect.disabled = true;
    randomButton.disabled = true;
    colorSelect.classList.add('disabled');
    randomButton.classList.add('disabled');
    disableRandom.classList.add('random');
    disableRandom.innerText = 'Pick New Color';
    colorDiv.append(disableRandom);
    disableRandom.addEventListener('click', () => {
        colorSelect.disabled = false;
        randomButton.disabled = false;
        disableRandom.remove();
        colorSelect.click();
        colorSelect.classList.remove('disabled');
        randomButton.classList.remove('disabled')
    })
})

// get color based on the click event of random button
function getColor() {
    let color;
    if (randomButton.disabled) {
        let red = Math.floor((Math.random()*255));
        let green = Math.floor((Math.random()*255));
        let blue = Math.floor((Math.random()*255));
        color = `rgb(${red}, ${green}, ${blue})`;
    } else {
        color = colorSelect.value;
    }
    return color;
}

// get gridLength and gridWidth from grid from
gridForm.addEventListener('submit', ev => {
    ev.preventDefault();
    gridLength = parseInt(gridForm.length.value);
    gridWidth = parseInt(gridForm.width.value);
    popup.classList.add('hide');
    title.classList.add('moveleft');
    createGrid();
})

// automatically creates grid when popup is closed
popupClose.addEventListener('click', () => {
    popup.classList.add('hide');
    title.classList.add('moveleft');
    createGrid();
})

// change grid behavior
// removes creates grid and replaces it with a new one
changeGrid.addEventListener('click', () => {
    // fix color buttons button
    colorSelect.classList.add('hide');
    disableRandom.classList.add('hide');
    randomButton.classList.add('hide');

    // reset grid dimension
    gridLength = 0;
    gridWidth = 0;
    
    // removes current largestDiv and creates new one
    largestDiv.remove();
    popup.classList.remove('hide');
    title.classList.remove('moveleft');
    newDiv = document.createElement('div');
    newDiv.classList.add('largest-div');
    pad.prepend(newDiv);
})

function createGrid () {
    // fix color buttons button
    colorSelect.classList.remove('hide');
    disableRandom.classList.remove('hide');
    randomButton.classList.remove('hide');

    //create div after the form was submitted
    largestDiv = document.querySelector('.largest-div')

    for (let i = 0; i < (gridWidth || 16); i++) {
        let bigDiv = document.createElement('div');
        for (let n = 0; n < (gridLength || 16); n++) {
            let smallDiv = document.createElement('div');
            smallDiv.classList.add('small');
            // clear using clearButton
            clearButton.addEventListener('click', () =>  {
                smallDiv.style.backgroundColor = '#ffffff';
            })
            smallDiv.addEventListener('mouseover', () => {
                // get current pen state
                let currentPenState = penStateForm.penstate.value;
                let currentColor = getColor();
                if (currentPenState === 'hover') {
                    largestDiv.setAttribute('class', 'largest-div bucket');
                    smallDiv.style.backgroundColor = currentColor;
                } else if (currentPenState === 'precise') {
                    largestDiv.setAttribute('class', 'largest-div precise');
                    smallDiv.addEventListener('click', () => {
                        smallDiv.style.backgroundColor = currentColor;
                    })
                } else if (currentPenState === 'erase') {
                    largestDiv.setAttribute('class', 'largest-div erase');
                    smallDiv.classList.add('highlight');
                    smallDiv.addEventListener('mouseleave', () => {
                        smallDiv.classList.remove('highlight');
                    })
                    smallDiv.addEventListener('click', () => {
                        smallDiv.style.backgroundColor = '#ffffff';
                        smallDiv.classList.remove('highlight');
                    })
                }
            })
            bigDiv.append(smallDiv);
        }
        largestDiv.append(bigDiv);
    };
}


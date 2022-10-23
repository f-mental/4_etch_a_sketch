const largestDiv = document.querySelector('.largest-div');
const penStateform = document.querySelector('form');
const randomButton = document.querySelector('.random');
const colorDiv = document.querySelector('.colorpicker');
const colorSelect = document.querySelector('.colorselect');
const clearButton = document.querySelector('.clear');

randomButton.addEventListener('click', () => {
    colorSelect.disabled = true;
    randomButton.disabled = true;
    let disableRandom = document.createElement('button');
    disableRandom.innerText = 'Pick Color';
    colorDiv.append(disableRandom);
    disableRandom.addEventListener('click', () => {
        colorSelect.disabled = false;
        randomButton.disabled = false;
        disableRandom.remove();
    })
})



// check if random color
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





// div and boxes creators
for (let i = 0; i < 16; i++) {
    
    let bigDiv = document.createElement('div');

    for (let n = 0; n < 16; n++) {
        let smallDiv = document.createElement('div');
        smallDiv.classList.add('small');
        // clear using clearButton
        clearButton.addEventListener('click', () =>  {
            smallDiv.style.backgroundColor = '#ffffff';
        })
        smallDiv.addEventListener('mouseover', () => {
            // get current pen state
            let currentPenState = penStateform.penstate.value;
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
                smallDiv.addEventListener('click', () => {
                    smallDiv.style.backgroundColor = '#ffffff';
                })
            }
        })
        bigDiv.append(smallDiv);
    }
    largestDiv.append(bigDiv);
};

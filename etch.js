const largestDiv = document.querySelector('.largest-div');

// div and boxes creators
for (let i = 0; i < 16; i++) {
    
    let bigDiv = document.createElement('div');

    for (let n = 0; n < 16; n++) {
        let smallDiv = document.createElement('div');
        smallDiv.classList.add('small');
        smallDiv.addEventListener('mouseover', () => {
            // smallDiv.classList.add('drawn');
            let colorSelected = document.querySelector('.colorpicker').value;
            if (colorSelected !== '#ffffff') {
                smallDiv.style.backgroundColor = colorSelected;
            } else  {
                // random color generator if a color is not selected
                let red = Math.floor((Math.random()*255));
                let green = Math.floor((Math.random()*255));
                let blue = Math.floor((Math.random()*255));
                smallDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            }
        })
        bigDiv.append(smallDiv);
    }

    largestDiv.append(bigDiv);
}



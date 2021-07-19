const fs = require('fs')
const path = require('path')

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {

    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

let data = fs.readFileSync(path.resolve(__dirname, 'colors.json'), 'utf-8')
let colors = JSON.parse(data)
console.log(`colors`, colors)
colors = shuffleArray(colors)
fs.writeFileSync(path.resolve(__dirname, 'colors.json'), JSON.stringify(colors))
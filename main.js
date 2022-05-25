const form = document.getElementById('form')
const size = document.getElementById('size')
const text = document.getElementById('text')

form.addEventListener('submit', event => {
  event.preventDefault()
  const matrix = createMatrix(parseInt(size.value))
  const squareText = matrix.reduce(handleTextMatrix, '')
  text.innerHTML = squareText
})

function createMatrix(size) {
  if(size === 0 || size > 25 || isNaN(size)) return []
  else if(size === 1) return [['o']]

  const matrix = new Array(size).fill(0).map(() => [])

  let isCircle = true
  
  let startRow = 0
  let endRow = size - 1
  
  let startColumn = 0
  let endColumn = size - 1
  
  while(startColumn <= endColumn && startRow <= endRow) {
    const icon = isCircle ? 'o': 'x'

    for(let i = startColumn; i <= endColumn; i++) {
      matrix[startRow][i] = icon
    }
    startRow++
    
    for(let i = startRow; i <= endRow; i++) {
      matrix[i][endColumn] = icon
    }
    endColumn--
    
    for(let i = endColumn; i >= startColumn; i--) {
      matrix[endRow][i] = icon;
    }
    endRow--
    
    for(let i = endRow; i >= startRow; i--) {
      matrix[i][startColumn] = icon
    }
    startColumn++
    isCircle = !isCircle
  }
  return matrix
}

function handleTextMatrix(acc, row) {
  let rowString = ''
  row.forEach(icon => {
    if(icon === 'o') rowString += `<span class='icon iconO'>${icon}</span>`
    else if(icon === 'x') rowString += `<span class='icon iconX'>${icon}</span>`
  })
  rowString += '<br/>'
  return acc + rowString
}
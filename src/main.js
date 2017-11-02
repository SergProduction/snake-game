const canvas = document.getElementById('canvas')
const width = 300
const height = 300
canvas.width = width
canvas.height = height
canvas.style.border = '1px solid'
const ctx = canvas.getContext('2d')

const speed = 10
const snakeSize = {width:10, height:10}
let head = {x:50, y:50}
let body = [true, true, true]
let direction = 1 // 0 - horizontal, 1 - vertical


function drawSnake() {
  ctx.fillStyle = 'rgb(200, 0, 0)' // head color
  ctx.fillRect(head.x, head.y, snakeSize.width, snakeSize.height)
  ctx.fillStyle = 'rgb(200, 200, 0)' // body color

  let x = head.x
  let y = head.y

  body.forEach((section, i) => {
    if (direction) y = head.y - (snakeSize.height * (i+1))
    else x = head.x - (snakeSize.width * (i+1))
    ctx.fillRect(x, y, snakeSize.width, snakeSize.height
    )
  })

  if (direction) y = y - (snakeSize.height * 2)
  else x = x - (snakeSize.width * 2)

  ctx.clearRect(x, y, snakeSize.width, snakeSize.height)
}


function autoMoveSnake() {
  if (direction) head.y = head.y + snakeSize.height
  else head.x = head.x + snakeSize.height
}


function render() {
  
  drawSnake()
  autoMoveSnake()

  setTimeout(() => {
    render()
  },1000/speed)
}

render()

window.addEventListener('keydown', (event) => {
  console.log(event)
})

console.log(ctx)
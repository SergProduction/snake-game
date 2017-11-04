const random = (min=5, max=15) => {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

const canvas = document.getElementById('canvas')
const score = document.getElementById('score')

const width = 250
const height = 250
canvas.width = width
canvas.height = height
canvas.style.border = '1px solid'
const ctx = canvas.getContext('2d')

const speed = 10
const snakeSize = {width:10, height:10}
let head = {x:50, y:50}
let body = []
let direction = 'down' // up, down, left, right
let isEat = false
const eatCoord = {}
const barrier = []

function createBaseBody(len) {
  for(let i=1; i<=len; i++) {
    
    const y = head.y - (snakeSize.height * i)
    body.push(direction)
  }
}

function createBarrier () {
  let x = random(0, width - snakeSize.width)
  let y = random(0, height - snakeSize.height)
  const bias = {
    x: x % snakeSize.width,
    y: y % snakeSize.height,
  }
  x = x - bias.x
  y = y - bias.y
  ctx.fillStyle = 'rgb(200, 0, 0)' // barriere color
  ctx.fillRect(x, y, snakeSize.width, snakeSize.height)
  barrier.push({x, y})
}

function createEat() {
  if (isEat) return
  ctx.clearRect(eatCoord.x, eatCoord.y, snakeSize.width, snakeSize.height)
  let x = random(0, width - snakeSize.width)
  let y = random(0, height - snakeSize.height)
  const bias = {
    x: x % snakeSize.width,
    y: y % snakeSize.height,
  }
  x = x - bias.x
  y = y - bias.y
  const isBarrier = barrier.find(b => b.x === head.x && b.y === head.y)
  if (isBarrier) {
    createEat()
    return
  }
  ctx.fillStyle = 'rgb(0, 0, 200)' // eat color
  ctx.fillRect(x, y, snakeSize.width, snakeSize.height)
  isEat = true
  eatCoord.x = x
  eatCoord.y = y
}

function drawSnake() {
  ctx.fillStyle = 'rgb(0, 255, 184)' // head color
  ctx.fillRect(head.x, head.y, snakeSize.width, snakeSize.height)
  ctx.fillStyle = 'rgb(0, 0, 0)' // body color
  let x = head.x
  let y = head.y
  
  for( let i=body.length-1; i>=0; i--) {
    let section = body[i]
    
    switch(section){
      case 'up':
        y = y + snakeSize.height
        break
      case 'down':
        y = y - snakeSize.height
        break
      case 'left':
        x = x + snakeSize.width
        break
      case 'right':
        x = x - snakeSize.width
        break
      default: {
      }
    }

    ctx.fillRect(x, y, snakeSize.width, snakeSize.height)
  }

  ctx.clearRect(x, y, snakeSize.width, snakeSize.height)
}


function autoMoveSnake() {
  body.push(direction)
  body.splice(0,1)

  if (head.x === eatCoord.x && head.y === eatCoord.y) {
    body.splice(0,0, body[body.length-1])
    isEat = false
    createEat()
    score.textContent = body.length

    createBarrier()
  }

  switch(direction) {
    case 'up':
      head.y = head.y - snakeSize.height
    break
    case 'down':
      head.y = head.y + snakeSize.height
    break
    case 'left':
      head.x = head.x - snakeSize.width
    break
    case 'right':
      head.x = head.x + snakeSize.width
    break
  }
}


function render() {
  createEat()
  drawSnake()
  autoMoveSnake()

  setTimeout(() => {
    if (head.x > width
      || head.x < 0
      || head.y > height
      || head.y < 0
    ) {
      return
    }
    const isBarrier = barrier.find(b => b.x === head.x && b.y === head.y)
    if (isBarrier) {
      return
    }
    render()
  },1000/speed)
}

createBaseBody(3)
render()

function playerControl(type) {
  // debugger
  switch(type) {
    case 'ArrowUp':
      direction = 'up'
    break
    case 'ArrowDown':
      direction = 'down'
    break
    case 'ArrowLeft':
      direction = 'left'
    break
    case 'ArrowRight':
      direction = 'right'
    break
    default: {}
  }
}

window.addEventListener('keydown', (event) => {
  playerControl(event.key)
})

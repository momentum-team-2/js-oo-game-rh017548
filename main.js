/* eslint-disable prefer-const, no-unused-vars */
/* globals requestAnimationFrame, Keyboarder */
let gamesize = { x: 500, y: 500 }
class Game {
  constructor () {
      let canvas = document.querySelector('#run_game')
      let context = canvas.getContext('2d')
      this.gameSize = { x: canvas.width, y: canvas.height }
      this.player = new Player(this.gameSize)
      
      this.bodies = []
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      this.bodies = this.bodies.concat(new Enemy(this))
      
      let animate = () => {
          context.clearRect(0, 0, this.gameSize.x, this.gameSize.y)
          //this.update()
          this.player.update()
          this.drawPlayer(context, this.gameSize)
          this.drawBodies(context)
          requestAnimationFrame(animate)
      }
      animate()
  }
  
  drawPlayer (context) {

      let startingXPosition = this.player.center.x - this.player.size.x / 2
      let startingYPosition = this.player.center.y - this.player.size.y / 2
      let imageUrl = new Image ()
      imageUrl.src = 'images/184-1842384_pacman-transparent-yellow-coin-scratch-sprite.png'
      context.drawImage(imageUrl, startingXPosition, startingYPosition, this.player.size.x, this.player.size.y)
  } 

  drawBodies (context) {
      for (let body of this.bodies) {
          body.update(context)
      }
  }
  
  
}

class Enemy {
  constructor (game) {
    this.game = game
    this.size = { x: 40, y: 40 }
    
    let randomNum = Math.floor(Math.random() * 500)// need to define this

    let topPosition = { x: randomNum, y: 0 } // comes from the top
    let rightPosition = { x: gamesize.x, y: randomNum }// comes from the right
    let bottomPosition = { x: randomNum, y: gamesize.y } // comes from the bottom
    let leftPosition = { x: 0, y: randomNum }// comes from the left

    let possibleValues = [topPosition, rightPosition, bottomPosition, leftPosition]

    let centerValues = possibleValues[Math.floor(Math.random() * possibleValues.length)]
    this.center = centerValues
}

  
  draw (context) {
    let startingXPosition = this.center.x - this.size.x / 2
    let startingYPosition = this.center.y - this.size.y / 2
    let imageUrl = new Image ()
    imageUrl.src = '/Users/russellhill/momentum_projects/js-oo-game-rh017548/images/pngguru.com.png'
    context.drawImage(imageUrl, startingXPosition, startingYPosition, this.size.x, this.size.y)
}
  update (context) {
    this.draw(context)
    return { x: Math.random() * 500, y: 520 }}
  }
        

class Player {
  constructor (gameSize) {
    this.size = { x: 50, y: 50 }
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 }
    this.keyboarder =  Keyboarder
  }
  update () {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 3
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 3
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 3
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        this.center.y += 3
      }
  }
}  



let game = new Game()

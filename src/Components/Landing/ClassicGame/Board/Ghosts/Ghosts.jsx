import React, {Component} from 'react'
import './ghosts.scss'

class Ghosts extends Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            x: 21,
            y: 5,
            direction: 'LEFT',
            tracking: false,
            dead: false,
            interval: null
        }
    }
    
    // ghostRandomMove(){
    //     // let currentDirection = this.state.direction
    //     let directionRand = function rand(){
    //         // console.log('rand ran')
    //         // let directionNum
    //         // function generateNum() {
    //         //     switch (currentDirection){
    //         //         case 'LEFT':
    //         //             directionNum = 0
    //         //         case 'RIGHT':
    //         //             directionNum = 1
    //         //         case 'UP':
    //         //             directionNum = 2
    //         //         case 'DOWN':
    //         //             directionNum = 3
    //         //     }
    //         //     let num = Math.floor(Math.random() * 4)
    //         //     return (directionNum === num) ? generateNum() : num
    //         // }
    //         let direction
    //         switch(Math.floor(Math.random() * 4)){
    //             case 0:
    //                 direction = 'UP'
    //                 break
    //             case 1:
    //                 direction = 'DOWN'
    //                 break
    //             case 2:
    //                 direction = 'LEFT'
    //                 break
    //             case 3:
    //                 direction = 'RIGHT'
    //                 break
    //             default:
    //                 break
    //         }
    //         // if (direction === currentDirection) {
    //         //     console.log('same direction')
    //         //     rand()
    //         // }
    //         return direction
    //     }
    //     return directionRand()
    // }

    checkGhostCollision(direction){
        switch(direction){
            case 'UP':
                if (this.props.board[this.state.y - 1][this.state.x] === 1) {
                    // let direction = directionRand()
                    // if (!this.state.tracking){
                    //     let direction = this.ghostRandomMove()
                    //     this.setState({
                    //         direction: direction
                    //     })
                    // }
                    return false
                }
                break
            case 'DOWN':
                if (this.props.board[this.state.y + 1][this.state.x] === 1) {
                    // let direction = directionRand()
                    // if (!this.state.tracking){
                    //     let direction = this.ghostRandomMove()
                    //     this.setState({
                    //         direction: direction
                    //     })
                    // }
                    return false
                }
            break
            case 'LEFT':
                if (this.props.board[this.state.y][this.state.x - 1] === 1) {
                    // let direction = directionRand()
                    // if (!this.state.tracking){
                    //     let direction = this.ghostRandomMove()
                    //     this.setState({
                    //         direction: direction
                    //     })
                    // }
                    return false
                }
                break
            case 'RIGHT':
                if (this.props.board[this.state.y][this.state.x + 1] === 1) {
                    // let direction = directionRand()
                    // if (!this.state.tracking){
                    //     let direction = this.ghostRandomMove()
                    //     this.setState({
                    //         direction: direction
                    //     })
                    // }
                    return false
                }
                break
            default:
                break
        }
    }

    // ghostTracking = () => {
    //     // this.state.x - this.props.pacman[0].x
    //     // console.log(this.props.pacman[0].x - this.state.x)
    //     // this.setState({
    //     //     x: this.props.pacman[0].x - 1,
    //     //     y: this.props.pacman[0].y - 1
    //     // })
    //     // if (this.props.pacman[0].x - this.state.x < 0 || this.props.pacman[0].x - this.state.x > 0){
    //     //     console.log('x is not equal')
    //     // }
    //     // if (this.props.pacman[0].y - this.state.y < 0 || this.props.pacman[0].y - this.state.y > 0){
    //     //     console.log('y not equal')
    //     // }
    //     if (this.props.pacman[0].x - this.state.x < 0){
    //         if (this.checkGhostCollision('LEFT') === false){
    //             if (this.props.pacman[0].y - this.state.y > 0){
    //                 this.ghostMove('DOWN')
    //             } else if (this.props.pacman[0].y - this.state.y < 0){
    //                 this.ghostMove('UP')
    //             }
    //         } else {
    //             this.ghostMove('LEFT')
    //         }
    //     } else if (this.props.pacman[0].x - this.state.x > 0){
    //         if (this.checkGhostCollision('RIGHT') === false){
    //             if (this.props.pacman[0].y - this.state.y > 0){
    //                 this.ghostMove('DOWN')
    //             } else if (this.props.pacman[0].y - this.state.y < 0){
    //                 this.ghostMove('UP')
    //             }
    //         } else {
    //             this.ghostMove('RIGHT')
    //         }
    //     } else if (this.props.pacman[0].y - this.state.y < 0){
    //         if (this.checkGhostCollision('UP') === false){
    //             if (this.props.pacman[0].x - this.state.x > 0){
    //                 this.ghostMove('LEFT')
    //             } else if (this.props.pacman[0].x - this.state.x < 0){
    //                 this.ghostMove('RIGHT')
    //             }
    //         } else {
    //             this.ghostMove('UP')
    //         }
    //     } else if (this.props.pacman[0].y - this.state.y > 0){
    //         if (this.checkGhostCollision('DOWN') === false){
    //             if (this.props.pacman[0].x - this.state.x > 0){
    //                 this.ghostMove('LEFT')
    //             } else if (this.props.pacman[0].x - this.state.x < 0){
    //                 this.ghostMove('RIGHT')
    //             } else if (this.props.pacman[0].x - this.state.x === 0) {
    //                 // let checkGhostCollision = this.checkGhostCollision('DOWN')
    //                 var tryAgain = () => {
    //                     if (this.checkGhostCollision('DOWN') === false){
    //                         this.setState({
    //                             x: this.state.x - 1,
    //                             direction: 'LEFT'
    //                         })
    //                         tryAgain()
    //                     } else {
    //                         return
    //                     }
    //                 }
    //                 tryAgain()
    //             }
    //         } else {
    //             this.ghostMove('DOWN')
    //         }
    //     }
    // }

    ghostMove(direction) {
        // let rand = Math.floor(Math.random() * 4)
        switch(direction){
            case 'UP':
                //UP
                if (this.checkGhostCollision('UP') === false) break
                this.setState({
                    y: this.state.y - 1,
                    direction: 'UP'
                })
                break
            case 'DOWN':
                //DOWN
                if (this.checkGhostCollision('DOWN') === false) break
                this.setState({
                    y: this.state.y + 1,
                    direction: 'DOWN'
                })
                break
            case 'LEFT':
                //LEFT
                if (this.checkGhostCollision('LEFT') === false) break
                this.setState({
                    x: this.state.x - 1,
                    direction: 'LEFT'
                })
                break
            case 'RIGHT':
                //RIGHT
                if (this.checkGhostCollision('RIGHT') === false) break
                this.setState({
                    x: this.state.x + 1,
                    direction: 'RIGHT'
                })
                break
            default:
                break
        }
    }

    scatter = () => {
        const blinkyTarget = {x: 21, y: 1}
        // this.ghostMove('LEFT')

        let tryUp = () => {
            let ghostX = this.state.x
            let ghostY = this.state.y
            ghostY = ghostY - 1
            let stepsAwayUp = Math.abs(ghostX - blinkyTarget.x) + Math.abs(ghostY - blinkyTarget.y)
            return stepsAwayUp
        }
        let tryDown = () => {
            let ghostX = this.state.x
            let ghostY = this.state.y
            ghostY = ghostY + 1
            let stepsAwayDown = Math.abs(ghostX - blinkyTarget.x) + Math.abs(ghostY - blinkyTarget.y)
            return stepsAwayDown
        }
        let tryLeft = () => {
            let ghostX = this.state.x
            let ghostY = this.state.y
            ghostX = ghostX - 1
            let stepsAwayLeft = Math.abs(ghostX - blinkyTarget.x) + Math.abs(ghostY - blinkyTarget.y)
            return stepsAwayLeft
        }
        let tryRight = () => {
            let ghostX = this.state.x
            let ghostY = this.state.y
            ghostX = ghostX + 1
            let stepsAwayRight = Math.abs(ghostX - blinkyTarget.x) + Math.abs(ghostY - blinkyTarget.y)
            return stepsAwayRight
        }

        // console.log(Math.min(tryUp(), tryLeft(), tryRight()))
        // let test = [tryUp(), tryLeft(), tryRight()]
        // test.sort(function(a, b){return a-b})
        // console.log(test[0])
        if (tryUp() < tryLeft() && tryUp() < tryRight()){
            console.log('up wins')
        } else if (tryLeft() < tryUp() && tryLeft() < tryRight()){
            console.log('left wins')
        } else if (tryRight() < tryLeft() && tryRight() < tryUp()) {
            console.log('right wins')
        }
        // if (tryUp() < tryLeft()){
        //     this.setState({
        //         y: this.state.y - 1,
        //         direction: 'UP'
        //     })
        // } else if (tryUp() > tryLeft() || blinkyTarget.x !== this.state.x /* || tryUp() === tryLeft() && tryUp() - tryLeft() !== 0 */) {
        //     this.setState({
        //         x: this.state.x + 1,
        //         direction: 'RIGHT'
        //     })
        // } else if (blinkyTarget.x - this.state.x === 0 && blinkyTarget.y - this.state.y === 0){
        //     this.setState({
        //         y: this.state.y + 1,
        //         direction: 'DOWN'
        //     })
        // }
    }

    componentDidMount(){
        const interval = setInterval(() => {
            // if (this.state.tracking) {
            //     // this.ghostTracking()
            // } else {
            //     this.ghostMove(this.state.direction)
            // }
            // this.scatter()
          }, 200)
        // setTimeout(() => {
        //     this.setState({
        //         tracking: true
        //     })
        // }, 3000);
        this.setState({
            interval: interval
        })
        this.scatter()
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    render(){
        return(
            <div className="ghosts" style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, /* transition: '.2s linear' */}}>
                {/* <p>This is Ghosts</p> */}
            </div>
        )
    }                           
}

export default Ghosts
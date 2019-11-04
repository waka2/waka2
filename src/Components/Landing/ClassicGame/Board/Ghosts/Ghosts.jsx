import React, {Component} from 'react'
import './ghosts.scss'

class Ghosts extends Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            x: 18,
            y: 11,
            direction: 'LEFT',
            tracking: false,
            dead: false,
            interval: null
        }
    }
    
    ghostRandomMove(){
        // let currentDirection = this.state.direction
        let directionRand = function rand(){
            // console.log('rand ran')
            // let directionNum
            // function generateNum() {
            //     switch (currentDirection){
            //         case 'LEFT':
            //             directionNum = 0
            //         case 'RIGHT':
            //             directionNum = 1
            //         case 'UP':
            //             directionNum = 2
            //         case 'DOWN':
            //             directionNum = 3
            //     }
            //     let num = Math.floor(Math.random() * 4)
            //     return (directionNum === num) ? generateNum() : num
            // }
            let direction
            switch(Math.floor(Math.random() * 4)){
                case 0:
                    direction = 'UP'
                    break
                case 1:
                    direction = 'DOWN'
                    break
                case 2:
                    direction = 'LEFT'
                    break
                case 3:
                    direction = 'RIGHT'
                    break
                default:
                    break
            }
            // if (direction === currentDirection) {
            //     console.log('same direction')
            //     rand()
            // }
            return direction
        }
        return directionRand()
    }

    checkGhostCollision(direction){
        switch(direction){
            case 'UP':
                if (this.props.board[this.state.y - 1][this.state.x] === 1) {
                    // let direction = directionRand()
                    if (!this.state.tracking){
                        let direction = this.ghostRandomMove()
                        this.setState({
                            direction: direction
                        })
                    }
                    return false
                }
                break
            case 'DOWN':
                if (this.props.board[this.state.y + 1][this.state.x] === 1) {
                    // let direction = directionRand()
                    if (!this.state.tracking){
                        let direction = this.ghostRandomMove()
                        this.setState({
                            direction: direction
                        })
                    }
                    return false
                }
            break
            case 'LEFT':
                if (this.props.board[this.state.y][this.state.x - 1] === 1) {
                    // let direction = directionRand()
                    if (!this.state.tracking){
                        let direction = this.ghostRandomMove()
                        this.setState({
                            direction: direction
                        })
                    }
                    return false
                }
                break
            case 'RIGHT':
                if (this.props.board[this.state.y][this.state.x + 1] === 1) {
                    // let direction = directionRand()
                    if (!this.state.tracking){
                        let direction = this.ghostRandomMove()
                        this.setState({
                            direction: direction
                        })
                    }
                    return false
                }
                break
            default:
                break
        }
    }

    ghostTracking(){
        // this.state.x - this.props.pacman[0].x
        // console.log(this.props.pacman[0].x - this.state.x)
        // this.setState({
        //     x: this.props.pacman[0].x - 1,
        //     y: this.props.pacman[0].y - 1
        // })
        // if (this.props.pacman[0].x - this.state.x < 0 || this.props.pacman[0].x - this.state.x > 0){
        //     console.log('x is not equal')
        // }
        // if (this.props.pacman[0].y - this.state.y < 0 || this.props.pacman[0].y - this.state.y > 0){
        //     console.log('y not equal')
        // }
        if (this.props.pacman[0].x - this.state.x < 0){
            if (this.checkGhostCollision('LEFT') === false){
                if (this.props.pacman[0].y - this.state.y > 0){
                    this.ghostMove('DOWN')
                } else if (this.props.pacman[0].y - this.state.y < 0){
                    this.ghostMove('UP')
                }
            } else {
                this.ghostMove('LEFT')
            }
        } else if (this.props.pacman[0].x - this.state.x > 0){
            if (this.checkGhostCollision('RIGHT') === false){
                if (this.props.pacman[0].y - this.state.y > 0){
                    this.ghostMove('DOWN')
                } else if (this.props.pacman[0].y - this.state.y < 0){
                    this.ghostMove('UP')
                }
            } else {
                this.ghostMove('RIGHT')
            }
        } else if (this.props.pacman[0].y - this.state.y < 0){
            if (this.checkGhostCollision('UP') === false){
                if (this.props.pacman[0].x - this.state.x > 0){
                    this.ghostMove('LEFT')
                } else if (this.props.pacman[0].x - this.state.x < 0){
                    this.ghostMove('RIGHT')
                }
            } else {
                this.ghostMove('UP')
            }
        } else if (this.props.pacman[0].y - this.state.y > 0){
            if (this.checkGhostCollision('DOWN') === false){
                if (this.props.pacman[0].x - this.state.x > 0){
                    this.ghostMove('LEFT')
                } else if (this.props.pacman[0].x - this.state.x < 0){
                    this.ghostMove('RIGHT')
                }
            } else {
                this.ghostMove('DOWN')
            }
        }
    }   

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

    componentDidMount(){
        const interval = setInterval(() => {
            if (this.state.tracking) {
                this.ghostTracking()
            } else {
                this.ghostMove(this.state.direction)
            }
          }, 200)
        setTimeout(() => {
            this.setState({
                tracking: true
            })
        }, 3000);
        this.setState({
            interval: interval
        })
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    render(){
        return(
            <div className="ghosts" >
                <div className="ghost blinky" style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, transition: '.2s linear'}}>
                    <div className="eyes">
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                    </div>
                    <div className="ghostTail"></div>
                </div>

                {/* <div className="ghost clyde">
                    <div className="eyes">
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                    </div>
                    <div className="ghostTail"></div>
                </div>

                <div className="ghost inky">
                    <div className="eyes">
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                    </div>
                    <div className="ghostTail"></div>
                </div>

                <div className="ghost pinky">
                    <div className="eyes">
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                        <div className="eye">
                            <div className="iris"></div>
                        </div>
                    </div>
                    <div className="ghostTail"></div>
                </div> */}
                
                {/* <div className="ghost scared" style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, transition: '.2s linear'}}>
                    <div className="eyes">                       
                            <div className="iris"></div>                                              
                            <div className="iris"></div>                        
                    </div>
                    <div class="holder">
                        <div class="smallLine smallLine1"></div>
                        <div class="smallLine smallLine2"></div>
                    </div>
                    <div className="ghostTail"></div>
                </div> */}

                {/* <div class="ghost only-eyes">
                    <div class="eyes">
                        <div class="eye">
                            <div class="iris"></div>
                        </div>
                        <div class="eye">
                            <div class="iris"></div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }                           
}

export default Ghosts
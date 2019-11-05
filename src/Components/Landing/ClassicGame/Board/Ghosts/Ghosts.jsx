import React, {Component} from 'react'
import './ghosts.scss'

class Ghosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            x: 13,
            y: 11,
            direction: 'LEFT',
            targetX: 0,
            targetY: 0,
            tracking: false,
            dead: false,
            interval: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id === 0 && (prevState.x !== this.state.x || prevState.y !== this.state.y)){
            this.props.whereBlinky(this.state.x, this.state.y)
        }
        if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.state.x === 0 && this.state.y === 14)){
            this.setState({x: 26})
        } else if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.state.x === 27 && this.state.y === 14)){
            this.setState({x: 1})
        }
    }

    checkGhostCollision(direction){
        switch(direction){
            case 'UP':
                if (this.props.board[this.state.y - 1][this.state.x] === 1 ||
                    (this.state.y - 1 === 10 && this.state.x === 12) ||
                    (this.state.y - 1 === 10 && this.state.x === 15) ||
                    (this.state.y - 1 === 22 && this.state.x === 12) ||
                    (this.state.y - 1 === 22 && this.state.x === 15)) {
                    return false
                }
                break
            case 'DOWN':
                if (this.props.board[this.state.y + 1][this.state.x] === 1 || this.props.board[this.state.y + 1][this.state.x] === 4) {
                    return false
                }
            break
            case 'LEFT':
                if (this.props.board[this.state.y][this.state.x - 1] === 1) {
                    return false
                }
                break
            case 'RIGHT':
                if (this.props.board[this.state.y][this.state.x + 1] === 1) {
                    return false
                }
                break
            default:
                break
        }
    }

    ghostMove(direction) {
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
        let target = null
        if (this.props.ghostsAfraid) {
            if (this.props.id === 0) {
                target = {x: 22, y: 0}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 1) {
                target = {x: 0, y: 0}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 2){
                target = {x: 22, y: 30}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 3){
                target = {x: 0, y: 30}
                this.setState({targetX: target.x, targetY: target.y})
            }
        } else {
            if (this.props.id === 0) {
                target = {x: 22, y: 0}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 1) {
                target = {x: 0, y: 0}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 2){
                target = {x: 22, y: 30}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 3){
                target = {x: 0, y: 30}
                this.setState({targetX: target.x, targetY: target.y})
            }
        }
        if (this.state.tracking) {
            if (this.props.id === 0 ) {
                target = {x: this.props.pacman[0].x, y: this.props.pacman[0].y}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 1) {
                if (this.props.pacman[0].direction === 'UP'){
                    target = {x: this.props.pacman[0].x - 4, y: this.props.pacman[0].y - 4}
                    this.setState({targetX: target.x, targetY: target.y})
                } else if (this.props.pacman[0].direction === 'DOWN'){
                    target = {x: this.props.pacman[0].x, y: this.props.pacman[0].y + 4}
                    this.setState({targetX: target.x, targetY: target.y})
                } else if (this.props.pacman[0].direction === 'LEFT'){
                    target = {x: this.props.pacman[0].x - 4, y: this.props.pacman[0].y}
                    this.setState({targetX: target.x, targetY: target.y})
                } else if (this.props.pacman[0].direction === 'RIGHT'){
                    target = {x: this.props.pacman[0].x + 4, y: this.props.pacman[0].y}
                    this.setState({targetX: target.x, targetY: target.y})
                } else {
                    target = {x: this.props.pacman[0].x + 4, y: this.props.pacman[0].y}
                    this.setState({targetX: target.x, targetY: target.y})
                }
            } else if (this.props.id === 2){
                // target = {x: this.props.pacman[0].x, y: this.props.pacman[0].y}
                let difX = this.props.pacman[0].x - this.props.blinkyX
                let difY = this.props.pacman[0].y - this.props.blinkyY
                // console.log(-Math.abs(difY))
                // console.log(Math.sign(difY))
                if (Math.sign(difX) === -1){
                    // this turns right into left
                    difX = Math.abs(Math.ceil(difX / 2))
                } else {
                    // this turns left into right
                    difX = -Math.abs(Math.ceil(difX / 2))
                }
                if (Math.sign(difY) === -1) {
                    // this turns down to up
                    difY = Math.abs(Math.ceil(difY / 2))
                } else {
                    // this turns up to down
                    difY = -Math.abs(Math.ceil(difY / 2))
                }
                // x: -5 means Blinky is RIGHT of pacman
                // y: -5 means Blink is DOWN of pacman
                target = {x: this.props.pacman[0].x - difX, y: this.props.pacman[0].y - difY}
                this.setState({targetX: target.x, targetY: target.y})
            } else if (this.props.id === 3) {
                if (Math.abs(this.props.pacman[0].x - this.state.x) <= 8 && Math.abs(this.props.pacman[0].y - this.state.y) <= 8){
                    target = {x: 0, y: 30}
                    this.setState({targetX: target.x, targetY: target.y})
                } else {
                    target = {x: this.props.pacman[0].x, y: this.props.pacman[0].y}
                    this.setState({targetX: target.x, targetY: target.y})
                }
            }
        }

        let tryDirection = (direction) => {
            let ghostX = this.state.x
            let ghostY = this.state.y
            switch(direction){
                case 'UP':
                    ghostY = ghostY - 1
                    break
                case 'DOWN':
                    ghostY = ghostY + 1
                    break
                case 'LEFT':
                    ghostX = ghostX - 1
                    break
                case 'RIGHT':
                    ghostX = ghostX + 1
                    break
                default:
                    break
                }
            let stepsAway = Math.pow(Math.abs(ghostX - target.x), 2) + Math.pow(Math.abs(ghostY - target.y), 2)
            return stepsAway
        }

        let tryAll = [
            {
                result: tryDirection('UP'),
                direction: 'UP'
            },
            {
                result: tryDirection('DOWN'),
                direction: 'DOWN'
            },
            {
                result: tryDirection('LEFT'),
                direction: 'LEFT'
            },
            {
                result: tryDirection('RIGHT'),
                direction: 'RIGHT'
            }
        ]

        let getOppositeDirection = (direction) => {
            let oppositeDirections = [
                {
                    direction: 'UP',
                    opposite: 'DOWN'
                },
                {
                    direction: 'DOWN',
                    opposite: 'UP'
                },
                {
                    direction: 'LEFT',
                    opposite: 'RIGHT'
                },
                {
                    direction: 'RIGHT',
                    opposite: 'LEFT'
                }
            ]
            let opposite = null
            oppositeDirections.forEach(el => {
                if (el.direction === direction){
                    opposite = el.opposite
                }
            })
            return opposite
        }

        let legalDirections = []

        tryAll.forEach(el => {
            if (this.checkGhostCollision(el.direction) !== false && getOppositeDirection(el.direction) !== this.state.direction){
                legalDirections.push(el)
            }
        })
        
        legalDirections.sort(function(a, b){return a.result-b.result})

        // priority: UP, LEFT, DOWN, RIGHT
        let chosenDirection = null
        if (legalDirections.length > 1) {
            if (legalDirections[0].result === legalDirections[1].result){
                if (legalDirections[0].direction === 'UP' || legalDirections[1].direction === 'UP'){
                    chosenDirection = 'UP'
                } else if ((legalDirections[0].direction === 'LEFT' || legalDirections[1].direction === 'LEFT') && (chosenDirection === null)){
                    chosenDirection = 'LEFT'
                } else if ((legalDirections[0].direction === 'DOWN' || legalDirections[1].direction === 'DOWN') && (chosenDirection === null)){
                    chosenDirection = 'DOWN'
                } else if ((legalDirections[0].direction === 'RIGHT' || legalDirections[1].direction === 'RIGHT') && (chosenDirection === null)){
                    chosenDirection = 'RIGHT'
                }
            } else {
                chosenDirection = legalDirections[0].direction
            }
        } else {
            chosenDirection = legalDirections[0].direction
        }
        this.ghostMove(chosenDirection)
    }

    componentDidMount(){
        const interval = setInterval(() => {
            this.scatter()
          }, 200)
        setTimeout(() => {
            this.setState({
                tracking: true
            })
        }, 7000);
        this.setState({
            interval: interval
        })
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    render(){
        return(
            <>
            {/* <div className="target" style={{top: `${this.state.targetY * 20}px`, left: `${this.state.targetX * 20}px`, background: `${this.props.id === 0 ? 'red' : this.props.id === 1 ? 'pink': this.props.id === 2 ? 'lightblue' : 'orange'}`, transition: '.2s linear'}}/> */}
            <div className="ghosts" >
                <div className={`ghost ${this.props.id === 0 ? 'blinky' : this.props.id === 1 ? 'pinky': this.props.id === 2 ? 'inky' : 'clyde'}`} style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, transition: '.2s linear'}}>
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
                </div> */}

                {/* <div className="ghost inky">
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

                {/* <div className="ghost pinky">
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
            </>
        )
    }                           
}

export default Ghosts
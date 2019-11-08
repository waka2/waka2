import React, {Component} from 'react'
import './ghosts.scss'

class Ghosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            x: this.props.id === 0 ? 13 : this.props.id === 1 ? 14 : this.props.id === 2 ? 12 : 16,
            y: this.props.id === 0 ? 11 : 14,
            initialSpawnX: this.props.id === 0 ? 14 : this.props.id === 1 ? 14 : this.props.id === 2 ? 12 : 16,
            initialSpawnY: 14,
            direction: 'LEFT',
            targetX: 0,
            targetY: 0,
            tracking: false,
            dead: false,
            isSpawned: false,
            interval: null,
            ghostSpeed: 200,
            canDie: false,
            animation: true
        }
    }

    getOppositeDirectionRedux = (direction) => {
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

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.id === 0 && (prevState.x !== this.state.x || prevState.y !== this.state.y)){
            this.props.whereBlinky(this.state.x, this.state.y)
        }
        if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.state.x === 0 && this.state.y === 14)){
            this.setState({x: 26, animation: false})
        } else if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.state.x === 27 && this.state.y === 14)){
            this.setState({x: 1, animation: false})
        }
        // if (!this.props.pacmanAlive && this.props.pacmanAlive !== prevProps.pacmanAlive){
        //     this.setState({x: this.state.initialX, y: this.state.initialY})
        //     this.respawn()
        // }
        if (prevState.x !== this.state.x && this.state.x === 26){
           setTimeout(() => {
                this.setState({animation: true})
           }, 200)
        }
        if (prevState.x !== this.state.x && this.state.x === 1){
            setTimeout(() => {
                this.setState({animation: true})
           }, 200)
        }
        if (this.state.dead && this.state.dead !== prevState.dead){
            clearInterval(this.state.interval)
            await this.setState({
                direction: this.getOppositeDirectionRedux(this.state.direction),
                ghostSpeed: 100
            })
            const interval = setInterval(() => {
                if (this.state.isSpawned){
                    this.scatter()
                }
              }, this.state.ghostSpeed)
            this.setState({
                interval: interval
            })
        }
        if (!this.state.dead && this.state.dead !== prevState.dead){
            clearInterval(this.state.interval)
            await this.setState({
                direction: this.getOppositeDirectionRedux(this.state.direction),
                ghostSpeed: 200
            })
            const interval = setInterval(() => {
                if (this.state.isSpawned){
                    this.scatter()
                }
              }, this.state.ghostSpeed)
            this.setState({
                interval: interval
            })
        }
        if (this.props.ghostsAfraid !== prevProps.ghostsAfraid && this.props.ghostsAfraid === true){
            clearInterval(this.state.interval)
            await this.setState({
                direction: this.getOppositeDirectionRedux(this.state.direction),
                ghostSpeed: 400,
                canDie: true
            })
            const interval = setInterval(() => {
                if (this.state.isSpawned){
                    this.scatter()
                }
              }, this.state.ghostSpeed)
            this.setState({
                interval: interval
            })
        }
        if (this.props.ghostsAfraid !== prevProps.ghostsAfraid && this.props.ghostsAfraid === false){
            clearInterval(this.state.interval)
            await this.setState({
                ghostSpeed: 200
            })
            const interval = setInterval(() => {
                if (this.state.isSpawned){
                    this.scatter()
                }
              }, this.state.ghostSpeed)
            this.setState({
                interval: interval
            })
        }    
        if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.state.x === this.state.initialSpawnX && this.state.y === this.state.initialSpawnY)){
            this.respawn()
        }

        // setTimeout(() => {
        //     if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.props.pacman[0].x === this.state.x && this.props.pacman[0].y === this.state.y)){
        //         if (this.props.ghostsAfraid && !this.state.dead){
        //             this.setState({
        //                 dead: true
        //             })
        //             this.props.addPoints(200)
        //         } else {
        //             if (!this.state.dead || !this.state.canDie){
        //                 this.props.subtractLife()
        //                 this.props.resetPacman()
        //             }
        //         }
        //     }
        // }, 3000)
        if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.props.pacman[0].x === this.state.x && this.props.pacman[0].y === this.state.y)){
            if (this.props.ghostsAfraid && !this.state.dead){
                this.setState({
                    dead: true
                })
                this.props.addPoints(200)
            } else {
                if (!this.state.dead || !this.state.canDie){
                    this.props.subtractLife()
                    this.props.resetPacman()
                }
            }
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
                    if (this.props.board[this.state.y + 1][this.state.x] === 4 && this.state.dead) break
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

    getTarget = (id) => {
        if (this.state.dead) return {x: this.state.initialSpawnX, y: this.state.initialSpawnY}
        switch(id){
            case 0:
                // Blinky
                if (this.state.tracking && !this.props.ghostsAfraid) return {x: this.props.pacman[0].x, y: this.props.pacman[0].y}
                else return {x: 22, y: 0}
            case 1:
                // Pinky
                if (this.state.tracking && !this.props.ghostsAfraid) {
                    switch(this.props.pacman[0].direction){
                        case 'UP':
                            return {x: this.props.pacman[0].x - 4, y: this.props.pacman[0].y - 4}
                        case 'DOWN':
                            return {x: this.props.pacman[0].x, y: this.props.pacman[0].y + 4}
                        case 'LEFT':
                            return {x: this.props.pacman[0].x - 4, y: this.props.pacman[0].y}
                        case 'RIGHT':
                            return {x: this.props.pacman[0].x + 4, y: this.props.pacman[0].y}
                        default:
                            return {x: this.props.pacman[0].x + 4, y: this.props.pacman[0].y}
                    }
                }
                else return {x: 0, y: 0}
            case 2:
                // Inky
                if (this.state.tracking && !this.props.ghostsAfraid) {
                    let difX = this.props.pacman[0].x - this.props.blinkyX
                    let difY = this.props.pacman[0].y - this.props.blinkyY
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
                    return {x: this.props.pacman[0].x - difX, y: this.props.pacman[0].y - difY}
                    }
                else return {x: 22, y: 30}
            case 3:
                // Clyde
                if (this.state.tracking && !this.props.ghostsAfraid){
                    if (Math.abs(this.props.pacman[0].x - this.state.x) <= 8 && Math.abs(this.props.pacman[0].y - this.state.y) <= 8){
                        return {x: 0, y: 30}
                    } else {
                        return {x: this.props.pacman[0].x, y: this.props.pacman[0].y}
                    }
                }
                else return {x: 0, y: 30}
            default:
                break
        }
    }

    scatter = () => {
        let target = this.getTarget(this.props.id)
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

    respawn = async () => {
        this.setState({dead: false, isSpawned: false, canDie: false})
        this.spawn()
    }

    spawn = () => {
        if (this.props.id === 0 && this.state.dead) {
            setTimeout(() => this.ghostMove('UP'), 200)
            setTimeout(() => this.ghostMove('UP'), 400)
            setTimeout(() => this.ghostMove('UP'), 600)
            setTimeout(() => this.setState({isSpawned: true}), 800)
        }
        if (this.props.id === 1) {
            if (this.state.dead){
                setTimeout(() => this.ghostMove('UP'), 200)
                setTimeout(() => this.ghostMove('UP'), 400)
                setTimeout(() => this.ghostMove('UP'), 600)
                setTimeout(() => this.setState({isSpawned: true}), 800)
            } else {
                setTimeout(() => {
                    setTimeout(() => this.ghostMove('UP'), 200)
                    setTimeout(() => this.ghostMove('UP'), 400)
                    setTimeout(() => this.ghostMove('UP'), 600)
                    setTimeout(() => this.setState({isSpawned: true}), 800)
                }, 7000)
            }
        } else if (this.props.id === 2) {
            if (this.state.dead){
                setTimeout(() => this.ghostMove('RIGHT'), 200)
                setTimeout(() => this.ghostMove('UP'), 400)
                setTimeout(() => this.ghostMove('UP'), 600)
                setTimeout(() => this.ghostMove('UP'), 800)
                setTimeout(() => this.setState({isSpawned: true}), 1000)
            } else {
                setTimeout(() => {
                    setTimeout(() => this.ghostMove('RIGHT'), 200)
                    setTimeout(() => this.ghostMove('UP'), 400)
                    setTimeout(() => this.ghostMove('UP'), 600)
                    setTimeout(() => this.ghostMove('UP'), 800)
                    setTimeout(() => this.setState({isSpawned: true}), 1000)
                }, 14000)
            }
        } else if (this.props.id === 3) {
            if (this.state.dead){
                setTimeout(() => this.ghostMove('LEFT'), 200)
                setTimeout(() => this.ghostMove('LEFT'), 400)   
                setTimeout(() => this.ghostMove('UP'), 600)
                setTimeout(() => this.ghostMove('UP'), 800)
                setTimeout(() => this.ghostMove('UP'), 1000)
                setTimeout(() => this.setState({isSpawned: true}), 1200)
            } else {
                setTimeout(() => {
                    setTimeout(() => this.ghostMove('LEFT'), 200)
                    setTimeout(() => this.ghostMove('LEFT'), 400)   
                    setTimeout(() => this.ghostMove('UP'), 600)
                    setTimeout(() => this.ghostMove('UP'), 800)
                    setTimeout(() => this.ghostMove('UP'), 1000)
                    setTimeout(() => this.setState({isSpawned: true}), 1200)
                }, 21000)
            }
        }
    }

    resetGhosts = () => {
        const newCoords = [{x: 13, y: 11}]
        this.setState({
            coords: newCoords
        })
    }

    eyeDirection = (direction) => {
        // const ghost = document.getElementById('iris')
    }

    componentDidMount(){
        this.spawn()
        if (this.props.id === 0) this.setState({isSpawned: true})
        const interval = setInterval(() => {
            if (this.state.isSpawned){
                this.scatter()
            }
          }, this.state.ghostSpeed)
        setTimeout(() => {
            this.setState({
                tracking: true
            })
        }, 7000);
        this.setState({
            interval: interval
        })
    }

    // componentDidUpdate = prevState => {
    //     setTimeout(() => {
    //         if ((prevState.x !== this.state.x || prevState.y !== this.state.y) && (this.props.pacman[0].x === this.state.x && this.props.pacman[0].y === this.state.y)){
    //             this.resetGhosts()
    //             this.props.subtractLife()
    //             this.props.resetPacman()
    //         } 
    //     }, 3000)
    // }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    render(){
        let ghostTarget = this.getTarget(this.props.id)
        return(
            <>
            {/* <div className="target" style={{top: `${ghostTarget.y * 20}px`, left: `${ghostTarget.x * 20}px`, background: `${this.props.id === 0 ? 'red' : this.props.id === 1 ? 'pink': this.props.id === 2 ? 'lightblue' : 'orange'}`, transition: '.2s linear'}}/> */}
            <div className="ghosts">
                {this.state.dead ? 
                    <div className="ghost only-eyes"
                        style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, transition: this.state.animation ? `${this.state.ghostSpeed/1000}s linear` : ''}}>
                        <div className="eyes">
                            <div className="eye">
                                <div className="iris"></div>
                            </div>
                            <div className="eye">
                                <div className="iris"></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`ghost
                                    ${this.props.id === 0 ? 'blinky' : this.props.id === 1 ? 'pinky': this.props.id === 2 ? 'inky' : 'clyde'}
                                    ${this.props.ghostsAfraid === true && this.state.canDie === true ? 'scared' : ''}
                                    `}
                        style={{top: `${this.state.y * 20}px`, left: `${this.state.x * 20}px`, transition: this.state.animation ? `${this.state.ghostSpeed/1000}s linear` : ''}}>
                        <div className="eyes">
                            <div className="eye">
                                <div id="iris" className="iris"></div>
                            </div>
                            <div className="eye">
                                <div id="iris" className="iris"></div>
                            </div>
                        </div>
                        <div className="ghostTail"></div>
                    </div>
                }
                
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

                
                </div>
            </>
        )
    }                           
}

export default Ghosts
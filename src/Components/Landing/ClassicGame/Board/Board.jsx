import React, {Component} from 'react'
import PacMan from './PacMan/PacMan'
import Ghosts from './Ghosts/Ghosts'
import Sound from 'react-sound'
import waka from '../../../../assets/PacmanWakaWaka04.wav'
import finish from '../../../../assets/Mortal_Kombat_Finish_Him_Sound.wav'
import intro from '../../../../assets/Pacman_Intro.wav'
import './board.scss'

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            pacman: [{id: 0, x: 13, y: 23, direction: ''}],
            interval: null,
            ghostsAfraid: false,
            toggleSound: true,
            toggleWaka: false,
            togglePower: false,
            blinkyX: 0,
            blinkyY: 0,
            pacmanAlive: true,
            // 0 = path
            // 1 = wall
            // 2 = pellet
            // 3 = power-pellet
            // 4 = ghost spawn door
            board: [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
                [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
                [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
                [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],         
                [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
                [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
                [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
                [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
                [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
                [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
                [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
                [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
                [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
                [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
                [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
                [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
                [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
                [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
                [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
        }
    }

    componentDidMount() {
        if (this.props.lives.length === 0) {
            this.setState({
                toggleWaka: false
            })
        }
        document.getElementById('board').focus();
        const interval = setInterval(() => {
            if (this.state.pacman[0].direction === 'UP'){
              this.movePacMan({keyCode: 38})
            }
            if (this.state.pacman[0].direction === 'DOWN'){
              this.movePacMan({keyCode: 40})
            }
            if (this.state.pacman[0].direction === 'LEFT'){
              this.movePacMan({keyCode: 37})
            }
            if (this.state.pacman[0].direction === 'RIGHT'){
              this.movePacMan({keyCode: 39})
            }
          }, 200)
            this.setState({
                interval: interval
            })
    }
    

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.pacman[0].x === 0 && this.state.pacman[0].y === 14) && (prevState.pacman[0].x !== this.state.pacman[0].x || prevState.pacman[0].y !== this.state.pacman[0].y) && (this.state.pacmanAlive === true)){
            // this.setState({pacmanAlive: false})
            this.setState({
                pacmanAlive: false,
                pacman: this.state.pacman.map(el => {
                    return el.id === 0 ? {...el, x: 26} : el
                }),
            })
            setTimeout(() => {
                this.setState({pacmanAlive: true})
            }, 100)
        } else if ((this.state.pacman[0].x === 27 && this.state.pacman[0].y === 14) && (prevState.pacman[0].x !== this.state.pacman[0].x || prevState.pacman[0].y !== this.state.pacman[0].y) && (this.state.pacmanAlive === true)){
            this.setState({
                pacmanAlive: false,
                pacman: this.state.pacman.map(el => {
                    return el.id === 0 ? {...el, x: 1} : el
                }),
            })
            setTimeout(() => {
                this.setState({pacmanAlive: true})
            }, 100)
        }
        
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    resetPacman = () => {
        const newPac = [{id: 0, x: 13, y: 23, direction: 'RIGHT'}]
        this.setState({
            pacman: newPac,
            pacmanAlive: false
        })
        setTimeout(() => {
            this.setState({pacmanAlive: true})
        }, 10)
    }

    resetBoard = () => {
        const newBoard = 
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],         
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
            [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
        this.setState({
            board: newBoard
        })
    }

    whereBlinky = (x, y) => {
        this.setState({
            blinkyX: x,
            blinkyY: y
        })
    }

    eatPellet(direction, id){
        if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x] === 2) {
            this.props.addPoints(10)
            this.props.addHiddenPoints(10)
            this.state.board[this.state.pacman[id].y].splice(this.state.pacman[id].x, 1, 0)
            if (this.state.toggleWaka === false) {
                this.setState({
                    toggleWaka: true
                })
            }
        } else {
            this.setState({
                toggleWaka: false
            })
        }
    }

    ghostsAfraid = () => {
        this.setState({
            ghostsAfraid: true
        })
        setTimeout(() => {
            this.setState({
                ghostsAfraid: false
            })
        }, 7000)
    }

    eatPowerPellet(id){
        if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x] === 3) {
            this.setState({
                togglePower: true
            })
            setInterval(() => {
                this.setState({
                    togglePower: false
                })
            }, 2000)
            this.props.addPoints(50)
            this.props.addHiddenPoints(50)
            this.state.board[this.state.pacman[id].y].splice(this.state.pacman[id].x, 1, 0)
            this.ghostsAfraid()
        }
        
    }
    
    checkCollision(direction, id) {
        switch(direction){
            case 'UP':
                if (this.state.board[this.state.pacman[id].y - 1][this.state.pacman[id].x] === 1) {
                    this.setState({
                        toggleWaka: false
                    })
                    return false
                } else {
                    this.setState({
                        toggleWaka: true
                    })
                }
                break
            case 'DOWN':
                if (this.state.board[this.state.pacman[id].y + 1][this.state.pacman[id].x] === 1){
                    this.setState({
                        toggleWaka: false
                    })
                    return false
                } else {
                    this.setState({
                        toggleWaka: true
                    })
                }
                if (this.state.board[this.state.pacman[id].y + 1][this.state.pacman[id].x] === 4){
                    this.setState({
                        toggleWaka: false
                    })
                    return false
                } else {
                    this.setState({
                        toggleWaka: true
                    })
                }
                break
            case 'LEFT':
                if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x - 1] === 1){
                    this.setState({
                        toggleWaka: false
                    })
                    return false
                } else {
                    this.setState({
                        toggleWaka: true
                    })
                }
                break
            case 'RIGHT':
                if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x + 1] === 1){
                    this.setState({
                        toggleWaka: false
                    })
                    return false
                } else {
                    this.setState({
                        toggleWaka: true
                    })
                }
                break
            default:
                    this.setState({
                        toggleWaka: true
                    })
                break
        }
    }

    movePacMan(e, id) {
        if (!id) id = 0
        switch (e.keyCode){
            case 38:
                // UP
                if (this.checkCollision('UP', id) === false) break
                this.eatPellet('UP', id)
                this.eatPowerPellet(id)
                this.setState({
                    pacman: this.state.pacman.map(el => {
                        return el.id === id ? {...el, y: el.y - 1, direction: 'UP'} : el
                    }),
                })
                break
            case 40:
                // DOWN
                if (this.checkCollision('DOWN', id) === false) {
                    break
                }
                this.eatPellet('DOWN', id)
                this.eatPowerPellet(id)
                this.setState({
                    pacman: this.state.pacman.map(el => {
                        return el.id === id ? {...el, y: el.y + 1, direction: 'DOWN'} : el
                    }),
                })
                break
            case 37:
                // LEFT
                if (this.checkCollision('LEFT', id) === false) break
                this.eatPellet('LEFT', id)
                this.eatPowerPellet(id)
                this.setState({
                    pacman: this.state.pacman.map(el => {
                        return el.id === id ? {...el, x: el.x - 1, direction: 'LEFT'} : el
                    }),
                })
                break
            case 39:
                // RIGHT
                if (this.checkCollision('RIGHT', id) === false) break
                this.eatPellet('RIGHT', id)
                this.eatPowerPellet(id)
                this.setState({
                    pacman: this.state.pacman.map(el => {
                        return el.id === id ? {...el, x: el.x + 1, direction: 'RIGHT'} : el
                    }),
                })
                break
            default:
                break
        }
    }


    // if (this.state.yCoord === 0 || this.state.board[this.state.yCoord - 1][this.state.xCoord] === 1) break
    //     if (this.state.board[this.state.yCoord][this.state.xCoord] === 2) {
    //       this.eatPellet(this.state.xCoord, this.state.yCoord)
    //     }
    //     if (this.state.xCoord === this.state.ghosts[0].x && this.state.yCoord - 1 === this.state.ghosts[0].y) {
    //       this.resetGame()
    //       break
    //     }
    //     this.setState({yCoord: this.state.yCoord - 1, direction: 'UP'})
    //     break

    render(){
        // console.log(this.props)
        let boardMapped = this.state.board.map((row, rowInd, rowArr) => {
            return (
              <div key={rowInd} className={`row row${rowInd}`}>
                {row.map((block, blockInd, blockArr) => {
                    // console.log(rowArr[rowInd + 1][blockInd])
                    // className: wallBottom, wall
                  if (block === 0) {
                        return <div key={rowInd + blockInd} className="path"/>
                  } else if (block === 1){
                    // if (blockArr[blockInd - 1]) {
                    //     if (blockArr[blockInd - 1] !== 1)
                    //         return <div key={rowInd + blockInd} className="wall-left"/>
                    //     else {
                    //         return <div key={rowInd + blockInd} className="wall"/>
                    //     }
                    // } else {
                    //     return <div key={rowInd + blockInd} className="wall"/>
                    // }
                        return <div key={rowInd + blockInd} className="wall"/>
                  } else if (block === 2) {
                        return <div key={rowInd + blockInd} className="pellet"/>
                  } else if (block === 3) {
                        return <div key={rowInd + blockInd} className="power-pellet"/>
                  } else if (block === 4) {
                        return <div key={rowInd + blockInd} className="ghost-door"/>
                  } else {
                      return <></>
                  }
                })}
              </div>
            )
          })

        return(
            <div id="board" className="board" tabIndex="0" onKeyDown={(e) => {
                if (this.state.toggleSound === true) {
                    this.setState({
                        toggleSound: false
                    })
                }
                this.movePacMan(e)}}>
                {/* Render the waka-waka so long as Pac is eating the pellet */}
                {/* {this.state.toggleWaka ? <Sound url={waka} loop={true} playStatus={Sound.status.PLAYING} autoLoad={true}  volume={5}/> : null} */}
                {/* {this.state.togglePower ? <Sound url={finish} loop={false} playStatus={Sound.status.PLAYING} autoLoad={true}  /> : null} */}

                {/* If we hit either the win or loose condition, remove Pacman and the Ghosts. */}
                {this.props.hiddenPoints < 2600 && this.props.lives.length > 0? 
                <>
                    <PacMan pacmanAlive={this.state.pacmanAlive} direction={this.state.pacman[0].direction} x={this.state.pacman[0].x} y={this.state.pacman[0].y} subtractLife={this.props.subtractLife} resetPacman={this.resetPacman} />
                    {/* Wait to Render the ghosts until the Pacman intro finishes, and the user starts using the inputs */}
                    {this.state.toggleSound === false ?
                        <>
                            <Ghosts id={0} addPoints={this.props.addPoints} ghostsAfraid={this.state.ghostsAfraid} whereBlinky={this.whereBlinky} pacman={this.state.pacman} board={this.state.board} subtractLife={this.props.subtractLife} resetPacman={this.resetPacman} /> 
                            <Ghosts id={1} addPoints={this.props.addPoints} ghostsAfraid={this.state.ghostsAfraid} pacman={this.state.pacman} board={this.state.board} subtractLife={this.props.subtractLife} resetPacman={this.resetPacman} /> 
                            <Ghosts id={2} addPoints={this.props.addPoints} ghostsAfraid={this.state.ghostsAfraid} blinkyX={this.state.blinkyX} blinkyY={this.state.blinkyY} pacman={this.state.pacman} board={this.state.board} subtractLife={this.props.subtractLife} resetPacman={this.resetPacman} /> 
                            <Ghosts id={3} addPoints={this.props.addPoints} ghostsAfraid={this.state.ghostsAfraid} pacman={this.state.pacman} board={this.state.board} subtractLife={this.props.subtractLife} resetPacman={this.resetPacman} /> 
                        </>
                    : null}
                </>
                : null}
                {boardMapped}
            </div>
        )
    }                           
}

export default Board
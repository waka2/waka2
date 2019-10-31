import React, {Component} from 'react'
import PacMan from './PacMan/PacMan'
import Ghosts from './Ghosts/Ghosts'
import './board.scss'
import { throwStatement } from '@babel/types';

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            pacman: [{id: 0, x: 13, y: 23, direction: ''}],
            interval: null,
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

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    eatPellet(direction, id){
        if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x] === 2) {
            this.props.addPoints(10)
            this.state.board[this.state.pacman[id].y].splice(this.state.pacman[id].x, 1, 0)
        }
    }
    
    checkCollision(direction, id) {
        switch(direction){
            case 'UP':
                if (this.state.board[this.state.pacman[id].y - 1][this.state.pacman[id].x] === 1) {
                    return false
                }
                break
            case 'DOWN':
                if (this.state.board[this.state.pacman[id].y + 1][this.state.pacman[id].x] === 1){
                    return false
                }
                if (this.state.board[this.state.pacman[id].y + 1][this.state.pacman[id].x] === 4){
                    return false
                }
                break
            case 'LEFT':
                if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x - 1] === 1){
                    return false
                }
                break
            case 'RIGHT':
                if (this.state.board[this.state.pacman[id].y][this.state.pacman[id].x + 1] === 1){
                    return false
                }
                break
            default:
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
                this.setState({
                    pacman: this.state.pacman.map(el => {
                        return el.id === id ? {...el, y: el.y - 1, direction: 'UP'} : el
                    }),
                })
                break
            case 40:
                // DOWN
                if (this.checkCollision('DOWN', id) === false) break
                this.eatPellet('DOWN', id)
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
        // console.log(this.props.addPoints)
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
                  }
                })}
              </div>
            )
          })
        return(
            <div id="board" className="board" tabIndex="0" onKeyDown={e => this.movePacMan(e)}>
                {/* <p>This is Board</p> */}
                <PacMan direction={this.state.pacman[0].direction} x={this.state.pacman[0].x} y={this.state.pacman[0].y}/>
                <Ghosts pacman={this.state.pacman} board={this.state.board}/>
                {boardMapped}
            </div>
        )
    }                           
}

export default Board
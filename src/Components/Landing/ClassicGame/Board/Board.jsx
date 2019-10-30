import React, {Component} from 'react'
import PacMan from './PacMan/PacMan'
// import Ghosts from './Ghosts/Ghosts'
import './board.scss'
import { throwStatement } from '@babel/types';

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            pacmanCoordsX: 13,
            pacmanCoordsY: 23,
            pacmanDirection: 'RIGHT',
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
                [1,3,1,0,0,1,2,1,0,0,0,1,2,1,1,2,1,0,0,0,1,2,1,0,0,1,3,1],
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
        const interval = setInterval(() => {
            if (this.state.pacmanDirection === 'UP'){
              this.movePacMan({keyCode: 38})
            }
            if (this.state.pacmanDirection === 'DOWN'){
              this.movePacMan({keyCode: 40})
            }
            if (this.state.pacmanDirection === 'LEFT'){
              this.movePacMan({keyCode: 37})
            }
            if (this.state.pacmanDirection === 'RIGHT'){
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

    eatPellet(direction){
        switch(direction){
            case 'UP':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX] === 2) {
                    this.props.addPoints(10)
                    this.state.board[this.state.pacmanCoordsY].splice(this.state.pacmanCoordsX, 1, 0)
                }
                break
            case 'DOWN':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX] === 2){
                    this.props.addPoints(10)
                    this.state.board[this.state.pacmanCoordsY].splice(this.state.pacmanCoordsX, 1, 0)
                }
                break
            case 'LEFT':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX] === 2){
                    this.props.addPoints(10)
                    this.state.board[this.state.pacmanCoordsY].splice(this.state.pacmanCoordsX, 1, 0)
                }
                break
            case 'RIGHT':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX] === 2){
                    this.props.addPoints(10)
                    this.state.board[this.state.pacmanCoordsY].splice(this.state.pacmanCoordsX, 1, 0)
                } 
                break
            default:
                break
        }
    }
    
    checkCollision(direction) {
        switch(direction){
            case 'UP':
                if (this.state.board[this.state.pacmanCoordsY - 1][this.state.pacmanCoordsX] === 1) {
                    return false
                }
                break
            case 'DOWN':
                if (this.state.board[this.state.pacmanCoordsY + 1][this.state.pacmanCoordsX] === 1){
                    return false
                }
                if (this.state.board[this.state.pacmanCoordsY + 1][this.state.pacmanCoordsX] === 4){
                    return false
                }
                break
            case 'LEFT':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX - 1] === 1){
                    return false
                }
                break
            case 'RIGHT':
                if (this.state.board[this.state.pacmanCoordsY][this.state.pacmanCoordsX + 1] === 1){
                    return false
                }
                break
            default:
                break
        }
    }

    movePacMan(e) {
        switch (e.keyCode){
            case 38:
                // UP
                if (this.checkCollision('UP') === false) break
                this.eatPellet('UP')
                this.setState({pacmanCoordsY: this.state.pacmanCoordsY - 1, pacmanDirection: 'UP'})
                break
            case 40:
                // DOWN
                if (this.checkCollision('DOWN') === false) break
                this.eatPellet('DOWN')
                this.setState({pacmanCoordsY: this.state.pacmanCoordsY + 1, pacmanDirection: 'DOWN'})
                break
            case 37:
                // LEFT
                if (this.checkCollision('LEFT') === false) break
                this.eatPellet('LEFT')
                this.setState({pacmanCoordsX: this.state.pacmanCoordsX - 1, pacmanDirection: 'LEFT'})
                break
            case 39:
                // RIGHT
                if (this.checkCollision('RIGHT') === false) break
                this.eatPellet('RIGHT')
                this.setState({pacmanCoordsX: this.state.pacmanCoordsX + 1, pacmanDirection: 'RIGHT'})
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
            <div className="board" tabIndex="0" onKeyDown={e => this.movePacMan(e)}>
                {/* <p>This is Board</p> */}
                <PacMan direction={this.state.pacmanDirection} x={this.state.pacmanCoordsX} y={this.state.pacmanCoordsY}/>
                {/* <Ghosts /> */}
                {boardMapped}
            </div>
        )
    }                           
}

export default Board
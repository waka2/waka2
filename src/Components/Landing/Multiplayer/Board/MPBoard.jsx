import React, {Component} from 'react'
import io from 'socket.io-client'
import axios from 'axios';
import './MPboard.scss';
const {REACT_APP_SOCKET_CONNECT} = process.env


// To Dos
// [ ] -  Finishing hooking up socket update function
// [ ] -  Set up cleanup function (unassign ids) at end of the game.
class MPBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pacman: [],
            interval: [],
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
        this.socket = io.connect(REACT_APP_SOCKET_CONNECT)
        this.socket.on('room response', data => this.updateGame(data))
    }

    componentDidMount = () => {
        this.socket.emit('join room', 1)
        this.socket.on('room response', data => this.updateGame(data))

        // Call the database to get a unique id assigned.
        axios.get('/api/newplayer').then(res => {
            const { player_id, usera, userb } = res.data.player;
            const pacArr = [{id: player_id, x: 13, y: 23, user: `${usera} ${userb}`, direction: '', interval: null}]
            this.setState({
                pacman: pacArr
            })
        })

        const newPac = this.state.pacman;
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
        
        newPac[0] = {...newPac[0], interval: interval}

          this.setState({
              pacman: newPac
          })
    }

    blastGame = () => {
        this.socket.emit(
            'blast to room socket',
            {
                room: 1,
                board: this.state.board,
                pacman: this.state.pacman[0],
            }
        )
    }

    updateGame = (data) => {
        const newBoard = data.board;
        const statePac = this.state.pacman;

        const newPac = data.pacman;
        const index = statePac.findIndex(newPac[0].player_id)
        statePac[index] = newPac;

        this.setState({
            pacman: statePac,
            board: newBoard
        })
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

    render() {
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
        return (
            <div className="MPboard">
                {/* <h1>Multiplayer Board</h1>
                <button onClick={() => this.blastGame()}>Send</button> */}
                {boardMapped}
            </div>
        )
    }
}

export default MPBoard;
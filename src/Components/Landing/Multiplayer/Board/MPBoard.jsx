import React, {Component} from 'react'
import io from 'socket.io-client'
import axios from 'axios';
import PacMan from './PacMan/PacMan'
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
            currentPlayerId: 0,
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

    componentDidMount = async () => {
        this.socket.emit('join room', 1)
        this.socket.on('room response', data => this.updateGame(data))

        // Call the database to get a unique id assigned.
        const result = await axios.get('/api/newplayer')
        const { player_id, usera, userb } = result.data.player;
        console.log(`player id: ${player_id}`)
        const stateArr = this.state.pacman;
        stateArr.push({id: player_id, x: 13, y: 23, user: `${usera} ${userb}`, direction: '', interval: null})
        // stateArr.push({id: 36, x: 14, y: 23, user: `${usera} ${userb}`, direction: '', interval: null})
        this.setState({
            pacman: stateArr
        })

        this.checkInterval();
        if (this.pacman) {
            this.checkInterval()
        }
    }

    checkInterval = () => {
        const newPac = this.state.pacman;
        for (let i = 0; i < this.state.pacman.length; i++) {
            const index = newPac[i].id
            document.getElementById('MPboard').focus()

            const interval = setInterval(() => {
                if (this.state.pacman[i].direction === 'UP'){
                    this.movePacMan({keyCode: 38}, index)
                }
                if (this.state.pacman[i].direction === 'DOWN'){
                    this.movePacMan({keyCode: 40}, index)
                }
                if (this.state.pacman[i].direction === 'LEFT'){
                    this.movePacMan({keyCode: 37}, index)
                }
                if (this.state.pacman[i].direction === 'RIGHT'){
                    this.movePacMan({keyCode: 39}, index)
                }
            }, 200)
            
            newPac[i] = {...newPac[i], interval: interval}
    
              this.setState({
                  pacman: newPac
              })
        }
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
        console.log(data)
        const newBoard = data.board;
        const statePac = this.state.pacman;

        const newPac = data.pacman;
        const index = statePac.map(function(x) {return x.id; }).indexOf(newPac.id);

        if (index) {
            statePac[index] = newPac;
        } else {
            statePac.push(newPac);
        }

        this.setState({
            pacman: statePac,
            board: newBoard
        })
    }

    checkCollision(direction, id) {
        const index = this.state.pacman.map(function(x) {return x.id; }).indexOf(id);
        switch(direction){
            case 'UP':
                if (this.state.board[this.state.pacman[index].y - 1][this.state.pacman[index].x] === 1) {
                    return false
                }
                break
            case 'DOWN':
                if (this.state.board[this.state.pacman[index].y + 1][this.state.pacman[index].x] === 1){
                    return false
                }
                if (this.state.board[this.state.pacman[index].y + 1][this.state.pacman[index].x] === 4){
                    return false
                }
                break
            case 'LEFT':
                if (this.state.board[this.state.pacman[index].y][this.state.pacman[index].x - 1] === 1){
                    return false
                }
                break
            case 'RIGHT':
                if (this.state.board[this.state.pacman[index].y][this.state.pacman[index].x + 1] === 1){
                    return false
                }
                break
            default:
                break
        }
    }

    movePacMan(e, id) {
            switch (e.keyCode){
                case 38:
                    // UP
                    if (this.checkCollision('UP', id) === false) break
                    // this.eatPellet('UP', i)
                    this.setState({
                        pacman: this.state.pacman.map(el => {
                            return el.id === id ? {...el, y: el.y - 1, direction: 'UP'} : el
                        }),
                    })
                    this.blastGame()
                    break
                    case 40:
                        // DOWN
                        if (this.checkCollision('DOWN', id) === false) break
                        // this.eatPellet('DOWN', i)
                        this.setState({
                            pacman: this.state.pacman.map(el => {
                                return el.id === id ? {...el, y: el.y + 1, direction: 'DOWN'} : el
                            }),
                        })
                        break
                        case 37:
                            // LEFT
                            if (this.checkCollision('LEFT', id) === false) break
                            // this.eatPellet('LEFT', i)
                            this.setState({
                                pacman: this.state.pacman.map(el => {
                                    return el.id === id ? {...el, x: el.x - 1, direction: 'LEFT'} : el
                                }),
                            })
                            break
                            case 39:
                                // RIGHT
                                if (this.checkCollision('RIGHT', id) === false) break
                                // this.eatPellet('RIGHT', i)
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
                  if (block === 0) {
                        return <div key={rowInd + blockInd} className="path"/>
                  } else if (block === 1){
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
          let pacMap = this.state.pacman.map((el, index) => {
              console.log(this.state.pacman)
              return (
                  <div>
                  <PacMan direction={el.direction} x={el.x} y={el.y} />
              </div>
                  )
          })
        return (
            <div tabIndex="0" id='MPboard' className="MPboard" onKeyDown={(e) => this.movePacMan(e, this.state.pacman[0].id)}>
                {/* {this.state.pacman.length !== 0 ?<PacMan direction={this.state.pacman[0].direction} x={this.state.pacman[0].x} y={this.state.pacman[0].y}/> 
                : null}
                {this.state.pacman[1] ?  <PacMan direction={this.state.pacman[1].direction} x={this.state.pacman[1].x + 1} y={this.state.pacman[1].y}/> : null } */}
                {boardMapped}
                {pacMap}
            </div>
        )
    }
}

export default MPBoard;
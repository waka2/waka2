import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import PacMan from "./PacMan/PacMan";
import "./MPboard.scss";
const { REACT_APP_SOCKET_CONNECT } = process.env;

// To Dos
// [ ] -  Finishing hooking up socket update function
// [ ] -  Set up cleanup function (unassign ids) at end of the game.
class MPBoard extends Component {
  constructor(props) {
    super(props);
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
    };
    this.socket = io.connect(REACT_APP_SOCKET_CONNECT);
    this.socket.on("room response", data => this.updateGame(data));
  }

  componentDidMount = async () => {
    // this.socket.emit('join room', 1)
    // this.socket.on('room response', data => this.updateGame(data))

    // Call the database to get a unique id assigned.
    const result = await axios.get("/api/newplayer");
    const { player_id} = result.data.player;
    const stateArr = this.state.pacman;
    stateArr.push({
      id: 0,
      x: 13,
      y: 23,
      user: `Player 1`,
      direction: "",
      interval: null
    });
    stateArr.push({
      id: 1,
      x: 13,
      y: 11,
      user: `Player 2`,
      direction: "",
      interval: null
    });
    this.setState({
      pacman: stateArr,
      currentPlayerId: player_id
    });

    this.checkInterval();
    if (this.pacman) {
      this.checkInterval();
    }
  };

  checkInterval = () => {
    const newPac = this.state.pacman;

    for (let i = 0; i < newPac.length; i++) {
      // const index = newPac[i].id
      document.getElementById("MPboard").focus();
      let interval = null;
      // W = 87
      // A = 65
      // S = 83
      // D = 68
      if (i === 0) {
        interval = setInterval(() => {
          if (this.state.pacman[i].direction === "UP") {
            this.movePacMan({ keyCode: 38 }, i);
          }
          if (this.state.pacman[i].direction === "DOWN") {
            this.movePacMan({ keyCode: 40 }, i);
          }
          if (this.state.pacman[i].direction === "LEFT") {
            this.movePacMan({ keyCode: 37 }, i);
          }
          if (this.state.pacman[i].direction === "RIGHT") {
            this.movePacMan({ keyCode: 39 }, i);
          }
        }, 200);
      } else {
        interval = setInterval(() => {
          if (this.state.pacman[i].direction === "UP") {
            this.movePacMan({ keyCode: 87 }, i);
          }
          if (this.state.pacman[i].direction === "DOWN") {
            this.movePacMan({ keyCode: 83 }, i);
          }
          if (this.state.pacman[i].direction === "LEFT") {
            this.movePacMan({ keyCode: 65 }, i);
          }
          if (this.state.pacman[i].direction === "RIGHT") {
            this.movePacMan({ keyCode: 68 }, i);
          }
        }, 200);
      }

      newPac[i] = { ...newPac[i], interval: interval };

      this.setState({
        pacman: newPac
      });
    }
  };

  blastGame = () => {
    this.socket.emit("blast to room socket", {
      room: 1,
      board: this.state.board,
      pacman: this.state.pacman[0]
    });
  };

  updateGame = data => {
    const newBoard = data.board;
    const statePac = this.state.pacman;

    const newPac = data.pacman;
    const index = this.state.pacman.findIndex(element => {
      return element.player_id === +newPac.player_id;
    });

    if (index !== -1) {
      statePac.splice(index, 1, newPac);
    }

    this.setState({
      pacman: statePac,
      board: newBoard
    });

    // W = 87
    // A = 65
    // S = 83
    // D = 68
    if (data.pacman.direction === "UP") {
      this.movePacMan({ keyCode: 38 }, data.pacman.player_id);
    }
    if (data.pacman.direction === "DOWN") {
      this.movePacMan({ keyCode: 40 }, data.pacman.player_id);
    }
    if (data.pacman.direction === "LEFT") {
      this.movePacMan({ keyCode: 37 }, data.pacman.player_id);
    }
    if (data.pacman.direction === "RIGHT") {
      this.movePacMan({ keyCode: 39 }, data.pacman.player_id);
    }
  };

  checkCollision = (direction, id) => {
    // const index = this.state.pacman.map(function(x) {return x.id; }).indexOf(id);

    switch (direction) {
      case "UP":
        if (
          this.state.board[this.state.pacman[id].y - 1][
            this.state.pacman[id].x
          ] === 1
        ) {
          return false;
        }
        break;
      case "DOWN":
        if (
          this.state.board[this.state.pacman[id].y + 1][
            this.state.pacman[id].x
          ] === 1
        ) {
          return false;
        }
        if (
          this.state.board[this.state.pacman[id].y + 1][
            this.state.pacman[id].x
          ] === 4
        ) {
          return false;
        }
        break;
      case "LEFT":
        if (
          this.state.board[this.state.pacman[id].y][
            this.state.pacman[id].x - 1
          ] === 1
        ) {
          return false;
        }
        break;
      case "RIGHT":
        if (
          this.state.board[this.state.pacman[id].y][
            this.state.pacman[id].x + 1
          ] === 1
        ) {
          return false;
        }
        break;
      default:
        break;
    }
  }

  movePacMan = (e, id) => {

    switch (e.keyCode) {
      case 87:
        // UP
        if (this.checkCollision("UP", id) === false) break;
        // this.eatPellet('UP', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id ? { ...el, y: el.y - 1, direction: "UP" } : el;
          })
        });
        break;
      case 38:
        // UP
        if (this.checkCollision("UP", id) === false) break;
        // this.eatPellet('UP', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id ? { ...el, y: el.y - 1, direction: "UP" } : el;
          })
        });
        // this.blastGame()
        break;
      case 83:
        // DOWN
        if (this.checkCollision("DOWN", id) === false) break;
        // this.eatPellet('DOWN', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, y: el.y + 1, direction: "DOWN" }
              : el;
          })
        });
        // this.blastGame()
        break;
      case 40:
        // DOWN
        if (this.checkCollision("DOWN", id) === false) break;
        // this.eatPellet('DOWN', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, y: el.y + 1, direction: "DOWN" }
              : el;
          })
        });
        // this.blastGame()
        break;
      case 65:
        // LEFT
        if (this.checkCollision("LEFT", id) === false) break;
        // this.eatPellet('LEFT', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, x: el.x - 1, direction: "LEFT" }
              : el;
          })
        });
        //  this.blastGame()
        break;
      case 37:
        // LEFT
        if (this.checkCollision("LEFT", id) === false) break;
        // this.eatPellet('LEFT', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, x: el.x - 1, direction: "LEFT" }
              : el;
          })
        });
        // this.blastGame()
        break;
      case 68:
        // RIGHT
        if (this.checkCollision("RIGHT", id) === false) break;
        // this.eatPellet('RIGHT', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, x: el.x + 1, direction: "RIGHT" }
              : el;
          })
        });
        //  this.blastGame()
        break;
      case 39:
        // RIGHT
        if (this.checkCollision("RIGHT", id) === false) break;
        // this.eatPellet('RIGHT', i)
        this.setState({
          pacman: this.state.pacman.map(el => {
            return el.id === id
              ? { ...el, x: el.x + 1, direction: "RIGHT" }
              : el;
          })
        });
        // this.blastGame()
        break;
      default:
        break;
    }
  };

  render() {
    let boardMapped = this.state.board.map((row, rowInd, rowArr) => {
      return (
        <div key={rowInd} className={`row row${rowInd}`}>
          {row.map((block, blockInd, blockArr) => {
            if (block === 0) {
              return <div key={rowInd + blockInd} className="pathM" />;
            } else if (block === 1) {
              return <div key={rowInd + blockInd} className="wallM" />;
            } else if (block === 2) {
              return <div key={rowInd + blockInd} className="pelletM" />;
            } else if (block === 3) {
              return <div key={rowInd + blockInd} className="power-pelletM" />;
            } else if (block === 4) {
              return <div key={rowInd + blockInd} className="ghost-doorM" />;
            } else return <></>
          })}
        </div>
      );
    });
    let pacMap = this.state.pacman.map((el, index) => {
      return (
        <div key={index}>
          <PacMan direction={el.direction} x={el.x} y={el.y} />
        </div>
      );
    });
    return (
      <div
        tabIndex="0"
        id="MPboard"
        className="MPboard"
        onKeyDown={(e) => {
            if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 37) {
                this.movePacMan(e, this.state.pacman[0].id)
            } else if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65){
                this.movePacMan(e, this.state.pacman[1].id)
            }}}
      >
        {boardMapped}
        {pacMap}
      </div>
    );
  }
}

export default MPBoard;

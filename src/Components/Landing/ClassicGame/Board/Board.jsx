import React, {Component} from 'react'
import PacMan from './PacMan/PacMan'
import Ghosts from './Ghosts/Ghosts'

class Board extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <div className="board">
                <p>This is Board</p>
                <PacMan />
                <Ghosts />
            </div>
        )
    }                           
}

export default Board
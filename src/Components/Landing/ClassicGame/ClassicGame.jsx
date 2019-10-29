import React, {Component} from 'react'
import Board from './Board/Board'
import Header from './Header/Header'

class ClassicGame extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <div className="classicgame">
                <p>This is ClassicGame</p>
                <Header />
                <Board />
            </div>
        )
    }
}

export default ClassicGame
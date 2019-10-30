import React, {Component} from 'react'
import Board from './Board/Board'
import Header from './Header/Header'

class ClassicGame extends Component {
    constructor(){
        super()
        this.state = {
            points: 0
        }
    }

    addPoints = (num) => {
       const score = this.state.points + num
        this.setState({
            points: score
        })
    }

    render(){
        return(
            <div id="classicgame">
             
                <Header addPoints = { this.addPoints } score={this.state.points} />
                <Board addPoints = { this.addPoints } />
            </div>
        )
    }
}

export default ClassicGame
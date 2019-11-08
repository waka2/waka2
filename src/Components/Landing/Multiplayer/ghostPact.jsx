import React, {Component} from 'react'
import MPBoard from './Board/MPBoard.jsx'
import Header from '../ClassicGame/Header/Header'
import HeaderMP from './HeaderMP/HeaderMP'
// import Footer from '../ClassicGame/Footer/Footer'

class Multiplayer extends Component {
    constructor(){
        super()
        this.state = {
            pacmanOnePoints: 0,
            pacmanTwoPoints: 0,
            hiddenPoints: 2300
        }
    }
    addPoints = (num, id) => {
        if (id === 0){
        this.setState({
            pacmanOnePoints: this.state.pacmanOnePoints + num
        })}
        if (id === 1){
        this.setState({
            pacmanTwoPoints: this.state.pacmanTwoPoints + num
        })}
    }
    addHiddenPoints = (num) => {
        this.setState({
            hiddenPoints: this.state.hiddenPoints + num
        })
    }

    render(){
        return(
            <div id="multiplayer">
                {this.state.hiddenPoints >= 2400 ? 
                alert('You Win!') :
                <div>
                <HeaderMP hiddenPoints={this.state.hiddenPoints} 
                pacmanOnePoints={this.state.pacmanOnePoints} 
                pacmanTwoPoints={this.state.pacmanTwoPoints}/>
                <MPBoard addHiddenPoints={this.addHiddenPoints}
                addPoints={this.addPoints} 
                pacmanOnePoints={this.state.pacmanOnePoints} 
                pacmanTwoPoints={this.state.pacmanTwoPoints}/>
                </div>
                }
            </div>
        )
    }
}

export default Multiplayer
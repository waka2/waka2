import React, {Component} from 'react'
import MPBoard from './Board/MPBoard.jsx'
import Header from '../ClassicGame/Header/Header'
import HeaderMP from './HeaderMP/HeaderMP'
// import Footer from '../ClassicGame/Footer/Footer'
import './ghostpact.scss'

class Multiplayer extends Component {
    constructor(){
        super()
        this.state = {
            pacmanOnePoints: 0,
            pacmanTwoPoints: 0,
            hiddenPoints: 0
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
    winCondition = () => {
        if (this.state.pacmanOnePoints > this.state.pacmanTwoPoints){
            return (
                <div className="winScreens">
                    <div className="emptyHeader"></div>
                    <div className="playerOneWinsScreen">
                        <h1 className='blink-win'>Player One Wins!</h1>
                        <button onClick={() => this.refreshPage()} className='push--skeuo'></button>
                        <h3 className='blink-win'>Play Again?</h3>
                    </div>
                </div>
            )
        } else if (this.state.pacmanTwoPoints > this.state.pacmanOnePoints){
            return (
                <div className="winScreens">
                    <div className="emptyHeader"></div>
                    <div className="playerTwoWinsScreen">
                        <h1 className='blink-win'>Player Two Wins!</h1>
                        <button onClick={() => this.refreshPage()} className='push--skeuo'></button>
                        <h3 className='blink-win'>Play Again?</h3>
                    </div>
                </div>
            )
        } else if (this.state.pacmanOnePoints === this.state.pacmanTwoPoints){
            return (
                <div className="winScreens">
                    <div className="emptyHeader"></div>
                    <div className="drawScreen">
                        <h1 className='blink-win'>It's a Draw!</h1>
                        <button onClick={() => this.refreshPage()} className='push--skeuo'></button>
                        <h3 className='blink-win'>Play Again?</h3>
                    </div>
                </div>
            )
        }
    }

    refreshPage(){
        window.location.reload()
    }

    render(){
        return(
            <div id="multiplayer">
                {this.state.hiddenPoints >= 2600 ? 
                this.winCondition() :
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
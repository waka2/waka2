import React, {Component} from 'react'
import Board from './Board/Board'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import LoginPage from '../ClassicGame/LoginPage/LoginPage'
import './classicgame.scss'

class ClassicGame extends Component {
    constructor(){
        super()
        this.state = {
            lives: [1, 2, 3],
            points: 0,
            hiddenPoints: 0,
            pacmanAlive: true
        }
        this.subtractLife.bind(this)
    }

    subtractLife = () => {
        let newLives = this.state.lives
        let newPacAlive = false
        newLives.pop()
        this.setState({lives: newLives, pacmanAlive: newPacAlive })            
        }
        
    addPoints = (num) => {
            const score = this.state.points + num
             this.setState({
                 points: score
             })
         }

    addHiddenPoints = (num) => {
        const hiddenScore = this.state.hiddenPoints + num
        this.setState({
            hiddenPoints: hiddenScore
        })
    }
    
    render(){
        return(
            <div id="classicgame">
                <Header 
                addPoints={ this.addPoints } 
                score={ this.state.points } 
                addHiddenPoints={ this.addHiddenPoints } 
                hiddenScore={ this.state.hiddenPoints }
                lives={ this.state.lives }
                />
                {this.state.hiddenPoints >= 2600 || this.state.lives.length === 0 ? 
                <LoginPage
                points={ this.state.points }
                /> :
                <></>
                }
                <Board addPoints={ this.addPoints } addHiddenPoints={ this.addHiddenPoints } hiddenPoints={this.state.hiddenPoints} subtractLife={ this.subtractLife } lives={ this.state.lives } />
                <Footer
                lives={this.state.lives}
                subtractLife={this.subtractLife}
                />
            </div>
        )
    }
}

export default ClassicGame
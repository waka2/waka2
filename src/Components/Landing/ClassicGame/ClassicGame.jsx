import React, {Component} from 'react'
import Board from './Board/Board'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import './classicgame.scss'

class ClassicGame extends Component {
    constructor(){
        super()
        this.state = {
            lives: [1, 2, 3],
            points: 0,
            hiddenPoints: 0
        }
        this.subtractLife.bind(this)
    }

    subtractLife = () => {
        let newLives = this.state.lives
        newLives.pop()
        this.setState({lives: newLives})
            
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
        // console.log(this.state.lives)
        return(
            <div id="classicgame">
                <Header 
                addPoints={ this.addPoints } 
                score={ this.state.points } 
                addHiddenPoints={ this.addHiddenPoints } 
                hiddenScore={ this.state.hiddenPoints }
                lives={ this.state.lives }
                />
                <Board addPoints={ this.addPoints } addHiddenPoints={ this.addHiddenPoints } />
                <Footer
                lives={this.state.lives}
                subtractLife={this.subtractLife}
                />
            </div>
        )
    }
}

export default ClassicGame
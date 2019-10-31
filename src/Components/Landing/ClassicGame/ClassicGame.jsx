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
            points: 0
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
    
    render(){
        return(
            <div id="classicgame">
                <Header addPoints = { this.addPoints } score={this.state.points}/>
                <Board addPoints = { this.addPoints }/>
                <Footer
                lives={this.state.lives}
                subtractLife={this.subtractLife}
                />
            </div>
        )
    }
}

export default ClassicGame
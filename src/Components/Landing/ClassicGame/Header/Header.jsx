import React, {Component} from 'react'
import './header.scss'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            points: 0,
            playing: false,
            lives: 3
        }
    }

    pointsIncrease = () => {
        if (this.state.playing === true) {
            let currentPoints = this.state.points + 100
            this.setState({points: currentPoints})
        }
    }

    gameOver = () => {
        if (this.state.lives === 0) {            
            this.setState({playing: false})
        }
    }

    die = () => {
        this.setState({lives: this.state.lives - 1})
    }

    startGame = () => {
        this.setState({playing: true})
    }



    render(){
        return(
            <div className="header">
                {this.state.playing === false ? 
                <h1 tabIndex="0" onKeyDown={() => this.startGame()} >Press any key to start</h1> :
                <div className="normalheader">
                    <span className="top">
                        <h2>Points: {this.state.points}</h2>
                        <h1>Waka<sup>2</sup></h1>
                    </span>
                    <span className="highscore">
                        <h1>Highscore</h1>
                        <p>their highscore</p>
                    </span>
                    <span className="username">
                        <p>username</p>
                    </span>
                </div> }
                <section className='lives'>
                    <div>livessss</div>
                </section>
            </div>
        )
    }
}

export default Header
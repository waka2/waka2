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

    componentDidMount = () => {
        window.addEventListener('keydown',() => this.startGame() )
    }



    render(){
        return(
            <div className="header">
                <div className="parent">
                {this.state.playing === false ? 
                <div className="another-div">
                <h6 className='press-start' tabIndex="0" /* onKeyPress={() => this.startGame()} */ ><start>Press any key to start</start></h6> 
                </div> :
                <div className="normalheader">
                    <span className="username">
                        <p>username</p>
                        <h2 className='points'>Points:</h2>
                        <p> {this.state.points}</p>
                    </span>
                    <span className="highscore">
                        <h1>Highscore</h1>
                        <p>their highscore</p>
                    </span>
                    <span className="logo">
                    <h5>Waka<sup>2</sup></h5>
                    </span>

                </div> }
                </div>

            </div>
        )
    }
}

export default Header
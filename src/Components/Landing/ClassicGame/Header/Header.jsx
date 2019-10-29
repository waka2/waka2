import React, {Component} from 'react'

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
            let currentPoints = this.state.point + 100
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



    render(){
        return(
            <div className="header">
                {!this.state.playing ? 
                <button>Press Start</button> :
                <div className="normalheader">
                    <span className="top">
                        <h2>Points: {this.state.points}</h2>
                        <h1>Waka</h1>
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
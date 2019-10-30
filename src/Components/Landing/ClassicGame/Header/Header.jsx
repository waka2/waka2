import React, {Component} from 'react'
import './header.scss'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            playing: false,
        }
    }

    startGame = () => {
        this.setState({playing: true})
    }

    componentDidMount = () => {
        window.addEventListener('keydown', () => this.startGame() )
    }

    render(){
        // console.log(this.props.addPoints)
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
                        <p> {this.props.score}</p>
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
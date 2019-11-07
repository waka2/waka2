import React, {Component} from 'react'
import './header.scss'
import axios from 'axios'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            playing: false,
            highscore: '',
            username: ''
        }
    }

    startGame = () => {
        this.setState({playing: true})
    }

    componentDidMount = async () => {
        window.addEventListener('keydown', () => this.startGame() )

        await axios.get('/api/score').then(res => {
            this.setState({highscore: res.data})
        })

        await axios.get('/auth/user').then(res => {
            this.setState({username: res.data})
        })
    }

    render(){

        // const mappedHighscore = this.state.highscore.map(el => {

        // })


        return(
            <div className="header">
                <div className="parent">
                {this.state.playing === false ? 
                <div className="another-div">
                <h6 className='press-start blink' tabIndex="0" /* onKeyPress={() => this.startGame()} */ >Press any key to start</h6> 
                </div> :
                <div className="normalheader">
                    <span className="username">
                        <p>{this.state.username}</p>
                        <h2 className='points'>Points:</h2>
                        <p> {this.props.score}</p>
                    </span>

                    {this.props.lives.length === 0 ?
                    <h1 className="blink">Game Over</h1> :
                    <span className="highscore">
                        <h1>Highscore</h1>
                        <p>{this.state.highscore}</p>
                    </span> 
                    }
                    {/* {this.props.hiddenScore === 2600 ?
                    <h1>You Win!</h1> :
=======
                    {this.props.hiddenScore >= 2600 ?
                    <h1 className='blink'>You Win!</h1> :
>>>>>>> master
                    <span className="highscore">
                        <h1>Highscore</h1>
                        <p>their highscore</p>
                    </span>
                    } */}
                    <span className="logo">
                    <h5>Waka<sup>2</sup></h5>
                    </span>

                </div> }

                    {/* {this.props.lives.length === 0 ? 
                    alert('You Lose!') :
                    null } */}

                </div>

            </div>
        )
    }
}

export default Header
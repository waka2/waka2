import React, {Component} from 'react'
import './loginpage.scss'

class LoginPage extends Component{
    state = {

    }
    render(){
        return(
            <div className="loginParent">
                <div className="highscores">
                    <p>THE 10 BEST PLAYERS</p>
                    <div className="rank-score-username">
                        <p>RANK</p>
                        <p>SCORE</p>
                        <p>USERNAME</p>
                    </div>
                </div>
                <div className="login-page">
                    <p>LOGIN TO SAVE YOUR HIGH SCORE!</p>
                    <div className="login-input">
                        <span>LOGIN:</span>
                        <input type="text" maxLength='3'/>
                    </div>
                    <div className="password-input">
                        <span>PASSWORD:</span>
                        <input type="password"/>
                    </div>
                    <div className="password-input-2">
                        <span>CONFRIM PASSWORD:</span>
                        <input type="password"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
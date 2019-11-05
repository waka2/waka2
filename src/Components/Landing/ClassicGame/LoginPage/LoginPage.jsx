import React, {Component} from 'react'
import './loginpage.scss'
import axios from 'axios'
import sweet from 'sweetalert2'

class LoginPage extends Component{
    state = {
        username: '',
        password: '',
        // password2: ''
    }

    handleChange(e, key){
        this.setState({
            [key]: e.target.value
        })
    }

    async register(){
        const {username, password} = this.state
        const {points:highscore} = this.props
        const res = await axios.post('/auth/register', {username, password, highscore })
        if (res.data === 'Username already in use!'){
            sweet.fire({type: 'error', text: 'Username already in use'})
        } else {
            sweet.fire({type: 'success', text: 'Registered Successfully!'})
        }
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
                        <input 
                        onChange={e => this.handleChange(e, 'username')} 
                        type="text" 
                        maxLength='3'
                        value={this.state.username}/>
                        {/* <input type="text" maxLength='1'/> */}
                        {/* <input type="text" maxLength='1'/> */}
                    </div>
                    <div className="password-input">
                        <span>PASSWORD:</span>
                        <input 
                        onChange={e => this.handleChange(e, 'password')} 
                        type="password"
                        value={this.state.password}/>
                    </div>
                    {/* <div className="password-input-2">
                        <span>CONFRIM PASSWORD:</span>
                        <input onChange={e => this.handleChange(e, 'password2')} type="password"/>
                    </div> */}
                    <div className="login-register-buttons">
                        <button className='login-button'>LOGIN</button>
                        <button onClick={() => this.register()} className='register-button'>REGISTER</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage
import React, {Component} from 'react'
import './loginpage.scss'
import axios from 'axios'
import sweet from 'sweetalert2'

class LoginPage extends Component{
    state = {
        username: '',
        password: '',
        // password2: ''
        highscoresArr: [],
        loggedIn: false,
        testBool: false
    }

    componentDidMount(){
        axios.get('/api/highscores').then(res => {
            this.setState({
                highscoresArr: res.data
            })
        })
        
    }

    handleChange(e, key){
        this.setState({
            [key]: e.target.value
        })
    }

    clearState(){
        this.setState({
            username: '',
            password: ''
        })
    }

    async register(){
        const {username, password} = this.state
        const {points:highscore} = this.props
        const res = await axios.post('/auth/register', {username, password, highscore })
        if (res.data === 'Username already in use!'){
            sweet.fire({type: 'error', text: 'Username already in use'})
        } else {
            sweet.fire({type: 'success', text: 'Registered Successfully!', showConfirmButton: false, timer: 1500})
        }
        this.setState({
            loggedIn: res.data.loggedIn
        })
        this.clearState()
    }

    async login(){
        const {username, password} = this.state
        const res = await axios.post('/auth/login', {username, password})
        if (res.data.user){
            sweet.fire({type: 'success', text: res.data.message, showConfirmButton: false, timer: 1500})
            this.clearState()
        } else if (res.data.message === 'Username not found'){
            sweet.fire({type: 'error', text: res.data.message})
        } else if (res.data.message === 'Incorrect password'){
            sweet.fire({type: 'error', text: res.data.message})
        }
        this.setState({
            loggedIn: res.data.loggedIn
        })
    }
    updateScore(){
        this.setState({
            testBool: true
        })
    }

    render(){

        let mappedHighscores = this.state.highscoresArr.map((el, i) => {
            let style = null
            if (i === 0 || i === 5){
                style={color: 'rgb(231, 51, 35)'}
            } else if (i === 1 || i === 6){
                style={color: 'rgb(241, 185, 251)'}
            } else if (i === 2 || i === 7){
                style={color: 'rgb(114, 251, 253)'}
            } else if (i === 3 || i === 8){
                style={color: 'rgb(240, 180, 103)'}
            } else if (i === 4 || i === 9){
                style={color: 'rgb(254, 252, 83)'}
            }
            return (
                <div className="rank-highscore-username" style={style}>
                    <p>{i+1}</p>
                    <p>{el.highscore}</p>
                    <p>{el.username}</p>
                </div>
            )
        })

        

        return(
            <div className="loginParent">
                <div className="highscores">
                    <p>THE 10 BEST PLAYERS</p>
                    <div className="rank-score-username">
                        <p>RANK</p>
                        <p>SCORE</p>
                        <p>USERNAME</p>
                    </div>
                    {mappedHighscores}
                </div>
                <div className="login-page">
                    <p>LOGIN TO SAVE YOUR HIGH SCORE!</p>
                    <div className="login-input">
                        <span>LOGIN:</span>
                        <input 
                        id='login'
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
                        id='password'
                        onChange={e => this.handleChange(e, 'password')} 
                        type="password"
                        value={this.state.password}/>
                    </div>
                    {/* <div className="password-input-2">
                        <span>CONFRIM PASSWORD:</span>
                        <input onChange={e => this.handleChange(e, 'password2')} type="password"/>
                    </div> */}
                    <div className="login-register-buttons">
                        <button onClick={() => this.login()} className='login-button'>LOGIN</button>
                        <button onClick={() => this.register()} className='register-button'>REGISTER</button>
                    </div>
                    {this.state.loggedIn ? 
                    <button onClick={() => this.updateScore()} className='update-button'>Update Score</button>
                     : <></>}
                </div>
            </div>
        )
    }
}

export default LoginPage
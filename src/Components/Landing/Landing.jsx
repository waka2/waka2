import React from 'react'
import './landing.scss'
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import ClassicGame from './ClassicGame/ClassicGame';
import Multiplayer from './Multiplayer/ghostPact';
import screenshot from '../../screenshot.png'
import arcade from '../../waka2_arcade_cabinet2.png'
import Sound from 'react-sound'
import LoginPage from './ClassicGame/LoginPage/LoginPage';

class Landing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            arcadeImg: true
        }
    }
    
    fireAnimationClassic =() => {
        let arcade = document.getElementById('arcade')
        arcade.classList.add('arcade-active')
        let screenshot = document.getElementById('screenshot')
        screenshot.classList.add('screenshot-active')
        
        setTimeout(() => {
            this.props.history.push('/classic')
            this.setState({
                arcadeImg: false
            })
        }, 3000)
    }
    fireAnimationMultiplayer =() => {
        let arcade = document.getElementById('arcade')
        arcade.classList.add('arcade-active')
        let screenshot = document.getElementById('screenshot')
        screenshot.classList.add('screenshot-active')
        
        setTimeout(() => {
            this.props.history.push('/ghostPact')
            this.setState({
                arcadeImg: false
            })
        }, 3000)
    }

    goHome(){
        this.props.history.push('/')
        this.setState({
            arcadeImg: true
        })
    }

    componentDidMount() {
        if (this.props.location.pathname !== '/'){
            this.setState({
                arcadeImg: false
            })
        }
    }

    render(){
    return(
        <div className="landing">
            <div className="outer-container">
                {(this.props.location.pathname === '/') ? <div className="classic-button">
                    <button className='push--skeuo' onClick={() => this.fireAnimationClassic()}></button>
                </div> : <div className='home-button'><button className='push--skeuo' onClick={()=> this.goHome()} ></button></div>}
                <div className="inner-container">
                        {this.state.arcadeImg ? 
                        <>
                        <img id='arcade' src={arcade} alt="" className="arcade a-transform"/>
                        <img id='screenshot' src={screenshot} alt="" className="screenshot s-transform"/>
                        </> : <></>}
                    <Switch>
                        <Route path="/classic" component={ClassicGame} />
                        <Route path="/ghostPact" component={Multiplayer} />
                        <Route path='/login' component={LoginPage} />
                    </Switch>
                </div>
                {(this.props.location.pathname === '/') ? <div className="br-button">
                    <button className='push--skeuo' onClick={() => this.fireAnimationMultiplayer()}></button>
                </div> : <div className='home-button'></div>}
            </div>
        </div>
    )
    }
}

export default withRouter(Landing)
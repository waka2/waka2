import React from 'react'
import './landing.scss'
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import ClassicGame from './ClassicGame/ClassicGame';
import Multiplayer from './Multiplayer/ghostPact';
import screenshot from '../../screenshot.png'
import arcadeSound2 from '../../assets/arcade.mp3'
import arcade from '../../waka2_arcade_cabinet2.png'
import Sound from 'react-sound'
import LoginPage from './ClassicGame/LoginPage/LoginPage';

class Landing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            arcadeImg: true,
            toggleBackground: true,
            volume: 25
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
                     {/* {this.state.toggleBackground ? <Sound url={arcadeSound2} playStatus={Sound.status.PLAYING} autoLoad={true} volume={75} /> : null} */}
            <div className="outer-container">
                <div className="classic-button">
                    <button onClick={() => this.fireAnimationClassic()}>Play Classic</button>
                </div>
                <div className="inner-container">
                        {this.state.arcadeImg ? 
                        <>
                         <Sound url={arcadeSound2} playStatus={Sound.status.PLAYING} autoLoad={true} position={0} volume={75} />
                        <img id='arcade' src={arcade} alt="" className="arcade a-transform"/>
                        <img id='screenshot' src={screenshot} alt="" className="screenshot s-transform"/>
                        </> : <></>}
                    <Switch>
                        <Route path="/classic" component={ClassicGame} />
                        <Route path="/ghostPact" component={Multiplayer} />
                        <Route path='/login' component={LoginPage} />
                    </Switch>
                </div>
                <div className="br-button">
                    <button onClick={() => this.fireAnimationMultiplayer()}>Play Multiplayer</button>
                </div>
            </div>
        </div>
    )
    }
}

export default withRouter(Landing)
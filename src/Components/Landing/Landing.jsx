import React from 'react'
import './landing.scss'
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import ClassicGame from './ClassicGame/ClassicGame';
import Multiplayer from './Multiplayer/ghostPact';
import screenshot from '../../screenshot.png'
import arcade from '../../waka2_arcade_cabinet2.png'

class Landing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            arcadeImg: true
        }
    }
    
    fireAnimation =() => {
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

    render(){
    return(
        <div className="landing">
            <div className="outer-container">
                <div className="classic-button">
                    <button onClick={() => this.fireAnimation()}>Play Classic</button>
                </div>
                <div className="inner-container">
                        {this.state.arcadeImg ? 
                        <>
                        <img id='arcade' src={arcade} alt="" className="arcade a-transform"/>
                        <img id='screenshot' src={screenshot} alt="" className="screenshot s-transform"/>
                        </> : <></>}
                    <Switch>
                        <Route path="/classic" component={ClassicGame} />
                        <Route path="/ghostPact" component={Multiplayer} />
                    </Switch>
                </div>
                <div className="br-button">
                    <button><Link to="/ghostPact">Play Multiplayer</Link></button>
                </div>
            </div>
        </div>
    )
    }
}

export default withRouter(Landing)
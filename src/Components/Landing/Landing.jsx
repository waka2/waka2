import React from 'react'
import './landing.scss'
import {Switch, Route, Link} from 'react-router-dom';
import ClassicGame from './ClassicGame/ClassicGame';
import Multiplayer from './Multiplayer/ghostPact';

function Landing() {

    return(
        <div className="landing">
            <div className="outer-container">
                <div className="classic-button">
                    <button><Link to="/classic">Play Classic</Link></button>
                </div>
                <div className="inner-container">
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

export default Landing
import React from 'react'
import './landing.scss'
import ClassicGame from './ClassicGame/ClassicGame'

function Landing() {
    return(
        <div className="landing">
            <div className="outer-container">
                <div className="classic-button">
                    <button>Play Classic</button>
                </div>
                <div className="inner-container">
                    <ClassicGame />
                </div>
                <div className="br-button">
                    <button>Play Battle Royale</button>
                </div>
            </div>

        </div>
    )
}

export default Landing
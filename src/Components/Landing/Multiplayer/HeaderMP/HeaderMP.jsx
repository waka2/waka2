import React, {Component} from 'react'
import './headermp.scss'

export default class HeaderMP extends Component {
    state = {

    }
    render() {
        return(
            <div id="headerMP">
                <div className="pacmanOneDisplayPoints">
                    <h3>Player 1:</h3>
                    <div>{this.props.pacmanOnePoints}</div>
                </div>
                <div className="pacmanTwoDisplayPoints">
                    <h3>Player 2:</h3>
                    <div>{this.props.pacmanTwoPoints}</div>
                </div>
            </div>
        )
    }
}
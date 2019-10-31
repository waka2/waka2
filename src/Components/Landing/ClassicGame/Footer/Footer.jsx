import React, {Component} from 'react'
import './footer.scss'

export default class Footer extends Component {
    state = {
        
    }
    render(){

        let mappedLives = this.props.lives.map(() => {
            return (
                <div className="pacman-lives">
                    <div className="live-triangle"></div>
                </div>
            )
        })

        return(
            <div className="footer-outer">
                {mappedLives}
                <button onClick={() => this.props.subtractLife()}>Testing life subtract</button>
            </div>
        )
    }
}

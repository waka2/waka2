import React, {Component} from 'react'
import "./pacman.scss"

class PacMan extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        let style = {top: `${this.props.y * 20}px`, left: `${this.props.x * 20}px`, transition: '.2s linear'}
        return(
            <div className="pacman" style={style}/>
        )
    }                           
}

export default PacMan
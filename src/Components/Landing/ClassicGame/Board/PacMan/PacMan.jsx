import React, {Component} from 'react'
import "./pacman.scss"

class PacMan extends Component {
    constructor(){
        super()
        this.state = {
            direction: 0
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.direction !== this.props.direction){
            if (this.props.direction === 'LEFT'){
                this.setState({
                    direction: 180
                })
            } else if (this.props.direction === 'RIGHT'){
                this.setState({
                    direction: 0
                })
            } else if (this.props.direction === 'DOWN'){
                this.setState({
                    direction: 90
                })
            } else {
                this.setState({
                    direction: 270
                })
            }
        }
    }

    render(){
        let style = {top: `${this.props.y * 20}px`, left: `${this.props.x * 20}px`,
        transitionProperty: `${this.props.pacmanAlive ? 'left, top' : ''}`, 
        transitionDuration: `${this.props.pacmanAlive ? '.2s' : ''}`, 
        transitionTimingFunction: `${this.props.pacmanAlive ? 'linear' : ''}`, 
        transform: `rotate(${this.state.direction}deg)`}
        return(
            <div className="pacman" style={style}>
                <div className="triangle"/>
            </div>
        )
    }                           
}

export default PacMan
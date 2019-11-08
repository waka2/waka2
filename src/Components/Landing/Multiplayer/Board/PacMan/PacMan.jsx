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
        let color = "yellow";
        if (this.props.isHungry === true) {
            // const pac = document.getElementsByClassName('pacmanM')
            // pac.classList.add('hungryPac')
    
            // setInterval(() => {
            //     pac.classList.remove('hungryPac')
            // }, 7000)
            if (this.props.currentId === this.props.powerId) {
                color = "red"
            }
    
            // setInterval(() => {
            //    color = "yellow"
            // }, 7000)
        } else {
            color = "yellow"
        }

        let style = {top: `${this.props.y * 20}px`, left: `${this.props.x * 20}px`, 
        transitionProperty: 'left, top', 
        transitionDuration: '.2s', 
        transitionTimingFunction: 'linear', 
        transform: `rotate(${this.state.direction}deg)`,
        background: color
    }

        return(
            <div className="pacmanM" style={style}>
                <div className="triangleM"/>
            </div>
        )
    }                           
}

export default PacMan
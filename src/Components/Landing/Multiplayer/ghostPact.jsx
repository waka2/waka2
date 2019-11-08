import React, {Component} from 'react'
import MPBoard from './Board/MPBoard.jsx'
import Header from '../ClassicGame/Header/Header'
// import Footer from '../ClassicGame/Footer/Footer'

class Multiplayer extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <div id="multiplayer">
                {/* <Header /> */}
                <MPBoard />
            </div>
        )
    }
}

export default Multiplayer
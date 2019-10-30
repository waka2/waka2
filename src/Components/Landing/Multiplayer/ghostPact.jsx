import React, {Component} from 'react'
import MPBoard from './Board/MPBoard'
// import Header from './Header/Header'

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
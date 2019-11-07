import React from 'react';
import App from '../App';
import Ghosts from '../Components/Landing/ClassicGame/Board/Ghosts/Ghosts'
import Board from '../Components/Landing/ClassicGame/Board/Board'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {mount} from 'enzyme'
import {shallow} from 'enzyme';
Enzyme.configure({adapter: new Adapter()})

// describe('<App />', () => {
//     it('renders 1 <App /> component', () => {
//         const component = shallow(<App name="app"/>)
//         expect(component).toHaveLength(1)
//     })
//     describe('it renders props correctly', () => {
//         const component = shallow(<App name="app"/>)
//         console.log(component)
//     })
// });

// Test #1. Blinky Targets Pacman
describe('<Ghosts/>', () => {
    // it('renders 1 <Ghost /> component', () => {
    //     const component = shallow(<Ghosts />)
    //     expect(component).toHaveLength(1)
    // })
    it('Blinky Tracks Pacman', () => {
        const component = shallow(<Ghosts pacman={[{x: 20, y: 3}]}/>)
        component.instance().state.tracking = true
        expect(component.instance().getTarget(0)).toEqual({x: 20, y: 3})
    })
})

// Test #2. When Power Pellet Eaten, ghostAfraid becomes true
describe('<Board />', () => {
    it('Ghosts Become Afraid when Power Pellet Eaten', () => {
        let addPoints = (num) => {return num}
        let addHiddenPoints = (num) => {return num}
        const component = mount(<Board addPoints={addPoints} addHiddenPoints={addHiddenPoints}/>, {attachTo: document.body})
        expect(component.instance().state.ghostsAfraid).toEqual(false)
        component.instance().state.pacman[0] = {...component.instance().state.pacman[0], x: 1, y: 3}
        component.instance().eatPowerPellet(0)
        expect(component.instance().state.ghostsAfraid).toEqual(true)
    })
})

// Test #3. Ghost can subtract Pacman's life
describe('<Ghost />', () => {
    it(`Ghost can subtract Pacman's Life`, () => {
        let pacmanLife = 3
        let subtractLife = () => {pacmanLife--}
        const component = shallow(<Ghosts subtractLife={subtractLife} pacman={[{x: 20, y: 3}]}/>)
        component.instance().state = {...component.instance().state, x: 20, y: 3}
        component.instance().props.subtractLife()
        expect(pacmanLife).toEqual(2)
    })
})

// Test #4. When power pellet is eaten, Pacman can eat Ghost
// describe('<Ghost />', () => {
//     it(`When power pellet is eaten, Pacman can eat Ghost`, () => {
//         const component = shallow(<Ghosts subtractLife={subtractLife} pacman={[{x: 20, y: 3}]}/>)
//         component.instance().state = {...component.instance().state, x: 20, y: 3}
//         component.instance().props.subtractLife()
//         expect(pacmanLife).toEqual(2)
//     })
// })

// Test #5. When ghost is eaten, ghost goes home
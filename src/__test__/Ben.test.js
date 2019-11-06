import Enzyme from 'enzyme';
import React from 'react'
import {shallow} from 'enzyme'
import { assert } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import ClassicGame from '../Components/Landing/ClassicGame/ClassicGame'
import Ghosts from '../Components/Landing/ClassicGame/Board/Ghosts/Ghosts'

Enzyme.configure({ adapter: new Adapter()});

//Do The Ghosts Render by name?
describe('Ghost renders within Ghosts', () => {
    it ("Blinky Renders", () => {
        const wrapper = shallow(<Ghosts id={0} />)
        const blinky = wrapper.find('.blinky')
        assert.equal(blinky.length, 1)
    })

    it ("Pinky Renders", () => {
        const wrapper = shallow(<Ghosts id={1}/>)
        const pinky = wrapper.find('.pinky')
        assert.equal(pinky.length, 1)

    })

    it ("Inky Renders", () => {
        const wrapper = shallow(<Ghosts id={2}/>)
        const inky = wrapper.find(".inky")
        assert.equal(inky.length, 1)
    })

    it ("Clyde Renders", () => {
        const wrapper = shallow(<Ghosts id={3}/>)
        const clyde = wrapper.find(".clyde")
        assert.equal(clyde.length, 1)
    })

})

// Does the ghost component render when mounted?
describe('Ghosts Render', () => {
    it ("Ghosts should render without crashing", () => {
        shallow(<Ghosts />)
    })
})

// Add Points to Main Counter
describe('Add Points', () => {
    it ('Add Points', () => {
        const wrapper = shallow(<ClassicGame />)
        expect(wrapper.state('points')).toBe(0)
        wrapper.instance().addPoints(100)
        expect(wrapper.state('points')).toBe(100)
    })
})

// Add Points to Hidden Counter
describe('Add Hidden Points', () => {
    it ('Add Hidden Points', () => {
        const wrapper = shallow(<ClassicGame />)
        expect(wrapper.state('hiddenPoints')).toBe(0)
        wrapper.instance().addHiddenPoints(100)
        expect(wrapper.state('hiddenPoints')).toBe(100)
    })
})

// Confirm Default Ghost Start
describe('Ghost Default Start', () => {
    it ('X and Y', () => {
        const wrapper = shallow(<Ghosts />)
        expect(wrapper.state('x')).toBe(13)
        expect(wrapper.state('y')).toBe(11)
    })
})





import React from 'react'
import {shallow, mount} from 'enzyme'
import Header from '../Components/Landing/ClassicGame/Header/Header'
import '../Components/Landing/ClassicGame/ClassicGame'
import Board from '../Components/Landing/ClassicGame/Board/Board'
import LoginPage from '../Components/Landing/ClassicGame/LoginPage/LoginPage'
import Pacman from '../Components/Landing/ClassicGame/Board/PacMan/PacMan'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({adapter: new Adapter()})



describe('h6 info', () => {
    it('displays correctly', () => {
        const land = shallow(<Header/>)
        const h6 = land.find('h6').at(0).text()
        expect(h6).toEqual('Press any key to start')
    })
})

describe('Login renders', () => {
    it('Login renders without crashing', () => {
        shallow(<LoginPage/>)
    })
})

describe('Pacman is on screen', () => {
    it('Pacman mounts on the board', () => {
        shallow(<Pacman/>)
    })
})

describe('Ghosts afraid', () => {
    it('Ghosts afraid is false', () => {
        const wrapper = mount(<Board />, {attachTo: document.body})
        expect(wrapper.state('ghostsAfraid')).toBe(false)
    })
})

describe('best players', () => {
    it('displays 10 best players', () => {
        const land = shallow(<LoginPage/>)
        const p = land.find('p').at(0).text()
        expect(p).toEqual('THE 10 BEST PLAYERS')
    })
})

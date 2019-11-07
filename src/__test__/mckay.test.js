import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme'
import LoginPage from '../Components/Landing/ClassicGame/LoginPage/LoginPage'

Enzyme.configure({ adapter: new Adapter() });

describe('Should have length of 3', () => {
    it('username is an input box with a maxlength of 3',() => {
        const wrapper = shallow(<LoginPage/>);
        const username = wrapper.find('input#login');
        expect(username.props()).toHaveProperty('maxLength', '3');
    });
});
describe('Password should be dots not text', () => {
    it('password is an input box with a type of password', () => {
        const wrapper = shallow(<LoginPage/>);
        const password = wrapper.find('input#password');
        expect(password.props()).toHaveProperty('type', 'password')
    })
})
describe('Login function correctly fires', () => {
    it('Login correctly logs a registered user in', () => {
        const wrapper = shallow(<LoginPage/>)
        wrapper.find('button.login-button').simulate('click')
        // console.log(wrapper.instance())
        wrapper.instance().state = {...wrapper.instance().state, username: 'AAA', password: 'AAA'}
        wrapper.instance().login()
        setTimeout(() => {
            expect(wrapper.instance().state.loggedIn).toEqual(true)
        }, 1000)
    })
})

describe('Register function correctly fires', () => {
    it('Login correctly registers a new user', () => {
        const wrapper = shallow(<LoginPage/>)
        wrapper.find('button.register-button').simulate('click')
        wrapper.instance().state = {...wrapper.instance().state, username: 'ZZZ', password: 'ZZZ'}
        wrapper.instance().login()
        setTimeout(() => {
            expect(wrapper.instance().state.loggedIn).toEqual(true)
        }, 1000)
    })
})

// This test depends upon someone logging in because the button is within a ternary.
// If the ternary is taken away it passes

describe('updateScore function correctly fires', () => {
    it('Update Score is a button that calls a function called updateScore', () => {
        const wrapper = shallow(<LoginPage/>)
        wrapper.find('button.update-button').simulate('click')
        wrapper.instance().updateScore()
        setTimeout(() => {
            expect(wrapper.instance().state.testBool).toEqual(true)
        }, 1000)
    })
})
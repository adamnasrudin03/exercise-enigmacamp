import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';

const onMenuCLickFn = jest.fn();

describe('Header', () => {
  let wrapper;
  
  beforeAll(() => {
    wrapper = mount(<Header title="Web Aplication" onMenuCLick={onMenuCLickFn} />);
  });

  it('title should have mach', () => {
    expect(wrapper.find('h6#title-label'))
      .toHaveText("Web Aplication");
  });

  it('menu should have been clicked', () => {
    wrapper.find('button#menu-button').simulate('click');
    expect(onMenuCLickFn).toHaveBeenCalled();

  });

  it('menu should have been clicked twice', () => {
    wrapper.find('button#menu-button')
      .simulate('click')
      .simulate('click');
    expect(onMenuCLickFn).toHaveBeenCalledTimes(3);

  });

});
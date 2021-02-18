import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

import routes from './configs/routes';


describe('App', () => {

  const wrapper = shallow(<App />);

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();

  })

  it('should have N route(s)', () => {
    expect(wrapper.find("Route")).toHaveLength(routes.length);

  });

});
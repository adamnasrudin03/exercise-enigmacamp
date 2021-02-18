import React from 'react';
import { mount } from 'enzyme';
import UnitPage from './UnitPage';
import * as unitActions from '../../../actions/untis';
import { MemoryRouter as Router } from 'react-router-dom';



const data = {
  id: 1,
  name: "KG",
  description: "Kilo gram"
};

unitActions.findById = jest.fn().mockReturnValue(data);

describe('UnitPage', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <UnitPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });


  it('should have data', () => {
    const component = wrapper.find("UnitPage");
    console.log(component.state('id'));
    expect(component.state('id')).toEqual(data.id);
    console.log(component.state('name'));
    expect(component.state('name')).toEqual(data.name);
    console.log(component.state('description'));
    expect(component.state('description')).toEqual(data.description);
   

  });

});
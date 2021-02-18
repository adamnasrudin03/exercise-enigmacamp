import React from 'react';
import { mount } from 'enzyme';
import ItemPage from './ItemPage';
import * as itemActions from '../../../actions/items';
import { MemoryRouter as Router } from 'react-router-dom';



const data = {
  id: 1,
  name: "krupuk"
};

itemActions.findById = jest.fn().mockReturnValue(data);

describe('ItemPage', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <ItemPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });


  it('should have data', () => {
    const component = wrapper.find("ItemPage");
    console.log(component.state('id'));
    expect(component.state('id')).toEqual(data.id);
    console.log(component.state('name'));
    expect(component.state('name')).toEqual(data.name);
   

  });

});
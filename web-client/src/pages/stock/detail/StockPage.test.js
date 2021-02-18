import React from 'react';
import { mount } from 'enzyme';
import ItemPage from './UnitPage';
import * as stockActions from '../../../actions/stocks';
import { MemoryRouter as Router } from 'react-router-dom';



const data = {
  id: 1,
  item: "rice",
  quantity: 2,
  unit: "kg"
};

stockActions.findById = jest.fn().mockReturnValue(data);

describe('StockPage', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <ItemPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });


  it('should have data', () => {
    const component = wrapper.find("StockPage");
    console.log(component.state('id'));
    expect(component.state('id')).toEqual(data.id);
    console.log(component.state('item'));
    expect(component.state('item')).toEqual(data.item);
    console.log(component.state('quantity'));
    expect(component.state('quantity')).toEqual(data.quantity);
    console.log(component.state('unit'));
    expect(component.state('unit')).toEqual(data.unit);
   

  });

});
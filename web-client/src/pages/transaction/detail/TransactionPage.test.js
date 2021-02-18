import React from 'react';
import { mount } from 'enzyme';
import TransactionPage from './TransactionPage';
import * as transactionActions from '../../../actions/transactions';
import { MemoryRouter as Router } from 'react-router-dom';



const data = {
  id: 1,
  amount: 25000,
  type: "IN",
  description: "Purchases Detol soap 6 Pcs"
};

transactionActions.findById = jest.fn().mockReturnValue(data);

describe('TransactionPage', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <TransactionPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });


  it('should have data', () => {
    const component = wrapper.find("TransactionPage");
    console.log(component.state('id'));
    expect(component.state('id')).toEqual(data.id);
    console.log(component.state('amount'));
    expect(component.state('amount')).toEqual(data.amount);
    console.log(component.state('type'));
    expect(component.state('type')).toEqual(data.type);
    console.log(component.state('description'));
    expect(component.state('description')).toEqual(data.description);
   

  });

});
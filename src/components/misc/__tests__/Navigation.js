import React from 'react';
import { Navigation } from '../Navigation';
import { shallow } from "enzyme";

const props = {};

describe('<Navigation />', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders a <Navigation /> component', () => {
    const wrapper = shallow(<Navigation {...props}/>);
    expect(wrapper.length).toEqual(1);
  });

  it('renders without user menu', () => {
    const wrapper = shallow(<Navigation {...props}/>);
    expect(wrapper.state('userMenuExpanded')).toBe(false);
  });

  it('can expand and close user menu', () => {
    const wrapper = shallow(<Navigation {...props}/>);
    expect(wrapper.state('userMenuExpanded')).toBe(false);
    wrapper.find('button').prop('onClick')();
    expect(wrapper.state('userMenuExpanded')).toBe(true);
    wrapper.instance().closeUserMenu({ preventDefault() {} });
    expect(wrapper.state('userMenuExpanded')).toBe(false);
  });

});

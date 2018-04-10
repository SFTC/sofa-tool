import { shallow, mount } from '@vue/test-utils';
import SofaTest5 from '@/test5/index.js';
import sinon from 'sinon'

describe('test5', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(SofaTest5);
    expect(wrapper.find('.sofa-test5'));
  });
});

import { shallow, mount } from '@vue/test-utils';
import {{ComponentName}} from '@/{{PureName}}/index.js';
import sinon from 'sinon'

describe('{{PureName}}', () => {
  it('should render correct contents', () => {
    const wrapper = shallow({{ComponentName}});
    expect(wrapper.find('.{{HyphenComponentName}}'));
  });
});

import { renderComponent , expect } from '../test_helper';
import App from '../../src/index';
import sinon from 'sinon';

describe('App' , () => {
  let component;
  let xhr;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
      global.XMLHttpRequest = xhr;
      requests = [];

      xhr.onCreate = (xhr) => {
        requests.push(xhr);
      };
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});

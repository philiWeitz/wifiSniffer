
import configureMockStore from 'redux-mock-store';

const mockLoginState = {
  statusCode: 100,
};

const mockAppState = {
  statusCode: 101,
};


const mockStoreFactory = configureMockStore([]);

const mockStore = mockStoreFactory({
  app: mockAppState,
  login: mockLoginState,
});


export default mockStore;

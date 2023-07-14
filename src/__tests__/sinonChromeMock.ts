import sinon from 'sinon';

interface SinonChrome {
    runtime: {
      lastError: any;
    };
    tabs: {
      query: sinon.SinonStub;
      sendMessage: sinon.SinonStub;
      // Add other properties here manually
    };
    // Add other properties here manually
  }
  
  const sinonChrome: SinonChrome = {
    runtime: {
      lastError: undefined,
    },
    tabs: {
      query: sinon.stub(),
      sendMessage: sinon.stub(),
    },
    // Add other properties here manually
  };
  
  export default SinonChrome;
  
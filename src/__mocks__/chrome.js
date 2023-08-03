const chromeMock = {
  sidePanel: {
    setPanelBehavior: jest.fn().mockResolvedValue(),
    setOptions: jest.fn().mockResolvedValue(),
  },
  tabs: {
    onUpdated: {
      addListener: jest.fn(),
    },
  },
  runtime: {
    onInstalled: {
      addListener: jest.fn(),
    },
    getManifest: jest.fn().mockReturnValue({ version: '1.0.0' }),
  },
  notifications: {
    create: jest.fn(),
  },
};

export default chromeMock;

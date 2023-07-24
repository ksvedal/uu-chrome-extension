import chromeMock from '../__mocks__/chrome';
import { setSidePanelBehaviour, setSidePanelOptions, createNotification } from '../openSidepanel';

global.chrome = chromeMock;

describe('openSidepanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set panel behavior with openPanelOnActionClick option', () => {
    global.chrome = chromeMock;
    setSidePanelBehaviour();
    expect(chrome.sidePanel.setPanelBehavior).toHaveBeenCalledWith({
      openPanelOnActionClick: true,
    });
  });

  it('should set options for the side panel when tabs are updated', async () => {
    const tabId = 123;
    const path = 'sidebar.html';

    await setSidePanelOptions(tabId, { status: 'complete' }, {});

    expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith({
      tabId,
      path,
      enabled: true,
    });
  });

  it('should create a notification when extension is updated', () => {
    const previousVersion = '0.9.0';
    const currentVersion = '1.0.0';

    createNotification({ reason: 'update', previousVersion });

    expect(chrome.runtime.notifications.create).toHaveBeenCalledWith('updateNotification', {
        type: 'basic',
        iconUrl: '../scan.png',
        title: 'Extension Updated',
        message: `Updated from ${previousVersion} to ${currentVersion}`,
    });
  });
});

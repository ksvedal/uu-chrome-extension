import { v4 as uuidv4 } from 'uuid';
import { ElementResult } from './interfaces';

export class TestUtils {

  public static giveIdChromeAndExtensionVersion = (resultElement: ElementResult) => {
    resultElement.testregelId = TestUtils.generateTestID();
    resultElement.nettlesar = TestUtils.getChromeAndExtension();
  }

  private static generateTestID = () => {
    const uuid = uuidv4().split('-')[0];
    return `ID$${uuid}`;
  };

  private static getChromeAndExtension = () => {
    try {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
      const chromeVersion = raw ? raw[2] : null;
      const manifest = chrome.runtime.getManifest();
      const extensionVersion = manifest.version;
      return `Chrome - ${chromeVersion} - UU Extension - ${extensionVersion}`;
    } catch (error) {
      console.error(`Error in getChromeVersion: ${error}`);
      return null;
    }
  };
}

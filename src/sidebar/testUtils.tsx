import { v4 as uuidv4 } from 'uuid';
import { ElementResult } from './interfaces';

export class TestUtils {

  public static giveIdChromeAndExtensionVersion = (resultElement: ElementResult) => {
    resultElement.testregelId = TestUtils.generateTestID();
    resultElement.nettlesar = TestUtils.getChromeVersion();
    resultElement.utvidelse = TestUtils.getExtensionVersion();

  }

  private static generateTestID = () => {
    const uuid = uuidv4().split('-')[0];
    return `ID$${uuid}`;
  };

  private static getChromeVersion = () => {
    try {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
      return raw ? raw[2] : null;
    } catch (error) {
      console.error(`Error in getChromeVersion: ${error}`);
      return null;
    }
  };

  private static getExtensionVersion = () => {
    try {
      const manifest = chrome.runtime.getManifest();
      return manifest.version;
    } catch (error) {
      console.error(`Error in getExtensionVersion: ${error}`);
      return null;
    }
  };
}

import { v4 as uuidv4 } from 'uuid';
import { ElementResult } from './interfaces';

export class TestUtils {

  public static giveIdChromeAndExtensionVersion = (resultElement: ElementResult) => {
    resultElement.testregelId = TestUtils.generatetestregelId();
    resultElement.nettlesar = TestUtils.getnettlesar();
    resultElement.utvidelse = TestUtils.getutvidelse();

  }

  private static generatetestregelId = () => {
    const uuid = uuidv4().split('-')[0];
    return `ID$${uuid}`;
  };

  private static getnettlesar = () => {
    try {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
      return raw ? raw[2] : null;
    } catch (error) {
      console.error(`Error in getnettlesar: ${error}`);
      return null;
    }
  };

  private static getutvidelse = () => {
    try {
      const manifest = chrome.runtime.getManifest();
      return manifest.version;
    } catch (error) {
      console.error(`Error in getutvidelse: ${error}`);
      return null;
    }
  };
}



import { v4 as uuidv4 } from 'uuid';
import { ElementResult } from './interfaces';
export class TestUtils{

    public static giveIdChromeAndExtensionVersion = (resultElement: ElementResult) => {
        resultElement.testID = TestUtils.generateTestID();
        resultElement.chromeVersion = TestUtils.getChromeVersion();
        resultElement.chromeExtensionVersion = TestUtils.getChromeExtensionVersion();
    }
    private static generateTestID = () => {
        const uuid = uuidv4().split('-')[0]; // Get the first part of the generated UUID
        return `ID$${uuid}`;
      };
  
      private static getChromeVersion = () => {
        const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
        return raw ? raw[2] : null;
      };
  
      private static getChromeExtensionVersion = () => {
        const manifest = chrome.runtime.getManifest();
        return manifest.version;
      };
}
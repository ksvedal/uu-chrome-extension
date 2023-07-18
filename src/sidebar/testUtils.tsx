

import { v4 as uuidv4 } from 'uuid';
class TestUtils{
    public static generateTestID = () => {
        const uuid = uuidv4().split('-')[0]; // Get the first part of the generated UUID
        return `ID$${uuid}`;
      };
  
      public static getChromeVersion = () => {
        const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9.]+)/);
        return raw ? raw[2] : null;
      };
  
      public static getChromeExtensionVersion = () => {
        const manifest = chrome.runtime.getManifest();
        return manifest.version;
      };
}
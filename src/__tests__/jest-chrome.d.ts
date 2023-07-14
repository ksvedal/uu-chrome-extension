declare module 'jest-chrome' {
    import { JestChromeNamespace } from 'jest-chrome';
  
    // Extend the JestChromeNamespace with the necessary properties from chrome
    interface CustomChromeNamespace extends JestChromeNamespace {
      cast: typeof chrome.cast;
      accessibilityFeatures: typeof chrome.accessibilityFeatures;
      action: typeof chrome.action;
      loginState: typeof chrome.loginState;
      // Add more properties as needed
    }
  
    // Export the custom Chrome namespace
    export const chrome: CustomChromeNamespace;
  }
  
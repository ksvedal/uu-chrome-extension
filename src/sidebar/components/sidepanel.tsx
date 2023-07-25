import React from 'react';
import "../../style/sidepanel.css";
import { RegularButton } from './buttons';
import ResultsHeader from '../resultsHeader';
import { MyContext } from './resultItemsContext';
import { fetchData, toggleDarkMode } from '../utils/sidebarUtils';
import { CollapsibleTypeContainer } from '../containers/collapsibleTypeContainer';
import { SidepanelInterface } from '../../interfaces/sidepanelInterfaces';

export const Sidepanel: React.FC<SidepanelInterface> = ({
  darkMode,
  setDarkMode,
  scanPageResult,
  setScanPageResult,
  error,
  setError,
  websiteURL,
  setWebsiteURL,
  jsonData,
  setJsonData
}) => {
  

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className='header-field'>
        <div className='extension-logo'>
          <img src="scan.png" alt="Extension Logo" />
        </div>
        <div className='extension-text'> <p>Button Seeker 2000</p></div>
        <button className={"dank-toggle-button float-right"} onClick={() => toggleDarkMode(setDarkMode, darkMode)}> moon </button>
      </div>

      <div className={"row scan-page-field"}>
        <div className={"whitebox"}>
          <div className="col-8">
            <div className='welcome-text'>
              <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
            </div>
          </div>
          <div className="col-4">
            <RegularButton data-testid="scanPage" text="Scan Page" onClick={()=> fetchData(setScanPageResult, setError, setWebsiteURL)} />
          </div>
          {error && <div className="col-12 error-message">{error}</div>}
        </div>

        <div className="col-12">
          <MyContext.Provider value={{ jsonData, setJsonData }}>
            <div className={"whitebox"}>
              <ResultsHeader url={websiteURL} isScanned={scanPageResult.length !== 0} />
            </div>
            {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
            {scanPageResult.map((elementType, index) =>
              <CollapsibleTypeContainer
                key={index}
                elementType={elementType} // Buttons, Links, Images, etc.
                url={websiteURL}
              >
              </CollapsibleTypeContainer>)}
          </MyContext.Provider>
        </div>
      </div>

    </div>
  );
}
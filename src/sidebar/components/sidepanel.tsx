import React from 'react';
import "../../style/sidepanel.css";
import { RegularButton } from './body/buttons';
import ResultsHeader from './header/resultsHeader';
import { MyContext } from './resultItemsContext';
import { CollapsibleTypeContainer } from '../containers/collapsibleTypeContainer';
import { SidepanelInterface } from '../../interfaces/sidepanelInterfaces';
import Brightness6Icon from '@mui/icons-material/Brightness6';


export const Sidepanel: React.FC<SidepanelInterface> = ({
  darkMode,
  scanPageResult,
  error,
  websiteURL,
  jsonData,
  setJsonData,
  handleFetchData,
  handleToggleDarkMode,
}) => {
  

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className='header-field'>
        <div className='extension-logo'>
          <img src="scan.png" alt="Extension Logo" />
        </div>
        <div className='extension-text'> <p>Button Seeker 2000</p></div>
        <button className={"dank-toggle-button float-right"} onClick={handleToggleDarkMode}> {<Brightness6Icon />} </button>
      </div>

      <div className={"row scan-page-field"}>
        <div className={"whitebox"}>
          <div className="col-8">
            <div className='welcome-text'>
              <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
            </div>
          </div>
          <div className="col-4">
            <RegularButton data-testid="scanPage" text="Scan Page" onClick={handleFetchData} />
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
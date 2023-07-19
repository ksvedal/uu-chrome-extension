import React, { useContext } from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from './interfaces';
import { MyContext } from './resultItemsContext';
import { TestUtils } from './testUtils';

const ResultsHeader: React.FC<ResultsHeaderInterface> = ({url, isScanned}) => {
  if(!isScanned){
    return null;
  }
const context = useContext(MyContext);
    if (context === null) {
      // handle the case where the context is null
      return null;
    }
    const { elementResults, setElementResults } = context;

    
    
    const logResult= () => {
      for (let result of elementResults){
        TestUtils.giveIdChromeAndExtensionVersion(result);
        console.log(result);
      };
      console.log("Result: " + elementResults);
    }
  
  return (
    <div className='row headline'>
        <div className={"col-2"}>
          <TabIcon></TabIcon>
        </div>
        <div className={"col-7"}>
            <p> {url} </p>
        </div>
        <div className={"col-3"}>
            <button className='headline-button float-right' onClick={logResult}>
                Print results
            </button>
        </div>
    </div>
  );
};

export default ResultsHeader;
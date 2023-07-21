import React, { useContext, useState } from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from './interfaces';
import { MyContext } from './resultItemsContext';
import { TestUtils } from './testUtils';

const ResultsHeader: React.FC<ResultsHeaderInterface> = ({ url, isScanned }) => {
  const [error, setError] = useState<string | null>(null);

  if (!isScanned) {
    return null;
  }
  const context = useContext(MyContext);
  if (context === null) {
    console.error('Context is null');
    return null;
  }
  const { elementResults, setElementResults } = context;



  const logResult = () => {
    if (elementResults == null || elementResults.length === 0) {
      const errorMsg = "No elements are evaluated yet.";
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    for (let result of elementResults) {
      try {
        TestUtils.giveIdChromeAndExtensionVersion(result);
      } catch (error) {
        console.error('Error processing result:', error);
      }
      console.log(result);
    };
    setError(null);
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
      {error && <div className="col-12 error-message">{error}</div>}
    </div>
  );
};

export default ResultsHeader;
import React, { useContext } from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from './interfaces';
import { MyContext } from './resultItemsContext';

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

    const generateTestID = (index: number) => {
      const testIndex = index + 1;
      const paddedIndex = String(testIndex).padStart(5, '0');
      return `Test${paddedIndex}`;
    };
    
    const logResult= () => {
      for (let result of elementResults){
        result.testID = generateTestID(elementResults.indexOf(result));
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
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


    const logResult= () => {
      for (let result of elementResults){
        console.log(result);
      };
      console.log("Result: " + elementResults);
    }
  
  return (
    <div className='headline'>
      <TabIcon></TabIcon>
      <p>Website: {url} </p>
      <button className='headline-button' onClick={logResult}>
        Print results
      </button>
    </div>
  );
};

export default ResultsHeader;
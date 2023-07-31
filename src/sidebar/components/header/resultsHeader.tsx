import React, { useContext, useState } from 'react';
import TabIcon from './tabIcon';
import { ResultsHeaderInterface } from '../../../interfaces/resultInterfaces';
import { MyContext } from '../resultItemsContext';
import { TestUtils } from '../../utils/testUtils';
import { postTestResults } from '../../../client/testResultsApi';
import { APIError } from '../../../client/apiError';
import { successToast, errorToast } from '../../utils/toastUtils';

const ResultsHeader: React.FC<ResultsHeaderInterface> = ({ url, isScanned }) => {
  const [actionResponse, setActionResponse] = useState<{ message: string, error: boolean } | null>(null);

  if (!isScanned) {
    return null;
  }
  const context = useContext(MyContext);
  if (context === null) {
    console.error('Context is null');
    return null;
  }
  const { jsonData } = context;

  const logResult = async () => {
    if (jsonData == null || jsonData.length === 0) {
      const errorMsg = "No elements are evaluated yet.";
      console.error(errorMsg);
      setActionResponse({ "message": errorMsg, "error": true });
      return;
    }

    for (let result of jsonData) {
      try {
        TestUtils.giveIdChromeAndExtensionVersion(result);
      } catch (error) {
        console.error('Error processing result:', error);
      }
      console.log(result);
    };

    try {
      //Currently using both toast and actionResponse, might only need one
      const message: string = await postTestResults(jsonData).then(data => data);
      setActionResponse({ "message": message, "error": false });
      successToast(message);
    } catch (error) {
      if (error instanceof APIError) {
        const errorMessage = `Failed to send results: ${error.message}. Status: ${error.status}`;
        errorToast(errorMessage);
        setActionResponse({ "message": errorMessage, "error": true });
      } else {
        errorToast("An unknown error occurred");
        setActionResponse({ "message": "An unknown error occurred", "error": true });
      }
    }

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
      {actionResponse && <div className={actionResponse.error ? "col-12 error-message" : "col-12 complete-message"}>
        {actionResponse.message}</div>}
    </div>
  );
};

export default ResultsHeader;
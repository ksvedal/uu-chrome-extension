import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { postTestResults as mockedPostTestResults } from '../../client/testResultsApi';
import { APIError } from '../../client/apiError';
import '@testing-library/jest-dom/extend-expect'
import { TestUtils } from '../../sidebar/utils/testUtils';
import { JsonDataFormat } from '../../interfaces/resultInterfaces';
import { errorToast, successToast } from '../../sidebar/utils/toastUtils';
import ResultsHeader from '../../sidebar/components/header/resultsHeader';
import { MyContext } from '../../sidebar/components/resultItemsContext';

jest.mock('../../client/testResultsApi');
jest.mock('../../sidebar/toastUtils', () => ({
  successToast: jest.fn(),
  errorToast: jest.fn(),
}));

const mockSetElementResults = jest.fn();

// Mocked ElementResult for testing
const dummyResult: JsonDataFormat = {
    element: "<p>Test HTML String</p>",
    samsvar: "Test Correct Text",
    kommentar: "Test Comment",
    side: "https://testurl.com",
    testregelId: "Test123",
    nettlesar: "Version 100.0",
    utvidelse: "Extension 1.0",
    utfall: "passed"
};

// Cast postTestResults to jest.Mock
const postTestResults = mockedPostTestResults as jest.Mock;

describe('<ResultsHeader />', () => {
  let consoleError: jest.SpyInstance;

  beforeAll(() => {
    // Temporarily mock console.error
    consoleError = jest.spyOn(console, "error");
    consoleError.mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore console.error after the tests
    consoleError.mockRestore();
  });

  // existing tests...

  it('handles postTestResults errors correctly', async () => {
    const mockError = new APIError('Network error', {}, 500);
    postTestResults.mockRejectedValue(mockError);

    render(
      <MyContext.Provider value={{ jsonData: [dummyResult], setJsonData: mockSetElementResults }}>
        <ResultsHeader url="https://test.com" isScanned={true} />
      </MyContext.Provider>
    );

    fireEvent.click(screen.getByText('Print results'));

    await waitFor(() => {
      expect(postTestResults).toHaveBeenCalledWith([dummyResult]);
      expect(errorToast).toHaveBeenCalledWith(`Failed to send results: ${mockError.message}. Status: ${mockError.status}`);
    });

    expect(screen.getByText(`Failed to send results: ${mockError.message}. Status: ${mockError.status}`)).toBeInTheDocument();
  });

  it('handles postTestResults success correctly', async () => {
    postTestResults.mockResolvedValue('Success Message');

    render(
      <MyContext.Provider value={{ jsonData: [dummyResult], setJsonData: mockSetElementResults }}>
        <ResultsHeader url="https://test.com" isScanned={true} />
      </MyContext.Provider>
    );

    fireEvent.click(screen.getByText('Print results'));

    await waitFor(() => {
      expect(postTestResults).toHaveBeenCalledWith([dummyResult]);
      expect(successToast).toHaveBeenCalledWith('Success Message');
    });

    expect(screen.getByText('Success Message')).toBeInTheDocument();
  });

  it('handles empty elementResults array correctly', async () => {
    const originalError = console.error;
    console.error = jest.fn();
  
    render(
      <MyContext.Provider value={{ jsonData: [], setJsonData: mockSetElementResults }}>
        <ResultsHeader url="https://test.com" isScanned={true} />
      </MyContext.Provider>
    );
  
    fireEvent.click(screen.getByText('Print results'));
  
    await waitFor(() => {
      expect(screen.getByText('No elements are evaluated yet.')).toBeInTheDocument();
    });
  
    console.error = originalError;
  });

  it('renders null when MyContext is null', () => {
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
  
    render(<ResultsHeader url="https://test.com" isScanned={true} />);
  
    expect(consoleError).toHaveBeenCalledWith('Context is null');
    expect(screen.queryByText('https://test.com')).toBeNull();
  
    consoleError.mockRestore();
  });

  it('shows error message when no element results', async () => {
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
  
    render(
      <MyContext.Provider value={{ jsonData: [], setJsonData: mockSetElementResults }}>
        <ResultsHeader url="https://test.com" isScanned={true} />
      </MyContext.Provider>
    );
  
    fireEvent.click(screen.getByText('Print results'));
  
    await waitFor(() => {
      expect(screen.getByText('No elements are evaluated yet.')).toBeInTheDocument();
    });
  
    consoleError.mockRestore();
  });

    it('logs processing error when processing element results', async () => {
        const consoleError = jest.spyOn(console, 'error');
        consoleError.mockImplementation(() => {});
        const mockError = new Error('Processing error');
    
        // Correctly mock the static method giveIdChromeAndExtensionVersion
        jest.spyOn(TestUtils, 'giveIdChromeAndExtensionVersion').mockImplementation(() => {
        throw mockError;
        });
    
        render(
        <MyContext.Provider value={{ jsonData: [dummyResult], setJsonData: mockSetElementResults }}>
            <ResultsHeader url="https://test.com" isScanned={true} />
        </MyContext.Provider>
        );
    
        fireEvent.click(screen.getByText('Print results'));
    
        await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith('Error processing result:', mockError);
        });
    
        consoleError.mockRestore();
    });

    it('handles postTestResults error correctly', async () => {
        const mockError = new APIError('Network error', {}, 500);
        postTestResults.mockRejectedValue(mockError);
    
        render(
        <MyContext.Provider value={{ jsonData: [dummyResult], setJsonData: mockSetElementResults }}>
            <ResultsHeader url="https://test.com" isScanned={true} />
        </MyContext.Provider>
        );
    
        fireEvent.click(screen.getByText('Print results'));
    
        await waitFor(() => {
        expect(postTestResults).toHaveBeenCalledWith([dummyResult]);
        expect(errorToast).toHaveBeenCalledWith(`Failed to send results: ${mockError.message}. Status: ${mockError.status}`);
        expect(screen.getByText(`Failed to send results: ${mockError.message}. Status: ${mockError.status}`)).toBeInTheDocument();
        });
    });

    it('handles postTestResults success correctly', async () => {
        postTestResults.mockResolvedValue('Success Message');
      
        render(
          <MyContext.Provider value={{ jsonData: [dummyResult], setJsonData: mockSetElementResults }}>
            <ResultsHeader url="https://test.com" isScanned={true} />
          </MyContext.Provider>
        );
      
        fireEvent.click(screen.getByText('Print results'));
      
        await waitFor(() => {
          expect(postTestResults).toHaveBeenCalledWith([dummyResult]);
          expect(successToast).toHaveBeenCalledWith('Success Message');
          expect(screen.getByText('Success Message')).toBeInTheDocument();
        });
      });   
});
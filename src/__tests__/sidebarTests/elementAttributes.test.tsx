import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import { ElementAttributes } from '../../sidebar/elementAttributes';
import { ElementResult } from '../../sidebar/interfaces';

describe('ElementAttributes', () => {
    
    const mockElementResult: ElementResult = {
        htmlString: '',
        correctText: '',
        name: '',
        comment: '',
        checked: false,
        url: '',
        testID: '',
        chromeVersion: null,
        chromeExtensionVersion: null,
        outcome: '',
    };


    // Test for when all attributes are given a value
    it('renders all attributes with correct values when all attributes are provided', () => {
        const attributes = [
            { name: 'title', value: 'Sample Title' },
            { name: 'Role', value: 'button' },
            { name: 'aria-labelledby', value: 'labelID' },
            { name: 'aria-label', value: 'Label for the element' },
            { name: 'Description', value: 'A description' },
            { name: 'Focusable', value: 'true' },
        ];

        render(<ElementAttributes attributes={attributes} htmlString="" title={''} selector={''} result={mockElementResult} isCommentVisible={false} />);
        
        expect(screen.getByText('Sample Title')).toBeInTheDocument();
        expect(screen.getByText('button')).toBeInTheDocument();
        expect(screen.getByText('labelID')).toBeInTheDocument();
        expect(screen.getByText('Label for the element')).toBeInTheDocument();
        expect(screen.getByText('A description')).toBeInTheDocument();
        expect(screen.getByText('true')).toBeInTheDocument();
    });


    // Test for when no values are given (empty table)
    it('renders attributes with empty values when no attributes are provided', () => {
        render(
            <ElementAttributes
            attributes={[]} // Empty attributes array
            htmlString=""
            title=""
            selector=""
            result={mockElementResult}
            isCommentVisible={false}
          />
        );

        const attributeTable = screen.getByRole('table');
        expect(attributeTable).toBeInTheDocument();

        // Check that the table body contains rows for each of the predefined attribute names
        const attributeNames = ["aria-labelledby", "aria-label", "title", "Description", "Role", "Focusable"];
        attributeNames.forEach((name) => {
            const attributeNameCell = screen.getByText(name);
            expect(attributeNameCell).toBeInTheDocument();

            // Check that the corresponding value cell is empty
            const valueCell = attributeNameCell.parentElement?.querySelector('.tableBody.value');
            expect(valueCell?.textContent).toBe('');
        });
    });


    // Test for when some attributes have values and some don't
    it('renders attributes with correct values when a subset of attributes is provided', () => {
        const attributes = [
          { name: 'title', value: 'Sample Title' },
          { name: 'Role', value: 'button' },
        ];
    
        render(
          <ElementAttributes
            attributes={attributes}
            htmlString=""
            title=""
            selector=""
            result={mockElementResult}
            isCommentVisible={false}
          />
        );
    
        // Check that the table body contains rows for each of the provided attribute names
        const attributeNameValuePairs = {
          title: 'Sample Title',
          Role: 'button',
          // Add more attributes and their expected values here if needed
        };
    
        Object.entries(attributeNameValuePairs).forEach(([name, value]) => {
          const attributeNameCell = screen.getByText(name);
          expect(attributeNameCell).toBeInTheDocument();
    
          // Check that the corresponding value cell contains the correct value
          const valueCell = attributeNameCell.parentElement?.querySelector('.tableBody.value');
          expect(valueCell?.textContent).toBe(value);
        });
    });

    
    // Test for when values are updated
    it('updates attribute values when attributes prop changes', () => {
        const initialAttributes = [
            { name: 'title', value: 'Initial Title' },
            { name: 'Role', value: 'initialRole' },
        ];
        
        const { rerender } = render(<ElementAttributes attributes={initialAttributes} htmlString="" title={''} selector={''} result={mockElementResult} isCommentVisible={false} />);
        
        expect(screen.getByText('Initial Title')).toBeInTheDocument();
        expect(screen.getByText('initialRole')).toBeInTheDocument();

        const updatedAttributes = [
            { name: 'title', value: 'Updated Title' },
            { name: 'Role', value: 'updatedRole' },
        ];

        rerender(<ElementAttributes attributes={updatedAttributes} htmlString="" title={''} selector={''} result={mockElementResult} isCommentVisible={false} />);
        
        expect(screen.getByText('Updated Title')).toBeInTheDocument();
        expect(screen.getByText('updatedRole')).toBeInTheDocument();
    });
});

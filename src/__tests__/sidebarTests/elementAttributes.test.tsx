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


    // Check when all attributes are given
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


});

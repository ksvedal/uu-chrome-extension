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

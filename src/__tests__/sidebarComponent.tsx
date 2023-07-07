import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Sidebar } from '../sidebar/sidebar';


test('Scan Page button renders a collapsible item when clicked', () => {
    render(<Sidebar/>)

    const scanPageButton = screen.getByRole('button');

    fireEvent.click(scanPageButton);

    const text = screen.getAllByRole('class', {name: 'buttons-text'});

    expect(text).toHaveTextContent('Buttons');

});
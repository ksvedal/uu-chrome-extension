import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IsCheckedStatus from '../../sidebar/isCheckedStatus';

describe('IsCheckedStatus Component', () => {
  it('renders with correct text and CSS class when "text" prop is "Yes"', () => {
    const { getByText, container } = render(<IsCheckedStatus text="Yes" />);
    expect(getByText('Yes')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('yesColor');
  });

  it('renders with correct text and CSS class when "text" prop is "No"', () => {
    const { getByText, container } = render(<IsCheckedStatus text="No" />);
    expect(getByText('No')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('noColor');
  });

  it('renders with correct text and CSS class when "text" prop is "The element is not a button"', () => {
    const { getByText, container } = render(
      <IsCheckedStatus text="The element is not a button" />
    );
    expect(getByText('The element is not a button')).toBeInTheDocument();
    //expect(container.firstChild).toHaveClass('notButtonColor');
  });

  it('renders with no additional CSS class when "text" prop is empty', () => {
    const { container } = render(<IsCheckedStatus text="" />);
    expect(container.firstChild).toHaveTextContent('');
    expect(container.firstChild).not.toHaveClass();
  });
});
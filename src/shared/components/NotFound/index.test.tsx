import { render } from '@testing-library/react';
import { describe } from 'vitest';
import NotFound from '.';

describe('NotFound', () => {
  // Tests that component renders with className and text props
  it('should render with className and text props', () => {
    const { getByText } = render(
      <NotFound className="test-class" text="test-text" />
    );
    const element = getByText('test-text');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-class');
  });

  // Tests that component renders null with empty text
  it('renders nothing when text is empty', () => {
    const { container } = render(<NotFound className="not-found" text="" />);
    expect(container.firstChild).toBeNull();
  });
});

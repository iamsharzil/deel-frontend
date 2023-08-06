import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader', () => {
  // Tests that Loader component renders a div element with class 'loader'
  it('should render a div element with class loader', () => {
    render(<Loader />);
    const loaderDiv = screen.getByRole('progressbar');
    expect(loaderDiv).toHaveClass('loader');
  });

  // Tests that the div element rendered by the Loader component has only the 'loader' class
  it('should have only the loader class', () => {
    render(<Loader />);
    const loaderDiv = screen.getByRole('progressbar');
    expect(loaderDiv.classList.length).toBe(1);
    expect(loaderDiv).toHaveClass('loader');
  });

  // Tests that the div element rendered by the Loader component has no children
  it('should have no children', () => {
    render(<Loader />);
    const loaderDiv = screen.getByRole('progressbar');
    expect(loaderDiv.children.length).toBe(0);
  });

  // Tests that the div element rendered by the Loader component has a role attribute of 'progressbar'
  it('should have a role attribute of progressbar', () => {
    render(<Loader />);
    const loaderDiv = screen.getByRole('progressbar');
    expect(loaderDiv).toHaveAttribute('role', 'progressbar');
  });
});

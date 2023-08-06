import { render } from '@testing-library/react';
import { describe } from 'vitest';
import SearchInput from '.';

describe('SearchInput', () => {
  // Tests that input element is rendered with the correct props
  it('should render input element with correct props', () => {
    const { getByRole } = render(
      <SearchInput id="search" placeholder="Search..." />
    );
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', 'search');
    expect(inputElement).toHaveAttribute('placeholder', 'Search...');
  });

  // Tests that input element is focused if autoFocus is true and readOnly and disabled are false
  it('should focus input element if autoFocus is true and readOnly and disabled are false', () => {
    const { getByRole } = render(
      <SearchInput autoFocus readOnly={false} disabled={false} />
    );
    const inputElement = getByRole('textbox');
    expect(document.activeElement).toEqual(inputElement);
  });

  // Tests that input element is not focused if autoFocus is true and either readOnly or disabled are true
  it('should not focus input element if autoFocus is true and either readOnly or disabled are true', () => {
    const { getByRole } = render(
      <SearchInput autoFocus readOnly disabled={false} />
    );
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });

  it('should not focus input element if autoFocus is true and either readOnly or disabled are true', () => {
    const { getByRole } = render(
      <SearchInput autoFocus readOnly={false} disabled />
    );
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });

  // Tests that input element is not focused if inputRef is null
  it('should not focus input element if inputRef is null', () => {
    const { getByRole } = render(<SearchInput />);
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });

  // Tests that input element is not focused if autoFocus is false
  it('should not focus input element if autoFocus is false', () => {
    const { getByRole } = render(<SearchInput autoFocus={false} />);
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });

  // Tests that input element is not focused if readOnly or disabled are true
  it('should not focus input element if readOnly is true', () => {
    const { getByRole } = render(<SearchInput readOnly />);
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });

  it('should not focus input element if disabled is true', () => {
    const { getByRole } = render(<SearchInput disabled />);
    const inputElement = getByRole('textbox');
    expect(document.activeElement).not.toEqual(inputElement);
  });
});

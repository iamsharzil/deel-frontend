/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react';
import { describe } from 'vitest';
import ListItem, { highlightMatch } from '.';

describe('ListItem', () => {
  // Tests that ListItem renders a list item with title, selected and inputValue props
  it('should render a list item with the correct props', () => {
    const { getByRole } = render(
      <ListItem title="Test Title" selected inputValue="Test Input Value" />
    );
    const listItem = getByRole('option');
    expect(listItem).toHaveTextContent('Test Title');
    expect(listItem).toHaveAttribute('aria-selected', 'true');
  });

  // Tests that ListItem renders a li element with role option and aria-selected attribute
  it('should render a li element with role option and aria-selected attribute', () => {
    const { getByRole } = render(
      <ListItem title="Test Title" selected inputValue="Test Input Value" />
    );
    const listItem = getByRole('option');
    expect(listItem).toHaveAttribute('role', 'option');
    expect(listItem).toHaveAttribute('aria-selected', 'true');
  });

  // Tests that ListItem handles null or undefined props
  it('should handle null or undefined props', () => {
    const { getByRole } = render(
      // @ts-ignore
      <ListItem title={undefined} selected={false} inputValue={null} />
    );
    const listItem = getByRole('option');
    expect(listItem).toHaveTextContent('');
  });

  // Tests that ListItem handles empty string props
  it('should handle empty string props', () => {
    const { getByRole } = render(
      <ListItem title="" selected={false} inputValue="" />
    );
    const listItem = getByRole('option');
    expect(listItem).toHaveTextContent('');
  });

  // Tests that ListItem handles null return value from highlightMatch function
  it('should handle null return value from highlightMatch function', () => {
    const { getByRole } = render(
      // @ts-ignore
      <ListItem title={null} selected={false} inputValue="Test Input Value" />
    );
    const listItem = getByRole('option');
    expect(listItem).toHaveTextContent('');
  });

  // Tests that null is returned when text is falsy
  it('should return null when text is falsy', () => {
    const text = '';
    const query = 'test';
    const result = highlightMatch(text, query);
    expect(result).toBeNull();
  });

  // Tests that an array with original text is returned when there is no query match
  it('should return an array with original text when there is no query match', () => {
    const text = 'test';
    const query = 'foo';
    const result = highlightMatch(text, query);
    expect(result).toEqual([text]);
  });
});

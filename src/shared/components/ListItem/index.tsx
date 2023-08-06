/* eslint-disable react/jsx-props-no-spreading */
import { LiHTMLAttributes } from 'react';

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  selected: boolean;
  inputValue: string;
  title: string;
}

const ListItem = (props: ListItemProps) => {
  const { title, selected, inputValue, ...rest } = props;
  return (
    <li tabIndex={0} role="option" aria-selected={selected} {...rest}>
      {highlightMatch(title, inputValue)}
    </li>
  );
};

export const highlightMatch = (text: string, query: string) => {
  if (!text) return null;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default ListItem;

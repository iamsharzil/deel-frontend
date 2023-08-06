/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  useState,
  useRef,
  useEffect,
  HTMLAttributes,
  ReactNode,
} from 'react';
import debounce from '@utils/debounce';

interface RenderListItemProps<T> {
  data: T;
  index: number;
  key: string;
  selected: boolean;
  inputValue: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

interface AutoCompleteProps<T> {
  apiFunction: (query: string) => Promise<T[]>;
  filterFunction: (input: string, data: T[]) => T[];
  loaderComponent: () => JSX.Element;
  optionLabelKey: string;
  renderNoOptions: () => JSX.Element;
  renderInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  renderList: (
    props: HTMLAttributes<HTMLUListElement>,
    children: ReactNode
  ) => JSX.Element | null;
  renderListItem: React.FC<RenderListItemProps<T>>;
  wrapperClass: string;
}

// eslint-disable-next-line react/function-component-definition
function AutoComplete<T>({
  apiFunction,
  filterFunction,
  loaderComponent,
  optionLabelKey,
  renderNoOptions,
  renderInput,
  renderList,
  renderListItem,
  wrapperClass = '',
}: AutoCompleteProps<T>) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focus, setFocus] = useState(false);

  const resultsRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement>();
  const autoCompleteContainerRef = useRef<HTMLDivElement | null>(null);

  const resetState = () => {
    setSuggestions([]);
    setInputValue('');
    setFocus(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (resultsRef.current && selectedIndex !== null) {
      const selectedSuggestion = resultsRef.current.querySelector(
        `.autocomplete__search-result:nth-child(${selectedIndex + 1})`
      ) as HTMLElement;

      if (selectedSuggestion) {
        selectedSuggestion.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });

        selectedSuggestion.focus();
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if the click occurred outside the AutoComplete container
      if (
        autoCompleteContainerRef.current &&
        !autoCompleteContainerRef.current.contains(event.target as Node)
      ) {
        // Clear results and search value
        resetState();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  /**
   * INPUT COMPONENT EVENTS - START
   */

  const handleInputChange = async (value: string) => {
    setInputValue(value);
    try {
      if (value) {
        setFocus(true);
        setLoading(true);
        const data = await apiFunction(value);
        setSuggestions(data);
        setLoading(false);
      } else {
        resetState();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const debounceHandleInputChange = debounce(handleInputChange, 300);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    /**
     * SELECT FIRST RESULT WHEN ARROW DOWN OR TAB KEY CLICK OCCURS
     * OR
     * RESET STATE WHEN ESCAPE KEY CLICK OCCURS
     */
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault();

      if (resultsRef.current && suggestions.length > 0) {
        const firstSuggestion = resultsRef.current.querySelector(
          '.autocomplete__search-result'
        ) as HTMLElement;

        if (firstSuggestion) {
          firstSuggestion.focus();
          setSelectedIndex(0);
        }
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      resetState();
    }
  };

  const handleInputKeyFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = event.currentTarget.value;
    }
  };

  /**
   * INPUT COMPONENT EVENTS - END
   */

  /**
   * RESULT COMPONENT EVENTS - START
   */

  const handleResultKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>
  ) => {
    /**
     * SELECT FIRST OR NEXT INDEX WHEN ARROW DOWN OR TAB CLICK OCCURS
     * OR
     * SELECT PREVIOUS INDEX WHEN ARROW UP EVENT OCCURS
     * OR
     * RESET STATE WHEN ESCAPE EVENT OCCURS
     * OR
     * FOCUS ON THE INPUT WHEN BACKSPACE EVENT OCCURS ON THE RESULT
     */
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault();

      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === suggestions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();

      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? suggestions.length - 1
          : prevIndex - 1
      );
    } else if (event.key === 'Escape') {
      resetState();
    } else if (event.key === 'Backspace') {
      setFocus(true);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResultClick = (data: any, index: number) => {
    setSelectedIndex(index);
    setInputValue(data[optionLabelKey]);
    if (inputRef.current) inputRef.current.value = data[optionLabelKey];
  };

  /**
   * RESULT COMPONENT EVENTS - END
   */

  /**
   * filteredData result can be optimizied using useMemo for large data
   */
  const filteredData = filterFunction(inputValue, suggestions);

  const renderListProps: React.HTMLAttributes<HTMLUListElement> = {
    tabIndex: 0,
    role: 'listbox',
    onKeyDown: handleResultKeyDown,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref: resultsRef,
  };

  let children = null;

  if (filteredData.length > 0) {
    children = filteredData.map((data, index) =>
      renderListItem({
        key: index.toString(),
        data,
        index,
        inputValue,
        selected: selectedIndex === index,
        onClick: () => handleResultClick(data, index),
        onKeyDown: (event) => {
          if (event.key === 'Enter') {
            handleResultClick(data, index);
          }
        },
      })
    );
  } else if (!loading && suggestions.length === 0 && focus) {
    children = renderNoOptions();
  }

  return (
    <div ref={autoCompleteContainerRef} className={wrapperClass}>
      {renderInput({
        type: 'text',
        onChange: (e) => debounceHandleInputChange(e.target.value),
        onFocus: handleInputKeyFocus,
        onKeyDown: handleInputKeyDown,
        placeholder: 'Search...',
        // @ts-ignore
        ref: inputRef,
      })}

      {loading ? loaderComponent() : renderList(renderListProps, children)}
    </div>
  );
}

export default AutoComplete;

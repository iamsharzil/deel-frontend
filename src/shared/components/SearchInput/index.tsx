/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
import {
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const SearchInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { autoFocus, ...rest } = props;
  const { readOnly, disabled } = rest;

  const shouldFocusElement = autoFocus && !(readOnly || disabled);

  useEffect(() => {
    if (shouldFocusElement) inputRef.current?.focus();
  }, [shouldFocusElement]);

  // Assign the ref to the inner input element
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  return <input ref={inputRef} {...rest} />;
});

export default SearchInput;

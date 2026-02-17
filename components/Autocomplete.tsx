'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

type Option = {
  id: number;
  name: string;
};

type AutocompleteProps = {
  options: Option[];
  value: number | null;
  onChange: (id: number) => void;
  placeholder?: string;
};

export default function Autocomplete({
  options,
  value,
  onChange,
  placeholder,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.id === value),
    [options, value],
  );

  useEffect(() => {
    if (value === null || value === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue('');
    } else {
      const match = options.find((opt) => opt.id === value);
      if (match) {
        setInputValue(match.name);
      }
    }
  }, [value, options]);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            inputValue
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ),
      ),
    [options, inputValue],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedOption) {
      onChange(0);
    }
    setInputValue(e.target.value);
    setHighlightedIndex(-1);
    setIsOpen(true);
  };

  const handleSelectOption = (option: Option) => {
    setInputValue(option.name);
    onChange(option.id);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;
      case 'Tab':
        if (filteredOptions.length > 0) {
          e.preventDefault();
          if (e.shiftKey) {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1,
            );
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0,
            );
          }
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const displayValue = selectedOption ? selectedOption.name : inputValue;

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-6 py-4 text-xl border-3 border-kraft-dark/40 rounded-2xl focus:outline-none focus:border-purple transition-colors bg-white"
        role="combobox"
        aria-controls="autocomplete-listbox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-activedescendant={
          highlightedIndex >= 0
            ? `option-${filteredOptions[highlightedIndex]?.id}`
            : undefined
        }
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listRef}
          id="autocomplete-listbox"
          role="listbox"
          className="absolute z-10 w-full mt-2 bg-white border-3 border-kraft-dark/40 rounded-2xl shadow-xl max-h-80 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.id}
              id={`option-${option.id}`}
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleSelectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`px-6 py-4 text-lg cursor-pointer transition-colors ${
                index === highlightedIndex
                  ? 'bg-kraft-light/80'
                  : 'hover:bg-kraft-light/50'
              }`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

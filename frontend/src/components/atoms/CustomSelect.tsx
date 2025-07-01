import { useState, useRef, useEffect} from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
  className = '',
  error,
  disabled = false
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Función para scroll suave hacia un elemento
  const scrollToElement = (element: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
    element.scrollIntoView({
      behavior,
      block: 'nearest',
      inline: 'nearest'
    });
  };

  // Calcular posición del dropdown y hacer scroll suave si es necesario
  const calculateDropdownPosition = () => {
    if (!selectRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = Math.min(240, options.length * 56); // altura estimada del dropdown
    
    const spaceBelow = viewportHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;
    
    // Determinar si debe abrirse hacia arriba o abajo
    const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    setDropdownPosition(shouldOpenUp ? 'top' : 'bottom');

    // Si no hay suficiente espacio en ninguna dirección, hacer scroll suave
    if (spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
      setTimeout(() => {
        scrollToElement(selectRef.current!);
      }, 50); // Small delay para que el dropdown se renderice primero
    }
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll suave al navegar con teclado
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[0]?.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleToggle = () => {
    if (!disabled) {
      if (!isOpen) {
        calculateDropdownPosition();
      }
      setIsOpen(!isOpen);
      setHighlightedIndex(-1);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const baseClasses = `
    relative w-full cursor-pointer bg-white border rounded-xl shadow-sm 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  `;
  
  const stateClasses = disabled 
    ? 'opacity-50 cursor-not-allowed border-gray-200' 
    : isOpen 
      ? 'border-blue-500 ring-2 ring-blue-100' 
      : error 
        ? 'border-red-300 hover:border-red-400' 
        : 'border-gray-200 hover:border-gray-300 hover:shadow-md';

  // Clases para el posicionamiento del dropdown
  const dropdownPositionClasses = dropdownPosition === 'top' 
    ? 'bottom-full mb-1' 
    : 'top-full mt-1';

  return (
    <div className="relative">
      <div
        ref={selectRef}
        className={`${baseClasses} ${stateClasses} ${className}`}
        onClick={handleToggle}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center justify-between px-4 py-3 min-h-[3rem]">
          <span className={`block truncate text-base ${
            selectedOption ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <div className="flex items-center">
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            ref={optionsRef}
            className={`absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto ${dropdownPositionClasses}`}
            style={{
              scrollBehavior: 'smooth'
            }}
            role="listbox"
          >
            <div className="py-1">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  className={`
                    relative cursor-pointer select-none py-3 px-4 text-base transition-colors duration-150
                    ${index === highlightedIndex 
                      ? 'bg-blue-50 text-blue-900' 
                      : 'text-gray-900 hover:bg-gray-50'
                    }
                    ${option.value === value ? 'bg-blue-100 text-blue-900 font-medium' : ''}
                  `}
                  onClick={() => handleOptionClick(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <span className="block truncate">
                    {option.label}
                  </span>
                  
                  {/* Checkmark para la opción seleccionada */}
                  {option.value === value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}; 
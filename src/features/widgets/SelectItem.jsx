import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Popup } from "./Popup";

export const SelectItem = ({
  items,
  selectedIndx = null,
  selectedItem,
  setSelectedItem,
  unit = "GB",
  submit = "Continue",
  onSubmit = () => {},
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    selectedIndx !== null ? selectedIndx : Math.floor(items.length / 2)
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const itemHeight = 44;

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setIsDropdownOpen(false);
  };

  const handleIncrement = () => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDecrement = () => {
    setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const matchedIndex = items.findIndex(
      (item) => String(item) === inputValue
    );
    if (matchedIndex !== -1) {
      setSelectedIndex(matchedIndex);
    }
  };

  const handleSubmit = () => {
    setSelectedItem((prev) => ({ ...prev, submit: true }));
    onSubmit();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync selectedItem.value with current selection
  useEffect(() => {
    setSelectedItem((prev) => ({ ...prev, value: items[selectedIndex] }));
  }, [selectedIndex, items, setSelectedItem]);

  return (
    <div className="w-full max-w-md mx-auto p-5 space-y-4">
      {/* Main selector area */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center justify-between w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <div className="text-left">
              <div className="text-2xl font-semibold text-gray-900">
                {items[selectedIndex]}
              </div>
              <div className="text-sm text-gray-500">{unit}</div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <ul
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto py-1"
            role="listbox"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors ${
                  selectedIndex === index
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleSelect(index)}
                style={{ minHeight: `${itemHeight}px` }}
                role="option"
                aria-selected={selectedIndex === index}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedIndex === index ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                  <span className="font-medium">{item}</span>
                </div>
                {selectedIndex === index && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fine control panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-6">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleIncrement}
            disabled={selectedIndex === 0}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Increase"
          >
            <ChevronUp className="w-5 h-5 text-gray-700" />
          </button>

          <div className="text-center min-w-25">
            <div className="text-4xl font-bold text-gray-900 tabular-nums">
              {items[selectedIndex]}
            </div>
            <div className="text-sm font-medium text-gray-500 mt-1">{unit}</div>
          </div>

          <button
            onClick={handleDecrement}
            disabled={selectedIndex === items.length - 1}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Decrease"
          >
            <ChevronDown className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Input and submit */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-stretch gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={items[selectedIndex]}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-12 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-shadow"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                {unit}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-5 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap"
            >
              {submit}
            </button>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "w-6 bg-blue-500"
                : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// SelectItemPopup remains unchanged, just wraps the component in a Popup.
export const SelectItemPopup = ({
  items,
  selectedItem,
  setSelectedItem,
  isOpen,
  setIsOpen,
  unit,
}) => {
  return (
    <>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          children={
            <SelectItem
              items={items}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              onSubmit={() => setIsOpen(false)}
              unit={unit}
            />
          }
        />
      )}
    </>
  );
};
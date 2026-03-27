import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function SmartDropdown({
  label,
  options,
  value,
  onChange,
  autoOpen,
  onSaved,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  const handleSelect = (opt) => {
    setSelected(opt);

    if (!opt.hasInput) {
      onChange(opt.label);
      setOpen(false);
      onSaved && onSaved();
    }
  };

  const handleSave = () => {
    let final = selected.label;

    if (selected.hasInput) {
      final = final.replace("X", inputValue);
    }

    onChange(final);
    setOpen(false);
    onSaved();
  };

  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="flex text-sm font-medium text-gray-700">
        {label} <span className="text-red-500 mx-1">*</span>
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        {/* TRIGGER */}
        <PopoverTrigger asChild>
          <button className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-left text-sm flex justify-between items-center bg-white">
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value || "Select an option"}
            </span>
            <span className="text-gray-400"><ChevronDown /></span>
          </button>
        </PopoverTrigger>

        {/* DROPDOWN */}
        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-[var(--radix-popover-trigger-width)] p-2 rounded-xl border bg-white shadow-lg"
        >
          <div className="space-y-1">

            {options.map((opt) => {
              const isSelected = selected?.id === opt.id;

              return (
                <div key={opt.id}>

                  {/* OPTION */}
                  <div
                    onClick={() => handleSelect(opt)}
                    className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer
                      ${
                        isSelected
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-gray-50 text-gray-700"
                      }
                    `}
                  >
                    <span className="text-sm font-medium">
                      {isSelected ? opt?.label?.replace("X", inputValue || "X") : opt?.label }
                    </span>

                    {isSelected && (
                      <Check className="h-4 w-4 text-purple-600" />
                    )}
                  </div>

                  {/* INPUT */}
                  {isSelected && opt.hasInput && (
                    <div className="mt-2 px-2">
                      <input
                        autoFocus
                        type="number"
                        placeholder={opt.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full border-2 border-purple-400 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  )}

                </div>
              );
            })}

            {/* ACTION BUTTONS AT BOTTOM */}
            {selected?.hasInput && (
              <div className="flex mt-3 border-t pt-3 gap-2">

                <button
                  className="w-1/2 py-2 border rounded-lg text-sm text-gray-600 bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="w-1/2 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
                  onClick={handleSave}
                  disabled={!inputValue}
                >
                  Save
                </button>

              </div>
            )}

          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
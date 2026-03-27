import { useState } from "react";
import { Check, ChevronDown, Pencil } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { durationOptions } from "@/constants/rewardOptions";

export default function SmartDropdown({
  label,
  options,
  value,
  onChange,
  autoOpen,
  onSaved,
  onEditTier = () => {},
  onRequestClose = () => {}
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [duration, setDuration] = useState("");

  const handleSelect = (opt) => {
    setSelected(opt);
    setInputValue("");
    setDuration("");

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

    if (selected.hasDuration) {
      final = final.replace("Y period", duration);
    }

    onChange(final);
    setOpen(false);
    onSaved && onSaved();
  };

  const handleClose = () => {
    setOpen(false);
    onRequestClose && onRequestClose();
  };

  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="flex text-sm font-medium text-gray-700">
        {label} <span className="text-red-500 mx-1">*</span>
      </label>

      <Popover
        open={autoOpen || open}
        onOpenChange={(val) => {
          if (!autoOpen) setOpen(val);
        }}
      >
        {/* TRIGGER */}
        <PopoverTrigger asChild>
          <button className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-left text-sm flex justify-between items-center bg-white">
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value || "Select an option"}
            </span>
            <span className="text-gray-400">
              <ChevronDown />
            </span>
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
                    onClick={() => !opt.disabled && handleSelect(opt)}
                    className={`group flex justify-between items-center px-3 py-2 rounded-lg
                    ${
                      opt.disabled
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer hover:bg-gray-50"
                    }
                    ${isSelected ? "bg-purple-100 text-purple-700" : "text-gray-700"}
                  `}
                  >
                    <span className="text-sm font-medium">
                      {isSelected
                        ? opt?.label?.replace("X", inputValue || "X")
                        : opt?.label}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* EDIT ICON */}
                      {opt?.label?.includes("Upgrade") && isSelected && (
                        <button
                          className="hidden group-hover:inline text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                            onEditTier();
                          }}
                        >
                          <Pencil className="h-4 w-4 text-purple-600" />
                        </button>
                      )}

                      {isSelected && (
                        <Check className="h-4 w-4 text-purple-600 group-hover:hidden" />
                      )}
                    </div>
                  </div>

                  {/* INPUT */}
                  {isSelected && opt.hasInput && (
                    <div className="mt-2 px-2 flex gap-2">
                      {/* X INPUT */}
                      <input
                        type="number"
                        placeholder={opt.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`${!opt.hasDuration ? "w-full" : "w-1/2"} border-2 border-purple-400 rounded-lg px-3 py-2 text-sm`}
                      />

                      {/* Y DROPDOWN */}
                      {opt.hasDuration && (
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-1/2 border rounded-lg px-3 py-2 text-sm bg-white"
                        >
                          <option value="">Select duration</option>
                          {durationOptions.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      )}
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
                  onClick={() => {
                    setOpen(false);
                    setSelected(null);
                    setInputValue("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="w-1/2 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
                  onClick={handleSave}
                  disabled={!inputValue || (selected?.hasDuration && !duration)}
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

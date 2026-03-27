import { useState } from "react";
import { X } from "lucide-react";

import SmartDropdown from "@/components/SmartDropdown";
import {
  rewardEvents,
  rewardTypes,
} from "@/constants/rewardOptions";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const CreateRewardModal = ({ open, onClose }) => {
  const [event, setEvent] = useState("");
  const [reward, setReward] = useState("");

  const [active, setActive] = useState("event");

  const [isTimeBound, setIsTimeBound] = useState(false);
  const [date, setDate] = useState(null);

  const handleCreateReward = () => {
    setEvent("")
    setReward("")
    setIsTimeBound(false)
    setDate(null)
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-2xl w-[440px] p-6 shadow-xl z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Create your reward system
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* EVENT DROPDOWN */}
          <SmartDropdown
            label="Reward event"
            options={rewardEvents}
            value={event}
            onChange={setEvent}
            autoOpen={false}
            onSaved={() => setActive("reward")}
          />

          {/* REWARD DROPDOWN */}
          <SmartDropdown
            label="Reward with"
            options={rewardTypes}
            value={reward}
            onChange={setReward}
            autoOpen={active === "reward"}
          />

          {/* TOGGLE */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">
                Make the reward time bound
              </p>
              <p className="text-xs text-gray-500">
                Choose an end date to stop this reward automatically.
              </p>
            </div>

            <button
              onClick={() => setIsTimeBound(!isTimeBound)}
              className={`w-10 h-5 rounded-full relative transition ${isTimeBound ? "bg-purple-500" : "bg-gray-300"
                }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${isTimeBound ? "right-0.5" : "left-0.5"
                  }`}
              />
            </button>
          </div>

          {/* DATE PICKER */}
          {isTimeBound && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border-2 border-purple-400 rounded-lg px-3 py-2 text-left flex items-center gap-2">

                  {/*  ICON FIX */}
                  <CalendarIcon className="h-4 w-4 text-gray-500" />

                  <span className="text-sm text-gray-700">
                    {date
                      ? date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "Select End Date"}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="start"
                sideOffset={8}
                //   avoidCollisions={false} 
                className="w-auto p-3 bg-white rounded-xl shadow-xl border"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(day) => day <= new Date()}
                  className="p-2"
                  /* FULL STYLING CONTROL */
                  classNames={{
                    /* FIX HEADER LAYOUT */
                    caption: "relative flex items-center justify-center h-10",

                    /* NAV CONTAINER FULL WIDTH */
                    nav: "absolute inset-x-0 top-0 flex items-center justify-between px-3 h-[60px]",

                    /* BUTTON STYLE */
                    nav_button:
                      "h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-100",

                    /* FORCE POSITIONS */
                    nav_button_previous: "left-0",
                    nav_button_next: "right-0",

                    /* KEEP REST SAME */
                    months: "flex flex-col",
                    month: "space-y-4",
                    caption_label: "text-sm font-medium",
                    table: "w-full border-collapse",
                    head_row: "flex",
                    head_cell: "w-9 text-xs text-gray-500 text-center font-normal",
                    row: "flex w-full mt-2",
                    cell: "w-9 h-9 text-center",
                    day: "w-9 h-9 flex items-center justify-center rounded-md text-sm hover:bg-purple-100",
                    day_selected: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                    day_today: "border border-purple-400",
                    day_disabled: "text-gray-300 opacity-50",
                  }}

                  /*  CUSTOM ICONS */
                  components={{
                    IconLeft: () => (
                      <ChevronLeft className="h-4 w-4" />
                    ),
                    IconRight: () => (
                      <ChevronRight className="h-4 w-4" />
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded-lg text-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>

          <button onClick={handleCreateReward} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Create Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRewardModal;
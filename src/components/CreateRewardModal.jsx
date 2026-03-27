import { useState } from "react";
import { X, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SmartDropdown from "@/components/SmartDropdown";
import { rewardEvents, rewardTypes } from "@/constants/rewardOptions";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

// REDUX ACTIONS
import {
  setEvent,
  setReward,
  setTimeBound,
  setEndDate,
} from "@/store/gamificationSlice";

const CreateRewardModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("event");
  const [showTierSelect, setShowTierSelect] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  //  GET DATA FROM REDUX
  const { event, reward, isTimeBound, endDate } = useSelector(
    (state) => state.gamification.config,
  );

  const modifiedRewardOptions = rewardTypes.map((opt) => {
    if (event === "Is Onboarded" && opt.label === "Upgrade Commission Tier") {
      return { ...opt, disabled: true };
    }
    return opt;
  });

  const handleRewardChange = (val) => {
    if (val.includes("Upgrade Commission Tier")) {
      setShowTierSelect(true);
    } else {
      setShowTierSelect(false);
      setSelectedTier("");
    }

    dispatch(setReward(val));
  };

  const handleCreateReward = () => {
    console.log("FINAL DATA:", {
      event,
      reward,
      isTimeBound,
      endDate,
    });

    dispatch(setEvent(""));
    dispatch(setReward(""));
    dispatch(setTimeBound(false));
    dispatch(setEndDate(null));
    setSelectedTier("")
    setShowTierSelect(false);
  };

  const handleTierSave = () => {
    dispatch(setReward(`Upgrade to ${selectedTier}`));
    setShowTierSelect(false);
  };

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
          <h2 className="text-lg font-semibold">Create your reward system</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EVENT */}
          <SmartDropdown
            label="Reward event"
            options={rewardEvents}
            value={event}
            onChange={(val) => dispatch(setEvent(val))}
            autoOpen={false}
            onSaved={() => setActive("reward")}
          />

          {/* REWARD */}
          <SmartDropdown
            label="Reward with"
            options={modifiedRewardOptions}
            value={selectedTier ? `Upgrade to ${selectedTier}` : reward}
            onChange={handleRewardChange}
            autoOpen={active === "reward"}
            onSaved={() => setActive("")}
            onEditTier={() => {
              setShowTierSelect(true);
              setSelectedTier("");
            }}
            onRequestClose={() => {
              setActive(""); // optional
            }}
          />

          {showTierSelect && !selectedTier && (
            <div className="mt-3 border rounded-xl p-3 bg-white shadow">
              <p className="text-sm font-medium mb-2">Upgrade to *</p>

              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                onChange={(e) => setSelectedTier(e.target.value)}
              >
                <option value="">Select a tier</option>
                <option>Tier Name Here</option>
                <option>Tier Name Here 2</option>
                <option>Tier Name Here 3</option>
              </select>

              <div className="flex flex-row gap-2 mt-3">
                <button
                  className="w-1/2 py-2 border rounded-lg text-sm text-gray-600 bg-gray-50"
                  onClick={() => {
                    setShowTierSelect(false);
                    dispatch(setReward(""));
                  }}
                >
                  Go Back
                </button>

                <button
                 className="w-1/2 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
                  disabled={!selectedTier}
                  onClick={handleTierSave}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* TOGGLE */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">Make the reward time bound</p>
              <p className="text-xs text-gray-500">
                Choose an end date to stop this reward automatically.
              </p>
            </div>

            <button
              onClick={() => dispatch(setTimeBound(!isTimeBound))}
              className={`w-10 h-5 rounded-full relative transition ${
                isTimeBound ? "bg-purple-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
                  isTimeBound ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* DATE PICKER */}
          {isTimeBound && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border-2 border-purple-400 rounded-lg px-3 py-2 text-left flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />

                  <span className="text-sm text-gray-700">
                    {endDate
                      ? new Date(endDate).toLocaleDateString("en-GB", {
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
                // avoidCollisions={false}
                className="w-auto p-3 bg-white rounded-xl shadow-xl border"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => dispatch(setEndDate(date))}
                  disabled={(day) => day <= new Date()}
                  className="p-2"
                  classNames={{
                    caption: "relative flex items-center justify-center h-10",
                    nav: "absolute inset-x-0 top-0 flex items-center justify-between px-3 h-[60px]",
                    nav_button:
                      "h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-100",
                    nav_button_previous: "left-0",
                    nav_button_next: "right-0",
                    months: "flex flex-col",
                    month: "space-y-4",
                    caption_label: "text-sm font-medium",
                    table: "w-full border-collapse",
                    head_row: "flex",
                    head_cell:
                      "w-9 text-xs text-gray-500 text-center font-normal",
                    row: "flex w-full mt-2",
                    cell: "w-9 h-9 text-center",
                    day: "w-9 h-9 flex items-center justify-center rounded-md text-sm hover:bg-purple-100",
                    day_selected:
                      "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                    day_today: "border border-purple-400",
                    day_disabled: "text-gray-300 opacity-50",
                  }}
                  components={{
                    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                    IconRight: () => <ChevronRight className="h-4 w-4" />,
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

          <button
            onClick={handleCreateReward}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Create Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRewardModal;

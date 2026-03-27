import { useState } from "react";
import Button from "./Button";
import CreateRewardModal from "./CreateRewardModal";
import background from "@/assets/background.png";
import {
  setEvent,
  setReward,
  setTimeBound,
  setEndDate,
} from "@/store/gamificationSlice";
import { useDispatch } from "react-redux";

const GamificationHero = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setEvent(""));
    dispatch(setReward(""));
    dispatch(setTimeBound(false));
    dispatch(setEndDate(null));
    setOpen(false)
  }
  return (
    <div className="bg-white rounded-2xl border p-10 relative overflow-hidden h-80">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-semibold text-purple-700">
          Gamify your Campaign
        </h1>

        <p className="text-gray-500 mt-2">
          Enable gamification to start crafting your custom reward system.
        </p>

        <div className="mt-6">
          <Button
            onClick={() => setOpen(!open)}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Enable Gamification
          </Button>
        </div>
      </div>

      {open && <CreateRewardModal open={open} onClose={handleClose} />}
    </div>
  );
};

export default GamificationHero;

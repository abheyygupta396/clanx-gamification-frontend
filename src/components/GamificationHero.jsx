import { useState } from "react";
import Button from "./Button";
import CreateRewardModal from "./CreateRewardModal";


const GamificationHero = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border p-10 text-center relative overflow-hidden">
      
      {/* subtle grid bg */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#eee_1px,transparent_1px),linear-gradient(90deg,#eee_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-purple-700">
          Gamify your Campaign
        </h2>

        <p className="text-gray-500 mt-2">
          Enable gamification to start crafting your custom reward system.
        </p>

        <div className="mt-6">
          <Button onClick={() => setOpen(!open)} className="bg-gradient-to-r from-purple-500 to-pink-500">
            Enable Gamification
          </Button>
        </div>
      </div>
      {open && <CreateRewardModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default GamificationHero;
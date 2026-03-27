import { Bell } from "lucide-react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="text-gray-500">
        Campaigns &gt; <span className="font-medium">Campaign Name</span> &gt; Campaign Settings
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            5
          </span>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default Topbar;
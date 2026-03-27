import { useState } from "react";

const Tabs = () => {
  const tabs = ["General", "Preferences", "Gamification"];
  const [activeTab, setActiveTab] = useState("Gamification");

  return (
    <>
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 cursor-pointer ${
              activeTab === tab
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;

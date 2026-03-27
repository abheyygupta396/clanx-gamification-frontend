import { Home, BarChart2, Briefcase, FileText, CreditCard, Settings } from "lucide-react";
import clsx from "clsx";

const menu = [
  { label: "Home", icon: Home },
  { label: "Insights", icon: BarChart2 },
  { label: "Campaigns", icon: Briefcase, active: true },
  { label: "Applications", icon: FileText },
  { label: "Payments", icon: CreditCard },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-purple-100 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6 text-lg font-semibold">{''}</div>

        <div className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                  item.active
                    ? "bg-white text-purple-600"
                    : "text-gray-600 hover:bg-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
        <Settings size={18} />
        Settings
      </div>
    </div>
  );
};

export default Sidebar;
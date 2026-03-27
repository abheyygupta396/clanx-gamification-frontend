import Topbar from "@/components/Topbar";
import Tabs from "@/components/Tabs";
import GamificationHero from "@/components/GamificationHero";
import FeatureCard from "@/components/FeatureCard";
import { Gift, Crown, Settings2 } from "lucide-react";

const Home = () => {
  return (
    <>
      <Topbar />
      <Tabs />
      <GamificationHero />

      <div className="grid grid-cols-3 gap-6 mt-8 absolute top-96 pt-0 pr-10 pb-4 pl-4">
        <FeatureCard
          icon={<Gift />}
          title="Reward Your Ambassadors"
          description="Boost campaign performance by setting up rewards for ambassadors"
        />
        <FeatureCard
          icon={<Crown />}
          title="Set Milestones"
          description="Set up custom goals for sales, posts, or time-based achievements"
        />
        <FeatureCard
          icon={<Settings2 />}
          title="Customise Incentives"
          description="Create custom incentives like flat fees, free products, or special commissions"
        />
      </div>
    </>
  );
};

export default Home;
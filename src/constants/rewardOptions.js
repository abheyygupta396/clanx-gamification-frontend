export const rewardEvents = [
    {
      id: "sales",
      label: "Cross $X in sales",
      hasInput: true,
      hasDuration: false,
      placeholder: "$ e.g. 100",
    },
    {
      id: "posts",
      label: "Posts X times every Y period",
      hasInput: true,
      hasDuration: true,
      placeholder: "e.g. 10",
    },
    {
      id: "onboard",
      label: "Is Onboarded",
      hasDuration: false,
      hasInput: false,
    },
  ];
  
  export const rewardTypes = [
    {
      id: "flat",
      label: "Flat $X bonus",
      hasInput: true,
      placeholder: "$ e.g. 50",
    },
    {
      id: "commission",
      label: "Upgrade Commission Tier",
      hasInput: false,
      placeholder: "% e.g. 10",
    },
  ];


  export const durationOptions = [
    "14 days",
    "1 month",
    "2 months",
    "3 months",
    "1 year",
  ];
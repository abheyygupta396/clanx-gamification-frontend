const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
        <div className="w-14 h-14 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
          {icon}
        </div>
  
        <h3 className="font-semibold">{title}</h3>
  
        <p className="text-gray-500 text-sm mt-2">
          {description}
        </p>
      </div>
    );
  };
  
  export default FeatureCard;
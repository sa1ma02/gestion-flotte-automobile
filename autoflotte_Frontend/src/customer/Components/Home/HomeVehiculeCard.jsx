import React from "react";

import { useNavigate } from "react-router-dom";

const HomeVehiculeCard = ({ vehicule }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={vehicule?.image || vehicule?.imageUrl}
          alt={vehicule?.immaticule}
        />
      </div>

      <div className="p-4 ">
        <h3 className="text-lg font-medium text-gray-900">
          {vehicule?.categoryName}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{vehicule?.categoryName}</p>
      </div>
    </div>
  );
};

export default HomeVehiculeCard;

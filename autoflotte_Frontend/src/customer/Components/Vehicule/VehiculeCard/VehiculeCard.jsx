import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./VehiculeCard.css";

const VehiculeCard = ({ vehicule }) => {
  const { statut, immatricule, imageUrl } = vehicule;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/vehicule/${vehicule?.id}`);
  };

  const handleDetailsClick = () => {
    navigate(`/vehicule/${vehicule?.id}`);
  };

  return (
    <div onClick={handleNavigate} className='vehiculeCard w-[15rem] border m-3 transition-all cursor-pointer'>
      <div className='h-[12rem]'>
        <img className='h-full w-full object-cover object-left-top' src={imageUrl} alt="" />
      </div>
      <div className='textPart bg-white p-1'>
      <div>
        <p style={{ marginBottom: '0.01rem' }}>{immatricule}</p> {/* Adjust margin-bottom to reduce space */}
        <p className="font-semibold opacity-50" >{statut}</p>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event
            handleDetailsClick();
          }}
          className='mt-1 w-full py-1 text-white rounded hover:bg-green-600'
        style={{ backgroundColor: '#09ba3f', marginBottom: '3rem'}} // Apply the custom color
        >
          Détails
        </button>
        </div>
      </div>
    </div>
  );
};

export default VehiculeCard;

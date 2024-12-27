import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import './Carousel.css'; // Importez un fichier CSS pour le style

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const items = homeCarouselData.map((item) => (
    <div className="carousel-item" key={item.path}>
      <img
        className="carousel-image"
        onClick={() => navigate(item.path)}
        src={item.image}
        alt=""
        onDragStart={handleDragStart}
        role="presentation"
      />
      <div className="carousel-text">
        <h1>Bienvenue dans votre espace de gestion de flotte automobile : optimisez votre efficacité, contrôlez vos opérations, et boostez vos performances.</h1> {/* Remplacez cette phrase par celle que vous souhaitez afficher */}
      </div>
    </div>
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;

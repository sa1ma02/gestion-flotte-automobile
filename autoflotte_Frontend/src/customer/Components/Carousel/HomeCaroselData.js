import bg1 from './cars3.png';

export const homeCarouselData=[
    {
        image:bg1,
        path:"/"
    }
 

]

const Carousel = () => {
    const carouselContainerStyle = {
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        marginTop: 0, // Ensure no margin on top
        paddingTop: 0,
        
    };

    const carouselItemStyle = {
        flex: '1 0 auto',
        
    };

    const carouselImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover', 
 
      
       
    };

    return (
        <div style={carouselContainerStyle}>
            {homeCarouselData.map((item, index) => (
                <a href={item.path} key={index} style={carouselItemStyle}>
                    <img src={item.image} alt={`Slide ${index}`} style={carouselImageStyle} />
                </a>
            ))}
        </div>
    );
};

export default Carousel;
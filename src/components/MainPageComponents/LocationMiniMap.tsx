interface LocationMiniMapProps {
    
}
 
const LocationMiniMap: React.FC<LocationMiniMapProps> = () => {
    // i don t wanna pay for a map location so this is gonna be a picture instead
    return (  
        <div className="location-mini-map-container" >
             <img className='location-shop-image' src='/shopLocation/shopLocation1.jpg'/>
        </div>
    );
}
 
export default LocationMiniMap;
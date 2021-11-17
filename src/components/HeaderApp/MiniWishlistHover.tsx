
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp,faMountain } from '@fortawesome/free-solid-svg-icons';

interface MiniWishlistHoverProps {
    wishlistProducts:any,
    setLocalStoreShop:(argument_shop:any)=>void,
    class_hide_show_wishlist_mobile:string
}
 
const MiniWishlistHover: React.FC<MiniWishlistHoverProps> = ({wishlistProducts,setLocalStoreShop,class_hide_show_wishlist_mobile}) => {
   
    return (  
        <>
        
        <div className={`mini-wishlist-hover-menu ${class_hide_show_wishlist_mobile}`} >
            <div className="angle-up-point-icon-container"><FontAwesomeIcon className='angle-up-wish-header' icon={faAngleUp}/></div>
              
              <div className="products-container" >
                    {Array.isArray(wishlistProducts) && 
                        wishlistProducts.map((productObjDetails:{productElement:any})=>{
                                return productObjDetails.productElement;
                    })
                    }  
                   {Array.isArray(wishlistProducts) === false || wishlistProducts.length === 0  &&<div>You have no products in wish list</div>}
              </div>
              
        </div>
        </>
    );
}
 
export default MiniWishlistHover;
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag,faCheck } from '@fortawesome/free-solid-svg-icons';
import useModify_WishList_And_Cart from './Modify_WishList_And_Cart';

interface AddToCartButtonProps {
    logedInUser:object | undefined,
    pageState:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    productName:string,
    productPath:string,
    storeQuantitySelected:number,
    selectedSize:string 
}
 
const AddToCartButton: React.FC<AddToCartButtonProps> = ({logedInUser,pageState,setLocalStoreShop,productName,productPath,storeQuantitySelected,selectedSize}) => {

     

   const productDetails = {productName,productPath,storeQuantitySelected,selectedSize}
 
  

  const {handle_wishlist_and_cart_writing,added_check_style_class_string} = useModify_WishList_And_Cart(false,setLocalStoreShop,logedInUser,pageState,productDetails);
   
  
   const [product_on_cart,setProduct_on_cart] = useState(added_check_style_class_string);//on refresh the value of  added_check_style_class_string remains

  


    return ( 

            <div className="btn-add-to-cart" 
             onClick={()=>{handle_wishlist_and_cart_writing('cart',setProduct_on_cart)}}
            >
                <i className={`shopping-bag--btn-add-to-cart ${added_check_style_class_string}`} 
                style={{pointerEvents:'none'}}>
                    
                    <FontAwesomeIcon icon={faShoppingBag} />

                    
                    
                </i>
                
                <span className="btn-add-to-cart__text">Add To Cart</span>
            </div>
 );
}
 
export default AddToCartButton;
import { calculate_percentage,format_number_with_dot } from "../oneProductIcon/Discount_Functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp,faMountain } from '@fortawesome/free-solid-svg-icons';
import {CreateCartProductsList} from './OneProductItemInCart';
import React,{useState} from 'react';

interface MiniCartHoverListProps {
    cartProducts:any,
    setLocalStoreShop:(argument_shop:any)=>void,
    product_list_Cart:any,
    class_hide_show_cart_mobile:string,
    number_of_cart_products:number | string,
    pageState:string,
    usePagesCategoryItems:any;
    logedInUser:any | undefined
}
 
const MiniCartHoverList: React.FC<MiniCartHoverListProps> = ({number_of_cart_products,setLocalStoreShop,product_list_Cart,class_hide_show_cart_mobile,cartProducts,pageState,usePagesCategoryItems,logedInUser}) => {
   
 




const total_products_to_cart_by_selected_quantity = (product_list_to_Cart:any)=>{
 

    let total_products_number = 0;

    product_list_to_Cart.forEach((product:any)=>{
        total_products_number += product.selectedQuantity
    })
  
   
    return total_products_number


}

    return (  
    <div className={`cart-hover-list-container ${class_hide_show_cart_mobile}`}>
        <div className="angle-up-point-icon-container"><FontAwesomeIcon className='angle-up-cart-header' icon={faAngleUp}/></div>
         
         <div className="products-list-container">
            
             {product_list_Cart !== null && Array.isArray(product_list_Cart) && product_list_Cart.map(currentproductObj=>currentproductObj.productElement)}
         </div>


     <div className="total-container">
         
         <div className="mountain-pick-towards-cart-container">
             <span className='mountain-pick'></span>
         </div>
         {Array.isArray(product_list_Cart) && product_list_Cart.length > 0 && 
           <div className="total-products">
                Total Products : <span className="number-of-total-products">{total_products_to_cart_by_selected_quantity(product_list_Cart)}</span>
           </div>
          }
          {product_list_Cart.length <= 0 &&
            <div className="no-products-in-cart">
                You have no products in cart.
            </div>
          }

          <div className="total-price">
    
          </div>
     </div>
    </div>     
 );
}
 
export default MiniCartHoverList;
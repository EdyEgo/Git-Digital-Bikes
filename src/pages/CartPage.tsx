
import React,{useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import {SelectedProducts} from '../components/cartPageApp/SelectedProducts'
import CartTotals from '../components/HeaderApp/CollateralSections/CartTotals';
import CodesDiscount from '../components/HeaderApp/CollateralSections/CodeDiscount';

interface CartPageProps {
    product_list_Cart:any,
    setLocalStoreShop:(cart_new_obj:any)=>void,
    write_billing_page:(billing_obj:any)=>void,
    change_local_store_cart_products_pageState:(productNameToDelete:string)=>void,
    pageState:string
}
 
const CartPage: React.FC<CartPageProps> = ({write_billing_page,product_list_Cart,change_local_store_cart_products_pageState,setLocalStoreShop,pageState}) => {
   

    window.scrollTo(0, 0);

    // when you finish with cart info you are send (with history)to billing page

 
 
 const history = useHistory()


  
 if(product_list_Cart.length === 0){
    
    const link_to_redirect_on_empty_cart =pageState === 'Equipment' ? '/equipment' : '/'
    history.push(link_to_redirect_on_empty_cart)
 }

 const {total_payment,products_cart_elements} = SelectedProducts(product_list_Cart,change_local_store_cart_products_pageState,pageState,setLocalStoreShop);
  
 

 
 
const userDiscount = useRef({discout:'',code:''});

const write_found_discount = ({dicount,code}:{dicount:string,code:string})=>{
    userDiscount.current.discout = dicount;
    userDiscount.current.code = code;
     
}
 
const calculate_my_prices_again = ()=>{
   const get_updated_local_store = localStorage.getItem('digital-bikes7A');
   setLocalStoreShop(get_updated_local_store);
    
}

const submit_order_and_go_to_next_step_page = ()=>{
    

    const billing_page_Obj = {product_list_Cart,total_payment,Discounts:userDiscount.current};

  
    write_billing_page(billing_page_Obj)
  
 const billing_pageState_link = pageState === 'Equipment' ? '/equipment/billingPage' : '/billingPage';
    setTimeout(()=>{
        history.push(billing_pageState_link)
    },1000)
    


}

    return (  
      <div className="cart-page-container">
        
          <div className="cart-page-title-container" >
              <div className="titale-cart-page-holder">
                  <h2 className='cart-page-title'>Shopping Cart</h2>
              </div>

              <div className="upper-cart-page-buttons">
                    <div className="changed-quantitys-button" >
                        <button className="calculate-price-again-btn" onClick={()=>{calculate_my_prices_again()}}>Calculate My Prices Again</button> 
                        </div>
                    <div className="check-out-finish-order">
                        <button className='check-out-finish-order__button' onClick={()=>{submit_order_and_go_to_next_step_page()}}>Continue with your order</button>
                    </div>
              </div>
              
          </div>

          <div className="cart-collaterals-and-selected-products-container" >
                <div className="selected-products-cart-container">
                     <div className="titles-info-selected-cart-products-container">
                          
                         <div className="tititle-cart-selected-products"> 
                           <span className='delete-button-empty'></span>
                           <span className="show-case-product-title">Product Name </span>
                           <span className="unit-price-title">Unit Price </span>
                           {pageState === 'Equipment' && <span className='selected-size-title'>Selected Size </span>}
                           <span className='cart-quantity-title'>Quantity </span>
                           <span className="sub-total-price">Subtotal Price</span>
                         </div>
                         
                         
                     </div>

                     {products_cart_elements.map((productElement:any)=>productElement)}
                </div>

                <div className="cart-collaterals-container">
                      <div className="discount-codes-container">
                        <CodesDiscount pageState={pageState} write_found_discount={write_found_discount}/>
                        <CartTotals total_payment={total_payment} submit_effect={submit_order_and_go_to_next_step_page}/>
                      </div>

                </div>

          </div>

      </div>

    );
}
 
export default CartPage;
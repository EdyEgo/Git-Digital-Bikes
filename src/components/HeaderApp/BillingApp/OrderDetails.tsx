import React from 'react';
import { Link,useHistory } from "react-router-dom";
import { firestore,increment,timeStamp } from '../../../firebase';
import { calculate_percentage,format_number_with_dot,cancel_comma_and_dot } from '../../oneProductIcon/Discount_Functions';
interface OrderDeatailsProps {
    storedCartProducts:any,
    setLocalStoreShop:(argument_shop:any)=>void,
    pageState:string,
    logedInUser:undefined | any,
    payments_selected:string | null,
    builling_info:any | null
}
 
const OrderDeatails: React.FC<OrderDeatailsProps> = ({storedCartProducts,setLocalStoreShop,logedInUser,pageState,payments_selected,builling_info}) => {
 
    
   const history = useHistory();
  //  const cancel_underscore = (word:string)=>word.split('_').join(' ');
  const is_pageState_moto =  pageState === 'Motorcycles';

  const link_back_to_cart = is_pageState_moto ? '/cartPage' : '/equipment/CartPage';
  if(storedCartProducts === undefined || builling_info === null) return <></>;
  
   const billing_page_infos = storedCartProducts.billing_page_info.current;
   const products_names_Array = billing_page_infos.product_list_Cart; // productName_with_underscores
   const cart_total_payment = billing_page_infos['total_payment'];
   




   const add_price_with_dicount_calculate =(last_general_price:string,discount_percent_or_price:string)=>{
       
   const {discount_percentage,new_price,old_price} = calculate_percentage(last_general_price,discount_percent_or_price);
    
    return (
        <div className="discount_calculated">
            <span className='price_new'>{new_price} 
            <sup className='old_price_dicount-line-trought' style={{textDecoration:'line-through'}}> {old_price}</sup></span>
        </div>
    )

   } 

   
   const place_order_function = async()=>{
 const get_last_order_number_database = await firestore.collection("digital-bikes-orders").doc(pageState).get();
   
 

 const last_order_number_data = get_last_order_number_database.data();
 const last_order_number = last_order_number_data !== undefined && last_order_number_data.hasOwnProperty('last_order_number')? 
                           last_order_number_data.last_order_number : null;
                           
                           if(last_order_number === null){
                               const push_link_by_pageState = pageState === 'Equipment' ? '/equipment/404Error' : '/404Error';
                               history.push(push_link_by_pageState);
                               return;
                            }
  const now_date = new Date().toLocaleDateString();
  
  
 const remove_product_element = (product_list_Cart:any)=>{
     let copy_prd_obj = [...product_list_Cart];
     copy_prd_obj.forEach((product_obj:any)=>{
         if(product_obj.hasOwnProperty('productElement')){
            delete product_obj.productElement;
         }
       
    })
    return copy_prd_obj
 }


 const object_to_sent = {
    expedition_info:builling_info,
   // general_total:billing_page_infos.total_payment,
   general_total:cart_total_payment,
    ordered_products: remove_product_element(billing_page_infos.product_list_Cart),
    payments_selected,
    discounts:billing_page_infos.Discounts
};


const delete_cart_from_local_memory = ()=>{

    if(logedInUser === undefined){
    const local_store_productsList = localStorage.getItem('digital-bikes7A');
    const store_parsed = local_store_productsList != null ? JSON.parse(local_store_productsList) : null;

    if(store_parsed === null)return;
    const obj_copy = {...store_parsed};
    obj_copy[pageState]['cart'] = {length:0};
 
  const new_obj_shop_string = JSON.stringify(obj_copy)
    
    localStorage.setItem('digital-bikes7A',new_obj_shop_string);
    setLocalStoreShop(new_obj_shop_string)
    }

}


////////works

 const write_placed_orders_database = await firestore.collection("digital-bikes-orders").doc(pageState).set({
     ['last_order_number']:increment,
      [`${now_date}_${last_order_number}`]:object_to_sent

 },{merge:true}).catch(err=>console.log(err,'error'))
 
  delete_cart_from_local_memory();

const link_home_page = pageState === 'Equipment' ? '/equipment/' : '/';
 history.push(link_home_page)
 

 

        
   }

   
    return (  

        <div className="order-details-container">
             
              <div className="titles-quantity-container">
                  
                 <span className="order-details-product-info-details">Product Name</span>
                 <span className="order-details-quantity-product-number">Quantity</span>
                 <span className="order-details-unit-product-price">Unit Price</span>
                 <span className="order-details-quantity-product-price">Subtotal price</span>
              </div>
              <div className="order-details__product-details-container">
                  <div className="order-details--products-name-container">
                       { products_names_Array
                         .map((product_obj:any)=>{
                             // here you can calculate the overall total, take the currency , separeta from product price not directlly from currency property
                                      const product_price = product_obj.price;
                                      const currency = product_obj.hasOwnProperty('currency') ? product_obj['currency'] : '';
                                    
                                     // add_to_total_price(product_price,currency)
                             return(
                                 <div className="one-product-details-and-price-container" >
                                  <div className="product-name-and-size">
                                     <div className="product-details-name"> {product_obj.product_name_normalized}</div>
                                     {product_obj.hasOwnProperty('selected_size')&& is_pageState_moto === false &&
                                     <div className="product-details-size">
                                         <span className="size-title-one-product-billing">SIZE : </span>
                                         <span className="size-number-one-product-billing">{product_obj.selected_size}</span>
                                          
                                     
                                     </div>}
                                      
                                   </div>
                                   <div className="quantity-number">x {product_obj.selectedQuantity}</div>
                                   <div className="unit-price">{product_price} {typeof product_price === 'number' && currency}</div>
                                   <div className="quantity-price">{product_obj.priceMultiplyBySelectedQuantity}</div>


                                 </div>
                                 
                        
                             )
                         })
                       
                       }
                  </div>
                  <div className="order-details--size-name-container">
                          
                  </div>


                 
              </div>

              <div className="total-overall-order">

                  <div className="total-title">General Total :</div>
                  
                  <div className="general-total-number">{cart_total_payment}</div>
                  
               
              </div>
              {billing_page_infos.Discounts.discount !== '' || billing_page_infos.Discounts.discount!== undefined && 
               <div className="general-total-number-with-dicount">
                 <div className="total-title">General Total With Dicount :</div>
                  
                      
                      <div className="general-total-number">
                      {add_price_with_dicount_calculate(cart_total_payment,billing_page_infos.Discounts.discount)}
                      </div>

                </div>
              }
              <div className="finish-order-button">
                  <div className="forgot-something-back-to-cart-finish-order">Go back to <Link className='go-to-cart-billing-link' to={link_back_to_cart}> cart</Link></div>
                  <button className="place-order-btn" onClick={()=>{place_order_function()}}>Place Order</button>
              </div>
        </div>
    );
}
 
export default OrderDeatails;
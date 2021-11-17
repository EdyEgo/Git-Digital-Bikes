import { calculate_price_by_selected_quantity } from "../HeaderApp/headerGeneralFunctions";
import { cancel_comma_and_dot,format_number_with_dot } from "../oneProductIcon/Discount_Functions";
import OneProductCartElement from "./OneCartProductELement";

interface SelectedProductsProps {
    
}
 
export const SelectedProducts = (product_list_Cart:any,change_local_store_cart_products_pageState:(productNameToDelete:string)=>void,pageState:string,setLocalStoreShop:(new_cart_obj:any)=>void) => { // lets return an array with a list of elements and an object with total price




   
  let all_products_total_price = 0;

  const add_to_total_car_products_price =(priceMultiplyBySelectedQuantity:string)=>{
      

      all_products_total_price = Number(cancel_comma_and_dot(priceMultiplyBySelectedQuantity)) + all_products_total_price

  }


  const create_cart_products_elements = ()=>{

    const products_cart_elements:any = [];
    let currency_used:string = '';
      
    product_list_Cart
    .forEach((productsObject:{
        index:number,
         price:string | number,
         productName_with_underscores:string,
         product_path:string,
         priceMultiplyBySelectedQuantity:string, 
         productElement:any,selectedQuantity:number,
         seletedSize?:string
         currency?:string})=>{
             const {index,price,priceMultiplyBySelectedQuantity,productElement,selectedQuantity,currency,seletedSize} = productsObject
        if(currency !== undefined && currency !== '')currency_used = currency;
        add_to_total_car_products_price(priceMultiplyBySelectedQuantity);
     
        products_cart_elements.push(
           

            <OneProductCartElement productsObject={productsObject} setLocalStoreShop={setLocalStoreShop} pageState={pageState}
               change_local_store_cart_products_pageState={change_local_store_cart_products_pageState}
                    
            />
           
        )
           
   


    })

    return {total_payment:format_number_with_dot(all_products_total_price,currency_used),products_cart_elements}
       
  }
 
  return create_cart_products_elements()
   
}
 

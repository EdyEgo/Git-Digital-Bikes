
import { calculate_percentage,format_number_with_dot,cancel_comma_and_dot } from "../oneProductIcon/Discount_Functions";




export const change_local_store_cart_products_pageState = (productNameToDelete:string,pageState:string,set_product_Cart_list:any,logedInUser?:any | undefined)=>{ // at the end call set_product_Cart_list

    if(logedInUser === undefined) {
           const local_store_productsList = localStorage.getItem('digital-bikes7A');
           const parsed_products_list =local_store_productsList !== null ? JSON.parse(local_store_productsList) : null;
           
           if(parsed_products_list === null) return;
          
          const delete_product = parsed_products_list[pageState]['cart'].hasOwnProperty(productNameToDelete) ?  delete parsed_products_list[pageState]['cart'][productNameToDelete] : null
            if(delete_product!== null){
             parsed_products_list[pageState]['cart']['length'] =  parsed_products_list[pageState]['cart']['length'] - 1; 
                   
             const stringify_modified_productList_obj = JSON.stringify(parsed_products_list);
             localStorage.setItem('digital-bikes7A',stringify_modified_productList_obj);
            
            set_product_Cart_list(parsed_products_list[pageState]['cart'],change_local_store_cart_products_pageState)
            }    
 
    }
    


   }



   export const calculate_price_by_selected_quantity = (price:any,selectedQuantity:number,currency?:string | undefined)=>{
      
        
    const price_is_number = typeof price === 'number';

    const make_price_number =price_is_number ? price: Number(cancel_comma_and_dot(price));
  
    const extract_price_currency = price_is_number && currency !== undefined ? currency :  price.trim().split(' ')[1];
      
    const multiply_price_by_selectedQuantity =price_is_number ? price * selectedQuantity: make_price_number * selectedQuantity;

  

    const format_price_back_with_comma_and_dot = format_number_with_dot(multiply_price_by_selectedQuantity,extract_price_currency);
    

    return format_price_back_with_comma_and_dot;


}

   
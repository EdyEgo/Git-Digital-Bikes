import React,{useState} from 'react';
import { cancel_comma_and_dot,format_number_with_dot } from "../oneProductIcon/Discount_Functions";
interface OneProductCartElementProps {
    productsObject:{
        productElement:any,
    price:string | number,
    selectedQuantity:number,
    productName_with_underscores:string,
    product_path:string,
    priceMultiplyBySelectedQuantity:string,
    currency?:string
    seletedSize?:string
    },
    pageState:string
    setLocalStoreShop:(new_cart_obj:any)=>void,
    
     change_local_store_cart_products_pageState:(productNameToDelete:string)=>void,
     
    
}
 
const OneProductCartElement: React.FC<OneProductCartElementProps> = ({productsObject,pageState,change_local_store_cart_products_pageState}) => {
   
  
    const {seletedSize,currency,productElement,price,selectedQuantity,priceMultiplyBySelectedQuantity,productName_with_underscores} = productsObject
const [shownedQuantity,setShownedQuantity] = useState(selectedQuantity);
const [productExist,setProductExist] = useState(true);

const increment_or_decrement_product_quantity =({target}:any)=>{

    const size_btn = target.getAttribute("data-size_btn");
    const local_shop_key_string = 'digital-bikes7A';

    
   
    const get_local_shop_store = localStorage.getItem(local_shop_key_string);
    const parse_local_store =  get_local_shop_store !== null ? JSON.parse(get_local_shop_store) : null;
   
    
    

    if(size_btn === '-'){
        
        if(shownedQuantity <= 1) return;
     
      const new_quantity = shownedQuantity - 1;
   


      parse_local_store[pageState]['cart'][productName_with_underscores]['selectedQuantity'] = new_quantity
      const stringify = JSON.stringify(parse_local_store)
      localStorage.setItem(local_shop_key_string,stringify)
      setShownedQuantity(new_quantity);
        return;
    }
    if(size_btn === '+'){
        if(shownedQuantity >= 69) return
           
        const new_quantity = shownedQuantity + 1;
       
         
        parse_local_store[pageState]['cart'][productName_with_underscores]['selectedQuantity'] = new_quantity
        const stringify = JSON.stringify(parse_local_store)
        localStorage.setItem(local_shop_key_string,stringify)
        setShownedQuantity(new_quantity);


        
    }

} 


   

    return (  
      <>
        {productExist &&
            <div className="one-cart-product-element" >
                    
                    <div className="showcase-cart-product" >{productElement}</div>
                    <div className="unit-price">{typeof price === 'string' && <span>{price}</span> } {typeof price === 'number' && currency !== undefined && <span>{format_number_with_dot(price,currency)}</span>}</div>
                    <div className="selected-size-cart-element">{ seletedSize !== undefined && seletedSize}</div> 

        


                    <div className="cart-quantity-edit" >
                        <button data-size_btn = '-' className="decrement-cart-one-product-size" style={{cursor:"pointer"}}
                        onClick={(event)=>{increment_or_decrement_product_quantity(event)}}>-</button>
                        <span className="element-quantity-selected" data-element_quantity={shownedQuantity}>{shownedQuantity}</span>
                        <button data-size_btn = '+' className="increment-cart-one-product-size" style={{cursor:"pointer"}}
                        onClick={(event)=>{increment_or_decrement_product_quantity(event)}}>+</button>
                    </div>

                    <div className="quantity-selected-one-product-price">
                        {priceMultiplyBySelectedQuantity}
                    </div>

                </div>
            }  

            </>
    );
}
 
export default OneProductCartElement;
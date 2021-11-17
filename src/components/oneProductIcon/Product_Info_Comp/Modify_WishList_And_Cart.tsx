import React , {useState,useRef} from 'react';
import {Add_To_Cart_Or_WishList} from './Add_To_Cart_Or_WishList';



const useModify_WishList_And_Cart =(useFor_Wish:boolean,setLocalStoreShop:(cart_new_obj:any)=>void,logedInUser:object | undefined,pageState:string,productDetails:{productPath:string,productName:string,selectedSize:string,storeQuantitySelected:number})=>{


  

const {productName,productPath,selectedSize,storeQuantitySelected} = productDetails




const website_local_store_key = 'digital-bikes7A';
    

let pageState_localStored_copy:any;
let localStore_copy:any;
let local_stored_parsed_list_object_copy:any;




const changeLocation_of_storeing_data = typeof logedInUser !== 'object' ? 'localStorage' : 'database';



const verify_wished_product_in_database_or_local_store_by_logedIn = ()=>{
 
    const verify_wishlist_or_cart = useFor_Wish ? 'wishlist' : 'cart';

     if(changeLocation_of_storeing_data === 'database'){
    

         return;
     }
     if(changeLocation_of_storeing_data === 'localStorage'){
      const shop_localStore_json:any = localStorage.getItem(website_local_store_key) !== null ? localStorage.getItem('digital-bikes7A') : undefined;
        const parse_json_if_defined = typeof shop_localStore_json === 'string' ? 
        JSON.parse(shop_localStore_json) : undefined; 

        

        if(parse_json_if_defined !== undefined){
       
         localStore_copy = parse_json_if_defined;
         
        const isProduct_in_list =  parse_json_if_defined[pageState][verify_wishlist_or_cart].hasOwnProperty(productName)
           if(isProduct_in_list) {
             local_stored_parsed_list_object_copy = parse_json_if_defined[pageState][verify_wishlist_or_cart];
            // pageState_localStored_copy = parse_json_if_defined[pageState];
           }
         //  const is_used_for_cart = verify_wishlist_or_cart === 'cart'? 'added-to-cart' : true;
          return isProduct_in_list;
        }
      return undefined;
     }

}


const heart_style_class_string = useFor_Wish ? verify_wished_product_in_database_or_local_store_by_logedIn() ? 'added-as-wish' : 'not-as-wish' : ''; 

const added_check_style_class_string =  useFor_Wish ? '' : verify_wished_product_in_database_or_local_store_by_logedIn() ? 'added-to-cart': 'not-to-cart';


let product_on_WishList = heart_style_class_string;


let product_on_Cart = added_check_style_class_string;

const delete_productName_property = (wish_list_or_cart:string,setUpdateComponentFuntion:any)=>{


if(product_on_WishList !== 'added-as-wish' && wish_list_or_cart === 'wishlist' || local_stored_parsed_list_object_copy[productName] == undefined) return;



// wait local_stored_parsed_list_object_copy[productName] has the right info but localStore_copy does not :/

delete localStore_copy[pageState][wish_list_or_cart][productName];// i think this one is not a copy
localStore_copy[pageState][wish_list_or_cart].length = localStore_copy[pageState][wish_list_or_cart].length -1

const new_shop_stringify = JSON.stringify(localStore_copy)
localStorage.setItem(website_local_store_key,new_shop_stringify)






    if(wish_list_or_cart === 'wishlist'){
        product_on_WishList = 'not-as-wish';
        /// test
        setLocalStoreShop(new_shop_stringify);
        /// test
        setUpdateComponentFuntion('not-as-wish');
    }
    
    if(wish_list_or_cart === 'cart'){// added-to-cart
        product_on_Cart = 'not-to-cart';
         ///test
         setLocalStoreShop(new_shop_stringify)

         ///test
        setUpdateComponentFuntion('not-to-cart');
    }



//delete 

}


const handle_wishlist_and_cart_writing =(cart_or_wishlist:string,setUpdateComponentFuntion:any)=> {




if(product_on_WishList === 'added-as-wish' && cart_or_wishlist === 'wishlist'){
 delete_productName_property('wishlist',setUpdateComponentFuntion);
return;
} 

if(cart_or_wishlist === 'cart' && product_on_Cart === 'added-to-cart'){ // update product_on_Cart
    
    delete_productName_property(cart_or_wishlist,setUpdateComponentFuntion);
    return;
}

const store_list_updated = Add_To_Cart_Or_WishList(cart_or_wishlist,setLocalStoreShop,changeLocation_of_storeing_data,pageState,productDetails);

   

   if(store_list_updated && cart_or_wishlist === 'wishlist') {
    product_on_WishList = 'added-as-wish';
    
       setUpdateComponentFuntion('added-as-wish');
   }
   if(store_list_updated && cart_or_wishlist === 'cart'){
    product_on_Cart = 'added-to-cart';
   

    setUpdateComponentFuntion('added-to-cart');    

   }

    return store_list_updated;
    




};


return {handle_wishlist_and_cart_writing,heart_style_class_string,added_check_style_class_string}


} 


export default useModify_WishList_And_Cart;
import React from 'react';
import OneProductSmallIcon from '../OneProductSmallIcon';



interface WatchedProductsAppProps {
    pageState:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    local_shop_object:any,
    logedInUser:{email:string} | undefined,
    
}
 
const WatchedProductsApp: React.FC<WatchedProductsAppProps> = ({pageState,setLocalStoreShop,local_shop_object,logedInUser}) => {
  // const 
   
   const extract_localStore_watched_products = localStorage.getItem('digital-bikes7A-watched-products');

   const create_Once_Product_watched_icon_Links = ()=>{
 
        let stored_watched_product_object;
        const created_links_of_watched_products_array:any = [];

        if(extract_localStore_watched_products !== null && typeof extract_localStore_watched_products === 'string'){

          stored_watched_product_object = JSON.parse(extract_localStore_watched_products);

          
          stored_watched_product_object[pageState].forEach((productId:string)=>{
            

            
            created_links_of_watched_products_array
            .push(
              <OneProductSmallIcon setLocalStoreShop={setLocalStoreShop}
              directions_string={productId} 
              local_shop_object={local_shop_object} logedInUser={logedInUser}
              pageState={pageState}/>

              
            )

          })


        }
        
      return created_links_of_watched_products_array;
    

   }




    return ( 
        <div className="product-watched-history" style={{display:'flex'}}>
           <div className="watched-products-tittle-container">
             <span className="watched-products-title">Recently Viewed Products</span>
           </div>
    
          <div className="watched-products-list-container">
             {create_Once_Product_watched_icon_Links()}
          </div>
            
       </div>

 );
}
 
export default WatchedProductsApp;
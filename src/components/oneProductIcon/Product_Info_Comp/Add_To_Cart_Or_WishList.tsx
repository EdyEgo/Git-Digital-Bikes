import React from 'react';


interface Add_To_Cart_Or_WishListProps {
    cart_or_wishList:string,
    location:string,// local storage or a database but only if the user is loged in
    pageState:string,
    productDetails:{
      productName:string,
      productPath:string,
    },
    
  //  productDetails:any//{selectedSize}
}
 
export const Add_To_Cart_Or_WishList = (cart_or_wishList:any,setLocalStoreShop:(cart_new_obj:any)=>void,location:any,pageState:any,productDetails:any) => {// nee any component must return jsx
  

     const {productName,productPath,selectedSize,storeQuantitySelected} = productDetails

     const selectedQuantity = storeQuantitySelected

      const local_storage_app_path = 'digital-bikes7A';
      const localStorage_copy = localStorage.getItem(local_storage_app_path) ;
      let localStorageObject =localStorage_copy === null ? {Equipment:{wishlist:{length:0},cart:{length:0}},Motorcycles:{wishlist:{length:0},cart:{length:0}}} : JSON.parse(localStorage_copy);
        
   
 
      
       const write_localStorage =()=>{
            
         
         const pageStateNames_String = pageState.toLowerCase() !== 'motorcycles' ? 
         {currentPage:pageState,otherPage:'Motorcycles'} : {currentPage:pageState,otherPage:'Equipment'};

         const {currentPage,otherPage} = pageStateNames_String;
  
            const pageState_WebSite = localStorageObject[pageState];
            
            const add_otherPageState_that_is_not_current_pageState = pageState.toLowerCase() === 'motorcycles' ? 
            localStorageObject['Equipment'] : localStorageObject['Motorcycles'];
             
          
             if(!pageState_WebSite[cart_or_wishList].hasOwnProperty(productName)){
          

            pageState_WebSite[cart_or_wishList][productName] = {productPath,selectedSize,selectedQuantity,index:pageState_WebSite[cart_or_wishList].length +1}

            pageState_WebSite[cart_or_wishList].length = pageState_WebSite[cart_or_wishList].length + 1;// adding length
            

            const modified_localStorage = {[currentPage]:pageState_WebSite,[otherPage]:add_otherPageState_that_is_not_current_pageState}
            
              localStorage[local_storage_app_path] = JSON.stringify(modified_localStorage);
              /// test
              setLocalStoreShop(modified_localStorage)

              /// test
             return true; // true means added
           }
           
              
            
           
           return false;

      } 
     

      const write_DataBase = (productName:string,productPath:string)=>{

      }
      
   if(location === 'localStorage'){
      
       
     return  write_localStorage()
        
   }
    

 
}
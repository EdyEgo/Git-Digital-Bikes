interface SaveWatchedProductProps {
    
}
 
const SaveWatchedProduct = (pageState:string,productPath:string) => {
 

 
  const watched_product_localStore_key = 'digital-bikes7A-watched-products'

 const watched_product_localStore_check = localStorage.getItem(watched_product_localStore_key);
  
let path_allready_saved;

 let modified_watched_products_object;
 
 

 if(watched_product_localStore_check === undefined || watched_product_localStore_check === null){
  modified_watched_products_object = {Equipment:[],Motorcycles:[]}
  localStorage.setItem(watched_product_localStore_key,JSON.stringify(modified_watched_products_object))
 }
  if(watched_product_localStore_check){ 

    

    modified_watched_products_object = JSON.parse(watched_product_localStore_check);

    // here check to see if you allready have that value stored in the array

    const pageState_array_watched_products = modified_watched_products_object[pageState];
    for(let i = 0;i<pageState_array_watched_products.length;i++){
          if(pageState_array_watched_products[i] === productPath){
            path_allready_saved = true;
            break;
          }
       
    }

  }
 
  

  if(path_allready_saved) return;
 

  if(modified_watched_products_object[pageState].length > 5){
    modified_watched_products_object[pageState].pop();
    modified_watched_products_object[pageState].push(productPath);
  } 

  if(modified_watched_products_object[pageState].length <= 5){

    modified_watched_products_object[pageState].push(productPath);
  }
  

  

   localStorage.setItem(watched_product_localStore_key,JSON.stringify(modified_watched_products_object));
   

}
  


export default SaveWatchedProduct;
import React from 'react';
import { count_brandsNames_by_price_productsList_return } from '../../filteredProductsApp/Count_Individual_selected_sections';
import OneProductSmallIcon from '../OneProductSmallIcon';

interface Same_Category_Products_AppProps {
    subCategoryName:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    pageState:string,
    brandName:string,
    shop_object:any,
    searchByProductCategory:string,
    currentWatchedProductName:string,
    logedInUser:any | undefined
}
 
const Same_Category_Products_App: React.FC<Same_Category_Products_AppProps> = ({subCategoryName,setLocalStoreShop,pageState,brandName,shop_object,searchByProductCategory,currentWatchedProductName,logedInUser}) => {// lets make this one Async
   
   
 

 

   const search_products_that_matches_subCategory = ()=>{ // make this one async
       const pageState_ShopItems:any = shop_object[pageState];

       const products_paths:any = []; 
       

   const does_categories_exist = Array.isArray(searchByProductCategory);
 
   if(!does_categories_exist) return products_paths;

  for(let indexCurrentProductCategory = 0;indexCurrentProductCategory < searchByProductCategory.length;indexCurrentProductCategory++){
       const currentProductCategory = searchByProductCategory[indexCurrentProductCategory];
       for(let subCategoryIndex = 0;subCategoryIndex<pageState_ShopItems.length;subCategoryIndex++){
     
             if(pageState_ShopItems[subCategoryIndex].id === subCategoryName){
                   const same_sub_category_object_products = pageState_ShopItems[subCategoryIndex].data;
                   const brands = same_sub_category_object_products.brands_available
                   
                   for(let brandIndex in brands){
                   
                    
                   
                      
                          const same_brand_subCategorized_products:any =  brands[brandIndex];   
                          
                           
                          for(let productNameKey in same_brand_subCategorized_products){
                               const current_productObject = same_brand_subCategorized_products[productNameKey];
                             
                               const current_product_category_array = current_productObject.categories// if the product has 3 cateogries more or less loop through them.indexOf !== -1
                              
                                    if(current_product_category_array !== undefined && current_product_category_array.indexOf(currentProductCategory) !== -1 && currentWatchedProductName !== productNameKey && products_paths.length <=12){
                                       
                                        products_paths.push(`${subCategoryName} ${brandIndex} ${productNameKey}`)
                                    }

                                 
                          }

                         
                   } 
                   
                  
                break;
             }
       }
} 


   return products_paths;

   }

const paths_finder = search_products_that_matches_subCategory();


// OneProductSmallIconProps> = ({directions_string,local_shop_object,pageState,logedInUser}
    return (  
    <div className="same-category-products-container">
        <h4 className="same-category-title">Other products from the same category</h4>
        <div className="products-same-category-list">
           {paths_finder.length > 0 && paths_finder.map((path_product:string)=>{// testing_path_finder.length > 0 &&

              
                  return (
                     
                     <OneProductSmallIcon setLocalStoreShop={setLocalStoreShop}directions_string={path_product} 
                        local_shop_object={shop_object} 
                        logedInUser={logedInUser} pageState={pageState}
                    />
                   )
           })}
        </div>
    </div>
 );
}
 
export default Same_Category_Products_App;
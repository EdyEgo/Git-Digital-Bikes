
 

 
export const extract_category_brand_products_by_pageState = (category_object:any,pageState:string)=>{
    if(pageState.toLowerCase() === 'equipment'){
     
        const available_brands = category_object.brands_available;

        return available_brands;
       
    }


    
    const available_brands = category_object//category_object.data;

    return available_brands;

}

export const FilterByCategory_and_Subcategory = (productList:any,extracted_subcategory:string,pageState:string) => {
    
   
    
        
    
  if(extracted_subcategory && pageState === 'Equipment'){
     let new_product_list:any = {};    
  
     for(const brandName in productList){
       const brandValueObj = productList[brandName];

         for(const productName in brandValueObj){
             const productValue = brandValueObj[productName];

             if(productValue.categories.indexOf(extracted_subcategory.toLowerCase()) !== -1){

              new_product_list[productName] = productValue;
             }

         }

     }  


    return new_product_list; 
  }

  if(extracted_subcategory && pageState === 'Motorcycles'){
    let new_extract_only_subCategory_products_onBrand; 


    for(const brandName in productList){
        const brandValueObj = productList[brandName];

        if(brandName.toLowerCase() === extracted_subcategory.toLowerCase()){
         
          new_extract_only_subCategory_products_onBrand = {[brandName]:brandValueObj}
          break;
        }   


    }
     
  
    const return_object = typeof new_extract_only_subCategory_products_onBrand === 'object' ? 
          new_extract_only_subCategory_products_onBrand : productList;

         

    return return_object;
  }

 return productList;




}
 



export const Find_product_details_in_Local_Object = (string_direction:string,local_object:any,pageState:string)=>{

    
    if(string_direction === undefined) return;
    const split_directionString_by_space = string_direction.split(' ');
    const category= split_directionString_by_space[0];
    const brandName= split_directionString_by_space[1];
    const productDetails= split_directionString_by_space[2];

    


 if(pageState.toLowerCase() === 'motorcycles'){ 

  const split_productDetails = productDetails.split('_');
  const product_cylinder_capacity = split_productDetails[1];//correct
  const product_Name = productDetails;
 


     if(local_object === undefined) return;
          for (let i = 0; i < local_object.length; i++) {
                  const current_category = local_object[i].id;
                  const category_data = local_object[i].data;
                  
                  if(current_category.toLowerCase() === category.toLowerCase()){
                      
                   return {productDetails:category_data[brandName][product_cylinder_capacity][product_Name],productName:product_Name,productNameUnderline:productDetails,cylinder_capacity:product_cylinder_capacity,brandName,category};
                     
                  }

          }

   return{};
 }
 if(pageState.toLowerCase() === 'equipment'){

    if(local_object === undefined) return;
  for (let i = 0; i < local_object.length; i++) {
      const current_category = local_object[i].id;
      const category_data = local_object[i].data;
       
      if(current_category.toLowerCase() === category.toLowerCase()){
          const normalize_productName = productDetails.split('_').join(' ');// old way was to return productName:normalize_productName
           const productDescription = category_data.brands_available[brandName][productDetails];
          
                       const results = productDescription !== undefined ? 
           {productDetails:productDescription,productName:productDetails,productNameUnderline:productDetails,keyProductName:productDetails,brandName,category} :
            category_data.brands_available[brandName] !== undefined ?
           {replacement:category_data.brands_available[brandName],fromBrand:brandName,category} : undefined;
           
           return results
          
      }    


  } 
   
 }
 


}
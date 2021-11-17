


export const count_year_section = (productList:any,productListType:string,originalProductList?:any)=>{
   
    const manage_adding_to_local_valiables = (year_section_counted_products:any,productvalue:any,productName:string)=>{
   
        if(year_section_counted_products.hasOwnProperty(productvalue.year)){
            year_section_counted_products[productvalue.year] = {count:year_section_counted_products[productvalue.year].count +1,productList:{...year_section_counted_products[productvalue.year].productList,...{[productName]:productvalue}}}
           
          }
          if(!year_section_counted_products.hasOwnProperty(productvalue.year)){

            year_section_counted_products[productvalue.year] = {count:1,productList:{[productName]:productvalue}}
           
          }
    }
    

    const count_by_page:any = {
   // motorcycles: {

        brand_level:(productListObj:any)=>{

            let year_section_counted_products:any = {};
          //  let products_filtered = {};

              for(const brandName in productListObj){
                   const brandCylinders_available = productListObj[brandName];
                     if(brandName.indexOf('_') === -1){
                        Object.entries(brandCylinders_available)
                        .forEach(([cylinderNumber,cylinderProducts]:any)=>{
                             Object.entries(cylinderProducts)
                             .forEach(([productName,productvalue]:any)=>{
                                    if(productvalue.hasOwnProperty('year')){ 
     
     
                                     manage_adding_to_local_valiables(year_section_counted_products,productvalue,productName)
     
                                    }
                             })
     
                        })
                     }
                  

                  
              }
          
              return year_section_counted_products; //{year:year_section_counted_products,productList:products_filtered}
        },
        product_level:(productListObj:any)=>{
            let year_section_counted_products:any = {};
           // let products_filtered = {};

            for(const productName in productListObj){
               const productValue = productListObj[productName];
               if(productValue.hasOwnProperty('year')){
                manage_adding_to_local_valiables(year_section_counted_products,productValue,productName)

               } 


            }    
            return {newProductList:year_section_counted_products,originalProductList:originalProductList};
          //  return year_section_counted_products//{year:year_section_counted_products,productList:products_filtered}
        },
        brand_return_level:(productListObj:any)=>{
          let year_section_counted_products:any = {};


           Object
           .entries(productListObj)
            .forEach(([brandName,brandvalue]:any)=>{
                   
                const available_productList =brandvalue.hasOwnProperty('productList') ? brandvalue.productList : brandvalue;

                  Object
                  .entries(available_productList)
                  .forEach(([productName,productValue]:any)=>{

                    manage_adding_to_local_valiables(year_section_counted_products,productValue,productName)
                       

                  })

           })
             
           return {newProductList:year_section_counted_products,originalProductList:originalProductList};
          
        }




   // },

  //  equipment: {

        // brand_level:(productListObj:any)=>{


        // },
        // product_level:(productListObj:any)=>{


        // },

 //   }
    
}
 
  const result = count_by_page[productListType](productList)

  return result; 



} 


export const count_cylinder_products = (productList:any,productListType:string,originalProductList?:any)=>{
  

    const count_by_levels:any = {

       brand_level:(productListObj:any)=>{
              let cylinders_counted_products:any = {};// {200:{count:2,productList:{...}}};
             // let products_filtered = {};

            for(const brandName in productListObj){
                const brandCylinders_available = productListObj[brandName];
                    
                if(brandName.indexOf('_') === -1){
                    
                    Object
                        .entries(brandCylinders_available)
                        .forEach(([cylinderNumber,cylinderProducts]:any)=>{
                          // wait this is veeeery wrong

                            //  if(!cylinders_counted_products.hasOwnProperty(cylinderNumber)){
                            //     cylinders_counted_products[cylinderNumber] = {count:Object.keys(cylinderProducts).length,productList:cylinderProducts};
                            

                            //  }
                            //  if(cylinders_counted_products.hasOwnProperty(cylinderNumber)){

                            //     cylinders_counted_products[cylinderNumber] = {count:cylinders_counted_products[cylinderNumber].count + Object.keys(cylinderProducts).length,productList:{...cylinders_counted_products[cylinderNumber].productList,...cylinderProducts} }
                            
                            //  }
                           
                            if(cylinders_counted_products.hasOwnProperty(cylinderNumber) === false){
                                cylinders_counted_products[cylinderNumber] ={count:Object.keys(cylinderProducts).length,productList:cylinderProducts};
                            }
                            if(cylinders_counted_products.hasOwnProperty(cylinderNumber)){
                                const old_count =  cylinders_counted_products[cylinderNumber].count ;
                                const new_count = Object.keys(cylinderProducts).length ;
                                cylinders_counted_products[cylinderNumber] = {count:old_count + new_count ,productList:{...cylinders_counted_products[cylinderNumber].productList,...cylinderProducts}}
                            }
                           


                            
                            

                           

                    });

                }    

      
            }
          return cylinders_counted_products;
       },
       product_level:(productListObj:any)=>{
           // split the product name
           let cylinders_counted_products:any = {};// 200:{count:3,productList:{..}}
         //  let products_filtered = {};
     
           Object
             .entries(productListObj)
             .forEach(([productName,productValue]:any)=>{
                 const split_product_name = productName.split('_');
                 const cylinderNumber = split_product_name[1];
               
                 if(cylinders_counted_products.hasOwnProperty(cylinderNumber)){
                    // cylinders_counted_products[cylinderNumber]= cylinders_counted_products[cylinderNumber] + 1;
                    // products_filtered = {...products_filtered,...{[productName]:productValue}}

                    cylinders_counted_products[cylinderNumber] =  {count:cylinders_counted_products[cylinderNumber].count +1,productList:{...cylinders_counted_products[cylinderNumber],...{[productName]:productValue}}}
                   

                 }
                 if(!cylinders_counted_products.hasOwnProperty(cylinderNumber)){
                    cylinders_counted_products[cylinderNumber] = {count:1,productList:{[productName]:productValue}}

                    // cylinders_counted_products[cylinderNumber] = 1;
                    // products_filtered = {...products_filtered,...{[productName]:productValue}}


                }



           })

          return {newProductList:cylinders_counted_products,originalProductList:originalProductList};
       }
 

    }

    const result =count_by_levels[productListType](productList)

   return result;
}



export const count_brandsNames_by_price_pure_productsList_return = (productsList:any)=>{ 
  let brand_counted_products:any = {};// Scorpion:{count:3,productList:{..}};
  let productList_with_out_a_brand_count:any = {}
        
  Object.entries(productsList).forEach(([productName,productValue]:any)=>{
            const currentProductBrand =  productValue.brand;
            const  brand_allready_has_product = brand_counted_products.hasOwnProperty(currentProductBrand) &&
            brand_counted_products[currentProductBrand].hasOwnProperty('productList') &&
            brand_counted_products[currentProductBrand].productList.hasOwnProperty(productName) ? true : false       

        if(brand_counted_products.hasOwnProperty(currentProductBrand) && brand_allready_has_product === false){
          
         
            
          brand_counted_products[currentProductBrand] =  {count:brand_counted_products[currentProductBrand].count +1,productList:{...brand_counted_products[currentProductBrand].productList,...{[productName]:productValue}}}
          
          productList_with_out_a_brand_count[productName] =productValue
        }
        if(brand_counted_products.hasOwnProperty(currentProductBrand) === false && brand_allready_has_product === false){
           
           brand_counted_products[currentProductBrand] = {count:1,productList:{[productName]:productValue}}

           productList_with_out_a_brand_count[productName] =productValue

          


        }
    
  })
 

  return {brand_counted_products,pureProductList:productList_with_out_a_brand_count};
} 

export const count_brandsNames_by_price_productsList_return = (product_by_prices:object)=>{
   
 
 
  let results;

     
  
 

  Object.entries(product_by_prices).forEach(([priceKey,priceProducts]:any)=>{

       

        results = count_brandsNames_by_price_pure_productsList_return(priceProducts)

        
  })
  
  return results

 
}

export const count_sizes_by_yearSection_return = (products_by_year:any)=>{ 
 
  let available_sizes_list:any = {};//{x,l,m,2xl} etc
  let products_list = {};

    const count_year_sizes_of_productsValue = (year_productsListValue:any,dot_product_list_exists:boolean)=>{
       
      const productList_location = dot_product_list_exists ? year_productsListValue['productList'] : year_productsListValue;
     
        Object.entries(productList_location).forEach(([productName,productValue]:any)=>{
          const product_available_sizes = productValue.sizes
         
          available_sizes_list = {...available_sizes_list,...product_available_sizes};
           
          products_list = {...products_list,[productName]:productValue};
           
        })
    }
 

   
  Object.entries(products_by_year).forEach(([yearName,yearProductsValue]:any)=>{
  
    
     const dot_product_list_exists = yearProductsValue.hasOwnProperty('productList');

     count_year_sizes_of_productsValue(yearProductsValue,dot_product_list_exists)

        

  })
 
  return {available_sizes_list,products_list};

}

export const count_cylinderCapacitys_by_yearSection_return = (products_by_year:any)=>{
  let available_cylinders_list:any = {};//{200:{...},125:{...}} etc
  

  const count_year_cylinders_of_productsValue = (yearProductsValue:any,dot_product_list_exists:boolean)=>{
       const productList_location = dot_product_list_exists ? yearProductsValue['productList'] : yearProductsValue;
           
       Object
        .entries(productList_location)
        .forEach(([productName,productValue]:any)=>{
          const product_cylinder = productName.split('_')[1];

          if(available_cylinders_list.hasOwnProperty(product_cylinder)){
            available_cylinders_list[product_cylinder]= {count:available_cylinders_list[product_cylinder].count + 1,productList:{...available_cylinders_list[product_cylinder].productList,...{[productName]:productValue}}}
            

          }
          if(!available_cylinders_list.hasOwnProperty(product_cylinder)){
            available_cylinders_list[product_cylinder] = {count:1,productList:{[productName]:productValue}}   

          }

       }) 


  }
    

     Object
      .entries(products_by_year)
      .forEach(([yearName,yearValueProducts]:any)=>{
           
        const dot_product_list_exists = yearValueProducts.hasOwnProperty('productList');

        count_year_cylinders_of_productsValue(yearValueProducts,dot_product_list_exists)

     })


  return available_cylinders_list

}











 
export const Available_section_options = (productsList:any | undefined,sectionName:string,pageState:string,extracted_category:any,userText_searchedProductName:any,extracted_subcategory:string | undefined,productList?:any ) => {
    


    const pageState_items_obj = productsList === undefined ? '' :  productsList[pageState];

    
 

 const extract_brand_products_with_out_category_by_pageState = (pageState_items_obj:any)=>{
         
     let brands_found = {}

  for(let categoryIndex = 0;categoryIndex < pageState_items_obj.length;categoryIndex++){

    const current_category_id = pageState_items_obj[categoryIndex].id;
    const current_category_data = pageState_items_obj[categoryIndex].data;

    const brands_available_obj = extract_category_brand_products_by_pageState(current_category_data); 

    if(typeof brands_available_obj === 'object'){
      brands_found = {...brands_found,...brands_available_obj}
    }

        


  }  

  return brands_found;

 }  
    
 
  const extract_category_brand_products_by_pageState = (category_object:any)=>{
       if(pageState.toLowerCase() === 'equipment'){
        
           const available_brands = category_object.brands_available;

           return available_brands;
          
       }
 

       
       const available_brands = category_object

       return available_brands;

  }

  const search_for_sectionName_in_productsList = (brandList:any)=>{
      
 
   const extract_product_list_from_cylinder_capacity = (brandName_Value:any)=>{
         
      
      let product_list:any = {};
       Object.entries(brandName_Value).forEach(([cylinderCapacity,cylinderProductListValue]:any)=>{
            

         
          if(typeof cylinderProductListValue === 'object')  product_list = {...product_list,...cylinderProductListValue}
             
       

      


       })

       return product_list;

   }
  
   const extract_all_products_with_cylider_capacity = (brandName_Value:any)=>{
       
     


       return brandName_Value;
   }
   
   const extract_all_brand_products = (brandList:any)=>{
      let brands_products_available_count:any = {};
      let new_product_list = {};
 
       if(pageState.toLowerCase()=== 'motorcycles'){
              Object.entries(brandList).forEach(([brand,cylinderKeys]:any)=>{

                  
                  if(brand !== 'brands_available' && brand !== 'available_brands' ){

                     Object.entries(cylinderKeys).forEach(([cylinderKeyName,cylinderValueObj]:any)=>{
                           if(brands_products_available_count.hasOwnProperty(brand)){
                            brands_products_available_count[brand] = brands_products_available_count[brand] + Object.keys(cylinderValueObj).length;
                              
                           } 

                           if(!brands_products_available_count.hasOwnProperty(brand)){
                            new_product_list = {...new_product_list,...cylinderValueObj}
                            brands_products_available_count[brand] = Object.keys(cylinderValueObj).length;
                           }
                        
                     })

                  }   
                   
              })

              
      
       return  {[sectionName]:brands_products_available_count,productList:new_product_list}
       } 

       if(pageState.toLowerCase()=== 'equipment'){
            Object.entries(brandList).forEach(([brandName,brandValueProducts]:any)=>{
             
              brands_products_available_count[brandName] = Object.keys(brandValueProducts).length;
              new_product_list= {...new_product_list,...brandValueProducts};

            }) 
          
             return  {[sectionName]:brands_products_available_count,productList:new_product_list}
         
       }
   }


     let section_name_list:any = {};

    if(pageState.toLowerCase() === 'motorcycles'){
            
    
         const new_product_list = [];
          
        if(sectionName === 'brand'){
        
        return   extract_all_brand_products(brandList);
       
           
        }


         if(sectionName === 'cylinderCapacity'){
              
          
         section_name_list = extract_all_products_with_cylider_capacity(brandList);
         return section_name_list;
        }
         
        for(const brandName in brandList){
             const brandName_Value = brandList[brandName];
               


               const products_list_extracted_from_cylinderCapacity = extract_product_list_from_cylinder_capacity(brandName_Value);
               
     
                Object.entries(products_list_extracted_from_cylinderCapacity).forEach(([productName,productObject]:any)=>{ 

                    
                           if(productObject.hasOwnProperty(sectionName)){
                             

                             section_name_list = {...section_name_list,...{[productName]:productObject}}; 


                 
                            } 
                     

                 })

                
        } 
            
    } 

    if(pageState.toLowerCase() === 'equipment'){

      if(sectionName === 'brand'){
          return   extract_all_brand_products(brandList);
         
           
        }

        for(const brandName in brandList){
            const brandName_Value_products_list = brandList[brandName];
        
            

            Object.entries(brandName_Value_products_list)
            .forEach(([productName,productValue]:any)=>{
                
                  if(productValue.hasOwnProperty(sectionName)){
                  
                  section_name_list = {...section_name_list,...{[productName]:productValue}};
                  }
            })

        }   


    }
 

    
      return section_name_list;

    
      
  }

  const count_individual_section_names = (products_that_contains_searched_section:any)=>{ 
    

    let sections_names_count:any = {};
    

    const make_price_string_a_number = (price:string)=>{
       
      const eliminate_currency_symbol = price.indexOf('from') ? price.split('from')[0].split(' ') : price.split(' ');
        const eliminate_dot = eliminate_currency_symbol[0].indexOf('.') !== -1? eliminate_currency_symbol[0].split('.').join('') : eliminate_currency_symbol[0];
        const eliminate_comma = eliminate_dot.indexOf(',') !== -1? eliminate_dot.split(',').join('') : eliminate_dot;
        const transform_string_into_number = Number(eliminate_comma);
        return transform_string_into_number;
   

    }


    const section_product_is_an_object = (section_value:any)=>{
           // for cateogires , sizes , prices (so activate this one only on Equipment)

    }


  const count_individual_value = (individual_section_value:any)=>{

    

    if(sections_names_count.hasOwnProperty(individual_section_value)){
      sections_names_count[individual_section_value] = sections_names_count[individual_section_value] + 1
         
     } 

     if(!sections_names_count.hasOwnProperty(individual_section_value)){
       sections_names_count[individual_section_value] = 1;
     

       // LEFT HEREEEEEEE
     }

  }
 

  const extract_prices_for_future_range = ()=>{
    
   let prices_range:{maximumPrice:string,minimumPrice:string,currencySymbol?:string} | null = null;

    for(const productName in products_that_contains_searched_section){
      const productValue = products_that_contains_searched_section[productName];
      const individual_section_value_price_range = productValue[sectionName];//prices_range
           
     
        for(const sizeName in individual_section_value_price_range){
          const priceString = individual_section_value_price_range[sizeName];

        const current_price_number = make_price_string_a_number(priceString);

        if(priceString.indexOf('%') > -1 ) continue;
        

        if(prices_range === null){
          prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]}
          continue;

        }
   

        if(current_price_number > make_price_string_a_number(prices_range.maximumPrice)){

          prices_range.maximumPrice = priceString;
         
          continue;

         }

         if(current_price_number < make_price_string_a_number(prices_range.minimumPrice)){
          prices_range.minimumPrice = priceString
         }


       }

    


    }

       
return prices_range;
  }
 

  const count_number_of_product_on_each_cylinder_key = ()=>{
   
   if(productsList !== undefined || products_that_contains_searched_section.hasOwnProperty('brands_available')){

  const loop_through_obj = products_that_contains_searched_section.hasOwnProperty('brands_available') ? products_that_contains_searched_section : productList;
   
    Object
    .entries(loop_through_obj)
    .forEach(([brandsNames,cylindersNames]:any)=>{
      
          if(brandsNames !== 'brands_available' && brandsNames !== 'available_brands' ){
          
              Object.entries(cylindersNames).forEach(([cylinderNumberName,cylinderProductsValue]:any)=>{
                Object.entries(cylinderProductsValue).forEach(([productName,productValue])=>{
                
                    if(sections_names_count.hasOwnProperty(cylinderNumberName)){
                      sections_names_count[cylinderNumberName] = sections_names_count[cylinderNumberName] + 1
                    }
                    if(!sections_names_count.hasOwnProperty(cylinderNumberName)){
                      sections_names_count[cylinderNumberName] = 1;
                    }
                })
              })
            }
          
    })
  
  }
 

  if(productsList === undefined && typeof productList === 'object' && products_that_contains_searched_section.hasOwnProperty('brands_available') === false){
  

    for(const productName in  products_that_contains_searched_section){
        const productValue = products_that_contains_searched_section[productName];
          
        const split_product_name = productName.split('_');
        const current_product_cylinder_number = split_product_name[1];

       

         if(sections_names_count.hasOwnProperty(current_product_cylinder_number)){
          sections_names_count[current_product_cylinder_number] = sections_names_count[current_product_cylinder_number] + 1;
          continue;
        }
        if(!sections_names_count.hasOwnProperty(current_product_cylinder_number)){
          sections_names_count[current_product_cylinder_number] = 1;
        }


    }

   

  }
   

  } 
   
  const give_back_a_price_range = ()=>{
    let range_price = null;// {minimumPrice:0,maximumPrice:0}  

  

    for(const productName in products_that_contains_searched_section){
      const productValue = products_that_contains_searched_section[productName];
      const individual_section_value_price = productValue[sectionName]; 
      
      const current_price_number = make_price_string_a_number(individual_section_value_price)
        if(range_price === null){
          range_price =  {minimumPrice:individual_section_value_price,maximumPrice:individual_section_value_price,currencySymbol:individual_section_value_price.trim().split(' ')[1]}//currencySymbol:split_currency_symbol[1]} ;
          continue;
        }

         if(current_price_number > make_price_string_a_number(range_price.maximumPrice)){

          range_price.maximumPrice = individual_section_value_price;
         continue;

         }

         if(current_price_number < make_price_string_a_number(range_price.minimumPrice)){
          range_price.minimumPrice = individual_section_value_price
         }
        
  
    }  

    return range_price;
  }

  if(sectionName === 'cylinderCapacity'){

    count_number_of_product_on_each_cylinder_key();

    return {[sectionName]:sections_names_count,productList:products_that_contains_searched_section};

  }
 

  if(sectionName === 'price'){
   const range_test = give_back_a_price_range();
   
    return range_test;
  }
  if(sectionName === 'prices'){
    

    return extract_prices_for_future_range()
  }
    for(const productName in products_that_contains_searched_section){
           const productValue = products_that_contains_searched_section[productName];
          

           if(pageState.toLowerCase() === 'motorcycles'){


               const individual_section_value = productValue[sectionName];//.toString();
               //sections_names_count[individual_section_value] = sections_names_count.has[individual_section_value] ? 
              //  if(sections_names_count.hasOwnProperty(individual_section_value)){
              //   sections_names_count[individual_section_value] = sections_names_count[individual_section_value] + 1
                   
              //  } 
               
              //  if(!sections_names_count.hasOwnProperty(individual_section_value)){
              //    sections_names_count[individual_section_value] = 1;
                  

                  

              //    // LEFT HEREEEEEEE
              //  }




              count_individual_value(individual_section_value);
               
           }
            
            if(pageState.toLowerCase() === 'equipment'){
              const sectionName_has_complex_key_value_pairs = sectionName === 'sizes' || sectionName === 'prices';
              
              const individual_section_value = productValue[sectionName]

                if(sectionName_has_complex_key_value_pairs){
                  const extract_sizes = sectionName === 'sizes' ? individual_section_value : undefined;

                 

               

                   if(extract_sizes) sections_names_count = {...sections_names_count,...extract_sizes};
                   
                  

                }

                if(!sectionName_has_complex_key_value_pairs){
                  count_individual_value(individual_section_value);

                }
              

            }

   

    }

  


   
   return {[sectionName]:sections_names_count,productList:products_that_contains_searched_section}

  }
  


  const filter_brands_available_by_category_and_subcategory = (productList:any)=>{ 
     
    

    

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
             new_extract_only_subCategory_products_onBrand = brandValueObj;
            break;
          }   


      }
       
    
      const return_object = typeof new_extract_only_subCategory_products_onBrand === 'object' ? new_extract_only_subCategory_products_onBrand : productList;

      return return_object;
    }

   return productList;


  }

   const sortOptionsFound_in_ascending_order_generalLocalObject = ()=>{ 


    if(extracted_category === '' || extracted_category === undefined) { 
       
   

     return; 
    }

     for(let categoryIndex = 0;categoryIndex < pageState_items_obj.length;categoryIndex++){

         const current_category_id = pageState_items_obj[categoryIndex].id;
        
 
     

            if(extracted_category.indexOf(current_category_id) !== -1){ 


                const current_category_data = pageState_items_obj[categoryIndex].data;
                    const brands_available_obj = extract_category_brand_products_by_pageState(current_category_data); 
                    

                    
                     

                    const filter_brands_available_subcategory = filter_brands_available_by_category_and_subcategory(brands_available_obj);

                    const products_that_contains_searched_section = search_for_sectionName_in_productsList(filter_brands_available_subcategory);
                      
                    if(sectionName === 'brand')return  products_that_contains_searched_section
                    const counted_options_object = count_individual_section_names(products_that_contains_searched_section);

                    
                    
                     
                return counted_options_object;
            }
           

     }
       
       

   } 
   
 
   const sortOptionsFound_in_ascending_order_productsList = ()=>{



      const counted_options_object = count_individual_section_names(productList);

      

      return counted_options_object;

   

   }




 

   
if(productList === undefined) return sortOptionsFound_in_ascending_order_generalLocalObject();
if(typeof productList === 'object') return sortOptionsFound_in_ascending_order_productsList();


 



  
}
 

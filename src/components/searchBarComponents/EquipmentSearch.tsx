import React from 'react';

import MakeLinkedList from './MakeLinkedList';


export interface EquipmentSearchProps {
    searchText:string,
    selectedCategory?:string,
    categoryItems:any,
    pageState:string,
    timeOutSearch?:any
}

const EquipmentSearch: React.FC<EquipmentSearchProps> = ({searchText,selectedCategory,categoryItems,pageState,timeOutSearch}) => { 
     
  
    
  

   

      
      
    
 

   

   
     

    if(categoryItems[pageState] == undefined) return <></>
    if(searchText.length <= 2 || searchText.length >= 30) return <>Number of characters is too short or to long</>
    
    const pageCategoryItems = categoryItems[pageState]; 

    let splitBySpace_searchText = [...searchText.split(' ')]; // delete from this one if there is a match !!!!!

     
     
   


      const extract_brandName_strings = splitBySpace_searchText.filter((value:any)=>{ // extract brand names , length > 3
           

            if(isNaN(value) && value.length > 3){ 
              
              return value.length >= 15 ? null : value;
            }
      })
     
    

     const extract_size:any = pageState === 'Equipment' ? 
     splitBySpace_searchText.filter((value:any)=>{ 
          if(isNaN(value) && value.length <= 3){
             return value;
          } 
      }) 
     : undefined; 
     
   

      const delete_found_string = (found_string:string,array_To_Be_Modified:any[])=>{ 
        
   
      array_To_Be_Modified.splice(array_To_Be_Modified.indexOf(found_string),1);
      
     }







     const extract_category_inserted_by_userText = (searched_category:string)=>{ // ex: hemlets or helmet
       const available_categories:any = pageCategoryItems.filter((category_pageState:{id:string})=>category_pageState.id);
        
       let store_founded_category:{search_with_category:string} | undefined;     

            for(let i= 0;i<available_categories.length;i++){ 
               if(available_categories[i].id.toLowerCase() === searched_category.toLowerCase() || available_categories[i].id.toLowerCase() === searched_category.toLowerCase().slice(0,searched_category.length -1)){
                store_founded_category = {search_with_category:available_categories[i].id}; 
                 
               

                break;
               }

            }
          
            return store_founded_category; 
       

     } 
     
     const extract_subCategory_inserted_by_userText = (searched_subCategory:string,seached_in_category?:string)=>{
                
            const find_matching_subCateogry = (category_array:string)=>{ 
                 if(Array.isArray(category_array)){
                    for(let i = 0;i<category_array.length;i++){ 
                      
                      if(searched_subCategory.toLowerCase() === category_array[i].toLowerCase()){
                        return {founded_Sub_Category:category_array[i]};
                       
                      }        

                    }


                 }
                 return;
            }
             
            let available_SubCategories = [];

            pageCategoryItems.forEach((cateogry:any)=>{
                    if(seached_in_category){}
            }) 

            for(let i = 0;i< pageCategoryItems.length;i++){
                 const current_category = pageCategoryItems[i];
                 if(seached_in_category !== undefined && current_category.id.toLowerCase() === seached_in_category.toLowerCase()){
                 // current_category.data.subCategory 
                 available_SubCategories.push(find_matching_subCateogry(current_category.data.subCategory));
                  break;
                 }   
                 
                 const founded_subCategory = find_matching_subCateogry(current_category.data.subCategory);

                 const push_to_available_subCategories = founded_subCategory !== undefined ? available_SubCategories.push(founded_subCategory) : '';
                 
                 
               
            }
            
            return available_SubCategories[0];// its categories not what ever that is
     }
   
    const search_brand_In_LocalObject = (searched_string?:string | undefined,search_with_category?:string | undefined,search_with_subCateogry?:string | undefined)=>{
               
          let products_found:object[] = [];
    
         
         const match_subCategory_products = (brand_products_object_list:{},brandName:string,category:string)=>{ 
           // push to products_found and use   search_with_subCateogry to match subcategory
             Object.entries(brand_products_object_list).forEach(([product,productValue]:any)=>{
                         if(search_with_subCateogry === undefined) return; 



                         productValue.categories.forEach((subCategory:string)=>{
                              
                               if(subCategory.toLowerCase() === search_with_subCateogry.toLowerCase()){
                               
                                products_found.push({brandName,availableProducts:{[product]:productValue},category})
                               }
                         })

                 
                   
                  
                
             })

         }
          
         const match_without_brand = (brandName:string,brandObject:any,current_category:string)=>{
                    
              if(search_with_category && search_with_subCateogry){ 
                  // use indexOf if is -1 then is not there
                    Object
                    .entries(brandObject)
                    .forEach(([brandProductName,brandProductValue]:any)=>{ 
                          const searched_subCategory_found = brandProductValue.categories.indexOf(search_with_subCateogry.toLowerCase()) !== -1 ? true : false;
                        
                          const current_cateogry_matches_searchedCategory = search_with_category.toLowerCase() === current_category.toLowerCase()

                          if(searched_subCategory_found && current_cateogry_matches_searchedCategory){
                          products_found.push({brandName,availableProducts:{[brandProductName]:brandProductValue},category:current_category})
                          }

                    })
              
                return;
              } 
              
              if(search_with_category === undefined && search_with_subCateogry){
                      

                  Object
                  .entries(brandObject)
                  .forEach(([brandProductName,brandProductValue]:any)=>{ 
                    const searched_subCategory_found = brandProductValue.categories.indexOf(search_with_subCateogry.toLowerCase()) !== -1 ? true : false;
                  
                      if(searched_subCategory_found){
                        products_found
                        .push({brandName,availableProducts:{[brandProductName]:brandProductValue},current_category})
                      }

                  })
    
                return;
              }

              if(search_with_category && search_with_subCateogry === undefined){
                          
                  Object.entries(brandObject)
                    .forEach(([brandProductName,brandProductValue]:any)=>{ 
                      
                    
                      const current_cateogry_matches_searchedCategory = search_with_category.toLowerCase() === current_category.toLowerCase();

                      if(current_cateogry_matches_searchedCategory){
                      products_found
                      .push({brandName,availableProducts:{[brandProductName]:brandProductValue},category:current_category})// incorect words
                      }

                  })


              }


         }

         const search_without_searched_string = ()=>{ 
                if(search_with_category && search_with_subCateogry){
                
                  return;
                } 
            
                if(search_with_category || search_with_subCateogry){

                  return;
                }

         }// pointless

          for(let i = 0; i <pageCategoryItems.length;i++){
              const category =pageCategoryItems[i]; 


          

               
             if(category.data.brands_available !== undefined){
               const brand_found =  Object.entries(category.data.brands_available).forEach(([brand,value]:any)=>{
                  
                   if(searched_string === undefined ){//&& search_with_subCateogry){// for no specified brand
                   
                    
                    match_without_brand(brand,value,category.id);
                  
                   }
                 

                   if(searched_string && brand.toLowerCase() === searched_string.toLowerCase() && search_with_subCateogry === undefined){       
                    
                  
                    products_found
                    .push({brandName:brand,availableProducts:{...value},category:category.id});// now is correct

                  
                   } 
                   
                   if(searched_string && brand.toLowerCase() === searched_string.toLowerCase() && search_with_subCateogry){ 
                   
                     match_subCategory_products(value,brand,category.id);
                   }


               }) ;
               
             //  return brand_found;
               if(search_with_category && category.id.toLowerCase() === search_with_category.toLowerCase() && search_with_subCateogry === undefined)return products_found;
             }

          }
        
         return products_found;
    } 

    const search_all_of_brands_products = (possible_brand:string,callback_products_found?:any)=>{
     // {brandName,availableProducts,category}
        const products_found:object[] = [];

       const possible_brand_first_letter_upperCase = possible_brand.slice(0,1).toUpperCase() + possible_brand.slice(1,possible_brand.length).toLowerCase();
        pageCategoryListLoop: for(let i = 0; i < pageCategoryItems.length;i++){
                const current_cateogry =   pageCategoryItems[i].id; 
                const brands_available = pageCategoryItems[i].data.brands_available;

                   const brand_found = brands_available ? brands_available[possible_brand_first_letter_upperCase] : undefined;

                   if(typeof brand_found === 'object' && callback_products_found === undefined) {
                     products_found
                     .push({brandName:possible_brand_first_letter_upperCase,availableProducts:brand_found,category:current_cateogry})

                   } 

                   if(typeof brand_found === 'object' && callback_products_found){
                    callback_products_found.push({brandName:possible_brand_first_letter_upperCase,availableProducts:brand_found,category:current_cateogry})
                   }
          }
          

         return products_found;
    }

    const search_size_In_LocalObject = (searched_string:string,brandName:string,category:string,subName_productObject?:any | undefined,search_with_subCategory?:string)=>{ // for strings that are not longer that 3 letters in length
      
      // use with a subCategory  because you really need it 




       
       if(searched_string.length > 3) return undefined;// or null if
         
       let products_found:any = [];

        const match_sizes = (searched_size:string,size_Object_container:object,currentProductName:string,productObjectValue:object)=>{
           
          Object.entries(size_Object_container).forEach(([size,size_Products_Number_available])=>{
                      // return {brandName,category,etc}
                      
                     if(size.toLowerCase() === searched_size.toLowerCase() && size_Products_Number_available > 1){
                    //  products_found
                    //  .push({brandName,category,availableProduct:{productName:currentProductName,productValue:productObjectValue}})

                    products_found
                    .push({brandName,category,availableProduct:{[currentProductName]:productObjectValue}})

                     
                     }
          })

        }
       // this one must be done only with a brand name and or a subBrandName
            
       //pageCategoryItems
       // if it matches the brand then search the size 


       for(let i = 0;i<pageCategoryItems.length;i++){ 


           if(pageCategoryItems[i].id.toLowerCase() ===  category.toLowerCase()){ 
           
              if(subName_productObject === undefined && pageCategoryItems[i].data.brands_available[brandName] !== undefined && search_with_subCategory === undefined){ 
                const brand_products = pageCategoryItems[i].data.brands_available[brandName];
                
                Object
                .entries(brand_products)
                .forEach(([productName,productValue]:any)=>{
                     // Object.entries(productValue).forEach(([])) 
                  
                     match_sizes(searched_string,productValue.sizes,productName,productValue);
                })  
                break;
              }
               
              if(subName_productObject !== undefined && subName_productObject.hasOwnProperty('sizes')){// for now will use only with out a subNamebrand object
            
                const product_KeyName_and_Value:any = Object.entries(subName_productObject).filter(([key,value])=>{return{productName:key,productValue:value}});
                const product_Name = product_KeyName_and_Value[0].productName;
                const product_Value = product_KeyName_and_Value[0].productValue;
                match_sizes(searched_string,subName_productObject.sizes,product_Name,product_Value)//productName,productValue);
                break;
              } 

              if(search_with_subCategory && subName_productObject === undefined){ // maybe not complete


                    const brand_products = pageCategoryItems[i].data.brands_available[brandName];
                    
                    Object
                    .entries(brand_products)
                    .forEach(([productName,productValue]:any)=>{
                        // Object.entries(productValue).forEach(([])) 
                        if(productValue.categories.indexOf(search_with_subCategory.toLowerCase()) !== -1){ // if it matches the searched subCategory
                          match_sizes(searched_string,productValue.sizes,productName,productValue);
                        }
                        
                    }) 

                break;
              }

              if(search_with_subCategory && subName_productObject){
                 
                const product_KeyName_and_Value:any = Object.entries(subName_productObject).filter(([key,value])=>{return{productName:key,productValue:value}});
                const product_Name = product_KeyName_and_Value[0].productName;
                const product_Value = product_KeyName_and_Value[0].productValue;

                if(product_Value.categories.indexOf(search_with_subCategory.toLowerCase()) !== -1){
                  match_sizes(searched_string,subName_productObject.sizes,product_Name,product_Value);
                }
                




                break;
              }

              break;
           }  

       }
     
         return products_found;
       
    }
      
      
     


   const search_subBrandName_In_LocalObject = (searched_string:string,brandName:string,category:string)=>{ // incorrect ooor is it? wait
      
       let matched_products:any = [];// [{brandName,category,productName}]

       
      const split_Key_brand_name = (key_Brand_Name:any,splitBy:string)=>key_Brand_Name.split(splitBy); 
       const logIt_Out = ({brandName,available_products}:any)=>{
      
       } 
        
      const check_for_matching_words = (searched_word:string,productName:string,productObjectValue:object,belongsToBrand:string,category:string)=>{
           const product_name_words = split_Key_brand_name(productName,'_');

           for(let i = 0;i<product_name_words.length;i++){
             
                 if(product_name_words[i].toLowerCase() === searched_word.toLowerCase()){
                  
                  matched_products.push({brandName:belongsToBrand,category,availableProducts:{[productName]:productObjectValue}});
                 
                  break;
                 }
             
           }

          
          
         
      }
     

      const forEach_brand_return_products = (brands_Object:{},callback:any)=>Object.entries(brands_Object).forEach(([key,value]:any)=>callback({brandName:key,available_products:value}));
       
      
        for(let i = 0;i<pageCategoryItems.length;i++){ 
         

          const brands_container = pageCategoryItems[i].data.brands_available;
            if(pageCategoryItems[i].id.toLowerCase() === category.toLowerCase()){
         
             // forEach_brand_return_products(pageCategoryItems[i].data.brands_available,logIt_Out); 
                if(brandName === undefined){
                  Object
                  .entries(brands_container)
                  .forEach(([brandName,brandValue]:any)=>{ // for each brand
                    if(brandValue !== undefined){
                      Object.entries(brandValue)
                      .forEach(([productName,productValue]:any)=>{ // for each product brand
                        check_for_matching_words(searched_string,productName,productValue,brandName,pageCategoryItems[i].id)
                    
                      })
                    }
                    
                  })
                } 
                 
                if(brandName && brands_container[brandName] !== undefined){
                 

                  Object
                  .entries(brands_container[brandName])
                  .forEach(([productName,productValue]:any)=>{
                      check_for_matching_words(searched_string,productName,productValue,brandName,pageCategoryItems[i].id)
                  })

                } 

                

              break;
            }
        } 

       
      
        return matched_products;
      } // deletes strings if found



      
    // the manage has to be created to , but first... and next the size searcheeeeerr :)

     


    

    const manage_Search_Links_Results = ()=>{
      
      

      
       
      
        
      

      const user_searched_for_this_category:any = ()=>{
      
           





              for(let i = 0; i < extract_brandName_strings.length; i++){
                const word = extract_brandName_strings[i]; 
               
                 const category_found= extract_category_inserted_by_userText(word); 

                 if(category_found !== undefined || typeof category_found === 'object'){
                  
                  return category_found;
                } 
                  


            } 

            return {search_with_category:undefined};

    }

      
     

      // 
      
      const {search_with_category} = user_searched_for_this_category(); 

      const user_searched_for_this_subCategory = ()=>{
      
          

        for(let i = 0; i < extract_brandName_strings.length; i++){
            const word = extract_brandName_strings[i]; 
          
            const subCategory_found= extract_subCategory_inserted_by_userText(word,search_with_category); 

             if(subCategory_found !== undefined && typeof subCategory_found === 'object'){
             
               return subCategory_found;
             } 
             


        }
  return {founded_Sub_Category:undefined};
}
     

      const {founded_Sub_Category}:any = user_searched_for_this_subCategory();

     
     

        let products_finded:any = [];

        
     

      const brands_search:any = (search_without_brand:boolean | undefined)=>{ // !!this one can be easily made into a general function for both brand and subName!!
              if(search_with_category === undefined) return undefined;

         if(search_without_brand === undefined || search_without_brand === false){
            for(let i = 0;i<extract_brandName_strings.length;i++){
                  const word = extract_brandName_strings[i];
                  
                  const brand_found:any = search_brand_In_LocalObject(word,search_with_category,founded_Sub_Category);
                
            

                  if(brand_found[0] !== undefined && typeof brand_found[0] === 'object'){ // remember the brand and the results
                  
                   
                    products_finded.push(brand_found[0]);
                    
                    return brand_found[0].brandName;
                    
                    
                    
                  } 



            } 
            return;// for any case;
          }
         if(search_without_brand === true){
              
              const word = undefined;
              
              const brand_found:any = search_brand_In_LocalObject(word,search_with_category,founded_Sub_Category);
            
              
                  if(Array.isArray(brand_found) && brand_found.length >= 1){
                    brand_found.forEach((brand_result:object)=>typeof brand_result === 'object'? products_finded.unshift(brand_result) : '');// incorrect
                  }

              
             
         }

      }
   
      let found_products:boolean| undefined = false;

      const subName_search = (loop_trought_array?:string[] | undefined,other_brand?:string | undefined)=>{
       
          let string_to_loop_trought = loop_trought_array === undefined ?extract_brandName_strings : loop_trought_array;   
           
          const brand_to_use = other_brand !== undefined ? other_brand : brandName;

        for(let i = 0;i<string_to_loop_trought.length;i++){
             let word = string_to_loop_trought[i];
             
             const subName_found =  search_subBrandName_In_LocalObject(word,brand_to_use,search_with_category)
             
               if(Array.isArray(subName_found) && subName_found.length >= 1 ){
                
                products_finded.push(subName_found);
                found_products = true;
                 return subName_found;
               }
             
              if(i + 1 === string_to_loop_trought.length && found_products === false){
                found_products = undefined;
                subName_search(extract_size);
               
              }
        }  

      } 



      const product_size_search = (other_brand?:string | undefined)=>{ //incorrect search_size_In_LocalObject it does not search with subCategory
                
           const string_to_loop_trought = extract_size;
           const brand_to_use = other_brand !== undefined ? other_brand : brandName;

           if(brand_to_use === undefined || search_with_category === undefined) return;

        for(let i = 0;i<string_to_loop_trought.length;i++){
          const word = string_to_loop_trought[i];
         
          const brand_found:any = search_size_In_LocalObject(word,brand_to_use,search_with_category);//(searched_string:string,brandName:string,category:string,subName_productObject?:any | undefined)
         
    

          if(brand_found[0] !== undefined && typeof brand_found[0] === 'object'){ // remember the brand and the results
           // brandName = brand_found[0].brandName;
           
            products_finded.push(brand_found[0]);
            
             return brand_found[0].brandName;
            
            
            
          } // carefull mate :)



    } 

      }
      
      // next size search
     
      let brandName:string = brands_search();  
      let subName = brandName? subName_search() : undefined;
      let size = subName ? product_size_search() : undefined;
     // let cateogry;


      
 
     if(products_finded.length < 1){ 
      
      extract_brandName_strings.forEach(possibleBrandName=>{search_all_of_brands_products(possibleBrandName,products_finded)})
       products_finded.unshift({search_helper_message:'Other products may interest you:'});
             brands_search(true);
             

             
             

       if(products_finded.length >=1){
            products_finded.forEach(({brandName}:any)=>{
             // subName_search();
           
              product_size_search(brandName);

            })
       }
        
     }

  




    
       


   
     return products_finded

    } 


  
 // take products_finded from buttom to the top , thats how you supposed to read it 

 
 

 const  search_manager_array = manage_Search_Links_Results();
 
 const found_products = Array.isArray(search_manager_array) && search_manager_array.length > 0 ? true : false;
   
 

    return ( 
      <>
      

      
      {found_products && <MakeLinkedList list={search_manager_array} pageState={pageState}/>} 
      {found_products === false && <div>No results for : "{searchText}"</div>}
      
      
      </> 
  );
  

 


}
 
export default EquipmentSearch;
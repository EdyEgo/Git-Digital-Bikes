import React,{ useState,useRef } from "react";
import { symbolName } from "typescript";

import { extract_category_brand_products_by_pageState,FilterByCategory_and_Subcategory } from "../Basic_initial_product_filters";
import { count_cylinder_products,count_year_section } from "../Count_Individual_selected_sections";
import {  write_productList_for_next_section,make_price_string_a_number } from "./basicFunctions";
import BrandSection from "./BrandSection";

interface PriceSectionProps {
    extracted_category:string,
    extracted_subcategory:string,
    show_hide_class_filters:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    initial_product_list:any,
    pageState:string,
    filteredProductList:any,
    // filters:any,
    callbackSendFilteredProductList?:any,
    userText_searchedProductName:string | undefined
}
// FilterByCategory_and_Subcategory = (productList:any,extracted_subcategory:string,pageState:string)
const products_that_contains_searched_categories = (initial_product_list:any,extracted_category:string,pageState:string,extracted_subcategory:string)=>{

   
    // extracted_category={extracted_category}    extracted_subcategory={extracted_subcategory}
   
// subCategory is actually a brand Name
     
        for(let categoryIndex = 0;categoryIndex < initial_product_list.length;categoryIndex++){

            const current_category_id = initial_product_list[categoryIndex].id;

            if(extracted_category.indexOf(current_category_id) !== -1){ 
                const current_category_data = initial_product_list[categoryIndex].data;

                const brands_available_obj = extract_category_brand_products_by_pageState(current_category_data,pageState);//category_object:any,pageState:string

                const filter_brands_available_subcategory = FilterByCategory_and_Subcategory(brands_available_obj,extracted_subcategory,pageState);//productList:any,extracted_subcategory:string,pageState:string


               
             return filter_brands_available_subcategory;
            }    
           
            
        }    

       
     
     
    

}


// const make_price_string_a_number = (price:string)=>{
       
//     const eliminate_currency_symbol = price.indexOf('from') ? price.split('from')[0].split(' ') : price.split(' ');
//       const eliminate_dot = eliminate_currency_symbol[0].indexOf('.') !== -1? eliminate_currency_symbol[0].split('.').join('') : eliminate_currency_symbol[0];
//       const eliminate_comma = eliminate_dot.indexOf(',') !== -1? eliminate_dot.split(',').join('') : eliminate_dot;
//       const transform_string_into_number = Number(eliminate_comma);
//       return transform_string_into_number;
 

//   }

  const extract_prices_for_range = (products_that_contains_searched_section:any,sectionName:string,price_or_prices:string,productListType:string,use_filters?:any)=>{
    
   


   

    let prices_range:{maximumPrice:string,minimumPrice:string,currencySymbol?:string} | null = null;
    let product_by_prices:any = {}; 


    const comapare_prices = (priceString:string,{productName,productValue}:{productName:string,productValue:any})=>{
    
            const current_price_number = make_price_string_a_number(priceString);
            

            
        
            if(priceString.indexOf('%') > -1 ) return null;
           
 
            const add_to_the_same_price_key = ()=>{

                

               
               
                if( product_by_prices.hasOwnProperty(priceString)){
                    product_by_prices[priceString] = {...product_by_prices[priceString],...{[productName]:productValue}};
                    return;
                }

                product_by_prices[priceString] = {[productName]:productValue}
            }

            if(use_filters === undefined){ // for now is allways gonna be undefined because on price we have select not input

       

        
        
                    if(prices_range === null){
                        prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]};
                       
                        product_by_prices[priceString] = {[productName]:productValue}
                        return null;
                
                    }
                   
                    const minimumPriceRange_to_number = make_price_string_a_number(prices_range.minimumPrice);
                    const maximumPriceRange_to_number = make_price_string_a_number(prices_range.maximumPrice);
                    
                
                    if(current_price_number > maximumPriceRange_to_number){

                        

                
                        prices_range.maximumPrice = priceString;

                        add_to_the_same_price_key();
                    
                       // product_by_prices[priceString] = {[productName]:productValue}
                    
                        return null;
                
                    }
                
                    if(current_price_number < minimumPriceRange_to_number){
                        prices_range.minimumPrice = priceString;



                      
                        add_to_the_same_price_key();
                       // product_by_prices[priceString] = {[productName]:productValue};
                    }

                    if(current_price_number === minimumPriceRange_to_number || current_price_number === maximumPriceRange_to_number){
                        add_to_the_same_price_key();
                        
                    }

                    if((current_price_number > maximumPriceRange_to_number) === false && (current_price_number < minimumPriceRange_to_number) === false){// test
                       
                        add_to_the_same_price_key();
                    }

            }

            if(use_filters){ 

                const {userMinimumPrice,userMaximumPrice} = use_filters;

                if(prices_range === null){
                    prices_range=  {minimumPrice:priceString,maximumPrice:priceString,currencySymbol:priceString.trim().split(' ')[1]}
                    return null;
            
                }



            }
    
       }
   

   let prevent_infinit_loop_on_not_beeing_any_level = 0;

    const price_range_extract:any = {

       price:{ 
        brand_level:()=>{




        for(const brandName in products_that_contains_searched_section){
             
          
            if(brandName.indexOf('_') === -1){
                const cylinderValues = products_that_contains_searched_section[brandName];

              

                for(const cylinderNameNum in cylinderValues){

                    if(Number.isNaN(cylinderNameNum) === true && prevent_infinit_loop_on_not_beeing_any_level <= 10){
                        prevent_infinit_loop_on_not_beeing_any_level += 1;
                      return price_range_extract['price']['product_level']();
                    }
                    const productsCylinder = cylinderValues[cylinderNameNum];

                 


               loopThree:      for(const productName in productsCylinder){
                         const productValue = productsCylinder[productName];
                         const priceString = productValue['price'];

                        
                          
                          if(comapare_prices(priceString,{productName,productValue}) === null) continue loopThree;
                        




                     }
                }
            }
             

        }
          
            
        return {prices_range,originalProductList:products_that_contains_searched_section,product_by_prices};
    
        },

        product_level:()=>{
            
     loopThree:      for(const productName in products_that_contains_searched_section){
                        const productValue = products_that_contains_searched_section[productName];
                        if(productValue.hasOwnProperty('price') === false){
                            if(prevent_infinit_loop_on_not_beeing_any_level >= 10) return null
                            prevent_infinit_loop_on_not_beeing_any_level += 1; 
                            return price_range_extract['price']['brand_level']();
                        }
                        const priceString = productValue['price'];

                    
                        
                        if(comapare_prices(priceString,{productName,productValue}) === null) continue loopThree;
               

                    }
        }
      },
      prices:{
        brand_level:()=>{
        

          for(const brandName in products_that_contains_searched_section){
              const brandValue = products_that_contains_searched_section[brandName];

                 for(const productName in brandValue){
                     const productValue = brandValue[productName];
                     if( productValue.hasOwnProperty('prices') === false){
                         if(prevent_infinit_loop_on_not_beeing_any_level >= 10) return null;
                        prevent_infinit_loop_on_not_beeing_any_level += 1;
                        return price_range_extract['prices']['product_level']();
                        //break;
                     }
                     const prices_list_with_size = productValue['prices'];
                   

                    loopThree:  for(const sizeName in prices_list_with_size){
                                 const price_string = prices_list_with_size[sizeName];
                                 if(comapare_prices(price_string,{productName,productValue}) === null) continue loopThree;

                                }
                     
                      
                 }
          }
          return {prices_range,originalProductList:products_that_contains_searched_section,product_by_prices};
        },
        product_level:()=>{
    loopone:    for(const productName in products_that_contains_searched_section){
                     const productValue = products_that_contains_searched_section[productName];

                     const prices_list_with_size = productValue['prices'];
                     if( productValue.hasOwnProperty('prices') === false){
                        if(prevent_infinit_loop_on_not_beeing_any_level >= 10) return null;
                        prevent_infinit_loop_on_not_beeing_any_level += 1;
                        return price_range_extract['prices']['brand_level']();
                     }   

                 loopThree:  for(const sizeName in prices_list_with_size){
                                 const price_string = prices_list_with_size[sizeName];
                                 if(comapare_prices(price_string,{productName,productValue}) === null) continue loopThree;

                                }
                }

                return {prices_range,originalProductList:products_that_contains_searched_section,product_by_prices};
        }



      } 
    }
    
   const result = price_range_extract[price_or_prices][productListType]()
   return result;

   }



   const split_by_from_word = (passed_price:string)=>{ 
       
    if(passed_price.indexOf('from') !== -1){
       const split_by_from = passed_price.split('from');
      
         return split_by_from[0].trim();
    }
    return passed_price
 }

   const price_range_spans_elements = (prices_obj_container:{minimumPrice:string,maximumPrice:string,currencySymbol:string})=>{// products_sections_obj.price or products_sections_obj.prices
    const {minimumPrice,maximumPrice} = prices_obj_container;

    

    

    return (
      <div className="available_price_range_display">
        <span className="minimum-available-price">{split_by_from_word(minimumPrice)}</span>
        <span className="line-between-minim-maxim-prices">-</span>
        <span className="maximum-available-price">{split_by_from_word(maximumPrice)}</span>
      </div>
    )

  }
 

  const return_filters_numbers = (filters:{chosenMinimumPrice:string | number,chosenMaximumPrice:string | number} | undefined)=>{
      if(filters === undefined) return undefined;
    const {chosenMinimumPrice,chosenMaximumPrice} = filters;

    const transform_to_number = (string_num:string | number)=> typeof string_num === 'string' ? make_price_string_a_number(string_num) : string_num

    const use_filters = {userMinimumPrice:transform_to_number(chosenMinimumPrice),userMaximumPrice:transform_to_number(chosenMaximumPrice)} 

    return use_filters;

  }
  
  













const products_that_match_with_userSearchText =(products_that_match_categories:any,userSearchedText:string | undefined,pageState:string)=>{
    
    if(userSearchedText === '' || userSearchedText === undefined || userSearchedText.trim().length > 20) return products_that_match_categories;
   
   const user_split_text = userSearchedText.split(' ');
   const extract_productName_and_cylinderNumber = ()=>{
     let searched_cylinderNumber;
     let searched_productName;

        for(let i = 0;i<user_split_text.length;i++){
           
             if(Number.isNaN(Number(user_split_text[i])) === false){
                searched_cylinderNumber=   user_split_text[i];
                continue
             }
             if(Number.isNaN(Number(user_split_text[i]))){
                
                searched_productName =user_split_text[i];
               
             }
        } 

        return {searched_cylinderNumber,searched_productName}
   } 
   const {searched_cylinderNumber,searched_productName} = extract_productName_and_cylinderNumber();


   const filter_by_user_text = ()=>{
     
    
 

     if(pageState === 'Motorcycles'){
      let filtered_by_searched_cylinder:any = {};
      let filtered_by_cylinder_has_a_value = false 
      let filtered_by_productName:any = {}; 
      let brands_with_cylinder_found:any = {}

      
       

            const match_product_current_name_by_pageState_Motorcycles = (productName:string,lowerCase_productName_search:string,brandName:string,cylinderNumber:string,productValue:any,brandCilinderValues:any)=>{
                
            
                const split_product_name = productName.split('_');
                const current_product_name = split_product_name[0];
                const current_product_lowerCase = current_product_name.toLowerCase()

               

                if(lowerCase_productName_search === brandName.toLowerCase()){

                    filtered_by_productName[brandName] = brandCilinderValues
                    brands_with_cylinder_found[brandName] = [...Object.keys(brandCilinderValues)]

                    
                    return null;
                }

                if(current_product_lowerCase === lowerCase_productName_search){

                 

                  if(filtered_by_productName.hasOwnProperty(brandName) && filtered_by_productName[brandName].hasOwnProperty(cylinderNumber)){ 


                    filtered_by_productName[brandName][cylinderNumber] = {...filtered_by_productName[brandName][cylinderNumber],...{[productName]:productValue}}
                    
                   

                    if(Array.isArray(brands_with_cylinder_found[brandName])){
                        brands_with_cylinder_found[brandName].push(cylinderNumber)
                    }
                    if(!Array.isArray(brands_with_cylinder_found[brandName]))brands_with_cylinder_found[brandName] = [cylinderNumber]
                    return null;
                  }
                  if(filtered_by_productName.hasOwnProperty(brandName)){
                    filtered_by_productName[brandName] = {...filtered_by_productName[brandName],...{[cylinderNumber]:{[productName]:productValue}}}
                   

                        if(Array.isArray(brands_with_cylinder_found[brandName])){
                            brands_with_cylinder_found[brandName].push(cylinderNumber)
                            
                        }
                        if(!Array.isArray(brands_with_cylinder_found[brandName]))brands_with_cylinder_found[brandName] = [cylinderNumber]
                       
                    return null;
                  }

                  filtered_by_productName[brandName] = {[cylinderNumber]:{[productName]:productValue}}
                 
                     
                        if(Array.isArray(brands_with_cylinder_found[brandName])){
                            brands_with_cylinder_found[brandName].push(cylinderNumber)
                            
                        }
                        if(!Array.isArray(brands_with_cylinder_found[brandName]))brands_with_cylinder_found[brandName] = [cylinderNumber]

                       
                    return null;
                }

            

                

        }

        const loop__through_obj_to_find_productName = (obj_to_loop:any,lowerCase_productName_search:string)=>{// here if somehow the lowerCase_productName_search matches the brandName return all of theyr products
            firstLoop: for(const brandName in obj_to_loop){
                const brandCilinderValues = products_that_match_categories[brandName];
                 for(const cylinderNumber in brandCilinderValues){
                   const cylinderProducts = brandCilinderValues[cylinderNumber];
                     for(const productName in cylinderProducts){
                            const productValue = cylinderProducts[productName];

                        
                        
                       

                            match_product_current_name_by_pageState_Motorcycles(productName,lowerCase_productName_search,brandName,cylinderNumber,productValue,brandCilinderValues)
                    
                            

                    }
                }
            }

           

        }

         
                const copy_products_under_brandName_and_cylinder = (filtered_by_searched_cylinder:any | undefined,filtered_by_productName:any)=>{// LEFT HERE
            
                   

                    if(Object.entries(brands_with_cylinder_found).length === 0) return products_that_match_categories;

                    const check_for_cylinder_and_brand = (brandName:string,cylinderValue:string | number,objects_checked:any)=>{
                            const is_object_having_both_brand_and_cylinder  =typeof objects_checked === 'object' && objects_checked
                            .hasOwnProperty(brandName) && 
                            objects_checked[brandName]
                            .hasOwnProperty(cylinderValue);

                            return is_object_having_both_brand_and_cylinder;
                    }
    
            

                    let copy_productsList_by_brand_and_cylinder:any = {} // for ex if both have the same thing as brand and cylinder make a copy of both
                   
            
                const write_copy_obj = (obj_to_be_copyed:any,brandName_of_obj:string,cylinder_of_obj:string | number)=>{
                // copy_productsList_by_brand_and_cylinder

                    if(copy_productsList_by_brand_and_cylinder.hasOwnProperty(brandName_of_obj) && copy_productsList_by_brand_and_cylinder[brandName_of_obj].hasOwnProperty(cylinder_of_obj) === false){
                                    // same brand name different cylinder
                            copy_productsList_by_brand_and_cylinder[brandName_of_obj] = {
                                ...copy_productsList_by_brand_and_cylinder[brandName_of_obj],
                                [cylinder_of_obj]:obj_to_be_copyed[brandName_of_obj][cylinder_of_obj]
                            }

                            return;

                    }
                    if(copy_productsList_by_brand_and_cylinder.hasOwnProperty(brandName_of_obj) && copy_productsList_by_brand_and_cylinder[brandName_of_obj].hasOwnProperty(cylinder_of_obj)){
                            // same brand name same cylinder
                            copy_productsList_by_brand_and_cylinder[brandName_of_obj][cylinder_of_obj] ={
                                ...copy_productsList_by_brand_and_cylinder[brandName_of_obj][cylinder_of_obj],
                            
                                ...obj_to_be_copyed[brandName_of_obj][cylinder_of_obj]
                                
                            }

                            return;

                    }

                    copy_productsList_by_brand_and_cylinder[brandName_of_obj] = {[cylinder_of_obj]:obj_to_be_copyed[brandName_of_obj][cylinder_of_obj]}
                        
                    
                }

                    for(const brandFound in brands_with_cylinder_found){
                        const cylinderValues = brands_with_cylinder_found[brandFound];


                        cylinderValues.forEach((cylinderValue:string | number)=>{


                       

                            
                            
                            
                            if(check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_searched_cylinder) && check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_productName)){
                                
                                copy_productsList_by_brand_and_cylinder = {...copy_productsList_by_brand_and_cylinder,...{[brandFound]:{[cylinderValue]:{
                                    
                                    ...filtered_by_searched_cylinder[brandFound][cylinderValue],...filtered_by_productName[brandFound][cylinderValue]
                                }}}}
                                
                                
                            }// left here if {sym:200} and {sym:125}  copy_productsList_by_brand_and_cylinder[sym] = ...copy[sym],...brlp[125]
                            if(check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_searched_cylinder) === false && check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_productName)){
                                // here lets say you have sym 125 and want to place a 200
                                // copy_productsList_by_brand_and_cylinder = {
                                    //     ...copy_productsList_by_brand_and_cylinder,
                                    //     [brandFound]:{...copy_productsList_by_brand_and_cylinder[brandFound][cylinderValue],...{filtered_by_productName[brandFound][cylinderValue]}}
                                    
                                    // }
                                    write_copy_obj(filtered_by_productName,brandFound,cylinderValue)
                                    
                            }
                            if(check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_searched_cylinder) && check_for_cylinder_and_brand(brandFound,cylinderValue,filtered_by_productName)===false){
                                write_copy_obj(filtered_by_searched_cylinder,brandFound,cylinderValue)
                            }
                                
                                
                                
                                    
                        }) 
                                
                        }
                            
                            return copy_productsList_by_brand_and_cylinder;
                            
                        }
                        
                        
                        
                        if(searched_cylinderNumber !== undefined){
                            for(const brandName in products_that_match_categories){
                                const brandCilinderValues = products_that_match_categories[brandName];
                                
                                for(const cylinderNumber in brandCilinderValues){
                                    const cylinderProducts = brandCilinderValues[cylinderNumber]
                                    if(cylinderNumber.toString() === searched_cylinderNumber.trim().toString()){
                                        
                                        filtered_by_searched_cylinder[brandName] = {[cylinderNumber]:cylinderProducts};
                                        brands_with_cylinder_found[brandName] = [cylinderNumber];
                                        filtered_by_cylinder_has_a_value = true;
                                        break;
                                    }
                                }
                                
                            }
                            
                        }
                        
                        if(searched_productName !== undefined){
                            const lowerCase_productName_search = searched_productName.toLowerCase()
                          
                            if(filtered_by_cylinder_has_a_value){
                                
                                
                                loop__through_obj_to_find_productName(filtered_by_searched_cylinder,lowerCase_productName_search)
                                
                                
                                
                                
                                
                                // const filtered_products_by_userText = {...filtered_by_searched_cylinder,filtered_by_productName}
                                
                                return  copy_products_under_brandName_and_cylinder(filtered_by_searched_cylinder,filtered_by_productName)
                                //  return filtered_products_by_userText;
                            }
                            
                            if(!filtered_by_cylinder_has_a_value){
                                loop__through_obj_to_find_productName(products_that_match_categories,lowerCase_productName_search);
                                const filtered_products_by_userText = {...filtered_by_searched_cylinder,filtered_by_productName};
                                return  copy_products_under_brandName_and_cylinder(undefined,filtered_by_productName)
                                // return filtered_products_by_userText;
                                
                            }
                        }
                        
                        
                       
            return   copy_products_under_brandName_and_cylinder(filtered_by_searched_cylinder,filtered_by_productName);
    }  




    if(pageState === 'Equipment'){ // here the only results will be by size and product name
        const brandsNamesFounded:any = {};
        let filtered_by_productName_and_size:any = {};
        
        let products_founded_by_name:any = {};
        
        
        let products_founded_by_size:any = {};
        
        let number_of_products_found = 0;
        
        //  user_split_text
        
        
        const match_product_current_name_by_pageState_Equipment =(productName:string,lowerCase_productName_search:string,brandName:string,productValue:any)=>{
                
            if(productName.indexOf(lowerCase_productName_search) !== -1){
                filtered_by_productName_and_size[brandName] = {[productName]:productValue};
                return null;
            }
            
         }

         const check_if_an_object_has_a_product_in_brandProperty = (brandName:string,productName:string,objectChecked:any)=>{

              const has_that_product = objectChecked.hasOwnProperty(brandName) && objectChecked[brandName].hasOwnProperty(productName);
             
              return has_that_product
         }

        const loop__through_obj_to_find_productName = (obj_to_loop:any)=>{
             
                    for(let searchedIndex = 0;searchedIndex < user_split_text.length;searchedIndex++){
                          const current_searched_word = user_split_text[searchedIndex].toLowerCase();
                        firstLoop: for(const brandName in obj_to_loop){
                            const brandValues = products_that_match_categories[brandName];
                            
                            
                                for(const productName in brandValues){
                                        const productValue = brandValues[productName];
                                       
                                    if(productName.toLowerCase().split('_').indexOf(current_searched_word) !== -1 && check_if_an_object_has_a_product_in_brandProperty(brandName,productName,products_founded_by_size)=== false){
                                        
                                        products_founded_by_name[brandName] = {...products_founded_by_name[brandName],...{[productName]:productValue}} 
                                        brandsNamesFounded[brandName] = '';
                                        number_of_products_found +=1;

                                    }// register to products_founded_by_name
                            
                                     if(productValue.sizes.hasOwnProperty(current_searched_word) && check_if_an_object_has_a_product_in_brandProperty(brandName,productName,products_founded_by_name) === false){
                                        products_founded_by_size[brandName] = {...products_founded_by_size[brandName],...{[productName]:productValue}}
                                        brandsNamesFounded[brandName] = '';
                                        number_of_products_found += 1;
                                     }  // register to products_founded_by_size  
    
                            }
                            
                        }
                        

                        
                    }

                   

        }

        loop__through_obj_to_find_productName(products_that_match_categories)

        const copy_products_under_brandName = ()=>{// product founded by name {scorpion:{1}} , foundend by size {scorpion:{2}} => copy {Scoprion:{1,2}}

            let copy_products_in_same_brandName_var:any = {};
            
            Object
             .entries(brandsNamesFounded)
             .forEach(([brandsNameFounded,irrelevantInfo])=>{
                   if(products_founded_by_name.hasOwnProperty(brandsNameFounded) && products_founded_by_size.hasOwnProperty(brandsNameFounded)){
                   
                         copy_products_in_same_brandName_var = {[brandsNameFounded]:{...products_founded_by_name[brandsNameFounded],...products_founded_by_size[brandsNameFounded]}}
                   }
                   if(products_founded_by_name.hasOwnProperty(brandsNameFounded)){
                     
                     // copy_products_in_same_brandName = {...copy_products_in_same_brandName,...products_founded_by_name[brandsNameFounded]};
                     copy_products_in_same_brandName_var = {...copy_products_in_same_brandName_var,[brandsNameFounded]:products_founded_by_name[brandsNameFounded]};
     

                   }
                   if( products_founded_by_size.hasOwnProperty(brandsNameFounded)){
                    
                      copy_products_in_same_brandName_var = {...copy_products_in_same_brandName_var,[brandsNameFounded]:products_founded_by_size[brandsNameFounded]};

                   }
            })
              
            return  copy_products_in_same_brandName_var;
            
        }


      if(number_of_products_found > 0) {
        
          const result = copy_products_under_brandName()
         


          return result
      }
      return products_that_match_categories 
    }


        
   }



   return filter_by_user_text()

    


}



const PriceSection: React.FC<PriceSectionProps> = ({initial_product_list,show_hide_class_filters,pageState,setLocalStoreShop,callbackSendFilteredProductList,extracted_category,extracted_subcategory,filteredProductList,userText_searchedProductName}) => {
   


   

    const products_that_match_categories = products_that_contains_searched_categories(initial_product_list,extracted_category,pageState,extracted_subcategory);
   
    const products_that_match_with_userSearch_words = products_that_match_with_userSearchText(products_that_match_categories,userText_searchedProductName,pageState);
  

    
    const [filters_selected,setFilters_selected] = useState({chosenMinimumPrice:'',chosenMaximumPrice:''});
    const [productsFilteredForBrandSection,setProductsFilteredForBrandSection] = useState<undefined | any>(undefined);
     

    
    
    const isPageState_Motorcycles = pageState.toLowerCase() === 'motorcycles';
    const price_or_prices = isPageState_Motorcycles? 'price' : 'prices'

   

const filters = undefined
const use_filters = return_filters_numbers(filters);




const {prices_range,originalProductList,product_by_prices} = extract_prices_for_range(products_that_match_with_userSearch_words,price_or_prices,price_or_prices,'brand_level',use_filters)


 
    


 const selected_price_range = {minimumPrice:prices_range.minimumPrice,maximumPrice:prices_range.maximumPrice}
  
    

   



const order_price_object_keys = (prices_object:any)=>{
  
    const unordered_price_strings:string[] = [];

    for(const priceString in  prices_object){
        unordered_price_strings.push(priceString)
    }

 const sorted_prices =    unordered_price_strings.sort((a:string,b:string)=>make_price_string_a_number(a)-make_price_string_a_number(b));
 return sorted_prices;

}
const  price_strings_ordered = order_price_object_keys(product_by_prices);



  const add_price_option = (selectTypeInput:string,filters_selected:{chosenMinimumPrice:string,chosenMaximumPrice:string})=>{
     
   
    
    const {chosenMinimumPrice,chosenMaximumPrice} = filters_selected;

    

   
    const price_options_html_elements =  price_strings_ordered.map((priceString:string,indx:number)=>{
          
         const option_is_selected = chosenMinimumPrice === priceString || chosenMaximumPrice === priceString ? true : false;
         
        //   if(selectTypeInput === 'to' && indx === price_strings_ordered.length -1){

        //     return (
        //         <option className={`price-${selectTypeInput}-option`}
        //         selected={true}
        //          data-pricestringname={priceString} 
        //          data-selectedpriceoption={option_is_selected}
        //          value={priceString}
        //          >{split_by_from_word(priceString)}</option>

        //     )
        //   }
        return (
            <option className={`price-${selectTypeInput}-option`}
            
             data-pricestringname={priceString} 
             data-selectedpriceoption={option_is_selected}
             value={priceString}
             >{split_by_from_word(priceString)}</option>
        )
    })
        
       

          
          


    
  
    return price_options_html_elements
  }


  const sent_products_that_matches_selected_price_range = (use_only_local?:boolean | undefined)=>{
    
        
        let products_filtered:any = {}; 

        const continue_loop_till_maximumPrice_selected = (price_ind:number)=>{

            for(let index = price_ind;index< price_strings_ordered.length;index++){
                const current_price =  price_strings_ordered[index];
                if(current_price === selected_price_range.maximumPrice){
                    products_filtered = {...products_filtered,...product_by_prices[current_price]}
                    break;
                }

                products_filtered = {...products_filtered,...product_by_prices[current_price]}

            }
        }

        for(let price_ind = 0;price_ind < price_strings_ordered.length;price_ind++){
            const current_price =  price_strings_ordered[price_ind];
            

            if(current_price === selected_price_range.minimumPrice){
                
                products_filtered = {...products_filtered,...product_by_prices[current_price]}
                continue_loop_till_maximumPrice_selected(price_ind)
                
                break;
            }

        } 
        
        
      

        

        
            if(use_only_local) return products_filtered;
            if(use_only_local === undefined) {
               
             
                setProductsFilteredForBrandSection(products_filtered)
                       
            }    
        
        
        
        
  }

  const edit_selected_price_range = ({target}:any)=>{
     const select_type = target.id;
     const option_value = target.value;
     
     
     if(select_type === 'minimumPrice'){
        selected_price_range.minimumPrice = option_value;
        sent_products_that_matches_selected_price_range();
        return;
     }
     if(select_type === 'maximumPrice'){
        selected_price_range.maximumPrice = option_value;
        sent_products_that_matches_selected_price_range();
     }


  }

  

     

const options_from = add_price_option('from',filters_selected);
const options_to = add_price_option('to',filters_selected);






const test = sent_products_that_matches_selected_price_range(true);



    return (  

        <>
           
           <div className={`price-section ${show_hide_class_filters}`}>  
            <div className="price-title-container">
                <div className="price-title">Price</div>
                
                
                {/* {price_range_spans_elements(priceRanges)} */}
                {/* {isPageState_Motorcycles && price_range_spans_elements(products_sections_obj.price)}
                {isPageState_Motorcycles !== true && price_range_spans_elements(products_sections_obj.prices)} */}
                
            </div>

            <div className="prices-available-container">
                <div className="available-prices-title-container">
                    Available Prices
                </div>
            {price_range_spans_elements(prices_range)}
            </div>
            
            <div className="price-inputs">
             <div className="price-select-title-container">Select Price Range</div>
       
          <div className="selectors-price-container">
                <select name="seletct_from_tag" id="minimumPrice" 
                 className="minimum-price" onChange={(event)=>{edit_selected_price_range(event)}}>
                
                {options_from}

                </select>

                <select name="seletct_to_tag" id="maximumPrice" className="maximum-price" onChange={(event)=>{edit_selected_price_range(event)}}
                defaultValue={options_to[options_to.length - 1].props.value}
                >
                
                {options_to}
                </select>

          </div>
           

                {/* <input className='smallerPrice' name='minimumPrice' type="text" placeholder='from'/>
                <input className='biggerPrice' name='maximumPrice' type="text"  placeholder='to'/> */}
            </div>
               
            </div> 

            {productsFilteredForBrandSection === undefined && 
               <BrandSection setLocalStoreShop={setLocalStoreShop}  filteredProductList={test} show_hide_class_filters={show_hide_class_filters}
                callbackSendFilteredProductList={()=>{}} isPageState_Motorcycles={isPageState_Motorcycles} categories={{extracted_category,extracted_subcategory}}/>}

              {productsFilteredForBrandSection !== undefined && 
                   <BrandSection setLocalStoreShop={setLocalStoreShop}  filteredProductList={productsFilteredForBrandSection} show_hide_class_filters={show_hide_class_filters}
                    categories={{extracted_category,extracted_subcategory}}
                   isPageState_Motorcycles={isPageState_Motorcycles}
                    callbackSendFilteredProductList={()=>{}}/>}     

                    

                        
        </>
    );
}
 
export default PriceSection;
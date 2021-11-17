import React from 'react';
import MakeLinkedList from './MakeLinkedList';

export interface MotorcyclesSearchProps {
    searchText:string,
    selectedCategory?:string,
    categoryItems:any,
    pageState:string,
    timeOutSearch?:any
}
 
const MotorcyclesSearch: React.FC<MotorcyclesSearchProps> = ({searchText,selectedCategory,categoryItems,pageState,timeOutSearch}) => {



  
  

 


   

   
       
    if(categoryItems[pageState] == undefined) return <></>
    if(searchText.length <= 2 || searchText.length >= 30) return <>Number of characters is too short or to long</>
  
    

      const pageCategoryItems = categoryItems[pageState];  


   


    let splitBySpace_searchText = [...searchText.split(' ')]; // delete from this one if there is a match !!!!!


    
   


      const extract_brand_names_strings = splitBySpace_searchText.filter((value:any)=>{ 
           

            if(isNaN(value)){ 
             
              return value.length >= 9 ? null : value;
            }
      })
     
     const extract_cylinder_capacity:any = pageState === 'Motorcycles' ?splitBySpace_searchText.filter((value:any)=>{
            if(!isNaN(value)){ 
              
              const reduce_Value_If_Bigger_Than_Five_Characters = value.length >= 5 ? value.slice(0,4) : value;
               
             
             return  reduce_Value_If_Bigger_Than_Five_Characters;
            } 


           
     }) : undefined;

  
    


    


   const search_brand_inLocalObject:any = (searched_brand:any)=>{ 
         
    if(pageCategoryItems == undefined || searched_brand == undefined ) return ' ';
   

         
        let  brand_Matches; 
    
        if(!Array.isArray(pageCategoryItems)) return ' ';
           for(let i = 0;i<pageCategoryItems.length;i++){
            
              if(pageCategoryItems[i].data.brands_available != undefined){
                for(const [key,value] of Object.entries(pageCategoryItems[i].data.brands_available)){
                 
                    if(key.toLowerCase() === searched_brand.toLowerCase()){
                      
                      
                      brand_Matches = {brandName:key,productsAvailable:value,category:pageCategoryItems[i].id}; 
                   
                      break;
                    }
                } 
                  
              

              }

           }



  
        return brand_Matches !== undefined ? brand_Matches : ' ';
   }
    

   const search_by_cylinder_capacity = (searched_capacity:number | string,withBrand?:string | undefined,subBrandName?:string|undefined)=>{
                    
    if(!Array.isArray(pageCategoryItems)) return 'search_by_cylinder_capacity has recived an non array value'; 
     
    let resultedProducts:any = [];

    if(withBrand == undefined){  
        for(let i = 0;i<pageCategoryItems.length;i++){
       
          if(pageCategoryItems[i].data.brands_available != undefined){ 

          

             
           



            
               

              Object.entries(pageCategoryItems[i].data.brands_available).forEach(
                ([key, value]:any) => { 
              
                    if(Array.isArray(value)){
                        for(let index = 0;index<value.length;index++){
                          const directionString_Slice_The_Number_Part = isNaN(value[index].split('_')[0]) === false 
                                ? value[index].split('_')[0] :
                                  value[index].split('_')[1]; 
                          if(directionString_Slice_The_Number_Part === searched_capacity){ 
                                
                                resultedProducts.push({brandName:key,availableProduct:value[index],category:pageCategoryItems[i].id}) 
                               
                          }        
                          
                        }
                    }
                    
                }
              );
          
  
          }
  
        }

    }
     
    if(withBrand){  

      for(let i = 0;i<pageCategoryItems.length;i++){
      
        if(pageCategoryItems[i].data.brands_available != undefined){ 

        

           
                if(pageCategoryItems[i].data.brands_available[withBrand.toUpperCase()] != undefined) {
                 

                    pageCategoryItems[i]
                    .data
                    .brands_available[withBrand.toUpperCase()]
                    .forEach((brandProductDirection:string)=>{ 
                      
                       if(brandProductDirection.split('_')[1] === searched_capacity) {
                       
                         
                         resultedProducts.push({brandName:withBrand.toUpperCase(),availableProduct:brandProductDirection,category:pageCategoryItems[i].id}) 
                     
                       }
                    })
                    
                }                 
             

           
        

        }

      }
    


    }
   

    return resultedProducts;
   }
 

  
  

     
   const search_subName_brand_inLocalObject  = (searched_subName:string,searched_cylinderNumber?:number|string|undefined)=>{
     
    if(pageCategoryItems == undefined) return ' ';
    if(searched_subName == undefined) return ' ';
           
    
     let subName_matches:any = [];
    const subName_matches_serach = pageCategoryItems.forEach((category:any)=>{
     
     
   // ES 2017 , better 


        if(category.data.brands_available != undefined){
              Object.entries(category.data.brands_available).forEach(
                ([key,value]:any)=>{
                  value.forEach((brand_direction:any)=>{
                    const sub_name_string_directions_Sliceed = brand_direction.slice(brand_direction.indexOf('_') + 1); 
                    const sub_name_cylinder_number_directions_Sliceed = brand_direction.slice(0,brand_direction.indexOf('_'));
                    
                      if(sub_name_string_directions_Sliceed.toLowerCase().trim() === searched_subName.toLowerCase().trim() && searched_cylinderNumber === undefined){
                        

                         
                         
                        subName_matches.push({brandName:key,availableProduct:brand_direction,category:category.id}) 
                       
                      }
                       
                      if(sub_name_string_directions_Sliceed.toLowerCase().trim() === searched_subName.toLowerCase().trim() && searched_cylinderNumber === sub_name_cylinder_number_directions_Sliceed){
                       

                          
                         
                        subName_matches.push({brandName:key,availableProduct:brand_direction,category:category.id}) 
                       
                      }

                  })


              })
        }
           

     //  }
      
    // return subName_matches 
  })

 
  


  return subName_matches 

   }


  const manage_Search_Links_Results = ()=>{ 

          if(extract_brand_names_strings === null) return [{brandName:null}];
  
            
     
       if(extract_brand_names_strings.length === 1 && extract_cylinder_capacity.length === 1){ // done
                
       
        
       
              let result = [...search_by_cylinder_capacity(extract_cylinder_capacity[0].trim(),extract_brand_names_strings[0])];
              if(result.length < 1) result = [...search_subName_brand_inLocalObject(extract_brand_names_strings[0],extract_cylinder_capacity[0].trim())];
              return result;
       }
     
       if(extract_brand_names_strings.length === 0 && extract_cylinder_capacity.length === 1){
         
       
        return [...search_by_cylinder_capacity(extract_cylinder_capacity[0].trim())];
       }

       if(extract_brand_names_strings.length === 1 && extract_cylinder_capacity.length === 0){ // done
          
        
        let results = [];
       
        results.push(search_brand_inLocalObject(extract_brand_names_strings[0])); 
   
       

          if(results.length < 1 || results[0] === ' ') results = [...search_subName_brand_inLocalObject(extract_brand_names_strings[0])];
          return results;
       } 
        
       if(extract_brand_names_strings.length >= 2 && extract_cylinder_capacity.length <= 0){ // done
         let storeBrandProducts:any = [];
   
          extract_brand_names_strings  
           .forEach((brandName:any)=> search_brand_inLocalObject(brandName) !== " "? 
           storeBrandProducts.push(search_brand_inLocalObject(brandName)): '')
           
       
          
       
        if(storeBrandProducts.length < 2) {
        
          
          extract_brand_names_strings.forEach((brandName:any)=>{
          
            const subBrand_Name_Findings_Array = search_subName_brand_inLocalObject(brandName);
                
              if(Array.isArray(subBrand_Name_Findings_Array) && subBrand_Name_Findings_Array.length >= 1){
                subBrand_Name_Findings_Array.forEach(subName_Finded_Object=>storeBrandProducts.push(subName_Finded_Object));
              }

        
          });

        } 

         return storeBrandProducts;
       
       }
     
       if(extract_brand_names_strings.length >= 2 && extract_cylinder_capacity.length === 1) {
        
            
         

        let storeBrandProducts:any = []; 

       
        
        
      

      
   
        extract_brand_names_strings.forEach((brandName:any)=>{
           const finded_product = search_by_cylinder_capacity(extract_cylinder_capacity[0],brandName)[0];
        return   finded_product !== undefined ? storeBrandProducts.push(finded_product) : '';
         
        });

       
       
                  
          if(storeBrandProducts.length < 2) {
           
             
             extract_brand_names_strings.forEach((brandName:any)=>{
               
               const subBrand_Name_Findings_Array = search_subName_brand_inLocalObject(brandName,extract_cylinder_capacity[0]);
                   
                 if(Array.isArray(subBrand_Name_Findings_Array) && subBrand_Name_Findings_Array.length >= 1){
                   subBrand_Name_Findings_Array.forEach(subName_Finded_Object=>storeBrandProducts.push(subName_Finded_Object));
                 }
   
           
             });
   
           } 
        
           return storeBrandProducts; // in work

        
       }
 


       
  }


  const search_manager_array = manage_Search_Links_Results();

  
    
   

  

 

    

     


  

 


    









const found_products = Array.isArray(search_manager_array) && search_manager_array.length > 0 ? true : false;






    return ( 
      <>
      {found_products && <MakeLinkedList list={search_manager_array} pageState={pageState}/>} 
      {found_products === false && <div>No results for : "{searchText}"</div>}
      
      </> 
  );
}
 
export default MotorcyclesSearch;
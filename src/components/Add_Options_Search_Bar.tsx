import React, { Fragment,useState, useEffect } from 'react';

 
const Add_Options_Search_Bar: React.FC<any> = ({usePagesCategoryItems,usePageState}) => {
  

   

    

    const current = usePagesCategoryItems
  
    
    
 
    const subCategory_styles_object = {fontSize:'0.9rem',fontFamily:'Helvetica',fontWeight:'normal'};


    
    return(
      <> 
         <option className="all-categories-search-option" value={'all-categories'}>All Categories</option>
         
        { Array.isArray(current[usePageState]) && current[usePageState].map((category:any)=>{ 
          const category_lowerCase =  category.id.toLowerCase();
          
            return(
                <>
                <option style={{fontSize:'1rem',fontFamily:'Helvetica',fontWeight:'bold'}} data-search_option='category' value={category_lowerCase}>{category.id.toUpperCase()}</option>
                {Array.isArray(category.data.available_brands) && category.data.available_brands.map((brand:string)=>
                      {
                        return (<option value={`${category_lowerCase} ${brand.toLowerCase()}`} data-search_option='subCategory' data-belongs_to_category={category_lowerCase} className={`moto-brand-sub-category ${brand}`} style={{fontSize:'0.9rem',fontFamily:'Helvetica',fontWeight:'normal'}}>-{brand}</option>)
                      }
                   )
                
                }
                 
                 {category.data.subCategory && category.data.subCategory.map((oneSubCategory:string)=>
                      {
                        return (<option value={`equip-sub-category-${oneSubCategory}`} style={{fontSize:'0.9rem',fontFamily:'Helvetica',fontWeight:'normal'}}>-{oneSubCategory}</option>)
                      }
                   )
                
                }
            

               
               


               </>
            )
          })
        }
      </>

    )
       
       
     
 
}
 
export default Add_Options_Search_Bar; 
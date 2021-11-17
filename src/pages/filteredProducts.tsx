import React,{useContext,useState} from 'react'; 
import { useParams } from "react-router-dom";
import { Available_section_options } from '../components/filteredProductsApp/available_section_options';
import FilterFormApp from '../components/filteredProductsApp/FilterFormApp';
import {LocalMemoryCategoryItemsContext} from '../LocalMemoryCategoryItemsContext';
export interface FilteredProductsProps {
    
}
 
const FilteredProducts: React.FC<FilteredProductsProps> = () => {  
   

    const {id}:any = useParams(); 
    
   const extract_userText_category_subCategory:any = ()=>{
    const _userSearchedText_exist = id.indexOf('&') !== -1
 

    if(_userSearchedText_exist){
     const split_userText = id.split('&');
     
     const search_with_category = split_userText[0].indexOf(' ') !== -1? split_userText[0].split(' ') : split_userText[0].trim().toLowerCase();
     
     const is_search_with_category_array = Array.isArray(search_with_category)
      const extracted_category = is_search_with_category_array ? search_with_category[0] : search_with_category;
      const extracted_subcategory = is_search_with_category_array ? search_with_category[1] : undefined;
     

      return {extracted_category,extracted_subcategory,userText_searchedProductName:split_userText[1]}


   

    }
    if(!_userSearchedText_exist){
      const search_with_category = id.indexOf(' ') !== -1? id.split(' ') : id.trim().toLowerCase();
      const is_search_with_category_array = Array.isArray(search_with_category)
      const extracted_category = is_search_with_category_array ? search_with_category[0] : search_with_category;
      const extracted_subcategory = is_search_with_category_array ? search_with_category[1] : undefined;
     

      return {extracted_category,extracted_subcategory,userText_searchedProductName:undefined}

    }

   

   }
   

    const storedCategoryItems = useContext(LocalMemoryCategoryItemsContext);
    const {currentCategoryItems,pageState,setCategoryItems ,logedInUser,setLocalStoreShop} =storedCategoryItems; 
    
 
    const pageStateLowerCase =  pageState.toLowerCase(); 
    const goToPage_String = pageStateLowerCase === 'equipment' ? 'Motorcycles' : 'Equipment';
 

    
   
     const {userText_searchedProductName,extracted_category,extracted_subcategory} = extract_userText_category_subCategory()
   

    

    

    const [buyingOptionsUsed,setBuyingOptionsUsed] = useState([]); 

    
    const create_initial_available_products = ()=>{
      let filtered_products_object:any={};
      const display_sections_list_by_pageState = pageState.toLowerCase() === 'motorcycles' ? ['brand','cylinderCapacity','price','year'] : ['brand','sizes','prices']
      
       
      display_sections_list_by_pageState.forEach((section_name:string,indx:number)=>{
      

      
      
      const  available_products_object =  Available_section_options(currentCategoryItems,section_name,pageState,extracted_category,undefined,extracted_subcategory);
      
      filtered_products_object[section_name] = available_products_object;
       
       

      })
  
     
      return filtered_products_object;
   } 
  
  

  
   



   
   
    
    return ( 
     <> 
      
       <div className="container-filteredProducts-page">
           <div className="container-main-filteredProducts-page">
               <div className="filter-container">
                    <div className="you-are-buying-with-this-options-container">
                              {buyingOptionsUsed.length > 0 && buyingOptionsUsed.map(obtion=>{
                                      <div className="buying-option-selected-container">
                                             

                                      </div>

                              })}

                              

                              <FilterFormApp setLocalStoreShop={setLocalStoreShop} currentCategoryItems={currentCategoryItems} pageState={pageState} 
                              extracted_category={extracted_category} extracted_subcategory={extracted_subcategory} userText_searchedProductName={userText_searchedProductName}/>
                    </div>

               </div>

               <div className="products-showcase-container">



               </div>


           </div>

       </div>
     
      
     </>
  );



}
 
export default FilteredProducts; 
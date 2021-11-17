import React,{useRef, useState} from 'react';

import {  count_year_section } from '../Count_Individual_selected_sections';
import {create_product_list_check} from './basicFunctions'; 
import CylinderCapacitySection from './cylinderCapacitySection';
import SizesSection from './sizesSection';

interface YearSectionProps {
    yearProducts:any, 
    show_hide_class_filters:string,
    setLocalStoreShop:(cart_new_obj:any)=>void,
    isPageState_Motorcycles:boolean,
    categories:{extracted_category:string,extracted_subcategory:string}
}
 
const YearSection: React.FC<YearSectionProps> = ({yearProducts,show_hide_class_filters,setLocalStoreShop,isPageState_Motorcycles,categories}) => {
  

   
    
   const {newProductList,originalProductList} = count_year_section(yearProducts,'brand_return_level',yearProducts)
     

   

   const [productsSelected,setProductsSelected] = useState<any>({});// {Scorpion:{...}}

 

 const nextSectionProducts = useRef(newProductList); // newProductList

 // test 
 


 const setNextSectionProducts = (next_section_products:any)=>{

    nextSectionProducts.current  = next_section_products
 }

 
 const selectOptionsYear = create_product_list_check(productsSelected,newProductList,setProductsSelected,setNextSectionProducts)



  

   
   
  

   
 
   
 
   const productsSelected_has_any_value = Object.entries(productsSelected).length === 0;

    return (  
        <>
        
        <div className={`year-section-container ${show_hide_class_filters}`}>
            <div className="year-section-title">Year Model</div>

            <div className="year-available-container">
            {selectOptionsYear}
            </div>
          
          
        </div> 

       

        {productsSelected_has_any_value  && isPageState_Motorcycles && 
        <CylinderCapacitySection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop} categories={categories} yearProductsList={newProductList} isPageState_Motorcycles={isPageState_Motorcycles}/>}

        {productsSelected_has_any_value === false && isPageState_Motorcycles &&
         <CylinderCapacitySection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop} categories={categories} yearProductsList={nextSectionProducts.current} isPageState_Motorcycles={isPageState_Motorcycles}/>}

       

        {!isPageState_Motorcycles && 
        productsSelected_has_any_value  && 
        <SizesSection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop} categories={categories} yearProductsList={newProductList} isPageState_Motorcycles={isPageState_Motorcycles}/>}

        {!isPageState_Motorcycles && 
        productsSelected_has_any_value === false  && 
        <SizesSection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop} categories={categories} yearProductsList={nextSectionProducts.current} isPageState_Motorcycles={isPageState_Motorcycles}/>}

        </>
    );
}
 
export default YearSection;
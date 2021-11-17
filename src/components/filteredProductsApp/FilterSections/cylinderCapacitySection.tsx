import React,{useRef, useState} from 'react';

import {  count_cylinderCapacitys_by_yearSection_return } from '../Count_Individual_selected_sections';
import { create_product_list_check } from './basicFunctions';
import ProductsShowCase from './productsShowcaseSection';

interface CylinderCapacitySectionProps {
    yearProductsList:any, 
    show_hide_class_filters:string,
    setLocalStoreShop:(cart_new_obj:any)=>void,
    isPageState_Motorcycles:boolean,
    categories:{extracted_category:string,extracted_subcategory:string}
}
 
const CylinderCapacitySection: React.FC<CylinderCapacitySectionProps> = ({yearProductsList,show_hide_class_filters,setLocalStoreShop,isPageState_Motorcycles,categories}) => {



 
const available_cylinders_list = count_cylinderCapacitys_by_yearSection_return(yearProductsList);

const [productsSelected,setProductsSelected] = useState<any>({});



const nextSectionProducts = useRef(available_cylinders_list);


const setNextSectionProducts = (next_section_products:any)=>{

    nextSectionProducts.current  = next_section_products
 }




const check_list_elements = create_product_list_check(productsSelected,available_cylinders_list,setProductsSelected,setNextSectionProducts)


const productsSelected_has_any_value = Object.entries(productsSelected).length === 0;// false then next

    return (  
        <>
         <div className={`cylinder-section-container ${show_hide_class_filters}`}>
             <div className="cylinder-title-container">Cylinder Capacity</div>

             <div className="cylinder-available-container">{check_list_elements}</div>
         
         </div>
    
         
         {productsSelected_has_any_value && 
            <ProductsShowCase setLocalStoreShop={setLocalStoreShop} categories={categories} 
            productsFilteredBySections={available_cylinders_list} 
            isPageState_Motorcycles={isPageState_Motorcycles}/>
         }

         {productsSelected_has_any_value === false &&
            <ProductsShowCase setLocalStoreShop={setLocalStoreShop} categories={categories} 
            productsFilteredBySections={nextSectionProducts.current} 
            isPageState_Motorcycles={isPageState_Motorcycles}/>
         }
        </>
    );
}
 
export default CylinderCapacitySection;
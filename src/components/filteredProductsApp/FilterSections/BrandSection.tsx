import React,{useState,useRef} from 'react';

import {create_product_list_check} from './basicFunctions';
import { count_brandsNames_by_price_productsList_return,count_brandsNames_by_price_pure_productsList_return } from '../Count_Individual_selected_sections';
import YearSection from './yearSection';
//import { JsxElement } from 'typescript';




interface BrandSectionProps {
    filteredProductList:any,
    show_hide_class_filters:string,
    setLocalStoreShop:(new_cart_obj:any)=>void
    callbackSendFilteredProductList:(sectionNameThatWrites:string,productListResulted:any)=>void,
    isPageState_Motorcycles:boolean,
    categories:{extracted_category:string,extracted_subcategory:string}
  //  reSet_price_component:Dispatch<any>
}




 
const BrandSection: React.FC<BrandSectionProps> = ({filteredProductList,show_hide_class_filters,setLocalStoreShop,callbackSendFilteredProductList,isPageState_Motorcycles,categories}) => {
     
 

    

    const price =filteredProductList 

  
   

    

 

 const {brand_counted_products,pureProductList} = count_brandsNames_by_price_pure_productsList_return(price);

 

 const [productsSelected,setProductsSelected] = useState<any>({});// {Scorpion:{...}}

 

 const yearProducts = useRef(brand_counted_products);



 const testRef = useRef(1);

 const setYearProducts = (next_products_list:any)=>{
  yearProducts.current = next_products_list;
  
 }

 




 

 const selectOptionsBrand = create_product_list_check(productsSelected,brand_counted_products,setProductsSelected,setYearProducts); // this one is hsait



const no_selected_product = Object.entries(productsSelected).length === 0;

    return (  
      <> 

      <div className={`brand-section-container ${show_hide_class_filters}`}>
         <div className="brand-title-container">Brand</div>

         <div className="brand-available-container">
         <ul className={`brand-section-container`}>{selectOptionsBrand}</ul>
         </div>
      </div>
  
     
      {no_selected_product &&  <YearSection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop} yearProducts={brand_counted_products} isPageState_Motorcycles={isPageState_Motorcycles} categories={categories}/>}
      {no_selected_product === false &&  <YearSection show_hide_class_filters={show_hide_class_filters} setLocalStoreShop={setLocalStoreShop}yearProducts={yearProducts.current} isPageState_Motorcycles={isPageState_Motorcycles}  categories={categories}/>}
      

     </> 
    );
}
 
export default BrandSection;
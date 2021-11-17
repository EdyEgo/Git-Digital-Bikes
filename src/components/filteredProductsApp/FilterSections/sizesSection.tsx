import React,{useState} from 'react';
import {  count_sizes_by_yearSection_return } from '../Count_Individual_selected_sections';
import { create_sizes_list_check } from './basicFunctions';
import ProductsShowCase from './productsShowcaseSection';

interface SizesSectionProps {
    yearProductsList:any,
    show_hide_class_filters:string;
    setLocalStoreShop:(cart_new_obj:any)=>void,
    isPageState_Motorcycles:boolean,
    categories:{extracted_category:string,extracted_subcategory:string}
    
}
 
const SizesSection: React.FC<SizesSectionProps> = ({yearProductsList,show_hide_class_filters,setLocalStoreShop,isPageState_Motorcycles,categories}) => {
    

    

    const {available_sizes_list,products_list} = count_sizes_by_yearSection_return(yearProductsList);
    const [selectedSizes,setSelectedSizes] = useState({});

   
   
    
    const manage_select_size = ({target}:any)=>{
        //data-size_selected
      const size_selected = target.getAttribute("data-size_name");
      
      let copy_selected_size_obj:any = {...selectedSizes};

       if(selectedSizes.hasOwnProperty(size_selected)){
            
            delete copy_selected_size_obj[size_selected]
          
            setSelectedSizes(copy_selected_size_obj);

          return; 
       }

       copy_selected_size_obj = {...copy_selected_size_obj,[size_selected]:''};

       setSelectedSizes(copy_selected_size_obj);

      

    }

    const sizes_list = create_sizes_list_check(available_sizes_list,selectedSizes,manage_select_size);

    const extract_next_size_products_list = ()=>{
     
     
      
    

        if(Object.entries(selectedSizes).length === 0){// if the user did not select any size, give back all

            return products_list
        }
   
        let product_list_with_sizes = {}; // when products_list . length is the same as founded products length stop the search !!!!
        let products_found = 0;
        const product_list_length = Object.entries(products_list).length;


        const product_list_search= (size_searched:string)=>{
            Object
            .entries(products_list)
            .forEach(([productName,productValue]:any)=>{
                
                if(productValue['sizes'].hasOwnProperty(size_searched)){

                    product_list_with_sizes = {...product_list_with_sizes,[productName]:productValue}
                }
            })
        }
         


        

        for(const sizeName in selectedSizes){
            if(product_list_length === products_found){

                return product_list_with_sizes;
            }

            product_list_search(sizeName);
              

        }
      
   return product_list_with_sizes
    }
    
    const nextSectionProductList = extract_next_size_products_list()
      
    const productsSelected_has_any_value = Object.entries(selectedSizes).length === 0;// false then next

    return (  
        <>
        
        <div className={`sizes-section-container ${show_hide_class_filters}`}>
            <div className="sizes-title-container">Size</div>
            <div className="sizes-available-container">{sizes_list}</div>
             
        </div>
        {productsSelected_has_any_value && <ProductsShowCase setLocalStoreShop={setLocalStoreShop} categories={categories}  productsFilteredBySections={products_list} isPageState_Motorcycles={isPageState_Motorcycles}/>}
        {productsSelected_has_any_value === false &&<ProductsShowCase setLocalStoreShop={setLocalStoreShop} categories={categories}  productsFilteredBySections={nextSectionProductList} isPageState_Motorcycles={isPageState_Motorcycles}/>}
        </>
    );
}
 
export default SizesSection;
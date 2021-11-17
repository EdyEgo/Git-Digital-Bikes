import React,{ useRef,useState } from "react";


import PriceSection from "./FilterSections/priceSection";


interface FilterFormAppProps {
    pageState:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    currentCategoryItems:any,
    extracted_category:string,
    extracted_subcategory:string,
    userText_searchedProductName?:string | undefined


}
 
const FilterFormApp: React.FC<FilterFormAppProps> = ({currentCategoryItems,setLocalStoreShop,pageState,extracted_category,extracted_subcategory,userText_searchedProductName}) => {




 

 

 const filteredProductList:any = useRef({})

 const write_filteredProduct_list = (sectionNameThatWrites:string,productListResulted:any)=>{
    
  

   
    filteredProductList.current[sectionNameThatWrites] = productListResulted;
 

    
 
    
     
 }
  


 



 


  

 const pageState_Shop_products = currentCategoryItems[pageState];

 

 const [show_mobile_filters,setShow_mobile_filters] = useState(false);
const show_hide_class_filters = show_mobile_filters ? 'show-filters-mobile' : 'hide-filters-mobile';

    return (  

          
        <div className="container-filter-form">
             <div className="header-filter-form">
                 <h2 className="compare-after-title">Compare</h2>
                 <div className="buying-obtions-info-sec-title">Buying Options</div>
                 <div className="show-filters-mobile-btn-container" >
                     <div className="show-filters-mobile-btn" onClick={()=>{setShow_mobile_filters(!show_mobile_filters)}}>Show Filters</div> 
                 </div>
             </div>

             <form onSubmit={(event)=>{event.preventDefault()}} className="filter-products-form">
                 
             <div className="sections-container">
                   <PriceSection setLocalStoreShop={setLocalStoreShop} initial_product_list={pageState_Shop_products} 
                   show_hide_class_filters={show_hide_class_filters}
                   pageState={pageState} 
                   filteredProductList={filteredProductList}
                   callbackSendFilteredProductList={write_filteredProduct_list} 
                   extracted_category={extracted_category} 
                   extracted_subcategory={extracted_subcategory}
                   userText_searchedProductName={userText_searchedProductName}
                   
                   />
                    
              </div>     
                   

             </form>

        </div>
            


         

            
    );
}
 
export default FilterFormApp;
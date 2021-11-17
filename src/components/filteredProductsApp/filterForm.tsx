import {Available_section_options} from "./available_section_options";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare,faSquare } from '@fortawesome/free-solid-svg-icons';
import React , {useState} from 'react';
interface FilterFormProps {
    year?:string[] | number[],
    cylinderCapacity?:string[] | number[],
    original_available_products:any,
   // brandNames?:string[] | number[],
    currentCategoryItems:any,
    pageState:string,
    extracted_category:string,
    extracted_subcategory:string | undefined
}
 
const FilterForm: React.FC<FilterFormProps> = ({year,cylinderCapacity,original_available_products,currentCategoryItems,pageState,extracted_category,extracted_subcategory}) => { // allso returns the selected obtions 
    
    
    const [products_sections_obj,setProducts_sections_obj] = useState(original_available_products);
    


   
    const isPageState_Motorcycles = pageState.toLowerCase() === 'motorcycles';
 
    const display_sections_list_by_pageState =  isPageState_Motorcycles ? ['brand','cylinderCapacity','price','year'] : ['brand','sizes','prices'];



   

    

    
 
   
 
   
  
  
  

   const create_sections = ()=>{

      const create_check_boxes = (counted_productsList:any,sectionValue:any,sectionName:string)=>{
       
        const check_boxes_list:any = [];

         

        Object.entries(counted_productsList).forEach(([sectionCountedName,countNumber]:any)=>{// countNumber must be an object not just a num like so : {count:2,selected:true},nee
          
     
         const valueSelected = sectionValue.hasOwnProperty('selectedFilters') && sectionValue['selectedFilters'].hasOwnProperty(sectionCountedName) ? 'selected' : '';
          
        
            
          check_boxes_list.push(
              
              <li className={`${sectionName}-option`} data-optionname={sectionCountedName} data-selected={valueSelected} style={{cursor:'pointer'}} onClick={(event)=>{}}>
            <span className="checkbox-option" style={{pointerEvents:'none'}}>
              {valueSelected === 'selected' &&<FontAwesomeIcon style={{color:"white",border:'2px solid black',pointerEvents:'none'}} icon={faCheckSquare}/>}
              {valueSelected !== 'selected' &&<FontAwesomeIcon style={{color:"white",border:'2px solid black',pointerEvents:'none'}} icon={faSquare}/>}
            </span>{sectionCountedName}<span className='option-counted-value'>({countNumber})</span>
            </li>

 

          )
 


          
            
           
        })
        return check_boxes_list;
      }

          
       const section_cotainer_array:any = [];
     Object.entries(products_sections_obj).forEach(([sectionName,sectionValue]:any)=>{
        

        if(sectionName !== 'prices' && sectionName !== 'price' && sectionName !== 'sizes'){
        
            section_cotainer_array.push(

                <div className={`${sectionName}-section`}>
                    <ul className={`${sectionName}-checkbox-options-container`}>
                            { 
                            
                            create_check_boxes(sectionValue[sectionName],sectionValue,sectionName)
                            }

                    </ul>
                    
                </div>

            )
        }
     })
       
  return section_cotainer_array;
   }
 
  const call_available_product_for_filtering = ()=>{
    let last_obj_had_filtered_product_list:undefined | object= undefined; 
  
    

    display_sections_list_by_pageState.forEach((section_name:string)=>{
        const current_productList_section =products_sections_obj[section_name].productList;      

       if(products_sections_obj[section_name].hasOwnProperty('selectedFilters')){
        
          
           if(last_obj_had_filtered_product_list === undefined){
                const  available_products_object =  Available_section_options(undefined,section_name,pageState,extracted_category,undefined,extracted_subcategory,current_productList_section);
                
               
               products_sections_obj[section_name] = {...products_sections_obj[section_name],...available_products_object};
                last_obj_had_filtered_product_list = products_sections_obj[section_name].filteredProducts;

           }
           if(typeof last_obj_had_filtered_product_list === 'object'){
    
            const  available_products_object =  Available_section_options(undefined,section_name,pageState,extracted_category,undefined,extracted_subcategory,last_obj_had_filtered_product_list);
           
               
               products_sections_obj[section_name] = {...products_sections_obj[section_name],...available_products_object}; 
                last_obj_had_filtered_product_list = products_sections_obj[section_name].filteredProducts;

           }
           
       }
      

     

    })
 

   

    setProducts_sections_obj({...products_sections_obj})

    
  }

 const filter_productsList_by_selected_selectedFilters_object = (sectionName:string)=>{

   

  const filtersSelected =  products_sections_obj[sectionName].selectedFilters;
  const unFilteredProductList =  products_sections_obj[sectionName].productList;
  products_sections_obj[sectionName]['filteredProductList'] = {};
  const filteredProductList = products_sections_obj[sectionName]['filteredProductList']
  

    Object
    .entries(filtersSelected)
    .forEach(([filterKey,selectedOrNot])=>{
     
      if(selectedOrNot === 'selected'){
        Object
        .entries(unFilteredProductList)
        .forEach(([productName,productValueObj]:any)=>{
         
            if(productValueObj.hasOwnProperty(sectionName)){
               if(sectionName === 'sizes' || sectionName === 'prices'){
                
                 if(productValueObj[sectionName].hasOwnProperty(filterKey)){
                  filteredProductList[productName] = productValueObj;
                 }
               }
               
               if(sectionName !== 'sizes' && sectionName !== 'prices'){
                  if(productValueObj[sectionName] === filterKey){
                    filteredProductList[productName] = productValueObj;
                  }
               }
              

            }


        })  

      }
       

    })


    call_available_product_for_filtering();

      

  
  

 }

 
 const filter_productsList_by_deSelected_selectedFilters_object = (sectionName:string)=>{
 

 }

  
  
  const add_selected_to_filterd_obj = ({target}:any,sectionName:string)=>{
     
    const sectionName_dataset = target.getAttribute('data-optionname');//target.getAttribute(`data-${sectionName}Option`);//data-sizesOption={sizeName} data-sizeSelected={selectedDataSet}
    const element_is_selected = target.getAttribute("data-selected");

     
    if(element_is_selected === 'selected'){
      
      
      if(products_sections_obj[sectionName].hasOwnProperty('selectedFilters') && products_sections_obj[sectionName]['selectedFilters'].hasOwnProperty(sectionName_dataset)){
       
        products_sections_obj[sectionName]['selectedFilters'][sectionName_dataset] = '';
        filter_productsList_by_deSelected_selectedFilters_object(sectionName)
        return;
      }
      
      products_sections_obj[sectionName]['selectedFilters'] = {[sectionName_dataset]:''};
      
      return;
    }

    if(element_is_selected !== 'selected'){
     
      
      if(products_sections_obj[sectionName].hasOwnProperty('selectedFilters')){
        
        products_sections_obj[sectionName]['selectedFilters'][sectionName_dataset] = 'selected';
        filter_productsList_by_selected_selectedFilters_object(sectionName);
        return;
      }

      products_sections_obj[sectionName]['selectedFilters'] = {[sectionName_dataset]:'selected'};
      
      return;
    }
 
  }
 
  const option_template_sizes = (option_name:string,valueSelected:string,option_category:string)=>{
    const selectedDataSet = valueSelected === 'selected' ? 'selected' : '';// this nonsens is here because every size is having a random number at the start!!!
    return (
         
      <li className={`${option_category}-option`} data-optionname={option_name} data-selected={selectedDataSet} style={{cursor:'pointer'}} onClick={(event)=>{add_selected_to_filterd_obj(event,'sizes')}}>
      <span className="checkbox-option" style={{pointerEvents:'none'}}>
        {valueSelected === 'selected' &&<FontAwesomeIcon style={{color:"white",border:'2px solid black',pointerEvents:'none'}} icon={faCheckSquare}/>}
        {valueSelected !== 'selected' &&<FontAwesomeIcon style={{color:"white",border:'2px solid black',pointerEvents:'none'}} icon={faSquare}/>}
      </span>{option_name}
      </li>


    )

  }
  

  const sizes_list_creation = ()=>{
   const sizes_list_options:any = [];
   const list_sizes_otpions = Object.entries(products_sections_obj.sizes.sizes)
    .forEach(([sizeName,valueSelected]:any)=>{
     
      
      sizes_list_options.push(
      
      option_template_sizes(sizeName,valueSelected,'size')
      
      )
      
    })
 
  return sizes_list_options;
  }

  const price_range_spans_elements = (prices_obj_container:{minimumPrice:string,maximumPrice:string,currencySymbol:string})=>{
    const {minimumPrice,maximumPrice} = prices_obj_container;

    const split_by_from_word = (passed_price:string)=>{
       if(passed_price.indexOf('from') !== -1){
          const split_by_from = passed_price.split('from');
            return split_by_from[0];
       }
       return passed_price
    }

    return (
      <div className="available_price_range_display">
        <span className="minimum-available-price">{split_by_from_word(minimumPrice)}</span>
        <span className="line-between-minim-maxim-prices">-</span>
        <span className="maximum-available-price">{split_by_from_word(maximumPrice)}</span>
      </div>
    )

  }

    return (  
    
        <div className="container-filter-form">
             <div className="header-filter-form">
                 <h2 className="compare-after-title">Compare</h2>
                 <div className="buying-obtions-info-sec-title">Buying Options</div>
             </div>

             <form onSubmit={(event)=>{event.preventDefault()}} className="filter-products-form">

                   <div className="section-test-container">
                       <h2>Down here are the sections tested</h2>
                       <div className="dummy">{create_sections()}</div>
                   </div>
                   <div className="price-section">
                        <div className="price-title-container">
                            <div className="price-title">Price</div>
                            {isPageState_Motorcycles && price_range_spans_elements(products_sections_obj.price)}
                            {isPageState_Motorcycles !== true && price_range_spans_elements(products_sections_obj.prices)}
                            
                        </div>
                      
                       <div className="price-inputs">
                           <input className='smallerPrice' name='minimumPrice' type="text" placeholder='from'/>
                           <input className='biggerPrice' name='maximumPrice' type="text"  placeholder='to'/>
                       </div>
                   </div>
                   
                   <div className="brand-section">
                   
                       
                       
                    </div> 


                   <div className="year-model-section" data-objectSearchBy='year'>

                   

                   </div>

                    
                   <div className="cylinder-capacity-section">
                  
                   
                   </div>

                   { pageState.toLowerCase() === 'equipment' &&
                    <div className="size-section">
                      <ul className="sizes-list-container">
                      { 
                          sizes_list_creation()
                        
                      }

                      </ul>
                        

                       
                       
                    </div>
                   }


                  



 

             </form>

        </div>

  );
}
 
export default FilterForm;
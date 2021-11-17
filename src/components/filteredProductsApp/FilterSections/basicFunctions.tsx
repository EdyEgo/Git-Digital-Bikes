
 import React,{useRef} from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare,faSquare } from '@fortawesome/free-solid-svg-icons';
  
 
export const make_price_string_a_number = (price:string)=>{
       
  const eliminate_currency_symbol = price.indexOf('from') ? price.split('from')[0].split(' ') : price.split(' ');
    const eliminate_dot = eliminate_currency_symbol[0].indexOf('.') !== -1? eliminate_currency_symbol[0].split('.').join('') : eliminate_currency_symbol[0];
    const eliminate_comma = eliminate_dot.indexOf(',') !== -1? eliminate_dot.split(',').join('') : eliminate_dot;
    const transform_string_into_number = Number(eliminate_comma);
    return transform_string_into_number;


}



 export const write_productList_for_next_section = (sectionNameThatWrites:string,productListResulted:any,setStateFunctionCallback:(object_expected:object)=>void)=>{
  
   

    setStateFunctionCallback({[sectionNameThatWrites]:productListResulted})

   
    
     
 }


 export const create_product_list_check_at = (productsSelected:any,select_or_deSelect_a_sectionName:(event:any)=>void,section_counted_products:any)=>{
  const section_checks_list:any[] = [];  

  const pointer_none:any = {pointerEvents:'none'}

  const one_list_item_template = (sectionNameObj:{count:number,productList:any},sectionName:string)=>{
      const avaiable_products_withIn_brandName = sectionNameObj.count;
      const selected = productsSelected.hasOwnProperty(sectionName);

     
      return (
          <li className={``} key={sectionName} style={{cursor:'pointer'}} data-sectionname={sectionName}
          onClick={(event)=>{select_or_deSelect_a_sectionName(event)}} >
                 {selected && <FontAwesomeIcon style={pointer_none} icon={faCheckSquare}/>}
                 {selected === false && <FontAwesomeIcon style={{color:'white',border:'1px solid black',pointerEvents:'none'}} icon={faSquare}/>}
                 <span className={`brand-option-name-span`} style={pointer_none}>{sectionName}</span>
                 <span className={`brand-option-count-span`} style={pointer_none}>({avaiable_products_withIn_brandName})</span>

          </li>
      )
  }


     
       Object.entries(section_counted_products).forEach(([sectionName,brandInfoObj]:any)=>{
         section_checks_list.push(
             one_list_item_template(brandInfoObj,sectionName)
         )
       })

 
 return section_checks_list;

}

export const select_or_deSelect_a_brandName = ({target}:any,productsSelected:any,section_counted_products:any,setProductsSelected:(productSelected:any)=>void,setNextSectionProducts:(productsList:any)=>void)=>{
  
 
  const brandNameClicked = target.getAttribute("data-sectionname");

     if(productsSelected.hasOwnProperty(brandNameClicked)){
      // deselect
      const copy_obj = {...productsSelected};
      
        delete copy_obj[brandNameClicked];
        
        
        setProductsSelected(copy_obj);
    
        
        if(Object.entries(copy_obj).length === 0){
          setNextSectionProducts(section_counted_products) 
         
          return;
        }
        setNextSectionProducts(copy_obj)
        

     }

     if(!productsSelected.hasOwnProperty(brandNameClicked)){
      // select
      const products_selected = {...productsSelected,...{[brandNameClicked]:section_counted_products[brandNameClicked].productList}}
      setProductsSelected(products_selected)
      setNextSectionProducts(products_selected)
    
     }

     
 }


 export const create_product_list_check = (productsSelected:any,section_counted_products:any,setProductsSelected:(productSelected:any)=>void,setNextSectionProducts:(productsList:any)=>void)=>{
  const section_checks_list:any[] = [];  

  const pointer_none:any = {pointerEvents:'none'}

  const one_list_item_template = (sectionNameObj:{count:number,productList:any},sectionName:string)=>{
      const avaiable_products_withIn_brandName = sectionNameObj.count;
      const selected = productsSelected.hasOwnProperty(sectionName);

     
      return (
          <li className='check-able-filter-option' key={sectionName} style={{cursor:'pointer'}} data-sectionname={sectionName}
          onClick={(event)=>{select_or_deSelect_a_brandName(event,productsSelected,section_counted_products,setProductsSelected,setNextSectionProducts)}} 
          
          
          >
                 {selected && <FontAwesomeIcon style={pointer_none} icon={faCheckSquare}/>}
                 {selected === false && <FontAwesomeIcon style={{color:'white',border:'1px solid black',pointerEvents:'none'}} icon={faSquare}/>}
                 <span className={`${sectionName}-option-name-span option-name-check-able`} style={pointer_none}>{sectionName}</span>
                 <span className={`${sectionName}-option-count-span`} style={pointer_none}>({avaiable_products_withIn_brandName})</span>

          </li>
      )
  }


     
       Object.entries(section_counted_products).forEach(([sectionName,brandInfoObj]:any)=>{
         section_checks_list.push(
             one_list_item_template(brandInfoObj,sectionName)
         )
       })

 
 return section_checks_list;

} 
 


export const select_or_deSelect_a_sizeName = ()=>{


}


export const create_sizes_list_check = (available_sizes_obj:any,selectedSizes:any,manageSelectSize:(event:any)=>void)=>{
 
  const sizes_li_elements:any = [];
  const pointer_none:any = {pointerEvents:'none'}

  Object.entries(available_sizes_obj).forEach(([sizeName,irrelevanValue])=>{
    
    const is_current_size_selected= selectedSizes.hasOwnProperty(sizeName);
    const selected_size_class = is_current_size_selected ? 'size-selected' : '';


        sizes_li_elements.push(
           <li className={`size-option ${selected_size_class}`} data-size_name={sizeName} 
           
           data-size_selected={is_current_size_selected}
           
           onClick={manageSelectSize}
           >
             <span style={pointer_none} className="inner-size-option-layer">

               <span style={pointer_none} className="size-option-name">{sizeName}</span>
             </span>

           </li>
          
        )

  })
   
 
  return sizes_li_elements;
    
}

export const create_cylinderCapacity_list_check = (available_cylinders_list:any)=>{

      Object
       .entries(available_cylinders_list)
       .forEach(([cylinderName,cylinderValues])=>{
               

      })

}
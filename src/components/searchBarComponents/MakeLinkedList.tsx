import React from 'react';
import { Link } from "react-router-dom";
export interface MakeLinkedListProps {
    list:any;
    pageState:string;
}
 
const MakeLinkedList: React.FC<MakeLinkedListProps> = ({list,pageState}) => {
     
   
       
   

      const limit_list_Length = ()=>{
        
         if(list.length > 10){
            
            return list.slice(0,11); 
         } 
         return list;
      }
        

      

     
 
     const normalize_word = (productName_To_Normalize:string)=>{ 

     
         
       const copy_product_name = productName_To_Normalize.length > 27 ? productName_To_Normalize.slice(0,28) + '...' : productName_To_Normalize;

       const split_by_underscore =  copy_product_name.split('_',5);

  

      const make_first_letter_upperCase = split_by_underscore.filter((one_word:string)=>one_word[0].toUpperCase() + one_word.slice(1,one_word.length).toLowerCase());
      
      const join_productName_back_by_space =  make_first_letter_upperCase.join(' ');

      return join_productName_back_by_space;

     }
      
     const create_link_To_string = (category:string,brandName:string,productName:string)=>{
           

          
        const pageState_lower = pageState.toLowerCase();
        if(pageState_lower === 'motorcycles') return `product/${category} ${brandName} ${productName}`

          return `/${pageState_lower}/product/${category} ${brandName} ${productName}`;

     }

     const make_first_letter_upperCase = (word:string)=>{
        return word[0].toUpperCase() + word.slice(1,word.length).toLowerCase();
     }
      const list_to_use = limit_list_Length();
   
    
    return ( <>
     {list_to_use.map((product:any)=>{ 
      
      
         if(product.productsAvailable !== undefined && product.availableProduct === undefined){
          
            const finded_product = (subNames:any)=>{
               
                 const normalized_product_name = subNames.split('_');
                 const productName = normalized_product_name[0];
                 const cylinderCapacity = normalized_product_name[1];
                 const productYear = normalized_product_name[2];
                
                 return `${product.category}: ${product.brandName} ${productName}  ${cylinderCapacity}  ${productYear}`;
            }
             
         return  product.productsAvailable.map((subNames:any)=>{
               const finded_product_value = finded_product(subNames);
          
          return <Link to={create_link_To_string(product.category,product.brandName,subNames)} className='link-to-product'>{finded_product_value}</Link>
           })
        }
          
          if(product.productsAvailable === undefined && product.availableProduct !== undefined){ 
             const finded_product = `${product.category}: ${product.brandName} ${product.availableProduct.slice(product.availableProduct.indexOf('_') +1)} ${product.availableProduct.slice(0,product.availableProduct.indexOf('_'))}`
           
           return <Link to={create_link_To_string(product.category,product.brandName,product.availableProduct)} className='link-to-product'>{finded_product} </Link>

             
          }
          
      })
     } 

     {pageState === 'Equipment' && 
         list_to_use.map((product:{search_helper_message?:string,brandName?:string,availableProducts?:any,category?:string})=>{
            const {search_helper_message,brandName,availableProducts,category} = product;
            


            

             if(search_helper_message)return <p className='other-products-may-interest-you-msg'>{search_helper_message}</p>;

             if(brandName && availableProducts && category){
                 
              const store_links:any =[]; 
               
              const finded_products_equipment_link_template = (productName:string)=>{
                 return `${make_first_letter_upperCase(category)}: ${brandName}  ${normalize_word(productName)}`;
              
               };




                 Object.entries(availableProducts).map(([productName,productValue]:any)=>{
                 
                        const link_text = finded_products_equipment_link_template(productName) 
                       
                        
                        store_links.push(<Link to={create_link_To_string(category,brandName,productName)} className='link-to-product'>{link_text}</Link>)
                 }) 

                  return store_links; 
                 
             }
         })
     
     }
    
    
    
    
  </>  
 );
}
 
export default MakeLinkedList;
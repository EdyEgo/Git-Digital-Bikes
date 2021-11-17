import React from 'react';
import { Link } from "react-router-dom";
import { calculate_percentage,format_number_with_dot,cancel_comma_and_dot } from "../oneProductIcon/Discount_Functions";
import { calculate_price_by_selected_quantity } from './headerGeneralFunctions';

interface PropCreateCartProductsList {
    usePagesCategoryItems:any,
    pageState:string,
    cartProducts:any
}
 
export const CreateCartProductsList = (usePagesCategoryItems:any,pageState:string,cartProducts:any,reSetProductsInCart:(productName_with_underscores:string)=>void) => {
    
 

   if(usePagesCategoryItems.hasOwnProperty(pageState) === false) return <></>

    

    const return_full_new_price:any = (productPrice:string)=>{

          if(productPrice.indexOf('from') !== -1){

              const price_split_by_from = productPrice.trim().split('from');
              const new_price_split = price_split_by_from[0];
              


              if(new_price_split.indexOf('%') !== -1){
                  const old_price_split = price_split_by_from[1];

                  const {old_price,new_price,discount_percentage} = calculate_percentage(old_price_split,new_price_split);
                  
                  //return new_price;
                 return {currency:price_split_by_from[1][price_split_by_from[1].length - 1],price_to_calculate:new_price}
                  
              }
              return {currency:price_split_by_from[1][price_split_by_from[1].length - 1],price_to_calculate:new_price_split}
             // return new_price_split
          }
          return {currency:productPrice[productPrice.length - 1],price_to_calculate:productPrice}
          //return productPrice
    }

    const verify_if_product_is_in_database_and_return_price = (productValue:{productPath:string,selectedQuantity:number,selectedSize?:any})=>{// returns the price or null
      
        const product_path_split = productValue['productPath'].split(' ');
        const category = product_path_split[0];
        const brandName = product_path_split[1];
        const productName_with_underscores = product_path_split[2];
        const selectedQuantity = productValue['selectedQuantity'];
 

     
        const extract_produt_price = (brandProductsContainer:any)=>{
 
     

               if(pageState === 'Motorcycles'){
                  const split_product_name = productName_with_underscores.split('_');
                 const cylinder_Capacity = split_product_name[1];

                 const brand = brandProductsContainer['data'][brandName];
                 const extract_product_price = brand[cylinder_Capacity][productName_with_underscores]['price']
                 
                  return extract_product_price
               }

              
                   
               const brand = brandProductsContainer['data']['brands_available'][brandName];
                
                 const extract_product_equipment_prices = brand[productName_with_underscores]['prices'];
                 const cart_selected_Size =  productValue['selectedSize']; 
                 const price_by_selected_size =  extract_product_equipment_prices[cart_selected_Size];
              
            
                return price_by_selected_size;


        }
   
   const check_product_name_with_underscore_in_database = (check_brandName:any | null)=>{
      
                 if(pageState === 'Motorcycles'){
                    if(check_brandName !== null){
                         if(check_brandName.indexOf(productName_with_underscores) !== -1){// check string name product
                              return true;
                         }
                         return null;
                    }
                    return null;
                 }
    

                 // Equipments
                 if(check_brandName !== null){
                    
                      if(check_brandName.hasOwnProperty(productName_with_underscores)){
                          return true;
                      }
                    return null;
                 }
                
   }


       const pageState_category_items = usePagesCategoryItems[pageState]
          for(let index_pageState_Items = 0;index_pageState_Items < pageState_category_items.length;index_pageState_Items++){
                  const current_category = pageState_category_items[index_pageState_Items].id;
                 
                  if(current_category.trim().toLowerCase() === category.trim().toLowerCase()){
                       const current_category_available_products = pageState_category_items[index_pageState_Items]['data']['brands_available'];

                       const check_brandName = current_category_available_products.hasOwnProperty(brandName) ? current_category_available_products[brandName] : null;

                   

                      const check_productName_with_underscore = check_product_name_with_underscore_in_database(check_brandName);
                      

                       const send_back_price_or_null = check_productName_with_underscore !== null?  
                     
                         extract_produt_price(pageState_category_items[index_pageState_Items]) : null;

             
                         
                        return send_back_price_or_null;


                      
                  }
                
          }
    }

    const create_oneProduct_element = ()=>{
        
 const create_product_link = (productPath:string)=>{

    if(pageState === 'Equipment'){
        return `/equipment/product/${productPath}`
    }
    return `/product/${productPath}`

 }
 const products_list_html_elements:any = [];
       

   Object
    .entries(cartProducts)
    .forEach(([productName,productValue]:any)=>{

        if(productName !== 'length'){
            const product_path = productValue['productPath']
            const product_path_split = product_path.split(' ');
            const category:string = product_path_split[0];
            const brandName = product_path_split[1];
            const productName_with_underscores = product_path_split[2];
            const product_name_split_by_underscore =  productName_with_underscores.split('_');
            const extract_cylinder = product_name_split_by_underscore[1] || '';
            const product_name_normalized = product_name_split_by_underscore.join(' ');
             const selectedQuantity = productValue['selectedQuantity'];
             const selected_size = productValue['selectedSize']
            const product_index = productValue['index']

            const productPrice_or_null = verify_if_product_is_in_database_and_return_price(productValue)
   
           
             
                if(productPrice_or_null !== null){
                
            const {price_to_calculate,currency} = return_full_new_price(productPrice_or_null);
            const selected_quantity_price = calculate_price_by_selected_quantity(price_to_calculate,selectedQuantity,currency);
            const elimintate_category_plural = category[category.length - 1].indexOf('s') ? category.slice(0,category.length -1) : category;
            const product_link = create_product_link(product_path);
                    products_list_html_elements
                    .push( 
                        {
                        index:product_index, 
                        
                        productElement:
                            <li data-product_name={product_name_normalized} className='item-in-mini-menu'  >
                                <Link to={product_link} className="product_small_icon_container">

                                    <div className="image-container-one-product-in-cart">
                                            {pageState === 'Motorcycles' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${extract_cylinder}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                            {pageState === 'Equipment' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                    </div>
            
                                    <div className="product-description-details-container">
                                        {pageState === 'Motorcycles' &&<span className="product-descpription-moto">
                                           
                                          {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {extract_cylinder}
                                            
                                        </span>}

                                        {pageState === 'Equipment' &&<span className="product-descpription-moto">
                                           
                                          {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {productValue['selectedSize'].toUpperCase()}
                                            
                                        </span>}

                                    </div>
                                    
                                    
                                </Link>
                                <div className="x-quantity-of-product-number">
                            <span className="x-quantity-symbol">x</span>
                            <span className="number-quantity">{selectedQuantity}</span>
                                </div>
                
                                <div className="total-price-and-quantity-selected-container">
                                    {/* <span className="total-selected-quantity-price">
                                    {selected_quantity_price}
                                    </span> */}
                                </div>
                               
                               <div className="delete-product-from-cart" onClick={()=>{reSetProductsInCart(productName_with_underscores)}}>
                                   x
                               </div>
                            </li>,

                        price: price_to_calculate,
                        currency,
                        productName_with_underscores,
                        product_name_normalized,
                        product_path,
                        selected_size,
                        priceMultiplyBySelectedQuantity: selected_quantity_price,
                        selectedQuantity
                        }
                    


                    )

                }

            

        }


   })

        

        return products_list_html_elements;

    }



    

    return create_oneProduct_element()
}





export const Create_Cart_or_WishlistProductsList = (usePagesCategoryItems:any,pageState:string,listProducts:any,reSetProductsInCart:(productName_with_underscores:string)=>void,use_for_wishlist?:boolean) => {
    
 
 
    if(usePagesCategoryItems.hasOwnProperty(pageState) === false) return <></>
 
     
 
     const return_full_new_price:any = (productPrice:string)=>{
 
           if(productPrice.indexOf('from') !== -1){
 
               const price_split_by_from = productPrice.trim().split('from');
               const new_price_split = price_split_by_from[0];
               
 
 
               if(new_price_split.indexOf('%') !== -1){
                   const old_price_split = price_split_by_from[1];
 
                   const {old_price,new_price,discount_percentage} = calculate_percentage(old_price_split,new_price_split);
                   
                   //return new_price;
                  return {currency:price_split_by_from[1][price_split_by_from[1].length - 1],price_to_calculate:new_price}
                   
               }
               return {currency:price_split_by_from[1][price_split_by_from[1].length - 1],price_to_calculate:new_price_split}
              // return new_price_split
           }
           
           return {currency:productPrice[productPrice.length - 1],price_to_calculate:productPrice}
           //return productPrice
     }
 
     const verify_if_product_is_in_database_and_return_price = (productValue:{productPath:string,selectedQuantity:number,selectedSize?:any})=>{// returns the price or null
       
         const product_path_split = productValue['productPath'].split(' ');
         const category = product_path_split[0];
         const brandName = product_path_split[1];
         const productName_with_underscores = product_path_split[2];
         const selectedQuantity = productValue['selectedQuantity'];
  
 
      
         const extract_produt_price = (brandProductsContainer:any)=>{
  
      
 
                if(pageState === 'Motorcycles'){
                   const split_product_name = productName_with_underscores.split('_');
                  const cylinder_Capacity = split_product_name[1];
 
                  const brand = brandProductsContainer['data'][brandName];
                  const extract_product_price = brand[cylinder_Capacity][productName_with_underscores]['price']
                  
                   return extract_product_price
                }
 
                // on equipment you must see if you have in productObj Database the size seelcted and the price is the with the size
                    
                const brand = brandProductsContainer['data']['brands_available'][brandName];
                
                  const extract_product_equipment_prices = brand[productName_with_underscores]['prices'];
                  const cart_selected_Size =  productValue['selectedSize']; 
                  const price_by_selected_size =  extract_product_equipment_prices[cart_selected_Size];
                //  const extract_selected_size_price = 
             
                 return price_by_selected_size;
 
 
         }
    
    const check_product_name_with_underscore_in_database = (check_brandName:any | null)=>{
       
                  if(pageState === 'Motorcycles'){
                     if(check_brandName !== null){
                          if(check_brandName.indexOf(productName_with_underscores) !== -1){// check string name product
                               return true;
                          }
                          return null;
                     }
                     return null;
                  }
     
 
                  // Equipments
                  if(check_brandName !== null){
                     
                       if(check_brandName.hasOwnProperty(productName_with_underscores)){
                           return true;
                       }
                     return null;
                  }
                 
    }
  

   
 
        const pageState_category_items = usePagesCategoryItems[pageState]
           for(let index_pageState_Items = 0;index_pageState_Items < pageState_category_items.length;index_pageState_Items++){
                   const current_category = pageState_category_items[index_pageState_Items].id;
                  
                   if(current_category.trim().toLowerCase() === category.trim().toLowerCase()){
                        const current_category_available_products = pageState_category_items[index_pageState_Items]['data']['brands_available'];
 
                        const check_brandName = current_category_available_products.hasOwnProperty(brandName) ? current_category_available_products[brandName] : null;
 
                     //    const check_productName_with_underscore = check_brandName !== null ? 
                     //       check_brandName.indexOf(productName_with_underscores) !== -1 ? 
                     //         true :null 
                     //       : null;
 
                       const check_productName_with_underscore = check_product_name_with_underscore_in_database(check_brandName);
                       
 
                        const send_back_price_or_null = check_productName_with_underscore !== null?  
                      //   extract_produt_price(pageState_category_items[index_pageState_Items]['data'][brandName]) : null;
                          extract_produt_price(pageState_category_items[index_pageState_Items]) : null;
 
              
                          
                         return send_back_price_or_null;
 
 
                       
                   }
                 
           }
     } 
     
 
     const create_oneProduct_element = ()=>{
         // for each product (carefull t has length prop)
  const create_product_link = (productPath:string)=>{
 
     if(pageState === 'Equipment'){
         return `/equipment/product/${productPath}`
     }
     return `/product/${productPath}`
 
  }
  const products_list_html_elements:any = [];
  
        
 

  if(typeof use_for_wishlist === 'boolean' && use_for_wishlist){
      
    Object
    .entries(listProducts)
    .forEach(([productName,productValue]:any)=>{

        if(productName !== 'length'){
           
            const product_path = productValue['productPath']
            const product_path_split = product_path.split(' ');
            const category:string = product_path_split[0];
            const brandName = product_path_split[1];
            const productName_with_underscores = product_path_split[2];
            const product_name_split_by_underscore =  productName_with_underscores.split('_');
            const extract_cylinder = product_name_split_by_underscore[1] || '';
            const product_name_normalized = product_name_split_by_underscore.join(' ');
             const selectedQuantity = productValue['selectedQuantity'];
             const selected_size = productValue['selectedSize']
            const product_index = productValue['index']

            const productPrice_or_null = verify_if_product_is_in_database_and_return_price(productValue)
   
            // we gonna place the html elements into an array that is ordered by index
             
                if(productPrice_or_null !== null){
                
            const {price_to_calculate,currency} = return_full_new_price(productPrice_or_null);
           // const selected_quantity_price = calculate_price_by_selected_quantity(price_to_calculate,selectedQuantity,currency);
            const elimintate_category_plural = category[category.length - 1].indexOf('s') ? category.slice(0,category.length -1) : category;
            const product_link = create_product_link(product_path);
                    products_list_html_elements
                    .push( 
                        {
                        index:product_index, 
                        
                        productElement:<li data-product_name={product_name_normalized} className='item-in-mini-menu' >
                                <Link to={product_link} className="product_small_icon_container">

                                    <div className="image-container-one-product-in-cart">
                                            {pageState === 'Motorcycles' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${extract_cylinder}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                            {pageState === 'Equipment' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                    </div>
            
                                    <div className="product-description-details-container">
                                        {pageState === 'Motorcycles' &&<span className="product-descpription-moto">
                                        
                                        {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {extract_cylinder}
                                            
                                        </span>}

                                        {pageState === 'Equipment' &&<span className="product-descpription-moto">
                                        
                                        {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {productValue['selectedSize'].toUpperCase()}
                                            
                                        </span>}

                                    </div>
                                    
                                    
                                </Link>

                               
                            
                            <div className="delete-product-from-cart" onClick={()=>{reSetProductsInCart(productName_with_underscores)}} >
                                x
                            </div>
                    </li>,

                        price: price_to_calculate,
                        currency,
                        productName_with_underscores,
                        product_name_normalized,
                        product_path,
                        selected_size,
                        
                        selectedQuantity
                        }
                    


                    )

                }

            

        }


   })

        

        return products_list_html_elements;

  }

  if( use_for_wishlist === undefined){
    
    Object
    .entries(listProducts)
    .forEach(([productName,productValue]:any)=>{

        if(productName !== 'length'){
            const product_path = productValue['productPath']
            const product_path_split = product_path.split(' ');
            const category:string = product_path_split[0];
            const brandName = product_path_split[1];
            const productName_with_underscores = product_path_split[2];
            const product_name_split_by_underscore =  productName_with_underscores.split('_');
            const extract_cylinder = product_name_split_by_underscore[1] || '';
            const product_name_normalized = product_name_split_by_underscore.join(' ');
             const selectedQuantity = productValue['selectedQuantity'];
             const selected_size = productValue['selectedSize']
            const product_index = productValue['index']

            const productPrice_or_null = verify_if_product_is_in_database_and_return_price(productValue)
   
            // we gonna place the html elements into an array that is ordered by index
             
                if(productPrice_or_null !== null){
                
            const {price_to_calculate,currency} = return_full_new_price(productPrice_or_null);
            const selected_quantity_price = calculate_price_by_selected_quantity(price_to_calculate,selectedQuantity,currency);
            const elimintate_category_plural = category[category.length - 1].indexOf('s') ? category.slice(0,category.length -1) : category;
            const product_link = create_product_link(product_path);
                    products_list_html_elements
                    .push( 
                        {
                        index:product_index, 
                        
                        productElement:
                            <li data-product_name={product_name_normalized} className='item-in-mini-menu'>
                                <Link to={product_link} className="product_small_icon_container">

                                    <div className="image-container-one-product-in-cart">
                                            {pageState === 'Motorcycles' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${extract_cylinder}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                            {pageState === 'Equipment' && <img data-imageIndex={`${0}`} className='one-product-cart-img'
                                            src={`/productImages/${pageState}/${brandName}/${product_name_normalized}(${0}).${'jpg'}`}
                                            alt={product_name_normalized} />
                                            }
                                    </div>
            
                                    <div className="product-description-details-container">
                                        {pageState === 'Motorcycles' &&<span className="product-descpription-moto">
                                           
                                          {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {extract_cylinder}
                                            
                                        </span>}

                                        {pageState === 'Equipment' &&<span className="product-descpription-moto">
                                           
                                          {elimintate_category_plural} {brandName} {product_name_split_by_underscore[0]} {productValue['selectedSize'].toUpperCase()}
                                            
                                        </span>}

                                    </div>
                                    
                                    
                                </Link>
                                <div className="x-quantity-of-product-number">
                            <span className="x-quantity-symbol">x</span>
                            <span className="number-quantity">{selectedQuantity}</span>
                                </div>
                
                                <div className="total-price-and-quantity-selected-container">
                                   
                                </div>
                               
                               <div className="delete-product-from-cart" onClick={()=>{reSetProductsInCart(productName_with_underscores)}} >
                                   x
                               </div>
                            </li>,

                        price: price_to_calculate,
                        currency,
                        productName_with_underscores,
                        product_name_normalized,
                        product_path,
                        selected_size,
                        priceMultiplyBySelectedQuantity: selected_quantity_price,
                        selectedQuantity
                        }
                    


                    )

                }

            

        }


   })

        

        return products_list_html_elements;

  }
    
 
     }
 
 
 
     
 
     return create_oneProduct_element()
 }
 





import React,{useState,useRef} from 'react';
import OneProductSmallIcon from '../../oneProductIcon/OneProductSmallIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare,faSquare,faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {make_price_string_a_number} from './basicFunctions';
import { expose_the_size_with_biggest_num } from '../../expose_the_size_with_biggest_num';

interface ProductsShowCaseProps {
    productsFilteredBySections:any,
    setLocalStoreShop:(cart_new_obj:any)=>void
    isPageState_Motorcycles:boolean,
    categories:{extracted_category:string,extracted_subcategory:string}
}
 
const ProductsShowCase: React.FC<ProductsShowCaseProps> = ({productsFilteredBySections,setLocalStoreShop,isPageState_Motorcycles,categories}) => {
   
    
    const {extracted_category,extracted_subcategory} = categories;
    const pageState = isPageState_Motorcycles? 'Motorcycles' : 'Equipment';

    const [lastProductIndex,setLastProductIndex] = useState<number | null>(null);
    const [orderedProductList,setOrderedProductList] = useState({});///{20:{productList:{...},length:20},40:{productList:{...},length:34}}
    const [sortOptionsObject,setSortOptionsObject] = useState({selectedSortDirection:'up',selectedShownedProducts:20,selectedSortAfter:'price',userIsAtPageNumber:1})

    

   
    const create_product_obj = ()=>{

      

                        const products_small_icons:any = [];
                        
                    
                        if(pageState === 'Equipment'){
                                
                            Object
                            .entries(productsFilteredBySections)
                            .forEach(([productName,productAboutInfoValueObj]:any)=>{ 
                                const product_brand = productAboutInfoValueObj['brand'];
                                console.log('ce plm>',extracted_category,product_brand,productName,'d')
                               const link_string = `${extracted_category} ${product_brand} ${productName}`;
                                const sizes =  productAboutInfoValueObj['sizes'];
                                const prices = productAboutInfoValueObj['prices'];
                                const size_with_biggest_num = expose_the_size_with_biggest_num(sizes)
                                const {keySizeOfBiggestNumber,biggest_number} = size_with_biggest_num
                
                                
                
                
                                products_small_icons.push( 

                                    {productIcon:<OneProductSmallIcon setLocalStoreShop={setLocalStoreShop} directions_string={link_string}
                                            local_shop_object={undefined}
                                            pageState={pageState}
                                            logedInUser={undefined}
                                            productObject={{[productName]:productAboutInfoValueObj}} expose_the_size_with_biggest_num={size_with_biggest_num}/>,
                                     price:prices[keySizeOfBiggestNumber],
                                     name:productName     
                                        
                                   }
                                )
                            })
                
                            return products_small_icons
                        }
                
                        Object
                        .entries(productsFilteredBySections)
                        .forEach(([sectionName,sectionValue]:any)=>{
                            const productList_extract =   sectionValue.hasOwnProperty('productList') ? sectionValue['productList'] : sectionValue
                           
                            Object
                                .entries(productList_extract)
                                .forEach(([productName,productAboutInfoValueObj]:any)=>{
                                    
                                    
                                    const product_brand = productAboutInfoValueObj['brand'];
                                  
                                    const link_string = `${extracted_category} ${product_brand} ${productName}`;
                                    const product_price = productAboutInfoValueObj['price']
                                
                                        


                                        products_small_icons.push( 

                                            {productIcon:<OneProductSmallIcon setLocalStoreShop={setLocalStoreShop} directions_string={link_string}
                                                    local_shop_object={undefined}
                                                    pageState={pageState}
                                                    logedInUser={undefined}
                                                    productObject={{[productName]:productAboutInfoValueObj}} expose_the_size_with_biggest_num={undefined}/>,
                                             price:product_price,
                                             name:productName     
                                                
                                           }
                                        )
                                
                                    
                            })
                        }) 
                
                        return products_small_icons

             
             


      //  }
    }

  const sort_after =(sort_from:string,order_from:string,productList:any)=>{
    
   const sort_with = (productList:any,order_func:(a:any,b:any)=>any)=>{
       
    
   const sorted_products =  productList.sort(order_func) 
   
   return  sorted_products
   }

    const sort_after:any = {
       price:(productList:any,order:string)=>{
           
        const  order_options:any ={
            up:()=>{
                const ascendent_funtion = (a:any,b:any)=> {
                   return make_price_string_a_number(a['price']) - make_price_string_a_number(b['price']);
                   
                }
                return sort_with(productList,ascendent_funtion)
                
            },
            down:()=>{
                const ascendent_funtion = (a:any,b:any)=> {return make_price_string_a_number(b['price']) - make_price_string_a_number(a['price'])}
                return sort_with(productList,ascendent_funtion)


            }
        }
        return order_options[order]()
       },
        name:(productList:any,order:string)=>{

           const  order_options:any ={
                up:()=>{
                    const ascendent_funtion = (a:any,b:any)=> a['name'] - b['name']
                    return sort_with(productList,ascendent_funtion)
                    
                },
                down:()=>{
                    const ascendent_funtion = (a:any,b:any)=> b['name'] - a['name']
                    return sort_with(productList,ascendent_funtion)


                }
            }

            return order_options[order]()

        }
    }

    return sort_after[sort_from](productList,order_from);
  }
 
  const sort_direction_arrow = ()=>{
    
    
    const arrows_options:any = {
         up:()=>{
           
             return (<FontAwesomeIcon style={{pointerEvents:'none'}} icon={faArrowUp} className="sort-arrow sort-arrow-up"/>)
         },
         down:()=>{
            return (<FontAwesomeIcon style={{pointerEvents:'none'}} icon={faArrowDown} className="sort-arrow sort-arrow-down"/>)
         }

    }
  
      
    
    return arrows_options[sortOptionsObject.selectedSortDirection]()
  }

    

   const create_products_icon_from_sections_products = ()=>{

      const products_small_icons:any = [];
         
    
         if(pageState === 'Equipment'){
                
            Object
             .entries(productsFilteredBySections)
             .forEach(([productName,productAboutInfoValueObj]:any)=>{ 
                const product_brand = productAboutInfoValueObj['brand'];
               // const link_string = `/product/${extracted_category} ${product_brand} ${productName}`;
               const link_string = `${extracted_category} ${product_brand} ${productName}`
                const sizes =  productAboutInfoValueObj['sizes'];
                const size_with_biggest_num = expose_the_size_with_biggest_num(sizes)

                 


                products_small_icons.push(
                    <OneProductSmallIcon setLocalStoreShop={setLocalStoreShop} directions_string={link_string}
                            local_shop_object={undefined}
                            pageState={pageState}
                            logedInUser={undefined}
                            productObject={{[productName]:productAboutInfoValueObj}} expose_the_size_with_biggest_num={size_with_biggest_num}/>,
                           
                    
                )
            })

            return products_small_icons
         }

        Object
         .entries(productsFilteredBySections)
         .forEach(([sectionName,sectionValue]:any)=>{
              const productList_extract =   sectionValue.hasOwnProperty('productList') ? sectionValue['productList'] : sectionValue
            
               Object
                .entries(productList_extract)
                .forEach(([productName,productAboutInfoValueObj]:any)=>{
                    
                    
                    const product_brand = productAboutInfoValueObj['brand'];
                    //const link_string = `/product/${extracted_category} ${product_brand} ${productName}`;
                    const link_string = `${extracted_category} ${product_brand} ${productName}`
                 
                        products_small_icons.push(
                            <OneProductSmallIcon setLocalStoreShop={setLocalStoreShop} directions_string={link_string}
                            expose_the_size_with_biggest_num={undefined}
                           local_shop_object={undefined}pageState={pageState}logedInUser={undefined}productObject={{[productName]:productAboutInfoValueObj}}/>
                        )
                
                    
               })
        }) 

        return products_small_icons

   }

   const test_create = create_product_obj();

   const sorted_products_array:any = sort_after(sortOptionsObject.selectedSortAfter,sortOptionsObject.selectedSortDirection,test_create);

  
   const create_display_products_by_showned_limit_pages = (sorted_products:any,pageNameNumber?:number | undefined,continueFromLastIndexProduct?:number | undefined)=>{
          
           let showned_products_icon:any={}
         
         const start_at_product_index = continueFromLastIndexProduct === undefined ? 0 : continueFromLastIndexProduct
         const maximum_products_index = start_at_product_index + sortOptionsObject.selectedShownedProducts ;
          
          let added_page = pageNameNumber === undefined ? 1  : pageNameNumber;
          showned_products_icon = {[added_page]:[]}
          
          
          let last_index = 0;
        for(let index = start_at_product_index;index < maximum_products_index;index++){
            if(sorted_products[index] === undefined) break;
            
            showned_products_icon[added_page].push(sorted_products[index]);
            last_index = index
        }   
      
       
        if(last_index !== undefined && sorted_products[last_index + 1] !== undefined) showned_products_icon = {...showned_products_icon,...create_display_products_by_showned_limit_pages(sorted_products,added_page+1,last_index+1)}
        return showned_products_icon 
   }

   const available_pages = create_display_products_by_showned_limit_pages(sorted_products_array);// it works
 
  const test_create_oneHundred_products = ()=>{

     let one_hundred_products:any = [];
     for(let i = 0;i< 14;i++){
     
       
        one_hundred_products = [...one_hundred_products,...sorted_products_array]
     }

     return one_hundred_products
     
  }
 

  
 
 



const chose_page = ({target}:any)=>{
   
    const page_number_selected = Number(target.getAttribute("data-page_number"));
    
    if(page_number_selected === sortOptionsObject.userIsAtPageNumber) return;
   
    const copy_sort = {...sortOptionsObject};
    copy_sort.userIsAtPageNumber = page_number_selected;
    setSortOptionsObject(copy_sort)



}
const choose_showned_number_produts = ({target}:any)=>{
 

   

    const showned_number_selected = Number(target.value);
    if(showned_number_selected === sortOptionsObject.selectedShownedProducts) return;
    const copy_sort = {...sortOptionsObject};
     copy_sort.selectedShownedProducts = Number(showned_number_selected)
    setSortOptionsObject(copy_sort)

}



const create_page_list = ()=>{
    const page_list:any = []

    Object
     .entries(available_pages)
     .forEach(([pageNumber,pageProducts])=>{

        const selected_page = Number(pageNumber) === sortOptionsObject.userIsAtPageNumber ? 'user-is-on-selected-page' : '';
        page_list.push(
            <li className={`page-available ${selected_page}`} data-page_number={pageNumber} 
             onClick={(event)=>{chose_page(event)}}
            > 
              <span className='page-number-span' style={{pointerEvents:'none'}}>{pageNumber}</span>
            </li>
        )
    })
  
     return page_list;
}
  

const choose_products_to_be_sorted_by_price_or_name = ({target}:any)=>{
    const sort_by = target.value;

    if(sort_by === sortOptionsObject.selectedSortAfter) return;

    const copy_sort = {...sortOptionsObject};
    copy_sort.selectedSortAfter = sort_by;

    setSortOptionsObject(copy_sort)

}
const choose_products_to_be_sorted_ascendent_or_descendent = ()=>{
     
    const copy_sort = {...sortOptionsObject}
   
    if(copy_sort.selectedSortDirection === 'up') {
        copy_sort.selectedSortDirection = 'down'
        setSortOptionsObject(copy_sort)
        return;
    
    };

    if(copy_sort.selectedSortDirection === 'down'){

        copy_sort.selectedSortDirection = 'up';
        setSortOptionsObject(copy_sort)
    }

}

  
    const number_of_products_default_value = sortOptionsObject.selectedShownedProducts.toString();

   

  
    return (
    <div className="products-showcase-container">
        
       <div className="sort-after-and-limit-showned-products-container">
           <div className="sort-after-select-container">
               <span className="sort-after-title">Sort After: </span>
               <select name="sort-after-list" className="sort-after-select-list" onChange={(event)=>{choose_products_to_be_sorted_by_price_or_name(event)}}>
                    <option value="price">price</option>
                    <option value="name">name</option>
               </select>
               <span className="icon-sort-order-container" onClick={()=>{choose_products_to_be_sorted_ascendent_or_descendent()}}><span className="icon-sort-order-arrow" style={{pointerEvents:'none'}}>{sort_direction_arrow()}</span></span>
           </div>
           <div className="show-limited-num-of-products-container">
                 <span className="show-number-fo-products-title">Show: </span>
                 <select name="" className="show-number-of-products-select-list"  defaultValue={number_of_products_default_value} onChange={(event)=>{choose_showned_number_produts(event)}}>
                     <option value="20">20 on page</option>
                     <option value="40">40 on page</option>
                     <option value="60">60 on page</option>
                     <option value="80">80 on page</option>
                     <option value="100">100 on page</option>

                 </select>


    

           </div>

       </div>
       <div className="products-showcase">
           {/* {products_icons} */}
           {/* {sorted_products_array.map((sorted_product_obj:{productIcon:any},index:number)=>{
               if(index === 3)return (<p>nope</p>);
              if(index !== 3) return sorted_product_obj.productIcon
               })} */}


             {available_pages[sortOptionsObject.userIsAtPageNumber.toString()]
                .map((productObj:any)=>productObj.productIcon)
             }

           </div>

       <div className="pagination-products-showcase">

          {/* <div className="show-limited-num-of-products-container">
            <span className="show-number-of-products-title">Show: </span>
            <select name="" className="show-number-of-products-select-list" defaultValue={number_of_products_default_value} onChange={(event)=>{choose_showned_number_produts(event)}}>
                     <option value="20">20 on page</option>
                     <option value="40">40 on page</option>
                     <option value="60">60 on page</option>
                     <option value="80">80 on page</option>
                     <option value="100">100 on page</option>
            </select>




           </div> */}

           <div className="pages-select-container" style={{display:'flex',justifyContent:'space-around'}}>
               <div className="left-side-pagest-empty"></div>
                <ol className="pages-list" style={{display:'flex'}}>
                   {create_page_list()}
                </ol>

           </div>

       </div>
      

    </div> 
    
 );
}
 
export default ProductsShowCase;
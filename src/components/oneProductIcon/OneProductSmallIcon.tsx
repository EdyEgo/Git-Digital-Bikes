import { Find_product_details_in_Local_Object } from "./Find_Product_Details_In_Local_Object";
import { Link } from "react-router-dom";
import React,{useState} from 'react';
import { calculate_percentage,format_number_with_dot } from "./Discount_Functions";



import { Add_To_Cart_Or_WishList } from "./Product_Info_Comp/Add_To_Cart_Or_WishList";
import WishListButton from "./Product_Info_Comp/WishListButton";
import { Find_Product_Details_In_Product_Object } from "./Find_Product_Details_In_Porduct_Object";

export interface OneProductSmallIconProps {
    directions_string:string,
    setLocalStoreShop:(new_cart_obj:any)=>void,
    local_shop_object?:any,
    pageState:string,
    logedInUser:{email:string} | undefined,
    productObject?:any,
    expose_the_size_with_biggest_num?:{keySizeOfBiggestNumber:string,biggest_number:string | number} 
}
 
const OneProductSmallIcon: React.FC<OneProductSmallIconProps> = ({directions_string,setLocalStoreShop,local_shop_object,pageState,logedInUser,productObject,expose_the_size_with_biggest_num}) => {// actually we need the object
   


  

   
  

   const productObj_is_undefined = productObject === undefined;
  
   const categoryItemsInStorage = productObj_is_undefined ? local_shop_object[pageState] : undefined;

   
   const replace_underscore_with_space = (word:string)=> word.split('_').join(' ');

   
   
   const {productDetails,productName,cylinder_capacity,brandName ,replacement,fromBrand,category,keyProductName}:any = productObj_is_undefined ?
   Find_product_details_in_Local_Object(directions_string,categoryItemsInStorage,pageState) : Find_Product_Details_In_Product_Object(productObject);
   // this is wrong the component will still search for the product in local obj !!!
  
   

   
 const productIsNew = productDetails.hasOwnProperty('new') && productDetails.new === true ? 'New' : '';

   const check_productName_wishlist = ()=>{
    const digital_bikes_check = localStorage.getItem('digital-bikes7A');
   
    const parse_digital_bikes = digital_bikes_check !== null ? JSON.parse(digital_bikes_check) : undefined;
    
    if(parse_digital_bikes === undefined) return '';
    const check_productName_wishlist_as_property = parse_digital_bikes[pageState].wishlist.hasOwnProperty(productName);
   
    if(check_productName_wishlist_as_property) return 'added-as-wish';
    return '';

  }
   

  const [added_to_wishlist,setAdded_to_wishlist] = useState(check_productName_wishlist())

    const split_directions = directions_string.split(' ');
 
 const cylinder_name = productName.split('_')[1];
 
 
   
      
  

   const product_name_normalized = replace_underscore_with_space(productName)

       let preview_product_images:any = pageState === 'Motorcycles' ? [<img data-imageIndex={`${0}`} className='card-product-image'
       src={`/productImages/${pageState}/${brandName}/${cylinder_name}/${product_name_normalized}(${0}).${'jpg'}`}
        alt={`Two Wheels Life Logo`} />,<img data-imageIndex={`${1}`} className='card-product-image'
        src={`/productImages/${pageState}/${brandName}/${cylinder_name}/${product_name_normalized}(${1}).${'jpg'}`}
         alt={`Two Wheels Life Logo`} />]
       :
       [<img data-imageIndex={`${0}`} className='card-product-image'
          src={`/productImages/${pageState}/${brandName}/${product_name_normalized}(${0}).${'jpg'}`}
           alt={`Two Wheels Life Logo`} />,<img data-imageIndex={`${1}`} className='card-product-image'
           src={`/productImages/${pageState}/${brandName}/${product_name_normalized}(${1}).${'jpg'}`}
            alt={`Two Wheels Life Logo`} />];
 

  
  



    const import_images = async()=>{// test 
        const moto_page = pageState === 'Motorcycles';

           if(moto_page){

            const first_img = await import(`../${pageState}/${brandName}/${cylinder_name}/${productName}(${0}).${'jpg'}`);
            const second_img = await import(`../${pageState}/${brandName}/${cylinder_name}/${productName}(${1}).${'jpg'}`);
            preview_product_images[0] = <img data-imageIndex={`${0}`} 
             src={first_img}
              alt={`Two Wheels Life Logo`} style={{width:'100%',height:'100%'}}/>;
          
              preview_product_images[1] = <img data-imageIndex={`${1}`} 
             src={second_img}
              alt={`Two Wheels Life Logo`} style={{width:'100%',height:'100%'}}/>;

            
           }



    }// never used

    
  
const [shownedThumbnail,setShownedThumbnail] = useState(0);


let selectedSize = '';
const extract_original_and_current_price = ()=>{
   const split_by_from_word = (word_string:string)=> word_string.indexOf('from')? word_string.split('from') : [word_string];
  

  if(pageState.toLowerCase() === 'equipment' && expose_the_size_with_biggest_num){
      const {sizes,prices} = productDetails;
      const {keySizeOfBiggestNumber,biggest_number} = expose_the_size_with_biggest_num;
      
       
        selectedSize =  keySizeOfBiggestNumber
      const price_split = split_by_from_word(prices[keySizeOfBiggestNumber])

      return {current_new_price:price_split[0].trim(),original_old_price:price_split[1] || ''}
  }
  if(pageState.toLowerCase() === 'motorcycles'){
    const {price} = productDetails;
    const price_split = split_by_from_word(price)

    return {current_new_price:price_split[0],original_old_price:price_split[1] || ''}
  }
 
  return {current_new_price:'',original_old_price:''}
 
}

const {current_new_price,original_old_price} = extract_original_and_current_price();



//if(original_old_price === '')

const currentcy_used = current_new_price.trim().split(' ')[1];

const extract_currency_symbol = (string_price:string | number)=>{
 
  if(string_price === '') return ''
  if(typeof string_price === 'number') return string_price;

  if(string_price.indexOf('%') !== -1) return string_price;
  
  const extract_symbol =string_price.trim().split(' ');
 


   return extract_symbol[0]
}

//const {old_price,new_price,discount_percentage}:any = calculate_percentage(extract_currency_symbol(original_old_price),extract_currency_symbol(current_new_price));
const {old_price,new_price,discount_percentage}:any = calculate_percentage(original_old_price,current_new_price);

 
 const product_name_short_if_needed = ()=>{
  
   
    const trimned_product_name =productName.trim();
 
    const normalize_product_name = trimned_product_name.indexOf('_') !== -1? trimned_product_name.split('_').join(' ') : trimned_product_name;

    if(normalize_product_name.length > 25){
       const reduce_product_words = normalize_product_name.split(' ').slice(0,7).join(' ');

       return reduce_product_words
    }
   
    return normalize_product_name;
 }
 

 
 const add_to_wishlist_handler = ()=>{
   const add_in = logedInUser === undefined? 'localStorage' : 'dataBase';
  // const {productName,productPath,selectedSize,storeQuantitySelected} = productDetails// 1 quantity
  
  const  added_as_wish = Add_To_Cart_Or_WishList('wishlist',setLocalStoreShop,add_in,pageState,{productName,productPath:directions_string,selectedSize,storeQuantitySelected:'1'});

  // here set the hart to color red
  if(added_as_wish){
    setAdded_to_wishlist('added-as-wish');
  }

 }
const product_page_link = pageState === 'Equipment' ? `/equipment/product/${directions_string}` : `/product/${directions_string}`

  


    return (  
     
    
    //  <div  >
       
       

       <div className="one-product-card-container" >
      
         
          <div className="thumbnail-container" >
               <div className="product-thumbnail" >
                 <Link to={product_page_link} className="img-container" onMouseOver={()=>{setShownedThumbnail(1)}}
                  
                  onMouseLeave={()=>setShownedThumbnail(0)}>{preview_product_images[shownedThumbnail]}
                  </Link>
                   
                   {/* <div className="sent-user-image" onMouseOver={()=>{setShownedThumbnail(1)}} 
                   onMouseLeave={()=>setShownedThumbnail(0)}
                   >{preview_product_images[shownedThumbnail]}
                   </div> */}
                   
                  <ul className="product-flags" >
                  {discount_percentage !== '' &&<span className="dicount-flag" >{`-${discount_percentage}`}</span>}
                     {productIsNew !== '' &&<span className="new-flag">{productIsNew} </span>}
                  </ul>
               </div>
               <div className="mini-wishlist-button-container">
                 
                 <WishListButton setLocalStoreShop={setLocalStoreShop} logedInUser={logedInUser}
                 pageState={pageState} productName={productName}
                 productPath={directions_string} storeQuantitySelected={1}
                 selectedSize={selectedSize}/>
                 
               </div>
          </div>
          <div className="product-card-description">
             <div className="price_and_name_container" >
                 <Link  to={product_page_link}  className="product-name" >
                  {product_name_short_if_needed()} 
                 </Link>
                 <div className="price-and-discount-container">
                   <div className="current-price">
                      {/*  {currentcy_used}  */}
                      {new_price}
                      </div>
                   {old_price !== undefined &&
                   <div className="discount" style={{textDecoration:'line-through'}}>
                       {old_price !=='' && `${old_price} ${currentcy_used}`}
                   </div>}
                 </div>
             </div>
          </div>
       </div>
      

     //</div>
 );
}
 
export default OneProductSmallIcon;

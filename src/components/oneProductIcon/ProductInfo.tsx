import React,{useState,useRef} from 'react';
import {Link} from "react-router-dom";
import ShowDiscount from './Product_Info_Comp/ShowDiscount';
import QuantityItemsSelector from './Product_Info_Comp/QuantityItemsSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTimes,faShoppingBag,faHeart } from '@fortawesome/free-solid-svg-icons'
import {Add_To_Cart_Or_WishList} from './Product_Info_Comp/Add_To_Cart_Or_WishList'
import WishListButton from './Product_Info_Comp/WishListButton';
import AddToCartButton from './Product_Info_Comp/AddToCartButton';


//  ,  <FontAwesomeIcon icon={faCheck} /> 

interface ProductInfoProps {
    pageState:string,
    setLocalStoreShop:(new_cart_obj:any)=>void
    category:string,
    productPath:string
    productDetails:{
        // motorcycles
        features?:object | undefined,
        item_stock:number,
        price?:string | undefined,
        year:string | number | undefined,
        text?:string | undefined,
        // equipment
        prices?:any | undefined,
        sizes?:any | undefined,
        categories:string[],
        pictures_available:number
    },
    productName:string,
    cylinder_capacity:string | number,
    brandName:string,
    // equimpment 
    
    replacement:any,
    fromBrand:string
    
}  








 
const ProductInfo: React.FC<ProductInfoProps> = ({pageState,category,setLocalStoreShop,productDetails,productName,productPath,cylinder_capacity,brandName,replacement,fromBrand}) => {

    



const [storeQuantitySelected,setStoreQuantitySelected] = useState(1)

const {features,item_stock,price,year,text,prices,sizes,categories,pictures_available} = productDetails || {};
 
const pageState_Is_Motorcycles =  pageState.toLowerCase() === 'motorcycles';

const pageState_Is_Equipment = pageState.toLowerCase() === 'equipment';

const use_sizes = pageState_Is_Equipment ? Object.keys(sizes)[0] : '';



const [selectedSize,setSelectedSize] = useState(use_sizes);//{selectedSize:'xl'} // this one will be called for no reason on moto pageState
 
const price_string = pageState_Is_Equipment ? prices[selectedSize] : price;

const transform_plural_word_in_singular = (word:string)=>{
   
    if(word[word.length-1].toLowerCase() !== 's') return word;

    return word[0].toUpperCase() + word.slice(1,word.length - 1);

}
 



 

const product_name_showned_moto = ()=>{
  const split_product_name =  productName.split('_');

  return split_product_name[0] + ' ' + split_product_name[2];
}

const normalize_product_name = (product_name:string)=>{
  const split_name_by_underscore = product_name.indexOf('_') !== -1 ? product_name.split('_').join(' ') : product_name;
    

     return split_name_by_underscore
}



    return (
       
        <div className="product-info">
        <div className="product-info-header">
           
            {pageState_Is_Motorcycles && <h1 className='one-page-product__title'>{brandName.toUpperCase()} {product_name_showned_moto()} {cylinder_capacity.toString().toUpperCase()}cc</h1>}
            {pageState_Is_Equipment && <h1 className='one-page-product__title'>{transform_plural_word_in_singular(category)} {brandName} {normalize_product_name(productName)}</h1>}
              
              <div className="product-prices-container">
                  <span className="product-availability">
                        
                       
                         { pageState_Is_Equipment && sizes[selectedSize] > 0 && <i ><FontAwesomeIcon className='in-stock-check-icon' icon={faCheck} /> In Stock</i>}
                         { pageState_Is_Equipment && sizes[selectedSize] === 0 && <i ><FontAwesomeIcon className='out-of-stock-icon' icon={faTimes} /> Out of Stock</i>}
                         {pageState_Is_Motorcycles && item_stock > 0  && <div className={'items-in-stock'}>{item_stock} In Stock</div> }
                         {pageState_Is_Motorcycles && item_stock === 0  && <div className={'items-in-stock'}>Pre-Order Now</div>}
                          <ShowDiscount price_string={price_string}/>

                         

                  </span> 
                  

                    <div className="tax-shipping-delivery">{/* {'with VAT'} */} <span className="delivery-info"> Delivery in only 48 hours</span></div>
              </div>
        </div>
        
        <div className="product-actions">
               {
                pageState_Is_Equipment && 
                <div className="available-sizes-container">
                      <span className="available-sizes__title">Available Sizes</span>
                      <ul className="list--available-sizes" style={{display:'flex'}}>
                          {Object.entries(sizes).map(([sizeName,sizeNumberInStock]) => {
                             
                             
                             const sizeSelected =  selectedSize.toLowerCase() ===  sizeName.toLowerCase() ? true : false;
                             const selectedSizeClass =  sizeSelected ? 'sizeSelected' : ''; 

                       

                        

                            
                            return  <li className={`input-container float-left size-single-item-list ${selectedSizeClass}`} 
                            style={{cursor:'pointer',padding:'0.4em 0.5em'}} 
                            data-sizeName={`${sizeName}`} 
                           
                            onClick={(event:any)=>{setSelectedSize(event.target.attributes.getNamedItem("data-sizeName").value)}}>
                                     
                                     
                                      <span className="radio-label" style={{pointerEvents:'none'}}>{sizeName.toUpperCase()} </span>
                                    </li>

                            })
                          
                        }
                      </ul>
                  </div>
                }

                <div className="add-to-cart-container" >
                      <div className="add-to-cart-quantity" style={{display:'flex',justifyContent:'space-between'}}>
                          <QuantityItemsSelector pageState={pageState} storeQuantitySelected={storeQuantitySelected} setStoreQuantitySelected={setStoreQuantitySelected}/>

                          <div className="add-button-container" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                             
                              <AddToCartButton setLocalStoreShop={setLocalStoreShop} pageState={pageState} productName={productName} logedInUser={undefined} 
                              productPath={productPath} storeQuantitySelected={storeQuantitySelected} selectedSize={selectedSize}/>
                          </div>

                          <div className="add-wishlist-container">
                              
                              <WishListButton setLocalStoreShop={setLocalStoreShop} pageState={pageState} productName={productName} logedInUser={undefined}
                               productPath={productPath} storeQuantitySelected={storeQuantitySelected} selectedSize={selectedSize} />
                          </div>
                      </div>
              


                </div>

        </div>
    </div>

 );
}
 
export default ProductInfo;
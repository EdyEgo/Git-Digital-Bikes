import React,{useState} from 'react';
//import {Add_To_Cart_Or_WishList} from './Add_To_Cart_Or_WishList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import useModify_WishList_And_Cart from './Modify_WishList_And_Cart';


interface WishListButtonProps {
    pageState:string,
    productName:string,// so you can set the state and have the style appled on the heart
    productPath:string,
    setLocalStoreShop:(new_shop_cart_obj:any)=>void,
    logedInUser?:any,
    storeQuantitySelected:number,
    selectedSize:string

}
 
const WishListButton: React.FC<WishListButtonProps> = ({logedInUser,setLocalStoreShop,pageState,productName,productPath,storeQuantitySelected,selectedSize}) => { // later will add user is loged in
      


const productDetails = {productName,productPath,storeQuantitySelected,selectedSize} 

const {handle_wishlist_and_cart_writing,heart_style_class_string} = useModify_WishList_And_Cart(true,setLocalStoreShop,logedInUser,pageState,productDetails);

const [product_on_WishList,setProduct_on_wishList] = useState(heart_style_class_string)




    return (  
        <div className="btn-add-to-wishlist" 
         
        onClick={()=>{handle_wishlist_and_cart_writing('wishlist',setProduct_on_wishList)}}>
        
        <i className={`add-to-wishlist__heart-icon `}
        style={{padding:'0.7em 0.7em',pointerEvents:'none'}}>
            <FontAwesomeIcon className={product_on_WishList}  icon={faHeart}/>
        </i>
        
        
        </div>
        
 ); 




}
 
export default WishListButton;
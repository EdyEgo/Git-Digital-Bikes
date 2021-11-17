import React,{useEffect,useRef,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faShoppingBag,faHeart,faBars,faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import Add_Options_Search_Bar from './Add_Options_Search_Bar';
import { Link,useHistory } from "react-router-dom";

import SearchList from './SearchList';
import MiniCartHoverList from './HeaderApp/MiniCartHoverList';

import MiniWishlistHover from './HeaderApp/MiniWishlistHover';

import PhoneNumber from './PhoneNumberComp';
import { on_blur_hide_wishlist_or_cart } from './HeaderApp/HideHeaderMenus_onBlur';
 





export interface HeaderProps {
    usePagesCategoryItems:any,
    setLocalStoreShop:(argument_shop_obj:any)=>void,
    number_of_wish_list_products:number,
    hide_or_show_header_menus_states:{
        menus_set_functions:{setShow_wishlist_products_mobile:(set_hide_show:boolean)=>void,
                            setShow_cart_products_mobile:(set_hide_show:boolean)=>void,
                            setShow_search_form_mobile:(set_hide_show:boolean)=>void
        
        },menu_variables_booleans:{
            show_cart_products_mobile:boolean,
            show_wishlist_products_mobile:boolean,
            show_search_form_mobile:boolean
        }
    },
    wishlistProducts:any
    usePageState:string,
    timeOutSearch:any,
    product_list_Cart:any,
    logedInUser:any,number_of_cart_products:number, 
    cartProducts:any,
    numberOfproductsAddedToCart:number,
    visible_mobile_links_statue:boolean,
    set_show_mobile_links:(show_or_not:boolean)=>void

}
 
const Header: React.FC<HeaderProps> = (
    {usePagesCategoryItems,hide_or_show_header_menus_states,setLocalStoreShop,number_of_wish_list_products,
        wishlistProducts,usePageState,timeOutSearch,product_list_Cart,number_of_cart_products,
        cartProducts,numberOfproductsAddedToCart,logedInUser,visible_mobile_links_statue,set_show_mobile_links}) => {
    

   const current = usePagesCategoryItems;
 
   const [hideDropMenu_Class , setHideDropMenu_Class] = useState('hide');
    const history = useHistory();
    const typingTimer = useRef<any>();
    const user_input_history = useRef('');
    

   
    const [serached_text_By_User,setSerached_text_By_User] = useState('');
    
    const {menu_variables_booleans,menus_set_functions} = hide_or_show_header_menus_states;

    const {show_cart_products_mobile,show_search_form_mobile,show_wishlist_products_mobile} = menu_variables_booleans;
    const {setShow_cart_products_mobile,setShow_search_form_mobile,setShow_wishlist_products_mobile} = menus_set_functions

    const class_hide_show_cart_mobile = show_cart_products_mobile? 'show_mobile_cart_products' : 'hide_mobile_cart_products';
    const class_hide_show_wishlist_mobile = show_wishlist_products_mobile ? 'show_mobile_wishlist_products' : 'hide_mobile_wishlist_products';
    const class_hide_show_search_form_mobile = show_search_form_mobile ? 'show_mobile_search_form' : 'hide_mobile_search_form';
  

   
     const [updateSearchBar,setUpdateSearchBar] = useState(false)
    


     useEffect(()=>{
      
        
        if( Array.isArray(current[usePageState]) && current[usePageState].length >= 1){
           
            setUpdateSearchBar(true);
        }
        
     },[current])
     
    

 
   
 const optionSelected = useRef<any>(''); 
  


     const handleSelect_Changes = ({target}:any)=>{
        optionSelected.current = target.value
 

         
     }
 
   const handleSubmitSearch = (event:any)=>{
    event.preventDefault();
       
       
       const target = optionSelected.current;
       
       if(target === '' || target === undefined) return;
       const page_state_link_half = usePageState === 'Equipment' ? 'equipment/' : ''
       const is_target_subCategory = target.indexOf(' ') !== -1 ; 
       
       const is_userText_having_length = serached_text_By_User.length > 0 ? `&${serached_text_By_User}` : ''
    
       
       if(!is_target_subCategory){
           const category_name = target;
           if(category_name === 'all-categories' || '') return;
              history.push(`/${page_state_link_half}filteredProducts/${category_name}${is_userText_having_length}`);
             
         return;
       }

       if(is_target_subCategory){
           const split_categories = target.trim().split(' ');
          const category_name = split_categories[0];
          if(category_name === 'all-categories' || '') return;
          const subCategory = split_categories[1]; 
          
          history.push(`/${page_state_link_half}filteredProducts/${category_name} ${subCategory}${is_userText_having_length}`);
           
           
       }

    

   }
 
  

   const handle_On_Change_searchBar_Input = (target:{value:string})=>{
    
          clearTimeout(typingTimer.current);
    
    typingTimer.current= target.value && target.value !==  user_input_history.current ? setTimeout(()=>{ 
                
                user_input_history.current = target.value;
                setSerached_text_By_User(target.value);

    },2000) : '';
   

   }


   
 

   
 

   const delay_hidding_the_element_onBlur = ()=>{
       let delay;
      
       
       delay = setTimeout(()=>{
           
        setHideDropMenu_Class('hide');
      },1000)

   }











const cart_link = usePageState === 'Equipment' ? '/equipment/cartPage': '/cartPage' 


const make_cart_UnLink = Array.isArray(product_list_Cart) !== true || cartProducts.length <= 0;
 

const wishlist_mini_menu = [
    <MiniWishlistHover setLocalStoreShop={setLocalStoreShop} wishlistProducts={wishlistProducts} class_hide_show_wishlist_mobile={class_hide_show_wishlist_mobile}/>
]

const cart_mini_menu = [ 
    <MiniCartHoverList product_list_Cart={product_list_Cart}
    setLocalStoreShop={setLocalStoreShop}
    class_hide_show_cart_mobile={class_hide_show_cart_mobile}
    number_of_cart_products={number_of_cart_products}
    cartProducts={cartProducts} pageState={usePageState} 
    usePagesCategoryItems={usePagesCategoryItems} 
    logedInUser={logedInUser}
   />

];



const form_search = [
    <form className="search-form"   onSubmit={(event)=>{handleSubmitSearch(event)}}> 
    

    <div className="inputs-form-container">
       <input onChange={({target})=>{handle_On_Change_searchBar_Input(target)}} onFocus={()=>setHideDropMenu_Class('addFlex')} 
         onBlur={()=>delay_hidding_the_element_onBlur()} 
         style={{position:'relative'}} 
         type="text" name="searchInput" id="search" className="search-input"placeholder="Search.." /> 
      
       

       <select name="categories" className='select-categories-box' id="categoriesSelect" onChange={handleSelect_Changes}> 
       {updateSearchBar && <Add_Options_Search_Bar usePagesCategoryItems={usePagesCategoryItems} usePageState={usePageState}/>}
       </select> 
       

      

       <button className="submit-button" type='submit'  value="Search"><FontAwesomeIcon icon={faSearch} /></button> 
    </div>
      
       <div className="results-container-form">
            <ul className={`search-input-results ${hideDropMenu_Class}`} > 
            
            {hideDropMenu_Class === 'addFlex' &&
                <SearchList pageState={usePageState} 
                    categoryItems={current} 
                    searchText={serached_text_By_User} 
                    timeOutSearch={timeOutSearch}
                />
            }
            
            
                </ul>
       </div>
       
    </form>
];


const on_click_show_or_hide_products_mobile_cart = ()=>{

    setShow_cart_products_mobile(!show_cart_products_mobile);
}
const on_click_show_or_hide_products_mobile_wishlist = ()=>{
    setShow_wishlist_products_mobile(!show_wishlist_products_mobile);
} 
const on_click_show_or_hide_search_form_mobile =()=>{
    setShow_search_form_mobile(!show_search_form_mobile)
}





const sent_to_cart_page_mobile = ()=>{

    history.push(cart_link)
} 



    return ( 
        <>
     <div className="header-container" >
         
         <div className="logo-container">
        
             {/* <img src={require(`./logoPictures/twoWheelsLifeLogo.png`).default} 
             alt={`Two Wheels Life Logo`} style={{maxWidth:'100px',maxHeight:'100px'}} /> */}
             <img src={`/shopImages/twoWheelsLifeLogo.png`} 
             alt={`Two Wheels Life Logo`} style={{maxWidth:'100px',maxHeight:'100px'}} />


             {/* {switch_page_Link()} */}
         </div> 

         <div className='search-area-desktop desktop-only'>
              {form_search[0]}
            
             
         </div> 
        

   

        <div className="cart-area" >
            
           

            <PhoneNumber/>
            
            <div className="mobile-menu-burger-container mobile-only" style={{cursor:'pointer'}} onClick={()=>{set_show_mobile_links(!visible_mobile_links_statue);on_blur_hide_wishlist_or_cart('burgermenu',menus_set_functions,menu_variables_booleans)}}><FontAwesomeIcon className='menu-burger-icon' style={{pointerEvents:'none'}} icon={faBars}/></div>
            <div className="mobile-search-icon-container mobile-only" style={{cursor:'pointer'}} onClick={()=>{on_click_show_or_hide_search_form_mobile();on_blur_hide_wishlist_or_cart('searchform',menus_set_functions,menu_variables_booleans)}}><FontAwesomeIcon className='search-icon' style={{pointerEvents:'none'}} icon={faSearchLocation}/></div>

            <div className="mini-wishlist-heart-container-desktop desktop-only" >
                <div className="hear-icon-container" >
                        
                        
                            
                            
                        


                           
                            <div  className="wishlist-link" >
                                
                                <FontAwesomeIcon className='heart-icon-header-wishlist' icon={faHeart} />
                                {number_of_wish_list_products > 0 &&
                                <div className="wishlist-info-container cart-info-container">
                                    
                                    <span className="wishlist-info cart-info" 
                                    
                                    >{number_of_wish_list_products}</span>
                                </div>}
                            </div>

                          
                    
                </div>


                
                {wishlist_mini_menu[0]}
            </div>
            <div className='mini-wishlist-heart-container-mobile mobile-only'  onClick={()=>{on_click_show_or_hide_products_mobile_wishlist();on_blur_hide_wishlist_or_cart('wishlist',menus_set_functions,menu_variables_booleans)}}>
                <div className="hear-icon-container" >
                        
                        
                            
                            
                        


                          
                            <div  className="wishlist-link" >
                                <FontAwesomeIcon className='heart-icon-header-wishlist' icon={faHeart} />
                                {number_of_wish_list_products > 0 &&
                                    <div className="wishlist-info-container cart-info-container">
                                        <span className="wishlist-info cart-info" 
                                        
                                        >{number_of_wish_list_products}</span>
                                    </div>
                                }
                            </div>

                          
                    
                </div>


                
                {wishlist_mini_menu[0]}
            </div>

            <div className="mini-cart-container-desktop desktop-only">
            {  make_cart_UnLink !== true&&
                <Link to={cart_link} className="mycart-link" >
                    <FontAwesomeIcon icon={faShoppingBag} className='cart-icon-header' />
                    {numberOfproductsAddedToCart > 0 &&<div className="cart-info-container">
                        
                        <span className="cart-info" 
                        
                        >{numberOfproductsAddedToCart}</span>
                    </div>}
                </Link>
             }

            { make_cart_UnLink  && 
              <div className="mycart-link" >
                  <FontAwesomeIcon className='cart-icon-header' icon={faShoppingBag} />
                    {/* <div className="cart-info-container">
                    
                    </div> */}

              </div>
             
             }

                

                 {cart_mini_menu[0]}
            </div>
            <div className='mini-cart-container-mobile mobile-only'  onClick={()=>{on_click_show_or_hide_products_mobile_cart();on_blur_hide_wishlist_or_cart('cart',menus_set_functions,menu_variables_booleans)}} >
                        {  make_cart_UnLink !== true&&
                            <div  className='mycart-link-mobile mycart-link'  onDoubleClick={()=>{sent_to_cart_page_mobile()}}>
                                <FontAwesomeIcon className='cart-icon-header' icon={faShoppingBag} />
                                {numberOfproductsAddedToCart >= 1 &&
                                    <div className="cart-info-container">
                                        <span className="cart-info" 
                                        
                                        >{numberOfproductsAddedToCart}</span>
                                    </div>
                                }
                            </div>
                        }

                        { make_cart_UnLink  && 
                        <div className="mycart-link-mobile" >
                            <FontAwesomeIcon className='cart-icon-header' icon={faShoppingBag} />
                            

                        </div>
                        
                        }

                            

                            {cart_mini_menu[0]}
            </div>

        </div>
        
         
     </div>
     <div className={`search-area-mobile ${class_hide_show_search_form_mobile} mobile-only`} onClick={()=>on_blur_hide_wishlist_or_cart('return',menus_set_functions,menu_variables_booleans)}>
              {form_search[0]}
            
             
         </div> 
     </>
     
  );
}
 
export default Header;
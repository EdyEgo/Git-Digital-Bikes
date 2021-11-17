




export const on_blur_hide_wishlist_or_cart= (hover_type:string,menus_set_functions:{
    setShow_wishlist_products_mobile:(hide_or_show:boolean)=>void,
    setShow_cart_products_mobile:(hide_or_show:boolean)=>void,
    setShow_search_form_mobile:(hide_or_show:boolean)=>void
    },menu_variables_booleans:{
        show_cart_products_mobile:boolean,
        show_wishlist_products_mobile:boolean,
        show_search_form_mobile:boolean
    })=>{
    

        if(hover_type === 'return') return;

 const {setShow_wishlist_products_mobile,setShow_cart_products_mobile,setShow_search_form_mobile} = menus_set_functions;
 const  {show_cart_products_mobile,show_wishlist_products_mobile,show_search_form_mobile}=menu_variables_booleans ;
 
     
    if(hover_type ==='burgermenu'){
      setShow_wishlist_products_mobile(false);
      setShow_cart_products_mobile(false);
      setShow_search_form_mobile(false);
      return;
    }
    
    if(hover_type === 'cart'){
      setShow_wishlist_products_mobile(false);
      setShow_search_form_mobile(false);
      return;
  
    }
    if(hover_type === 'wishlist'){
      setShow_cart_products_mobile(false);
      setShow_search_form_mobile(false);
      return;
    }
    if(hover_type === 'searchform'){
      setShow_cart_products_mobile(false);
      setShow_wishlist_products_mobile(false);
      return;
    }
  
    

    if(show_cart_products_mobile || show_wishlist_products_mobile || show_search_form_mobile){

    setShow_wishlist_products_mobile(false);
    setShow_cart_products_mobile(false);
    // setShow_search_form_mobile(false);
  
    }
 
      
      
  }
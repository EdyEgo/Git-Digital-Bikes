import React , {useState,useEffect,useRef} from 'react';
import BenefitsBar from '../components/BenefitsBar';
import General_Footer from '../components/General_Footer';
import { BrowserRouter as Router, Route, Link, Switch,Prompt,useRouteMatch } from "react-router-dom";
//import { HashRouter as Router, Route, Link, Switch,Prompt,useRouteMatch } from "react-router-dom";

import NavBar from '../components/NavBar';


import { LocalMemoryCategoryItemsContext } from '../LocalMemoryCategoryItemsContext';
import DocumentationPage from './documentation';
import ContactUsPage from './contact';
import OneProductPageDetails from '../components/oneProductIcon/OneProductPageDetails';
import FilteredProducts from './filteredProducts';
import Header from '../components/Header';
import { CreateCartProductsList,Create_Cart_or_WishlistProductsList } from '../components/HeaderApp/OneProductItemInCart';
import CartPage from './CartPage';
import BillingPage from './BillingPage';
import FirstImpressionMotoSlider from '../components/MainPageComponents/FirstImpressionMotoSlider';
import VisitUsHereMoto from '../components/MainPageComponents/VisitUsHere';




 
const EquipmentPage: React.FC<any> = (
  {setCategoryItems,setPageState,usePagesCategoryItems,useSetPagesCategoryItems,
    setInsideMotorcyclesPage,logedInUser,pageState,hide_or_show_header_menus_states}) => {
 
 
  



  
  const currentCategoryItems = usePagesCategoryItems;
  const presentLoadedPage = 'Equipment';
 

  const categoryItemsInStorage = currentCategoryItems[presentLoadedPage] ? currentCategoryItems[presentLoadedPage] : undefined; 

  


useEffect(()=>{
  setPageState('Equipment');

},[])
   


const documentationObject = useRef({});// left here
const useful_info_obj = useRef();


      
const write_documentationObject = (write_with:any)=>{
  
  documentationObject.current = write_with;

}
const write_useful_info_obj = (write_with:any)=>{
  useful_info_obj.current = write_with

}

const start_timeOut_Search = useRef<()=>void>();


/// test 

const local_store_productsList = localStorage.getItem('digital-bikes7A');
    
 

//     const extract_products_by_pageState = ()=>{// might wanna do this one async, because in the future  you will have a logedIn user , you know...
//       if(logedInUser === undefined){
     
//        if(local_store_productsList === null) return {number_of_cart_products:0,cartProducts:'',number_of_wish_list_products:0,wishlistProducts:''};

//        const parsed_products_list = JSON.parse(local_store_productsList);
//        console.log('hey hey uu',parsed_products_list[pageState],parsed_products_list[pageState]['cart']['length'])
      
//        const number_of_cart_products = parsed_products_list.hasOwnProperty(pageState)? parsed_products_list[pageState]['cart']['length'] : 0;
//        const number_of_wish_list_products = parsed_products_list.hasOwnProperty(pageState)? parsed_products_list[pageState]['wishlist']['length'] : 0;

//        return {number_of_cart_products,cartProducts:parsed_products_list[pageState]['cart'],number_of_wish_list_products:number_of_wish_list_products,wishlistProducts:parsed_products_list[pageState]['wishlist']}
      

//      }

//      if(typeof logedInUser === 'object'){
//          // log number of products from database
//          return {number_of_cart_products:'un loged user',cartProducts:'un loged user',number_of_wish_list_products:0,wishlistProducts:'un loged user'}
//      }

//      return {number_of_cart_products:'no number found',cartProducts:'no products found',number_of_wish_list_products:0,wishlistProducts:'no products found'}

//  }


//  test
const extract_products_by_pageState = ()=>{// might wanna do this one async, because in the future  you will have a logedIn user , you know...
  if(logedInUser === undefined){
 
   if(local_store_productsList === null) return {number_of_cart_products:0,cartProducts:'',number_of_wish_list_products:0,wishlistProducts:''};

   const parsed_products_list = JSON.parse(local_store_productsList);
   
  
   const number_of_cart_products = parsed_products_list.hasOwnProperty(pageState)? parsed_products_list[pageState]['cart']['length'] : 0;
   const number_of_wish_list_products = parsed_products_list.hasOwnProperty(pageState)? parsed_products_list[pageState]['wishlist']['length'] : 0;

   return {number_of_cart_products,cartProducts:parsed_products_list[pageState]['cart'],number_of_wish_list_products:number_of_wish_list_products,wishlistProducts:parsed_products_list[pageState]['wishlist']}
  

 }

 if(typeof logedInUser === 'object'){
     // log number of products from database
     return {number_of_cart_products:'un loged user',cartProducts:'un loged user',number_of_wish_list_products:0,wishlistProducts:'un loged user'}
 }

 return {number_of_cart_products:'no number found',cartProducts:'no products found',number_of_wish_list_products:0,wishlistProducts:'no products found'}

}



// test end




 
    const {number_of_cart_products,cartProducts,number_of_wish_list_products,wishlistProducts} = extract_products_by_pageState()
  

 const numberOfproductsAddedToCart = number_of_cart_products


//// continue


const [productCartList,setProductCartList] = useState<null | any>(null);
const [localStoreShop,setLocalStoreShop]= useState({});// used to reset the hole component so that the cart gets updated
const [productWishList,setProductWishList] = useState<null | any>(null);

    const set_product_Cart_list = (new_productsListCartProducts:any,change_local_store_cart_products_pageState:any)=>{
           //const new_productList_elements = CreateCartProductsList(usePagesCategoryItems,pageState,new_productsListCartProducts,change_local_store_cart_products_pageState)
           // const new_productList_elements = CreateCartProductsList(usePagesCategoryItems,pageState,new_productsListCartProducts,change_local_store_cart_products_pageState)
          const new_productList_elements = Create_Cart_or_WishlistProductsList(usePagesCategoryItems,pageState,new_productsListCartProducts,change_local_store_cart_products_pageState)
         setProductCartList(new_productList_elements)
    }
    const set_product_wish_list = (new_productsListWishProducts:any,change_local_store_wishlist_products_pageState:any)=>{

      const new_productList_elements = Create_Cart_or_WishlistProductsList(usePagesCategoryItems,pageState,new_productsListWishProducts,change_local_store_wishlist_products_pageState,true);
      setProductWishList(new_productList_elements);
    }

    const change_local_store_cart_products_pageState = (productNameToDelete:string)=>{ // at the end call set_product_Cart_list

     if(logedInUser === undefined) {
            const local_store_productsList = localStorage.getItem('digital-bikes7A');
            const parsed_products_list =local_store_productsList !== null ? JSON.parse(local_store_productsList) : null;
            
            if(parsed_products_list === null) return;
           
           const delete_product = parsed_products_list[pageState]['cart'].hasOwnProperty(productNameToDelete) ?  delete parsed_products_list[pageState]['cart'][productNameToDelete] : null
             if(delete_product!== null){
              parsed_products_list[pageState]['cart']['length'] =  parsed_products_list[pageState]['cart']['length'] - 1; 
                    
              const stringify_modified_productList_obj = JSON.stringify(parsed_products_list);
              localStorage.setItem('digital-bikes7A',stringify_modified_productList_obj);

              /// test
              
              setLocalStoreShop(stringify_modified_productList_obj)
              //// test
           
             set_product_Cart_list(parsed_products_list[pageState]['cart'],change_local_store_cart_products_pageState)
             }    
  
     }
     


    }
    const change_local_store_wishlist_products_pageState = (productNameToDelete:string)=>{//for a possible wishlist page
        if(logedInUser === undefined) {
            const local_store_productsList = localStorage.getItem('digital-bikes7A');
            const parsed_products_list =local_store_productsList !== null ? JSON.parse(local_store_productsList) : null;
           
            if(parsed_products_list === null) return;
           
          
            const delete_product = parsed_products_list[pageState]['wishlist'].hasOwnProperty(productNameToDelete) ?  
                     delete parsed_products_list[pageState]['wishlist'][productNameToDelete] : null;
            if(delete_product!== null){
                  parsed_products_list[pageState]['wishlist']['length'] =  parsed_products_list[pageState]['wishlist']['length'] - 1; 
                        
                  const stringify_modified_productList_obj = JSON.stringify(parsed_products_list);
                  localStorage.setItem('digital-bikes7A',stringify_modified_productList_obj);

                  /// test
                 
                  setLocalStoreShop(stringify_modified_productList_obj); /// carefull with this one 
                  //// test
                
                set_product_wish_list(parsed_products_list[pageState]['wishlist'],change_local_store_wishlist_products_pageState)
            }

        }
    }
    
   


 
 
  const product_list_Cart =  Create_Cart_or_WishlistProductsList(usePagesCategoryItems,pageState,cartProducts,change_local_store_cart_products_pageState);
  const product_list_wishlist = Create_Cart_or_WishlistProductsList(usePagesCategoryItems,pageState,wishlistProducts,change_local_store_wishlist_products_pageState) ;
 
  


    const billing_page_info = useRef<null | any>(null);

    const write_billing_page = (billing_obj:any)=>{
        billing_page_info.current = billing_obj
       
    }

    const payment_options = undefined;

/// test
 
  const [show_side_menu_mobile,setShow_side_menu_mobile] = useState(false);

  const hide_mobile_menu_on_page_click = ()=>{

    if(show_side_menu_mobile === false) return;
 
    setShow_side_menu_mobile(!show_side_menu_mobile)
     
 }


  
    return ( 
        < >
       
      
      
      
       <div className="equipment-shop-container" >
      
       <Router >   


         
    
           <header className="header" onClick={()=>{hide_mobile_menu_on_page_click()}}>
             
            

            <Header number_of_wish_list_products={number_of_wish_list_products} 
            hide_or_show_header_menus_states={hide_or_show_header_menus_states}
            setLocalStoreShop={setLocalStoreShop}
            wishlistProducts={product_list_wishlist} 
            product_list_Cart={product_list_Cart} 
            number_of_cart_products={number_of_cart_products} 
            cartProducts={cartProducts} numberOfproductsAddedToCart={numberOfproductsAddedToCart}
            usePagesCategoryItems={usePagesCategoryItems} 
            usePageState={pageState} 
            timeOutSearch={start_timeOut_Search.current}
            logedInUser={undefined} 
            set_show_mobile_links={setShow_side_menu_mobile}
            visible_mobile_links_statue={show_side_menu_mobile}
            />

             {/* test */}

             {/* <Header number_of_wish_list_products={number_of_wish_list_products} wishlistProducts={product_list_wishlist}
            hide_or_show_header_menus_states={hide_or_show_header_menus_states}
             setLocalStoreShop={setLocalStoreShop}
             product_list_Cart={product_list_Cart} number_of_cart_products={number_of_cart_products} cartProducts={cartProducts} 
             numberOfproductsAddedToCart={numberOfproductsAddedToCart}
            usePagesCategoryItems={usePagesCategoryItems} 
            usePageState={pageState} 
            timeOutSearch={start_timeOut_Search.current}
            logedInUser={undefined} 
            set_show_mobile_links={setShow_side_menu_mobile}
            visible_mobile_links_statue={show_side_menu_mobile}
            /> */}
            {/* test  end*/}
          
            </header>
        
            <NavBar goToPage={'Motorcycles'}
              storedPageCategoryItems={categoryItemsInStorage} 
              categoryItemsStore={currentCategoryItems}
              currentPage={presentLoadedPage} 
              setCategoryItemsStore={useSetPagesCategoryItems}
              set_show_mobile_links={setShow_side_menu_mobile}
              show_mobile_links={show_side_menu_mobile}
              />
        
       
            <Switch>
            
            
            <Route exact path='/equipment'>
              <FirstImpressionMotoSlider use_for_equipment={true}/>
               <BenefitsBar/> 
               <VisitUsHereMoto />
            </Route>

           
              {/* here we place the first impresion hero pictures , most viewed products */}
            

           

                {/* <Route path='/equipment/filteredProducts/:id'>
                 
                  <LocalMemoryCategoryItemsContext.Provider value={{currentCategoryItems,pageState,setCategoryItems,logedInUser}}>
                  <FilteredProducts/>
                  </LocalMemoryCategoryItemsContext.Provider>
                </Route> */}
              
        


                <Route  path = '/equipment/documentation/:id'>
                 
                 <LocalMemoryCategoryItemsContext.Provider value={{useful_info_obj}}>
                  
                 <DocumentationPage/>
                 </LocalMemoryCategoryItemsContext.Provider>
                 
                 </Route>
                 
                 <Route exact path='/equipment/contact'> 
                 <LocalMemoryCategoryItemsContext.Provider value={{logedInUser,useful_info_obj}}>
                   
                     <ContactUsPage />
                 </LocalMemoryCategoryItemsContext.Provider>
                 
                 
                 </Route>
                 
                 <Route path='/equipment/filteredProducts/:id'>
                 {/* path='/equipment/filteredProducts/:id' old path */}
                 <LocalMemoryCategoryItemsContext.Provider value={{currentCategoryItems,pageState,setCategoryItems,logedInUser,setLocalStoreShop}}>
                 <FilteredProducts/>
                 </LocalMemoryCategoryItemsContext.Provider>
                 </Route>
                 
                 
                 
                 <Route path='/equipment/product/:id'>
                   {/* only here i need setLocalStoreShop*/}
                 <LocalMemoryCategoryItemsContext.Provider value={{logedInUser,categoryItems:usePagesCategoryItems,pageState,setCategoryItems,write_documentationObject,setLocalStoreShop}}>
                    <OneProductPageDetails/>
                    
                 </LocalMemoryCategoryItemsContext.Provider>
                 
                 </Route>


                
                <Route exact path='/equipment/cartPage'>
                
                <CartPage write_billing_page={write_billing_page} setLocalStoreShop={setLocalStoreShop}
                   product_list_Cart={product_list_Cart} 
                   change_local_store_cart_products_pageState={change_local_store_cart_products_pageState} 
                   pageState={pageState}
                />
          

                </Route>


                
                <Route exact path='/equipment/billingPage'>
                   

                   <LocalMemoryCategoryItemsContext.Provider value={{billing_page_info,logedInUser,payment_options,pageState,setLocalStoreShop}}>
                    <BillingPage/>
                  </LocalMemoryCategoryItemsContext.Provider>
                </Route>

                <Route exact path='/equipment/orderPlaced'>

                </Route>

                <Route exact path='/equipment/404Error'>

                </Route>






           
              
            </Switch>
           

            <General_Footer logedAdmin={logedInUser}
               sendInfoToDocumentationPageContext={write_documentationObject} 
               addUsefulInfo_to_parent_component={write_useful_info_obj}
               customPath={'/equipment'}
            />
       </Router>
       
       </div>
       
       </>
  );
}
 
export default EquipmentPage;  
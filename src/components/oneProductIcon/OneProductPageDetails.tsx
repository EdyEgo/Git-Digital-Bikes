import React,{useContext,useRef} from 'react'; 
import { useParams, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { LocalMemoryCategoryItemsContext } from '../../LocalMemoryCategoryItemsContext';


import { Find_product_details_in_Local_Object } from './Find_Product_Details_In_Local_Object';
import ImagePresentationList from './ImagePresentationList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ProductInfo from './ProductInfo';
import ProductReviewsApp from './Product_Reviews_Comp/ProductReviewsApp';
import ProductTabsInfo from './Product_Tabs_Comp/Product_tabs_info';
import Same_Category_Products_App from './Same_Category_Products/Same_Category_Products_App';
import SaveWatchedProduct from './WatchedProducts/SaveWatchedProduct';
import WatchedProductsApp from './WatchedProducts/WatchedProductsApp';

import DocumentationPage from '../../pages/documentation';
import ContactUsPage from '../../pages/contact';




export interface OneProductPageDetailsProps {
    
} 



 
const OneProductPageDetails: React.FC<OneProductPageDetailsProps> = () => {
   

    window.scrollTo(0, 0);
   
   


    const {id}:any = useParams(); //here you have stored the category brandName product actual name, needs a for loop to fint the category 
     

     
    
   
    const storedCategoryItems = useContext(LocalMemoryCategoryItemsContext);// add an object that has two values , one is the array and the other is the state of the page
    const {categoryItems,pageState,setCategoryItems,logedInUser,write_documentationObject,setLocalStoreShop} =storedCategoryItems;
    const current = categoryItems;
    const pageStateLowerCase =  pageState.toLowerCase(); 
    const goToPage_String = pageStateLowerCase === 'equipment' ? 'Motorcycles' : 'Equipment'; 
    
    const categoryItemsInStorage = categoryItems[pageState];
     

    // store to localeStorage as watched products 

    SaveWatchedProduct(pageState,id);
    

     

    const {productDetails,productName,productNameUnderline,cylinder_capacity,brandName ,replacement,fromBrand,category,keyProductName}:any = Find_product_details_in_Local_Object(id,categoryItemsInStorage,pageState);
     

   
 const useful_info_obj = useRef();
//  const write_useful_info_obj = (write_with:any)=>{
//     useful_info_obj.current = write_with
  
//   }
   

 

// first rout is the problem

const product_link = pageStateLowerCase === 'equipment'?`/equipment/product/${id}` : `/product/${id}`;
const product_path =  id.split('/')[2];

 return ( 
    <>
   
    
    
       
<Router> 

            

  <Switch>
  

    
      
                <Route path={product_link}>
                    <div className="single-product-container">
                    <div className="product-info-container" >
                        <div className="product-image-container">
                            <ImagePresentationList pageState={pageState} productDetails={productDetails}productName={productName} cylinder_capacity={cylinder_capacity} brandName={brandName} replacement={replacement}fromBrand={fromBrand}/>

                        </div> 
                        
                        
                        <ProductInfo
                          setLocalStoreShop={setLocalStoreShop}
                        pageState={pageState}productDetails={productDetails}
                        productName={productName}
                        cylinder_capacity={cylinder_capacity}
                        brandName={brandName}  
                        replacement={replacement}
                        fromBrand={fromBrand}
                        category={category}
                        productPath={id}
                        />
                    </div>

                    <div className="product-tabs-container">
                        

                        <ProductTabsInfo productDetails={productDetails}/>

                    </div> 

                    <div className="product-reviews-container">


                        

                        <ProductReviewsApp reviews={productDetails.reviews} 
                        logedInUser={undefined} category={category} 
                        pageState={pageState} brandName={brandName}
                        keyProductName={keyProductName}/>


                    </div>

                    <div className="same-category-products-container">
                            
                            <div className="products-same-category-list" style={{transitionDuration:'0ms',display:'flex',position:'relative'}} >
                                <div className="swipe-left" style={{cursor:'pointer',position:'absolute',left:'0',right:'auto',display:'flex',justifyContent:'center',zIndex:10}}>
                                    <i style={{pointerEvents:'none'}}><FontAwesomeIcon icon={faArrowLeft}/></i>
                                </div>
                                <Same_Category_Products_App setLocalStoreShop={setLocalStoreShop} subCategoryName={category}pageState={pageState}
                                        brandName={brandName}shop_object={categoryItems}
                                        searchByProductCategory={productDetails.categories}
                                        currentWatchedProductName={productNameUnderline}
                                        logedInUser={logedInUser}
                                        />


                                <div className="swipe-right"  style={{cursor:'pointer',position:'absolute',right:'0',left:'auto',display:'flex',justifyContent:'center',zIndex:10}}>
                                    <i style={{pointerEvents:'none'}}><FontAwesomeIcon icon={faArrowRight}/></i>
                                </div>
                                
                            </div>
                    </div>


                    <WatchedProductsApp setLocalStoreShop={setLocalStoreShop} pageState={pageState} 
                    local_shop_object={categoryItems} 
                    logedInUser={logedInUser}/> 

                    </div> 

                </Route>


            <Route path ='/documentation/:id'>
               
                <LocalMemoryCategoryItemsContext.Provider value={{useful_info_obj}}>
                 
                <DocumentationPage/>
                </LocalMemoryCategoryItemsContext.Provider>

            </Route>

            <Route path='/contact/'> 
                <LocalMemoryCategoryItemsContext.Provider value={{logedInUser,useful_info_obj}}>
                    
                    <ContactUsPage />
                </LocalMemoryCategoryItemsContext.Provider>

                
            </Route> 

        

            
      
  </Switch>

     
</Router>

               
       
      

    </>
 );
}
 
export default OneProductPageDetails;
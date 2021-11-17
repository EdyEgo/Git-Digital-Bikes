import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import MotorcyclesPage from './pages/motorcycles';
import EquipmentPage from './pages/equipment';
import { on_blur_hide_wishlist_or_cart } from './components/HeaderApp/HideHeaderMenus_onBlur';
import AdminPage from './pages/AdminPage';
import { firestore } from './firebase';










function App() {  
  
  const logedInUser = undefined;      

   
  

  


  

  


  
 
  

   
    
    const [pageState,setPageState] = useState<any>('Motorcycles')//('Equipment'); 

    

    
    const [categoryItems,setCategoryItems] = useState<any>({});
    
   


const switch_page_Link = ()=>{
  const pageState_lowerCase = pageState.toLowerCase();

   if(pageState_lowerCase === 'equipment'){

       return(<Link to='/' className='switch-page-btn switch-to-motorcycles'>Switch to Motorcycles</Link>);
   }
   return (<Link to='/equipment' className='switch-page-btn switch-to-equipment'>Switch to Equipment</Link>)

}



    const [show_cart_products_mobile,setShow_cart_products_mobile] = useState(false);
    const [show_wishlist_products_mobile,setShow_wishlist_products_mobile] = useState(false);
    const [show_search_form_mobile,setShow_search_form_mobile] = useState(false);

    const menus_set_functions = {setShow_wishlist_products_mobile,setShow_cart_products_mobile,setShow_search_form_mobile};
    const menu_variables_booleans = {show_cart_products_mobile,show_wishlist_products_mobile,show_search_form_mobile};

    const hide_or_show_header_menus_states = {menus_set_functions,menu_variables_booleans};
 

  return (
    
         <div className="App" onClick={()=>{on_blur_hide_wishlist_or_cart('',menus_set_functions,menu_variables_booleans)}}> 
    
      
      

    
    
   
        
       
        <Router>
        <div className="switch-page-container" style={{display:'flex',justifyContent:'space-between',borderBottom:'2px solid #eeeeee',padding:'0.5em 0.5em'}}>
          <div className="switch-page-burger-menu-mobile"><Link to='/admin'>Switch to Admin</Link></div>

          <div className="switch-page-links-container">
                 {switch_page_Link()} 
          </div>

        </div>
        
        

      
        
        <Switch>  
              <Route exact path = '/'>
               
                  <MotorcyclesPage setCategoryItems={setCategoryItems} 
                  setPageState={setPageState} usePagesCategoryItems={categoryItems} 
                  useSetPagesCategoryItems={setCategoryItems} 
                  logedInUser={logedInUser}
                  pageState={pageState}
                  hide_or_show_header_menus_states={hide_or_show_header_menus_states}
                  
                  />  
              </Route>

              <Route exact path='/equipment' >
                  <EquipmentPage setCategoryItems={setCategoryItems} 
                  setPageState={setPageState} 
                  usePagesCategoryItems={categoryItems} 
                  logedInUser={logedInUser}
                  pageState={pageState}
                  useSetPagesCategoryItems={setCategoryItems}
                  hide_or_show_header_menus_states={hide_or_show_header_menus_states}
                  />
                 
              </Route>



              <Route exact path='/admin'>
                  <AdminPage/>
              </Route>








             
               
        </Switch>
  
   

        <div className="products-container">
             
              

              <div className="products-list-container">
                 

              </div>
        </div>
      
        </Router>
    </div>

   
    
  );
}

export default App;
import React , {useEffect} from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';


import CategoryItemsFetch from './CategoryItemsFetch';
import {ListCategory} from './ListCategory';


export interface NavBarProps {
   goToPage:string,
   storedPageCategoryItems?: undefined | object[],
   selectedHighLightCategory?:string,
  
  categoryItemsStore:any,
  setCategoryItemsStore?:any,
   currentPage:string,
   set_show_mobile_links:(setToHide:boolean)=>void,
   show_mobile_links:boolean
   
    
}
 


const NavBar: React.FC<NavBarProps> = ({goToPage,storedPageCategoryItems: storedCategoryItems,selectedHighLightCategory,categoryItemsStore,setCategoryItemsStore,currentPage,show_mobile_links,set_show_mobile_links}) => {
    
     
     const update = false
   
       const Fetch_Param = storedCategoryItems === undefined ? goToPage : null; 
      
       const callFetch_With_Param = CategoryItemsFetch({Fetch_Param}); 
       

       const categoryItems = storedCategoryItems !== undefined && callFetch_With_Param === null ? storedCategoryItems : callFetch_With_Param;

       

   useEffect(()=>{ 

  
       if(categoryItemsStore.hasOwnProperty(currentPage) === false && Array.isArray(categoryItems) && categoryItems.length >= 1 || update){
      
         setCategoryItemsStore(()=>{ 
          
            return { ...categoryItemsStore,[currentPage] :categoryItems}
         })


        
       }
      
      },[categoryItems])


 
    
   
    
    const selectedCategory = selectedHighLightCategory === undefined ? '' : selectedHighLightCategory;
  

   const create_links = ()=>{
  
    const  desktop_links:any = [];
    const  mobile_links:any =[];

      if(Array.isArray(categoryItems)){

         categoryItems.map((item:any)=>{
           
            
   
            desktop_links.push(< ListCategory category={item} selectedHighLightCategory={selectedCategory} currentPage={currentPage}/>)
           mobile_links.push(< ListCategory category={item} selectedHighLightCategory={selectedCategory} currentPage={currentPage} mobile={true}/>)
                 
           
         })

      }


      return {desktop_links,mobile_links}
   }

    const {desktop_links,mobile_links} = create_links();
     const hide_or_show_mobile_links_class = show_mobile_links ? 'show_mobile_links' : 'hide_mobile_links';

     const hide_mobile_menu = ()=>{
        if(show_mobile_links === false) return;
       set_show_mobile_links(false)
     }
  

   const set_z_index_on_overlay = ()=>{
      if(show_mobile_links === false){
         const  zIndexOverlay = -999998;
         const hide_class = 'hide';
         return {zIndexOverlay,hide_class}
      }

      if(show_mobile_links){
         const  zIndexOverlay = 9997;
         const hide_class = '';
         return {zIndexOverlay,hide_class}
      }

      return {};

   } 

   const {zIndexOverlay,hide_class} = set_z_index_on_overlay()

    return ( 
       <>
    
        <nav className="nav-bar">
           
        <ul className="pages-links page-links-desktop desktop-links desktop-only" >



          
          {/* <li className="page-switch" key={"switch"} >
             <Link to={`${link}`} >{goToPage}</Link>

          </li> */}
            
            {desktop_links}
         

         
            
  
  

          
          
             

        </ul>
 
    <div className={`mobile-links-container mobile-links ${hide_or_show_mobile_links_class} mobile-only`} >
       <div className="close-mobile-menu-x-container" style={{cursor:'pointer'}} onClick={()=>{hide_mobile_menu()}}>
          <span className="emptyleft-x-side"></span>
          
       <span className="close-mobile-menu-btn" style={{pointerEvents:'none'}}><FontAwesomeIcon style={{pointerEvents:'none'}} className='close-window-icon' icon={faWindowClose} /></span></div>
       <ul className={`pages-links page-links-mobile ${hide_or_show_mobile_links_class} mobile-only`}>
               {mobile_links}
        </ul>

         
    </div>

    </nav> 
</>

 );
}
 
export default NavBar;
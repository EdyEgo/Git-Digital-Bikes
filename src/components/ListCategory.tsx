import React,{useState,useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  Link,useHistory } from 'react-router-dom';
import {faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface ListCategoryProps{
     
    category:{
        data:{
        available_brands?:string[],
        subCategory?:string[] 
        },
        id:string
    },
    selectedHighLightCategory:string,
    currentPage:string,
    mobile?:boolean

       
    
    

}
 



export const ListCategory: React.FC<ListCategoryProps> = ({category,selectedHighLightCategory,currentPage,mobile}) => { 
        
        
       

          const is_current_page_Equipment = currentPage.toLowerCase() === 'equipment'
           const [hideElement,setHideElement] = useState('hide');
           const [hideElementDesktop,setHideElementDesktop] = useState('hide-categories')
           const equipmentSpecialBeforeLink = is_current_page_Equipment ?`/${currentPage.toLowerCase()}` : '';
           const last_timeout_on_hidding_element = useRef<any>(null);

           const history = useHistory();
        
        
       const iMissSpell_MotorcyclesInDataBase = category.id === 'motocycles' ? 'motorcycles' : category.id;
       
       const itemCategoryName = `desktop-item-category-${iMissSpell_MotorcyclesInDataBase}`;
       const containerCategoryItem = `container-${itemCategoryName} ${hideElement} brand-items-wrapper`;
       const containerCategoryItemDesktop = `container-${itemCategoryName} ${hideElementDesktop} brand-items-wrapper-desktop`;
       
       const linkClass = category.id === selectedHighLightCategory ? `${category.id} selected category-hover-nav` : `${category.id} category-hover-nav`; 
    
     const hide_or_show_categories_on_click__mobile = ()=>{
            if(hideElement === 'hide'){ 
               
               setHideElement('show-sub-caregories-on-mobile-menu')
                return;
            }
           
            if(hideElement === 'show-sub-caregories-on-mobile-menu'){
                setHideElement('hide');
            }

     }



  


    if(mobile){
  
      return (
        
              <li className={`mobile-categories-menu ${itemCategoryName}`} onClick={()=> hide_or_show_categories_on_click__mobile()} onDoubleClick={()=>{history.push(`${equipmentSpecialBeforeLink}/filteredProducts/${category.id}`)}}   key={`list-${category.id}`}> 
                      
              <div 
                style={{textTransform:"uppercase",cursor:'pointer'}} 
                className={`category-item-with-angle-down linkClass`}
                
                key={`link-${category.id}`}  data-category={category.id} > 
               <span className="category-container-text">{category.id}</span>  {category.id !== 'second-heand' && <FontAwesomeIcon icon={faAngleDown} />} {/*onClick={(event)=>{setHighLightCategory(event)}} */}
              
              </div>

              
            
              <ul className={`${category.id}-equipment-list equipment-list`} key={`${category.id}-equipment-list`} > 
              {Array.isArray(category.data.subCategory) && category.data.subCategory.map((oneSubCategory:string)=>

                  (
                      <Link to={`${equipmentSpecialBeforeLink}/filteredProducts/${category.id} ${oneSubCategory.toLowerCase()}`} 
                      className={`subCategory-${oneSubCategory}-equipment ${hideElement} single-sub-category`} 
                      key={`subCategory-${oneSubCategory}-equipement`}>{oneSubCategory}</Link>
                  )
              )}
              </ul>
            <div className={containerCategoryItem}  key={`category-container-${category.id}`}>
            {
              Array.isArray(category.data.available_brands) && 
              category.data.available_brands.map((brand:string)=>{ 
              
              const brand_Delete_White_Space = brand.trim();
              return (
                <div className="brand-container brand-container-img-and-name--links" >
                
                    
                    
                      <img src={`/brandPictures/${brand_Delete_White_Space}.jpg`} className='menu-item-category-brand-img' alt={`Image of brand ${brand}`} style={{maxWidth:'80px',maxHeight:'80px'}} />
                    

                      <Link to={`/filteredProducts/${category.id} ${brand.toLowerCase()}`} 
                      className={`subBrand-${brand.toLowerCase()}-equipment item-category-brand-name--link`} 
                      key={`subBrand-${brand}-equipement`}>{brand.toUpperCase()}</Link>
                      
                    
                    
                </div>

              )})
            } 

            
            

            </div>
        </li>
      )
    }
 

    
  
    const on_hover_cancel_timeout_for_hiding_brand_container = ()=>{
      if(last_timeout_on_hidding_element.current !== null){
        clearTimeout(last_timeout_on_hidding_element.current);
    }
   
 }

 const delay_hidding_the_element_onBlur = ()=>{
      



on_hover_cancel_timeout_for_hiding_brand_container()
   
  last_timeout_on_hidding_element.current = setTimeout(()=>{
    
   

    setHideElementDesktop('hide-categories')
  },200)

  

 }

 
 
 const add_flex_desktop_hover = ()=>{
  on_hover_cancel_timeout_for_hiding_brand_container();

  if(is_current_page_Equipment){
    setHideElementDesktop('addFlex-categories-equipment')
    return;
  }
  setHideElementDesktop('addFlex-categories')

 }


    return (
      
              <li className={`desktop-categories-menu ${itemCategoryName}`} onMouseEnter={()=> add_flex_desktop_hover()}
                onMouseLeave={()=>delay_hidding_the_element_onBlur()} style={{position:'relative'}}  key={`list-${category.id}`}> 
                        
              <Link 
                style={{textTransform:"uppercase",position:'relative'}} 
                className={linkClass}
                
                key={`link-${category.id}`} to={`${equipmentSpecialBeforeLink}/filteredProducts/${category.id}`} data-category={category.id} > 
                {category.id} {category.id !== 'second-heand' && <FontAwesomeIcon icon={faAngleDown} />} 
              
              </Link>

              
            
              {is_current_page_Equipment &&<ul className={`${category.id}-equipment-list ${hideElementDesktop} sub-categories-equipment-list`} key={`${category.id}-equipment-list`} > 
              {Array.isArray(category.data.subCategory) && category.data.subCategory.map((oneSubCategory:string)=>

                  (
                    
                      <Link to={`${equipmentSpecialBeforeLink}/filteredProducts/${category.id} ${oneSubCategory.toLowerCase()}`} 
                      className={`subCategory-${oneSubCategory}-equipment  equipment-category-desktop`} 
                      key={`subCategory-${oneSubCategory}-equipement`}>{oneSubCategory}</Link>
                  )
              )}
              </ul>}
            <div className={containerCategoryItemDesktop} onMouseEnter={()=> setHideElementDesktop('addFlex-categries')} style={{backgroundColor:'white',position:'absolute'}} key={`category-container-${category.id}`}>
            {
              Array.isArray(category.data.available_brands) && 
              category.data.available_brands.map((brand:string)=>{ 
              
              const brand_Delete_White_Space = brand.trim();
              return (
                <div className="brand-container" style={{display:'flex',flexDirection:'column'}}>
                
                    
                    
                      <img className='img-desktop-category' src={`/brandPictures/${brand_Delete_White_Space}.jpg`} alt={`Image of brand ${brand}`} style={{maxWidth:'80px',maxHeight:'80px'}} />
                    

                      <Link  to={`/filteredProducts/${category.id} ${brand.toLowerCase()}`} 
                      className={`subBrand-${brand}-equipment sub-brand-name-of-category`} 
                      key={`subBrand-${brand}-equipement`}>
                        {brand.toUpperCase()}
                      </Link>
                      
                    
                    
                </div>

              )})
            } 

            
            

            </div>
        </li>

    )

    
} 
import React,{useState,useRef} from 'react';

interface ProductTabsInfoProps {
    productDetails:{
        description?:string,
        features?:any 
    }
}
 
const ProductTabsInfo: React.FC<ProductTabsInfoProps> = ({productDetails}) => {
   
   
  const [selectedTab,setSelectedTab]= useState(0); 

  const getDataSet_IndexTab = ({target}:any)=>{

   return target.getAttribute("data-tabTitleIndex")
   

  }
  

  const add_selected_class_to_tab_title = (items_tab_list_index:number)=>{
     
   
    if(Number(items_tab_list_index) === Number(selectedTab)){
         return 'tab-selected';
    } 
 
   return '';

  }
 
  const eliminate_underscore = (word:string)=>{
      if(word.indexOf('_') !== -1) return word.split('_').join(' ');
     return word;
  }   

  const make_the_first_letter_upperCase = (word:string)=> word[0].toUpperCase()+ word.slice(1,word.length);
  
  const create_tabs = ()=>{ 

    const  lists_store:any = []; // store here the list then later add them to an ul 

    const content_list_store:any = [];

    Object.entries(productDetails).forEach(([tabName,tabValue]:any)=>{
        

        if(Array.isArray(tabValue) && tabName.toLowerCase() === 'properties'){
            const items_tab_list_index = lists_store.length;
            lists_store.push(<li className={`${tabName} ${add_selected_class_to_tab_title(items_tab_list_index)} tab-title`} style={{cursor:'pointer'}}
                data-tabTitleIndex={items_tab_list_index}
                 onClick={(event:any)=>{setSelectedTab(getDataSet_IndexTab(event))}}>{make_the_first_letter_upperCase(tabName)}</li>); // add on click event
            
            let feature_list:any = [];

            tabValue.forEach((property:string)=>{
       
                feature_list.push( <li className={`${tabName} property-row`}> 

                <span className={`${tabName} property-name`}>{property}</span> 
                
                


                
                </li>);


            })
        
            content_list_store.push(<div className={`${tabName} property-container`}><ul className={`${tabName} container-list`}>{feature_list}</ul></div>)



        }

        

        if(typeof tabValue === 'string' && tabName.toLowerCase() === 'description'){
            const items_tab_list_index = lists_store.length;

            lists_store.push(<li className={`${tabName} description-title-text ${add_selected_class_to_tab_title(items_tab_list_index)} tab-title`} style={{cursor:'pointer'}}
                 data-tabTitleIndex={items_tab_list_index}
                 onClick={(event:any)=>{setSelectedTab(getDataSet_IndexTab(event))}}>{make_the_first_letter_upperCase(tabName)}</li>);// add on click event
           
            content_list_store.push(<p className={`${tabName} text-description-content`}>{tabValue}</p>)

        }

        if(typeof tabValue === 'object' && tabName.toLowerCase() === 'features' || typeof tabValue === 'object' && tabName.toLowerCase() === 'specs'){
            const items_tab_list_index = lists_store.length;
 

            lists_store.push(<li className={`${tabName} ${add_selected_class_to_tab_title(items_tab_list_index)} tab-title`} 
                data-tabTitleIndex={items_tab_list_index} style={{cursor:'pointer'}}
                onClick={(event:any)=>{setSelectedTab(getDataSet_IndexTab(event))}}>{make_the_first_letter_upperCase(tabName)}</li>); // add on click event
            
            let feature_list:any = [];
            let last_color_row:string = 'colored-row';

            Object.entries(tabValue).forEach(([featureName,featureValue]:any,index:number)=>{
                 
                 // colored row , white-row
              //

                // const color_row_class = index % 2 === 1 ? 'colored-row' : 'white-row';
               
                 last_color_row =  last_color_row === 'colored-row' ? 'white-row' : 'colored-row';
                

                if(featureName !== 'length'){
                    feature_list.push( <li className={`${tabName} feature-row ${last_color_row}`}> 

                    <span className={`${tabName} feature-name`}>{eliminate_underscore(featureName)}</span> 
                    
                    <span className={`${tabName} feature-value`}>{featureValue}</span>
                    
                    </li>);
                }
                


            })
        
            content_list_store.push(<div className={`${tabName} features-container`}><ul className={`${tabName} features-list`}>{feature_list}</ul></div>)

        }
    


   })
   
   return {lists_store,content_list_store}
  }
 

  const {lists_store,content_list_store} = create_tabs(); // this one does not need to be called every time you reREnder

  

 

    return (
   <> 

     

   
       <ul className="product-info-tabs-list" >
            

            {lists_store.map((item_tab_list:any)=>{
                return   item_tab_list
              
            })
            
            
            }


       </ul>
                  
        <div className="product-info-tab-content">
             {content_list_store[selectedTab]}
        </div>
   
   
   </>

 );
}
 
export default ProductTabsInfo;
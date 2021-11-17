
import React from 'react';

import EquipmentSearch from './searchBarComponents/EquipmentSearch';
import MotorcyclesSearch from './searchBarComponents/MotorcyclesSearch';

export interface SearchListProps {
    searchText?:string,
    selectedCategory?:string,
    categoryItems:any,
    pageState:string,
    timeOutSearch?:any
}



const SearchList: React.FC<SearchListProps> = ({searchText,selectedCategory,categoryItems,pageState,timeOutSearch}:any) => { 
    
  
 
   const isPageState_Motorcycles = pageState.toLowerCase() === 'motorcycles' ? true : false; 
  
   
   

 

return ( 
  <> 
     
    {isPageState_Motorcycles && 
     <MotorcyclesSearch 
       searchText={searchText}selectedCategory={selectedCategory} 
       categoryItems={categoryItems} pageState={pageState} timeOutSearch={timeOutSearch}
      /> 
    }
    
    {isPageState_Motorcycles === false && 
     <EquipmentSearch 
      searchText={searchText}selectedCategory={selectedCategory} 
      categoryItems={categoryItems} pageState={pageState} timeOutSearch={timeOutSearch} 
      />
    }
  </>
 ); 


  

 
}
 
export default SearchList; 









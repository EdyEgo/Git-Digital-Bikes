import React ,{useState} from 'react';

interface QuantityItemsSelectorProps {
    pageState:string,
    storeQuantitySelected:any,
    setStoreQuantitySelected:any
}
 
const QuantityItemsSelector: React.FC<QuantityItemsSelectorProps> = ({pageState,storeQuantitySelected,setStoreQuantitySelected}) => {

   
 

    
    // selected items will be stored in an useRef in ProductInfo ,
     const local_storage_app_path = 'digital-bikes7A'
    const localStorage_copy = localStorage.getItem(local_storage_app_path) 
      let localStorageObject =localStorage_copy === null ? {Equipment:{wishlist:[],cart:[]},Motorcycles:{wishlist:[],cart:[]}} : JSON.parse(localStorage_copy);
        
     




    

   
    localStorage['testingOnDigital-Bikes'] = {wishlist:[],cart:[]}
    localStorage.setItem('Testing_digital_bikes',JSON.stringify({wishlist:[],cart:[]}))

   
    const modify_quantity = ({target}:any)=>{
      

       // const action_string = target.innerText;
        const action_string = target.attributes.getNamedItem("data-modifiQuantity").value
        
        if(action_string === '+' && storeQuantitySelected <= 15){
           
           setStoreQuantitySelected(storeQuantitySelected + 1);

           
            return;
        }
        if(action_string === '-' && storeQuantitySelected > 1){
           
           setStoreQuantitySelected(storeQuantitySelected - 1);
            
            return;
        }
   
        return;
    }



    return ( 
        
        <div className="quantity-container addFlex" >
            <div className="quantity-number-selected" style={{padding:'0.6em 1.224em',border:'1px solid black'}}>{storeQuantitySelected}</div>
            <div className="customize-quantity" style={{display:'flex',flexDirection:'column'}}>
                <button className="add-to-quantity c-pointer" 
                style={{border:'1px solid black',padding:'0.2em 0.1em'}} 
                data-modifiQuantity = {'+'}
                onClick={(event:any)=>{modify_quantity(event)}}>
                    +
                </button>

                <button className="remove-from-quantity c-pointer" 
                style={{border:'1px solid black',padding:'0.2em 0.1em'}}
                data-modifiQuantity = {'-'} 
                onClick={(event:any)=>{modify_quantity(event)}}>
                    -
                </button>
            </div>
        </div>

  );
}
 
export default QuantityItemsSelector;
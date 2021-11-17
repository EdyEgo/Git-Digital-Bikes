import React,{useState,useRef} from 'react';
interface SizesCompProps {
    setMemorizeSizes:(sizes_writen:any)=>void
}
 
const SizesComp: React.FC<SizesCompProps> = ({setMemorizeSizes}) => {
  
   
    

    const add_sizes_filed = (index_field:string | number,size_details?:{size_name:string,size_number:number,size_price:string})=>{
     
        if(typeof size_details !== 'object'){
   
       return (
           <div className="single-sizes-quipment-input-filed">

               <div className="size-name-creation-container">
                   <label className='size-name-lable'>Size name: </label>
                   
                   <input type="text" name={`size_name_${index_field}`} className="size-name-input" />
               </div>
   
               <div className="size-available-number-creation-container">
                   <label className='size-available-number-lable'>Size available number: </label>
                   
                   <input type="text" name={`size_available_number_${index_field}`} className="size-available-number-input" />

               </div>
   
               <div className="size-price-creation-container">
                   <label className='size-price-lable'>Size price: </label>
                   
                   <input type="text" name={`size_price_${index_field}`} className="size-price-input" />
               </div>
               
   
   
               {/* <div className="delete-sizes-field-button-container">
                   <div className="deleted-field-sizes-button" data-sizes_field_number={index_field} onClick={()=>{}}>x</div>
               </div> */}
   
           </div>
       )
        }
   
      const {size_name,size_number,size_price} = size_details;
   
   
           return (
               <div className="single-sizes-quipment-input-filed">
                   <div className="size-name-creation-container">
                       <label className='size-name-lable'>Size name: </label>
                       
                       <input type="text" name={`size_name_${index_field}`} className="size-name-input" defaultValue={size_name}/>
                   </div>
   
                   <div className="size-available-number-creation-container">
                       <label className='size-available-number-lable'>Size available number: </label>
                       
                       <input type="text" name={`size_available_number_${index_field}`} className="size-available-number-input" defaultValue={size_number}/>
                   </div>
   
                   <div className="size-price-creation-container">
                       <label className='size-price-lable'>Size price: </label>
                      
                       <input type="text" name={`size_price_${index_field}`} className="size-price-input" defaultValue={size_price}/>
                      
                   </div>
                   
   
               </div>
           )
   
   }
   
   const [equipment_options_memorized , setEquipment_options_memorized] = useState<any | null>(null);
   const [empty_sizes_fields_elements_number,setEmpty_sizes_fields_elements_number] = useState(1);
   //const [equipment_sizes_elements_options_memorized , setEquipment_sizes_elements_options_memorized] = useState<null | any>();

    const existing_sizes_elements_create = ()=>{
 


        if(equipment_options_memorized !== null && Array.isArray(equipment_options_memorized) && equipment_options_memorized.length > 0){
            const existing_size_elements =  equipment_options_memorized
             .map((size_field:{size_name:string,size_number:number,size_price:string},index_field:number)=> add_sizes_filed(index_field,size_field))
            const length_size_elements = existing_size_elements.length;
    
          return {existing_size_elements,length_size_elements}
    
        }
    
        return {existing_size_elements:<></>,length_size_elements:0};
      
    }// you don t need this one ,because you send with add_another_sizes_inputs to a use ref in the formoutside this one

    
 
    const submit_form_pressed = useRef('none');
    const add_another_sizes_inputs = (event:any)=>{
        
        
        event.preventDefault();

        
        const {target} = event;
        const only_update_admin_form = submit_form_pressed.current === 'only-memo';
        const extract_sizes = ()=>{
            const sizes = [];// [{size_num ..etc}]
      
            // while is defined then extract sizes 
            let size_filed_number = 0;
            
            
            
            while(target[`size_name_${size_filed_number}`] !== undefined &&
                  target[`size_name_${size_filed_number}`].value != undefined && target[`size_name_${size_filed_number}`].value !== ''){
    
                const size_name = target[`size_name_${size_filed_number}`].value;
                const size_number = target[`size_available_number_${size_filed_number}`].value;
                const size_price = target[`size_price_${size_filed_number}`].value;
               
      
              sizes.push({size_name,size_number,size_price});
      
              size_filed_number++;   
               
            }
          
      
      
          return sizes;
      
           }
       const sizes = extract_sizes();
         
         if(only_update_admin_form){
            setEquipment_options_memorized(sizes);
            setMemorizeSizes(sizes);
            return;
         }
           setEquipment_options_memorized(sizes);
           setMemorizeSizes(sizes);// wrong you need more , or wait you have all here? , oh yea
           setEmpty_sizes_fields_elements_number(empty_sizes_fields_elements_number + 1);

 
    
    }
  


   const {existing_size_elements,length_size_elements} =existing_sizes_elements_create();    
   

    const empty_sizes_elements_create = ()=>{ // carefull here you need to make the right number 
      let number_to_continue_from_if_fields_are_before = length_size_elements;
      const empty_sizes_fields_elements = []
        for(let i = 0;i < empty_sizes_fields_elements_number;i++){
           
            empty_sizes_fields_elements.push(
                add_sizes_filed(number_to_continue_from_if_fields_are_before)
            );
          number_to_continue_from_if_fields_are_before+= 1;

        }

        return empty_sizes_fields_elements;
  }




    return (  
        <form name='size_sub_form' className="create-sizes-available-with-prices-equipment" onSubmit={(event)=>{add_another_sizes_inputs(event)}}>
            {/* ex: 2xl can be available with 3 products in store at 200 euros price each */}
             <div className="sizes-title-form-container">
                 <div className="sizes-form-title">Add sizes: </div>
             </div>
                
            
                    
                    {/* {existing_size_elements} */}

              <div className="sizes-inputs-container">
                  {empty_sizes_elements_create()}
              </div>
               

            {/* <button className="add-sizes-input-element" data-field_type='size'
                onClick={(event)=>{}}>Add sizes field</button> */}
            
            <button type="submit" className="add-sizes-input-element" name='submit' onClick={()=>{submit_form_pressed.current='submit'}} 
             value='Only Store My Values'>Add sizes field</button>

            <button type="submit" name='only_memo' onClick={()=>{submit_form_pressed.current='only-memo'}} 
            className="only-store-my-values" value='Only Store My Values'>Only Store My Values</button>

        </form>
    );
}
 
export default SizesComp;
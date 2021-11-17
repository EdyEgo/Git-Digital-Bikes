import React,{useState,useRef} from 'react';
interface PropertiesCompProps {
    setMemorizeProperties:(sizes_writen:any)=>void
}
 
const PropertiesComp: React.FC<PropertiesCompProps> = ({setMemorizeProperties}) => {


    const [equipment_options_memorized , setEquipment_options_memorized] = useState<any | null>(null);
    const [empty_properties_fields_elements_number,setEmpty_properties_fields_elements_number] = useState(1);

    const add_property_field = (index_field:string | number,property_details?:{property:string})=>{ 
        {/* you will just have a text input */}
        if(typeof property_details !== 'object'){
      
          return(
              <div className="single-property-field">
                      <div className="single-property-inputs-field">
                          <label className="single-property-label">Property name</label>
                          <input type="text" name={`property_field_${index_field}`} className="single-property-input" />
                      </div>
              </div>
          )
        }
         const {property} = property_details;
      
      
         return(
          <div className="single-property-field">
                  <div className="single-property-inputs-field">
                      <label className="single-property-label">Property name</label>
                      
                      <input type="text" name={`property_field_${index_field}`} className="single-property-input" defaultValue={property}/>
                  </div>
          </div>
      )
      
      }
   
      const existing_propertys_elements_create = ()=>{
 
        if(equipment_options_memorized !== null && Array.isArray(equipment_options_memorized) && equipment_options_memorized.length > 0){

        // if(equipment_options_memorized !== null &&typeof equipment_options_memorized ==='object' && equipment_options_memorized.hasOwnProperty('propertys')){
            const existing_propertys_elements =  equipment_options_memorized
             .map((propertys_field:{property:string},index_field:number)=> add_property_field(index_field,propertys_field))
            const length_propertys_elements = existing_propertys_elements.length;
    
          return { existing_propertys_elements,length_propertys_elements}
    
        }
    
        return {existing_propertys_elements:<></>,length_propertys_elements:0};
      
    }
   
    const submit_form_pressed = useRef('none');
    const add_another_sizes_inputs = (event:any)=>{
        
        event.preventDefault();
        const {target} = event;
        const only_update_admin_form = submit_form_pressed.current === 'only-memo';
        const extract_properties = ()=>{
            // property_field_
     
            const propertys = [];
     
            let propertys_field_number = 0;
     
            while(target[`property_field_${propertys_field_number}`] != undefined && 
            target[`property_field_${propertys_field_number}`].value != undefined && target[`property_field_${propertys_field_number}`].value !== ''){
                const property = target[`property_field_${propertys_field_number}`].value;
     
                propertys.push({property});
                propertys_field_number += 1;
     
            }
            return propertys;
     
          };
       const properties = extract_properties();
           
       if(only_update_admin_form){
          setEquipment_options_memorized(properties);
          setMemorizeProperties(properties);
          return;
       }
      
           setEquipment_options_memorized(properties);
           setMemorizeProperties(properties);// wrong you need more , or wait you have all here? , oh yea
           setEmpty_properties_fields_elements_number(empty_properties_fields_elements_number + 1);
 

    
    }


      const {existing_propertys_elements,length_propertys_elements} = existing_propertys_elements_create();


      const empty_properties_elements_create = ()=>{ // carefull here you need to make the right number 
        let number_to_continue_from_if_fields_are_before = length_propertys_elements;
        const empty_properties_fields_elements = []
          for(let i = 0;i < empty_properties_fields_elements_number;i++){
             
            empty_properties_fields_elements.push(
                add_property_field(number_to_continue_from_if_fields_are_before)
              );
            number_to_continue_from_if_fields_are_before+= 1;
  
          }
  
          return empty_properties_fields_elements;
    }
  

    return (  
        <form className="properties-creator-equipment" onSubmit={(event)=>{add_another_sizes_inputs(event)}}>
            {/* you will just have a text input */}
             
            <div className="properties-title-form-container">
                 <div className="properties-fomr-title">Add properties: </div>
             </div>

            {/* {existing_propertys_elements} */}
            {/* {add_one_more_empty_field.current.propertys && add_property_field(length_propertys_elements)} */}
            <div className="properties-inputs-container">
               {empty_properties_elements_create()}
            </div>
             
            
            <button type="submit" name='' onClick={()=>{submit_form_pressed.current='submit'}} 
            className="add-properti-input-field" value='Only Store My Values'>Add product property</button>

            <button type="submit" name='only_memo' onClick={()=>{submit_form_pressed.current='only-memo'}} 
            className="only-store-my-values" value='Only Store My Values'>Only Store My Values</button>
        </form>
    );
}
 
export default PropertiesComp;
import React,{useState,useRef} from 'react';
import { EventEmitter } from 'stream';
interface SpecsCompProps {
    setMemorizeSpecs:(specs_writen:any)=>void,
    features?:true | undefined
}
 
const SpecsComp: React.FC<SpecsCompProps> = ({setMemorizeSpecs,features}) => {



    const [equipment_options_memorized , setEquipment_options_memorized] = useState<any | null>(null);

  
    const add_specs_field = (index_field:string | number,spec_details?:{spec_title:string,spec_text:string})=>{
        {/* you have a spec title and a spec text on each field */}
        if(typeof spec_details !== 'object'){
      
          return(
              <div className="single-specs-field">
                  <div className="spects-single-field-inputs">
                      <div className="title-single-field-spec-container-inputs">
                        {features === undefined &&<label className={`title-label-spec`}>Title spec: </label>}
                        {features &&<label className={`title-label-feature`}>Title feature: </label>}
                        <input type="text" data-spec_title={index_field} name={`spec_title_${index_field}`} className="input-single-field-spec-title" />
                      </div>
                      <div className="text-single-field-spec-container-inputs">
                      {features === undefined &&<label className={`text-label-spec`}>Text spec: </label>}
                      {features &&<label className={`text-label-feature`}>Text feature: </label>}
                        <input type="text" data-spec_text={index_field} name={`spec_text_${index_field}`} className="input-single-field-spec-text" />
                      </div>
                        
                  </div>
      
                  {/* <div className="spec-delete-container">
                      <div className="spec-delete-btn" onClick={()=>{}}>x</div>
                  </div> */}
      
              </div>
          )
        }
         const {spec_title,spec_text} =  spec_details; 
      
         return(
          <div className="single-specs-field">
              <div className="spects-single-field-inputs">
                  <div className="title-single-field-spec-container-inputs">
                  {features === undefined &&<label className={`title-label-spec`}>Title spec: </label>}
                  {features &&<label className={`title-label-feature`}>Title feature: </label>}
                    <input type="text" data-spec_title={index_field} name={`spec_title_${index_field}`} className="input-single-field-spec-title" defaultValue={spec_title}/>
                  </div>
                  <div className="text-single-field-spec-container-inputs">
                  {features === undefined && <label className={`text-label-spec`}>Title spec: </label>}
                  {features &&<label className={`text-label-feature`}>Text feature: </label>}

                   
                    <input type="text" data-spec_text={index_field} name={`spec_text_${index_field}`} className="input-single-field-spec-text" defaultValue={spec_text}/>
                  </div>
                    
              </div>
      
              {/* <div className="spec-delete-container">
                  <div className="spec-delete-btn" onClick={()=>{}}>x</div>
              </div> */}
      
          </div>
      )
      
      
      }
   
      
   const [empty_specs_fields_elements_number,setEmpty_specs_fields_elements_number] = useState(1);


    const existing_specs_elements_create = ()=>{
 
        if(equipment_options_memorized !== null && Array.isArray(equipment_options_memorized) && equipment_options_memorized.length > 0){

        
            const existing_specs_elements =  equipment_options_memorized
             .map((specs_field:{spec_title:string,spec_text:string},index_field:number)=> add_specs_field(index_field,specs_field))
            const length_specs_elements = existing_specs_elements.length;
    
          return {existing_specs_elements,length_specs_elements}
    
        }
    
        return {existing_specs_elements:<></>,length_specs_elements:0};
      
    }

 
 const submit_form_pressed = useRef('none');

    const add_another_specs_inputs = (event:any)=>{
        event.preventDefault();
        const {target} = event;
        const only_update_admin_form = submit_form_pressed.current === 'only-memo';
        const extract_specs =()=>{
            // spec_title_
            // spec_text_
            const specs = [];
            let specs_field_number = 0;
      
            while(target[`spec_title_${specs_field_number}`] != undefined && 
             target[`spec_title_${specs_field_number}`].value != undefined && target[`spec_title_${specs_field_number}`].value !== ''){
                 const spec_title = target[`spec_title_${specs_field_number}`].value;
                 const spec_text = target[`spec_text_${specs_field_number}`].value;
      
                 specs.push({spec_title,spec_text})
                 specs_field_number+= 1;
               
            }
      
            return specs;
      
      
           };
           const specs = extract_specs();
           
           
           if(only_update_admin_form){
             
               // on change can't find by the name it needs data-sets to work is not like submit
               //target.getAttribute("data-remove");
               
           
                setEquipment_options_memorized(specs);
                setMemorizeSpecs(specs);
                return;

           }
          
           setEquipment_options_memorized(specs);
           setMemorizeSpecs(specs);// wrong you need more , or wait you have all here? , oh yea
           setEmpty_specs_fields_elements_number(empty_specs_fields_elements_number + 1);

    }


    const {existing_specs_elements,length_specs_elements} = existing_specs_elements_create();


    const empty_specs_elements_create = ()=>{ // carefull here you need to make the right number 
        let number_to_continue_from_if_fields_are_before = length_specs_elements;
        const empty_specs_fields_elements = []
          for(let i = 0;i < empty_specs_fields_elements_number;i++){
             
            empty_specs_fields_elements.push(
                add_specs_field(number_to_continue_from_if_fields_are_before)
              );
            number_to_continue_from_if_fields_are_before+= 1;
  
          }
  
          return empty_specs_fields_elements;
    }

    return (  
        <form className="specs-equipment-creator"   onSubmit={(event)=>{add_another_specs_inputs(event)}}>
                                                      
            {/* you have a spec title and a spec text on each field */}
  
            <div className="specs-title-form-container">
                 <div className="specs-fomr-title">
                   {features == undefined && <span>Add specs: </span>}
                   {features  && <span>Add features: </span>} 
                 </div>
             </div>

            {/* {existing_specs_elements} */}
             <div className="specs-inputs-container">

             {empty_specs_elements_create()}
             </div>


            
            <button type="submit" name='submit' 
             onClick={()=>{submit_form_pressed.current='submit'}} className="add-spec-field-equipment" 
                 value='Add a field on specs'>Add a field on {features && <span style={{pointerEvents:'none'}}> features</span>} {features === undefined && <span style={{pointerEvents:'none'}}> specs</span>}
            </button>
            <button type="submit" name='only_memo_specs' onClick={()=>{submit_form_pressed.current='only-memo'}} className="only-store-my-values" value='Only Store My Values'>Only Store My Values</button>
        </form>
    );
}
 
export default SpecsComp;
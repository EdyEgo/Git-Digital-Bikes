import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../../../firebase';

interface CodesDiscountProps {
    pageState:string,
    write_found_discount:(dicount_obj:{dicount:string,code:string})=>void;
}
 
const CodesDiscount: React.FC<CodesDiscountProps> = ({pageState,write_found_discount}) => { // if there is a discout then at ordering that will be specified in an object


const [selectedDiscountForm,setSelectedDiscountForm] = useState(false);
const [submitMessageConfirm,setSubmitMessageConfirm] = useState('');
const [scrollClass,setScrollClass] = useState('overflow-hiden');


const hide_or_show_dicount_form = ()=>{
 // effect-scroll-down-page-form
 // effect-scroll-up-page-form


    if(selectedDiscountForm === true){// if is shoned soon you need to hide
   
        // setTimeout(()=>{
        //   //  setScrollClass('hide')
        // },2000);
        setScrollClass('effect-scroll-up-page-form')
        setSelectedDiscountForm(!selectedDiscountForm);
        return;
    }
    
    if(selectedDiscountForm === false){
        
        // setTimeout(()=>{
        //    // setScrollClass('');
            
        // },2000);  
        setSelectedDiscountForm(!selectedDiscountForm);
        setScrollClass('effect-scroll-down-page-form'); 
        
       
        
    }
    
     
}
     
const check_data_base_for_discount = async(event:any)=>{
    event.preventDefault();
   const {target} = event;
    const input_discount_code = target.discount.value;
    const invalid_input_slice = input_discount_code.length > 20 ? input_discount_code.slice(0,19) + '...' : input_discount_code;
    
  if(input_discount_code === '' || input_discount_code == undefined) return;
   const get_dicount_list_from_Db = await firestore.collection('digital-bikes_store_general_info').doc('discounts').get();
   const discounts_keys_obj = get_dicount_list_from_Db.data();

   if(typeof discounts_keys_obj === 'object' &&discounts_keys_obj.hasOwnProperty(input_discount_code) !== true){// invalid code

    setSubmitMessageConfirm(`Coupon code: ${invalid_input_slice} is not valid`);
    return ;
   }

   if(typeof discounts_keys_obj === 'object' &&discounts_keys_obj.hasOwnProperty(input_discount_code)){
      const discount_code = discounts_keys_obj[input_discount_code];
      if(discount_code.hasOwnProperty(pageState)){
          const discount_number = discount_code[pageState];
          const code_dicount = input_discount_code;
         
          write_found_discount({dicount:discount_code,code:code_dicount});
          
        setSubmitMessageConfirm(`Discount code is valid you have ${discount_number} off`); 
        return;
      }

      
      setSubmitMessageConfirm(`Coupon code: ${invalid_input_slice} is not valid`);
      return
   }



}

    return (  
     <div className="code-discount-container">
         
           <h3 className='dicount-code-cart' style={{cursor:'pointer'}} onClick={()=>{hide_or_show_dicount_form()}}>
             Discount Code {selectedDiscountForm &&<FontAwesomeIcon icon={faAngleUp}/>}
             {selectedDiscountForm === false && <FontAwesomeIcon icon={faAngleDown}/>}
          </h3>
         
           <div className={`dicount-cart-form-container ${scrollClass}`}>
              <div className="invalid-dicount-code-container"> 
               {submitMessageConfirm !== ''  && <span className={`invalid-dicount-code`}>{submitMessageConfirm}</span>}
              </div>
              <form onSubmit={(event)=>{check_data_base_for_discount(event)}}>
                  <h4 className='insert-dicount-form-title'>Insert Discount Code </h4>

                  <div className="discount-section-form-inputs">
                    <input className='discount-input' name='discount' type='text'/>
                    <input type="submit"  className='submit-discount-code' value='Apply Code'/>

                  </div>
                  
              </form>
           </div>
     </div>
 );
}
 
export default CodesDiscount;
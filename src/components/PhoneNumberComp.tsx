import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import React,{useEffect,useState} from 'react';
import { firestore } from "../firebase";

interface PhoneNumberProps {
    
}
 
const PhoneNumber: React.FC<PhoneNumberProps> = () => {
   
    const [extracted_shop_phone,setExtracted_shop_phone] = useState<null | string>(null)

useEffect(()=>{
     
  const extract_phone_number_from_dataBase = async()=>{
    const shop_collection__contact = await firestore.collection('digital-bikes_store_general_info').doc('contact').get();
    const data_extracted = shop_collection__contact.data();
    const phone_number = typeof data_extracted === 'object' && data_extracted.hasOwnProperty('phone_number') ? data_extracted['phone_number'] : ''
   
    setExtracted_shop_phone(phone_number)
    
  }
  
  if(extracted_shop_phone === null){
    extract_phone_number_from_dataBase()
    
  }
  

},[])


    return (  
        <div className="phone-info">
             {extracted_shop_phone === null &&<p className="phone-title-indicator">PHONE</p>}
          {extracted_shop_phone === null &&<p className="phone-number"><FontAwesomeIcon icon={faPhoneAlt} />XXXXXXXXXXXX</p>}
            
            {extracted_shop_phone !== null &&<p className="phone-title-indicator">PHONE</p>}
          {extracted_shop_phone !== null &&<p className="phone-number"><FontAwesomeIcon icon={faPhoneAlt} />{extracted_shop_phone}</p>}
         </div>
    );
}
 
export default PhoneNumber;
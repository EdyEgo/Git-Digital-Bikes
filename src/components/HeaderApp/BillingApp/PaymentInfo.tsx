import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill,faHeading } from '@fortawesome/free-solid-svg-icons';

interface PaymentInfoProps {
    options?:any | undefined,
    payments_selected:string | null,
    setSelectedPaymentMethod:(obtionSelected:string)=>void
}
 
const PaymentInfo: React.FC<PaymentInfoProps> = ({options,setSelectedPaymentMethod,payments_selected}) => {

    // payment on delivery
    const sent_selected_option = ({target}:any)=>{
         const option_selected = target.value;
         setSelectedPaymentMethod(option_selected)
    }
    
    
    return (  
 


    <div className="payment-selection-container">
        <h4 className="payment-selection-title">Info Payment : </h4>

        <div className="selected-payment-container">
                {options === undefined && <p><FontAwesomeIcon style={{color:'green'}}icon={faMoneyBill} /> Payment on delivery</p>}
                {
                Array.isArray(options) &&
                    <select className='payment-available-options' onChange={(event)=>{sent_selected_option(event)}}>

                    {
                        options
                        .map((option:string)=>{
                            return(
                                <option value="option">{option}</option>
                            )
                        })
                    }
                    </select>
                
                
                }
        </div>
        
    </div>
 );
}
 
export default PaymentInfo;
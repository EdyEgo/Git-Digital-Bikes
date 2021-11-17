import React,{useContext,useRef, useState} from 'react'; 
import BillingFinishOrderMethod from '../components/HeaderApp/BillingApp/BillingFinishOrderMethod';
import BillingInfo from '../components/HeaderApp/BillingApp/BillingInfo';
import OrderDeatails from '../components/HeaderApp/BillingApp/OrderDetails';
import PaymentInfo from '../components/HeaderApp/BillingApp/PaymentInfo';
import { LocalMemoryCategoryItemsContext } from "../LocalMemoryCategoryItemsContext";

interface BillingPageProps {
    
}
 
const BillingPage: React.FC<BillingPageProps> = () => {
   
   window.scrollTo(0, 0);

    const storedCartProducts = useContext(LocalMemoryCategoryItemsContext);
    const {billing_page_info,logedInUser,payment_options,pageState,setLocalStoreShop}= storedCartProducts// no options stored for payment
   

   

    const [continue_as_registered_info,setContinue_as_registered_info] = useState<null | any>(null);
    const [builling_info,setBuilling_info] =  useState<null | any>(null);
    const [payments_selected,setPayments_selected] = useState<null | string>(null);

    const write_registered_user_info = (registered_user_obj:any)=>{
        
        setContinue_as_registered_info(registered_user_obj);
    }

    const write_billing_info = (billing_obj:any)=>{
     
      setBuilling_info(billing_obj);
    }
  
    const write_payment_selected = (payment_option_selected:string)=>{
      
      setPayments_selected(payment_option_selected);
    }


    return (  
        
     <div className="billing-container">
       

        <div className="billing-page-content">
              <BillingFinishOrderMethod logedInUser={logedInUser} write_registered_user_info={write_registered_user_info} continue_as_registered_info={continue_as_registered_info}/>
              <BillingInfo sentBillingInfo={write_billing_info} builling_info={builling_info}/>
              <PaymentInfo options={payment_options} setSelectedPaymentMethod={write_payment_selected} payments_selected={payments_selected} />
              <OrderDeatails setLocalStoreShop={setLocalStoreShop} logedInUser={logedInUser} pageState={pageState} storedCartProducts={storedCartProducts} payments_selected={payments_selected} builling_info={builling_info}/>

        </div>

     </div>
 );
}
 
export default BillingPage;
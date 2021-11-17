import React,{useState} from 'react';
interface BillingInfoProps {
    sentBillingInfo:(billingInfoObj:{
        userName:string,
        userCity:string,
        userAddrees:string,
        userEmail:string,
        userPassword:string,
        userPhone:string|number})=>void,
        builling_info:any | null
}
 
const BillingInfo: React.FC<BillingInfoProps> = ({sentBillingInfo,builling_info}) => {

  const [invalidMessage,setInvalidMessage] = useState('');

  const user_allready_write_values = ()=>{

      if(builling_info !== null &&builling_info.hasOwnProperty('userName')){
     
        return builling_info;
        // return {userName,userCity,userAddrees,userEmail,userPassword,userPhone}
      }
  
      return {userName:'',userCity:'',userAddrees:'',userEmail:'',userPassword:'',userPhone:''}
  } 

  const {userName,userCity,userAddrees,userEmail,userPassword,userPhone} = user_allready_write_values()

   const sent_billing_info = (event:any)=>{
     
    event.preventDefault();
    const {target} = event
      const userName = target.fullname.value;
      const userCity = target.city.value;
      const userAddrees = target.address.value;
      const userEmail = target.email.value;
      const userPassword = target.password.value;
      const userPhone = target.phone.value;
   
      if(Number.isNaN(userPhone)){
        setInvalidMessage('Pleaser write us a real phone number ! :)')
        return;
      };
      if(userName === '' || userCity === '' || userAddrees === '' || userEmail === '' || userPassword === ''){
        setInvalidMessage('Please fill in all the required fields.')
        return; 
      }
      

      sentBillingInfo({userName,userCity,userAddrees,userEmail,userPassword,userPhone});

   }

    return (  
    <div className="billing-info-container">
        <h4 className='expedition-info-title'>Expedition Info :</h4>
            <form className="billing-form"  onSubmit={(event)=>{sent_billing_info(event)}} >
                <div className="full-name-billing-form-container" >
                    <label htmlFor=""><span className="mandatory-start " >* </span> Your Full Name</label>
                    <input type="text" className="full-name-billing billing-info-input" 
                    name='fullname'  defaultValue={userName} required/>
                </div>
                <div className="other-info-container" >
                    <label htmlFor="" className="city-billing "><span className="mandatory-start " >* </span> City :</label>
                    <input type="text" className="city-billing billing-info-input" name='city'  required defaultValue={userCity}/>
                    <label htmlFor="" className="address-billing"><span className="mandatory-start ">* </span> Address :</label>
                    <input type="text" className="address-billing billing-info-input" name='address'  defaultValue={userAddrees} required/>
                    <label htmlFor="" className="email-adress"><span className="mandatory-start ">* </span> Email Adress</label>
                    <input type="text" className="email-adress billing-info-input" name='email'  defaultValue={userEmail} required/>
                    <label htmlFor="" className="email-password"><span className="mandatory-start ">* </span> Email Password</label>
                    <input type="password" className="email-password billing-info-input" name='password'defaultValue={userPassword}  required/>
                    <label htmlFor="" className="phone"><span className="mandatory-start ">* </span> Phone :</label>
                    <input type="text" name='phone' className="phone billing-info-input" required defaultValue={userPhone}/>
                </div>
                

             <div className="captcha-validation">

             </div>
    
            <div className="register-billing-info-container-buttons">
                <div className='empty-container'></div>
                <div className="billing-register-info-button">
                    <input type="submit" className='submit-billing-infos' value='Continue'/>
                </div>

            </div>
            </form>

            <div className="invalid-data-container">{invalidMessage}</div>
  



    </div>
 );
}
 
export default BillingInfo;
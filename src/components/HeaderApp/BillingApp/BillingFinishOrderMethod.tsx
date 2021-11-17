interface BillingFinishOrderMethodProps {
    logedInUser:undefined | any,
    continue_as_registered_info:any
    write_registered_user_info:(registered_obj_user:any)=>void
}
 
const BillingFinishOrderMethod: React.FC<BillingFinishOrderMethodProps> = ({logedInUser,write_registered_user_info}) => {
   const USER_LOG_IN_IS_NOT_MISSING = false;

    return (  
        <div className="billing-finish-order-method-container">
            <div className="check-out-finish-order-steps">
                     <div className="finish-order-as-regitered-or-unregistered">
                         <h4 className='finish-title-billing-page'>Finish Your Order As : </h4>
                          <select className="chose-to-register-or-not">
                                 <option value="guest">Finish Order As Guest</option>
                                 {USER_LOG_IN_IS_NOT_MISSING &&   <option value="register">Register</option>}

                          </select>
                     </div>

                     {USER_LOG_IN_IS_NOT_MISSING && <div className="log-in-form-container">
                         <h4 className='billing-page-log-in-title'>Log In </h4>
                         <form  className="log-in-billing-page">
                             <label htmlFor="" className="email-log-in">Your Email Address :</label>
                             <input type="text" className="log-in-email" />
                             <label htmlFor="" className="password-log-in">Password</label>
                             <input type="text" className="log-in-password" />


                         </form>

                     </div>}
            </div>
        </div>
    );
}
 
export default BillingFinishOrderMethod;
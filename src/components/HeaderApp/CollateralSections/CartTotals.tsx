interface CartTotalsProps {
    total_payment:string,
    submit_effect:()=>void
}
 
const CartTotals: React.FC<CartTotalsProps> = ({total_payment,submit_effect}) => {// maybe you want a lot of data here because you will redirect to another page

   const submit_and_prevent_default = (event:any)=>{
      
     event.preventDefault()
    submit_effect()
   }

    return (  
    <div className="cart-totals-container">
        <h3 className='cart-totals-title'>Cart Totals</h3>
        <div className="cart-totals-form-container">

               <h4 className="total-price-to-pay-cart">Total Payment: <span className="cart-final-total-price">{total_payment}</span> </h4>
               <form className="finish-cart-order" onSubmit={(event)=>{submit_and_prevent_default(event)}}>
                   <input type="submit" className="finish-cart-order-btn" value='Continue with your order'/>
               </form>
        </div>

    </div>
 );
}
 
export default CartTotals;
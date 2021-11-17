
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar,faShippingFast,faMoneyBillWave,faDollarSign,faClock,faSmile } from '@fortawesome/free-solid-svg-icons';
export interface BenefitsBarProps {
    
}




const BenefitsBar: React.FC<BenefitsBarProps> = () => { 

    const icons_color = {color:'white'}

    return ( 
      <> 

        <div className="benefits-bar" style={{backgroundColor: '#2f3946',color:'white'}}>

          <div className="benefits-container">
              <div className="benefit-one benefit-option">
                  <div className="benefin-one__icon-container" >
                      <FontAwesomeIcon icon={faShippingFast} style={icons_color}/>
                  </div>
                  <div className="benefit-one__title-container">
                      <h3 className="benefit-one__title">We guarantee a safe delivery</h3>
                    
                  </div>
                  <div className="benefit-one__text-container">
                        <p className="benefit-one__text">
                          We carefully pack and secure items for transport
                        </p>
                  </div>
              </div>
              <div className="benefit-two benefit-option">
              <div className="benefin-two__icon-container">
              <FontAwesomeIcon icon={faDollarSign} style={icons_color}/>
              </div>
                  <div className="benefit-two-container">
                      <h3 className="benefit-two__title">Fast financing</h3>
                    
                  </div>
                  <div className="benefit-two__text-container">
                        <p className="benefit-two__text">
                          Leasing and credit with interest-free
                        </p>
                  </div>
              </div>

              <div className="benefit-three benefit-option">
                <div className="benefin-three__icon-container">
                <FontAwesomeIcon icon={faClock} style={icons_color}/>
                </div>
                  <div className="benefit-three__title-container">
                      <h3 className="benefit-three__title">High Quality Products</h3>
                    
                  </div>
                  <div className="benefit-three__text-container">
                        <p className="benefit-three__text">
                          Choose from a wide range of quality products
                        </p>
                  </div>
              </div>

          </div>
           
        </div>
    </>


 );
}
 
export default BenefitsBar;
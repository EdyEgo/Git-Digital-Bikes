interface VisitUsHereMotoProps {
    
}
 
const VisitUsHereMoto: React.FC<VisitUsHereMotoProps> = () => {
   
    const {innerWidth} = window
      

    const create_general_img_sizes = ()=>{
         

      if(innerWidth <= 259){
        const width_used = '10em';
        const height_used = '12vh';
        return {width_used,height_used }
      }


        if(innerWidth <= 346){
            const width_used = '15em';
            const height_used = '12vh';
            return {width_used,height_used }
        }
        if(innerWidth >= 346) {
            const width_used = '20em';
            const height_used = '27vh';
            return {width_used,height_used }
        }  


            const width_used = '20em';
            const height_used = '27vh';
            return {width_used,height_used }

    }
  
    const {width_used,height_used } = create_general_img_sizes();
     const create_visit_us_pictures_elements = ()=>{
     const images_container = [];
          for(let i=0;i<3;i++){
            images_container.push(
                <img className='visit-us-img' style={{width:width_used,height:height_used,padding:'1em 1em'}} src={`/visitUsHere/Motorcycles/${i}.jpg`}/>
            )
          }

          return images_container;
     }

    return (  
        <div className="visit-us-container">
            <div className="visit-us__title-container">
                  See live your favorite product !
            </div>
            <div className="visit-us__pictures-container">
                {create_visit_us_pictures_elements()}
            </div>
        </div>
    );
}
 
export default VisitUsHereMoto;
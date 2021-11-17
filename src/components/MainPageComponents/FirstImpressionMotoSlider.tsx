import React,{useRef, useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare,faSquare,faArrowUp,faArrowDown,faArrowLeft,faArrowRight,faDotCircle,faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons';


interface FirstImpressionMotoProps {
  use_for_equipment:boolean
}
 


const FirstImpressionMotoSlider: React.FC<FirstImpressionMotoProps> = ({use_for_equipment}) => { // alternative , lest flippin' test
 


 const {innerWidth} = window// change generals

 
 


 const create_general_sizes = ()=>{
 // {position:'absolute',top:'28em',right:'-8.6em',display:'inline-block',width:general_width}

 if(innerWidth > 790){
  const general_width = '38em';//works
  const general_heigth = '20em';//works
  const general_width_num = 38;//works
  const dots_right  ='-3.6em';
  const dots_top = '18em';
  const left_arrow_selector_top = '50%';
  const right_arrow_selector_top = '50%';
  

  const side_img_width = '12em'

   return {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top}

 }



    if(innerWidth > 1290){ // toooo big , huge really ! 
      const general_width = '48em';//works
      const general_heigth = '30em';//works
      const general_width_num = 48;//works
      const dots_right  ='-8.6em';
      const dots_top = '28em';
      const left_arrow_selector_top = '50%';
      const right_arrow_selector_top = '50%';
      
    
      const side_img_width = '15.34em'

       return {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top}
    }
  
    if(innerWidth <= 470){
      const general_width = '18em';//works
      const general_heigth = '18em';//works
      const general_width_num = 18;//works
      const dots_right  ='-0.1em';
      const dots_top = '15em';
      const left_arrow_selector_top = '50%';
      const right_arrow_selector_top = '50%';
     
     
     // const side_img_width = '14.39em';
      const side_img_width = '8.34em'

       return {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top}
    }

    if(innerWidth <= 790 ){
      const general_width = '28em';//works
      const general_heigth = '20em';//works
      const general_width_num = 28;//works
      const dots_right  ='-0.3em';
      const dots_top = '18em';
      const left_arrow_selector_top = '50%';
      const right_arrow_selector_top = '50%';
     
     
     // const side_img_width = '14.39em';
      const side_img_width = '11.34em'

       return {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top}
    }

 

    const general_width = '48em';//works
      const general_heigth = '30em';//works
      const general_width_num = 48;//works
      const dots_right  ='-3.6em';
      const dots_top = '18em';
      const left_arrow_selector_top = '50%';
      const right_arrow_selector_top = '50%';
    
      const side_img_width = '15.34em'

      return {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top}
 }


 
const {general_width,general_heigth,general_width_num,side_img_width,dots_right,dots_top,left_arrow_selector_top,right_arrow_selector_top} = create_general_sizes()  

 const [current_showned_image,setCurrent_showned_image] = useState<any>({display:'flex',position:'relative',width:general_width,heigth:general_heigth,transition:'all 1s ease'});// working one
 const [imageNumber,setImageNumber] = useState(0);
// const [selectedImageClass,setSelectedImageClass] = useState<null | number>();

 const move_to_image_by_dot_click = (event:any)=>{
  const {target } = event;
  


  const dot_number_selected = target.getAttribute("data-dot_number");
    if(dot_number_selected === imageNumber) return;

  //let slider_container_styles:any = {display:'flex',width:'700em',position:'relative',transition:'all 1s ease'}// working one
 
  let slider_container_styles:any = {display:'flex',width:general_width,heigth:general_heigth,position:'relative',transition:'all 1s ease'}// working one 
  
  
    let image_number_set; 

    image_number_set = Number(dot_number_selected);

   




    let next_translate_pixel_number = general_width_num * image_number_set;
   
  //if(next_translate_pixel_number === 0) next_translate_pixel_number = 0;
 

  

  if(next_translate_pixel_number > imageNumber)slider_container_styles['transform'] = `translate3d(-${next_translate_pixel_number}em, 0px, 0px)`
  if(next_translate_pixel_number < imageNumber)slider_container_styles['transform'] = `translate3d(-${next_translate_pixel_number}em, 0px, 0px)`
  

  
   setCurrent_showned_image(slider_container_styles);
   
   setImageNumber(image_number_set)


 }
 const granb_img = (event:any)=>{
  
}

 const add_slide_show_images_elements = ()=>{
  //,pointerEvents:'none'
  // current_showned_image
  const images_list = [];
  const slide_dots_select_img:any = [];

  const image_src =(index:number)=> use_for_equipment ? `/slideshow/equipment/${index}.jpg` : `/slideshow/${index}.jpg` 



  
    for(let i = 0;i<10;i++){
      const image_selected_class_line = imageNumber === i? 'image_line_selected' : 'select-image-line'
      images_list.push(
         
             //`/slideshow/${i}.jpg`
 
                 <div className="image-slider-container" style={{width:general_width,height:general_heigth}}  data-slider_image={i} >
                 <img src={image_src(i)} style={{pointerEvents:'none',width:general_width,height:general_heigth}} /> 
                 </div>
             // maxWidth:'100%'
         
            
        )
        slide_dots_select_img.push(
             <span className={`${image_selected_class_line}`} 
             style={{fontSize:'0.8rem',cursor:'pointer',margin:'0 1rem'}} 
             data-dot_number={i} onClick={(event)=>{move_to_image_by_dot_click(event)}}><FontAwesomeIcon icon={faDotCircle} style={{pointerEvents:'none'}}/></span>
        )
    }
    return {images_list,slide_dots_select_img};

  
   
}
const {images_list,slide_dots_select_img} = add_slide_show_images_elements();

  
 

  const move_to_image = (move_to:string)=>{
      

   let slider_container_styles:any = {display:'flex',width:general_width,left:'0px',position:'relative',transition:'all 1s ease'} // working one




     if(move_to === 'left'){
     
         const image_number_set = imageNumber <= 0 ? images_list.length -1 : imageNumber - 1;
         let next_translate_pixel_number = general_width_num * image_number_set;
        
       
     
     
     
      slider_container_styles['transform'] = `translate3d(-${next_translate_pixel_number}em, 0px, 0px)`;
        setCurrent_showned_image(slider_container_styles);
        
        setImageNumber(image_number_set)
     }
     if(move_to === 'right'){
        
        const image_number_set = imageNumber >= images_list.length - 1 ? 0 : imageNumber + 1;
        let next_translate_pixel_number = general_width_num * image_number_set;
      
       
        
        slider_container_styles['transform'] = `translate3d(-${next_translate_pixel_number}em, 0px, 0px)`;
        setCurrent_showned_image(slider_container_styles);

       
        setImageNumber(image_number_set)

     }
      
  }

 
 const lastTimeOut = useRef<any>(null);


 const clearTimeOut = ()=>{

   if(lastTimeOut.current){
     clearTimeout(lastTimeOut.current)
   }
 }

useEffect(()=>{
  
  lastTimeOut.current = setTimeout(()=>{
    move_to_image('right');
  },4500)

return ()=>{
  clearTimeOut();
};

},[imageNumber])




  


const side_img_creator = ()=>{
     
   const side_images:any = [];

  for(let i = 0;i< 3; i++){
    side_images.push(
      <img src={`/sidewayPictures/Motorcycles/${i}.jpg`} style={{width:side_img_width,padding:'0.4em 0.5em',height:'100%'}}/>
    )
  }
  return side_images;

}

  
    return (  
        <div className="first-impression-moto" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',marginTop:'1em',marginBottom:'1em'}}>
                          
            <div className="carousel-images-list-slider owl-wrraper-outer "  style={{width:general_width,overflow:'hidden',position:'relative'}} onDragStart={(event)=>{granb_img(event)}} >
              
              <div className="left-arrow-img-container-slider carousel-arrow" style={{position:'absolute',left:'0',top:left_arrow_selector_top}}  onClick={(event)=>{move_to_image('left')}}> 
                <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleLeft} />
              </div>
              <div className="images-container-slider owl-wrraper" style={current_showned_image}>{images_list}</div>
              


                <div className="right-arrow-img-container-slider carousel-arrow" style={{position:'absolute',right:'0',top:right_arrow_selector_top}}  onClick={(event)=>{move_to_image('right')}} >
                    <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleRight} />
                </div> 
    
                <div className="select_image_by_dot_click-container" style={{position:'absolute',top:dots_top,right:dots_right,display:'inline-block',width:general_width}}>
                
                  {slide_dots_select_img}
                </div>
            </div>
            

           
            
            <div className="side-row-image-container-slider">
          
             
                {side_img_creator()}

            </div>

        </div>
  

         




    );
}
 
export default FirstImpressionMotoSlider;
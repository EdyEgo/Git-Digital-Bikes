import {useContext} from 'react'; 
import {UserContext} from '../UserContext'



export interface AboutPageProps {
    userMail:string,
    userName:string
}
 
const AboutPage: React.FC<AboutPageProps> = () => { 
    const obj = useContext<AboutPageProps>(UserContext);
    const {userMail,userName} =  obj;

    return ( 
         <div className="about-you">
            <h2 className="loged-in__user-name">{`This page is about you ${userName} `}</h2>
            <h2 className="loged-in__user-email">{`And you personal info like your ${userMail} email,muhahahahaha`}</h2>
         </div> 
  
  );
}
 
export default AboutPage;
import React  from 'react'
import { Profilelang } from './Profile.lang';
import './Profile.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import TestImg from '../../assets/images/profile/fakeimage.jpg'
import Spotify from '../../assets/images/profile/spotify.png'
import Imdb from '../../assets/images/profile/imdb.png'
import Message from '../../assets/images/profile/message.svg'
import { Dropdown, Button } from 'react-bootstrap';
class Profiles extends React.Component<any, any>{
    
    constructor(props:any){
        super(props);
        this.state = {
           
        }
   
}
render(){
    return(
        <div className='row main-div-profile'>
           <div className='col'>
               <div className='row description-row'>
                   <div className='col-md-1 '></div>
                   <div className='col-md-6 col-xs-12 div-item-description'>
                       <img src={TestImg} alt=''></img>
                       <div className='text-description'>
<h1>Afrojack</h1>
<h6>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
</h6>
                       </div>
                   </div>
                   <div className='col-md-5 col-xs-12 div-item-description'>
                       <div className='followdiv'>
                         <Button className='followbtn'>{Profilelang.body.follow}</Button>  
                         <Button className='sharebtn'>
                          
                                 <h1>
                                             {Profilelang.body.share}
                                 </h1>
                         
                           
                             <div className='shareicondiv'> 
                           <i className="material-icons ">
share
</i>
                           </div>
                         
                         </Button>
                       </div>
                       <div className='socialmediadiv'>
                           <div className='spotifydiv'> 
                                <img src={Spotify} className='spotifybtn'>

                       </img>
                           </div>
                      
                          <img src={Imdb} className='imdbbtn'></img> 
                       </div>
                       <div className='messagediv'>
                       <img src={Message} alt='' className='messagebtn'></img>
                       </div>

                   </div>
               </div>
       
         <div className='row line'></div>

         <div className='row group-row'>
                   <div className='col-md-1 '></div>
                   <div className='col-md-11 col-xs-12 div-item-group-title'>
                       <h1>
                       {Profilelang.body.publicGroup}
                       </h1>
                   </div>
                   <div className='col-md-1 '></div>
                   <div className='col-md-10 col-xs-12 div-item-group'>
      <div className='row '>
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
        
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
        
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
        
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
        
          <div className='col-md-6 col-xs-12'>
              <div className='row'>
                  <div className='col-6 div-item-group-detail'>
<img src={TestImg} alt=''></img>
<h1>Jordan Lopez</h1>
                  </div>
                  <div className='col-6 div-item-group-detail'>

<h5>129</h5>
<h6>members</h6>
                  </div>
              </div>
          </div>
        
      </div>
                   </div>
                   <div className='col-md-1 '></div>
             
               </div>
       
               <div className='row mayknow-row'>
                   <div className='col-md-1 '></div>
                   <div className='col-md-11 col-xs-12 div-item-mayknow-title'>
                       <h1>
                       {Profilelang.body.mayknow}
                       </h1>
                   </div>
                   <div className='col-md-1 '></div>
                   <div className='col-md-10 col-xs-12 div-item-mayknow'>
      <div className='row div-item-mayknow-detail'>
<div className='col-md-2 col-xs-4 div-item-mayknow-detail-col'>
    <img src={TestImg} alt=''></img>
    <h1>Alan Ryan</h1>
</div>
<div className='col-md-2 col-xs-4 div-item-mayknow-detail-col'>
    <img src={TestImg} alt=''></img>
    <h1>Alan Ryan</h1>
</div>
<div className='col-md-2 col-xs-4 div-item-mayknow-detail-col'>
    <img src={TestImg} alt=''></img>
    <h1>Alan Ryan</h1>
</div>
<div className='col-md-2 col-xs-4 div-item-mayknow-detail-col'>
    <img src={TestImg} alt=''></img>
    <h1>Alan Ryan</h1>
</div>
<div className='col-md-2 col-xs-4 div-item-mayknow-detail-col'>
    <img src={TestImg} alt=''></img>
    <h1>Alan Ryan</h1>
</div>


      </div>
                   </div>
                   <div className='col-md-1 '></div>
             
               </div>
       

           </div>
        </div>
    )
}
        
}
export default Profiles
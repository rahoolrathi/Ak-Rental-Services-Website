// App.js 

import './Aboutus.css'; 
import Icons from './Icons'; 
import Card from './Card'; 

import Feedback from './Feedback'; 
import Welcome from './Welcome';
function Aboutus() { 
return ( 
	<div className='about'> 
	<Welcome/> 
	<Icons/> 
	<Card/> 
	<Feedback/> 
	{/* <img src= 
'https://media.geeksforgeeks.org/wp-content/uploads/20230821104522/gfg-(5).jpg'
		style={{marginTop:"14%", marginLeft:"44%"}}/>  */}
	</div> 
); 
} 

export default Aboutus;

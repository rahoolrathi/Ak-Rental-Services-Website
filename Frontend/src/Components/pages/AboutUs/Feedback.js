// Feedback.js 
import Modal from "../../UI/Model"
import { useState } from "react"

export default function Feedback() { 
	let [show,setshow]=useState(false)

	const handleSubmit= (e) => {
		
		setshow(true)
			
		}

		const handleclose=()=>
			{
			  setshow(false);
			}
			


	return( 
		<>
		{ show && <Modal Title="Confirmation" message="Thanks for your Feedback" handleclose={handleclose} />}
		<div style={{
     position: 'absolute',
	 top: '80%',

	 left: '51%',
	 transform: 'translate(-50%, -50%)',
	 width: '370px',
	 border: '2px solid',
	 padding: '2px',
	 borderRadius: '1rem',
	 boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
	 fontSize: '1.25rem',
	 display: 'flex',
	 justifyContent: 'center'
}}>
			<form> 
				<p  style={{ fontSize: '2rem', color: 'black' }}>Feedback & Queries</p> 
				<div> 
					<label className="text-sm">Select Issue*</label> 
					<br></br> 
					<select className="bg-white-50 border border-black-300 
										text-black-600 text-sm rounded-lg 
										focus:border-blue-500 w-full p-2.5"> 
						<option value="Feedback" > 
							-- Select Your Query -- 
						</option> 
						<option value="Feedback" > 
							Feedback 
						</option> 
						<option value="Feedback"> 
							Course Related Queries 
						</option> 
						<option value="Feedback"> 
							Payment Related Issue 
						</option> 
						<option value="Feedback"> 
							Hiring Related Queries 
						</option> 
						<option value="Feedback"> 
							Advertise With Us 
						</option> 
					</select> 
					<br></br> 
					<label className="text-sm">Email Address*</label> 
					<br></br> 
					<input className="bg-white-50 border border-gray-300 
										text-sm rounded-lg focus:border-blue-500 
										w-full p-2.5"
							type="email"
							placeholder="abc@Ak_Rental.org"/> 
					<br></br> 
					<label className="text-sm">Contact No.</label> 
					<br></br> 
					<input className="bg-gray-50 border border-gray-300 
										text-sm rounded-lg focus:border-blue-500 
										w-full p-2.5"
							type="text"
							placeholder="1324567890"/> 
					<br></br> 
					<label className="text-sm"> 
						Drop Your Query 
					</label> 
					<br></br> 
					<textarea className="bg-gray-50 border border-gray-300 
											text-sm rounded-lg 
											focus:border-blue-500 
											w-full p-2.5"
								rows="4"
								cols="25"
								maxlength="300"
								placeholder="Max Allowed Characters: 300"> 
					</textarea> 
					<br></br> 
					<button style={{ 
        backgroundColor: '#4299e1',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
		marginLeft:"33%",
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }}
							type="button" onClick={handleSubmit}> 
						Submit 
					</button> 
				</div> 
			</form> 
		</div> 
		</>
	) 
}

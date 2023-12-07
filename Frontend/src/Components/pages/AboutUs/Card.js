export default function Card() {
	return (
	  <div>
		
		<div className="h-53 ml-48 float-left -mt-10 w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
		  <div className="p-6">
			<h5 className="text-center mr-4 mb-2 block font-sans text-xl font-semibold text-blue-gray-900 antialiased">
			  Reach Us At
			</h5>
			<ul>
			  <li className="mt-2">
				<span>
				  <i className="fa fa-phone mr-2"></i>{" "}
				</span>
				+92-3480338325
			  </li>
			  <li className="mt-2">
				<span>
				  <i className="fa fa-envelope mr-2"></i>{" "}
				</span>
				<span className="text-black">feedback@AK_rental.org</span>
			  </li>
			  <li className="mt-2">
				<span>
				  <i className="fa-solid fa-map-pin mr-2"></i>{" "}
				</span>
				Gulshan-e-hadeed 
				<span className="pl-4">
				 Phase 1 karachi, pakistan
				</span>
			  </li>
			</ul>
		  </div>
		</div>
		<div className="mr-36 w-96 text-center float-right -mt-11 w-1/3 flex-col rounded-xl bg-white text-gray-700 shadow-2xl">
		  <div className="p-6 ">
			<h5 className="mb-2 block font-sans text-xl font-semibold text-blue-gray-900 antialiased">
			  Branding & Collaboration
			</h5>
			<i className="fa fa-handshake fa-2xl"></i>
			<div className="text-left mt-4">
			  <span>
				<i className="fa fa-envelope mr-2"></i>{" "}
			  </span>
			  <span className="text-black">kanteshkumar813@gmail.com</span>
			</div>
			<div className="mt-2 text-left">
			  <span>
				<i className="fa-solid fa-map-pin mr-2"></i>{" "}
			  </span>
	Gulshan-e-Hadeed Phase one karachi
			  <span className="pl-5">
			  </span>
			</div>
		  </div>
		</div>
	  </div>
	);
  }
  
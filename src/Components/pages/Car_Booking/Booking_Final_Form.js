import Civic from '../../Assets/Civic.png'
const Booking_Car_info=()=>
{
    return(
        <>
            <div className="Car_info">
            <div className="name_of_Car">
            Civic
            </div>
            <div>
                RS:10000/DAY
            </div>
            <div className="date_of_booking"></div>
            October 11, 2023 — October 12, 2023
            </div>

            <div className="img">
                <img src={Civic}></img>
                {/* Size 500*500 */}
            </div>

            <div className='Extra info'>

            </div>
        </>
    );
}
export default Booking_Car_info;
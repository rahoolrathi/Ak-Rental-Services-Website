import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import img from '../../Assets/1701298663258_Civic.png'
import axios from 'axios';


function AdminCar(props) {

  const handleDelete = async (regId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/deleteCar/${regId}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={require(`../../Assets/${props.img}`)}/> 
      <Card.Body>
      <Card.Title style={{ 
  fontWeight: 'bold',
  fontSize: '1.8rem',
  color: 'black',
  textTransform: 'uppercase',
  fontFamily: 'Montserrat, sans-serif',
  borderBottom: '2px solid #007BFF',
}}>
  {props.Regno} - {props.name}
</Card.Title>

      </Card.Body>
      <Button onClick={()=>
      {handleDelete(props.Regno)}}  style={{ height: "47px", margin: "5px", width: "275px"}} variant="contained">
  UnRegister
</Button>


    </Card>
    </>
  );
}

export default AdminCar;
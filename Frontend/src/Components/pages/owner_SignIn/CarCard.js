import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../../Assets/1701298663258_Civic.png'

function AdminCar(props) {
  return (
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
    </Card>
  );
}

export default AdminCar;


import './Model.css';
const Modal = (props) => {
    return (
      <section>
        <div className="modal-container">
          <header>
            <div className='title'>
            <h2 >{props.Title}</h2>
            </div>
          </header>
          <div className="error-msg">
            <p>{props.message}</p>
          </div>
          <footer className="modal-close">
            <button type="button" onClick={()=>{props.handleclose()}}>close</button>
          </footer>
        </div>
      </section>
    )
   }
   export default Modal;
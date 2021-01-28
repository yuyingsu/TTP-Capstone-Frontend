import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditProductForm from './AddEditProductForm';
import { useState } from 'react';
function ModalForm(props) {

  const [modal,setModal]=useState(false);

  const toggle = () =>{
    setModal(!modal);
  }

  let button = null;
  if(props.buttonLabel === 'Edit'){
    button = <Button
              color="warning"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{"Edit"}
            </Button>
  } else {
    button = <Button
              color="success"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{"Add Item"}
            </Button>
  }
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  return(
        <div>
            {button}
            <Modal isOpen={modal} toggle={toggle} className={props.className}>
            <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
            <ModalBody>
            <AddEditProductForm
              toggle={toggle}
              product={props.product} />
            </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalForm;

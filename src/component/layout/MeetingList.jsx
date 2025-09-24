import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Meeting from "./Meeting";


export default function MeetingList({show, onClose, meetings = []}) {
  const [filter, setFiltered] = useState(meetings);
  const [query, setQuery] = useState("");

  useEffect(() =>{
    setFiltered(meetings.filter(p => p.roomId.toLowerCase().includes(query.toLowerCase())));
  },[meetings, query]);

    return(
        <div className="container">
            <Modal show={show} onHide={onClose} fullscreen>
          <Modal.Title className="text-center text-success">Tìm kiếm phòng</Modal.Title>
            <Modal.Body className="">
               <form className="">
                  <input type="text"
                          className="d-flex form-control"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          autoFocus/>
               </form>
               {/* hiển thị màn hình với sản phẩm */}
               <Meeting meetings={filter}></Meeting>
            </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
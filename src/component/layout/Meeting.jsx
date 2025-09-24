import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Meeting() {
    const [meeting, setMeeting] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/meeting').then((res) => {
            setMeeting(res.data);
        });
    },[]);

    return(
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ padding: "20px" }}>
         {meeting.map((item, index) => (
            <div className="col" key={index}>
      <Card style={{ borderRadius: "12px", height: "100%" }} className="shadow-sm">
        <Card.Img
          variant="top"
          src={item.image}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{item.roomId}</Card.Title>
          <Card.Text>
            {item.note}
          </Card.Text>
          <Button variant="primary">Chi tiết</Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>
)
}
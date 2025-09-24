import React, { useEffect, useState } from "react";
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../../styles/Content.css';

export default function Notification({show, onClose}){
   const [notifications, setNotifications] = useState([]);

   useEffect(() =>{
        axios.get("http://localhost:3001/meeting").then((res) => {
            setNotifications(res.data)
        }).catch(()=>{
            setNotifications([]);
        }
        )},[]);

        if (!show) return null;

   return(
    <div className="absolute right-5 top-16 w-96 bg-white shadow-lg rounded-xl border p-3">
        <div className="flex items-center justify-content-end border-b pb-2 mt-5 mb-2">
        {notifications && notifications.length > 0 ?( notifications.map((item, index)=>(
            <Toast className="space-y-3 max-h-96 overflow-y-auto" show={show} onClose={onClose}>
            <Toast.Header className="col justify-content-end">
                    <strong className="me-auto text-success">Thông báo</strong>
             </Toast.Header>
           <Toast.Body className="text-dark">
                Mã phòng:{item.roomId}<br /><hr />
                Trạng thái:{item.status || "Không có thông báo"}
            </Toast.Body>
        </Toast>
        ))
    ):(
         <Toast show={show} onClose={onClose}>
            <Toast.Header>
                    <h4 className="text-center text-dark">Không có thông báo</h4>
            </Toast.Header>
        </Toast>

    )}
    </div>
    </div>

   );
}
import React, { useEffect, useState } from "react";
import Header from './Header.jsx';
import Meeting from "./Meeting.jsx";
import Notification from "./Notification.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/Content.css'
import Search from "./Search.jsx";

export default function Home() {
    const [showNotifications, setShowNotifications] = useState(false);

    return(
        <>
            <Header handleNotification={() => setShowNotifications(prev => !prev)}
                ></Header>
            <Notification show={showNotifications}
                        onClose={() => setShowNotifications(false)}></Notification>
            <div className="home-content">
                <div className="content">
                    <img src="https://noithatantin.com/wp-content/uploads/2023/03/Phong-hop-hien-dai-1.png"
                style={{width:"100%", height:"auto", display:'block'}}/>
                </div>
            </div>
            <br />
            <div className="search-content justify-content-center">
                <Search></Search>
            </div>
            <br />
            <Meeting></Meeting>
        </>
    )
}
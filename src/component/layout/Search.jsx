import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/Content.css'
import "bootstrap/dist/css/bootstrap.min.css";
import MeetingList from "./MeetingList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassCheers, faSadCry, faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../styles/Content.css';

export default function Search({meeting}) {
    const [showSearch, setShowSearch] = useState(false);
    return(
        <div className="row justify-content-center">
                 <div class="mb-4">
                     <form class="d-flex">
            <input readOnly className="form-control me-2"
                    type="search"
                    placeholder="Tìm kiếm"
                    aria-label="Search"
                    onClick={() => setShowSearch(true)}/>
        </form>

        {/* Popup thanh tìm kiếm */}

        <MeetingList show={showSearch}
                     onClose={(e) => setShowSearch(false)}
                     meetings={meeting}></MeetingList>
    </div>
    </div>
    )
}
import RoomService from '../../service/Room';
import RoomFormAdd from './RoomFormAdd';
import RoomFormUpdate from './RoomFormUpdate';
import { useState, useEffect } from 'react';
import './Room.css';

// quản lý danh sách phòng
const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null); // sửa tên biến
    const [showFormUpdate, setShowFormUpdate] = useState(false);

    // hàm lấy roomId tiếp theo
    const getNextRoomId = () => {
        if (rooms.length === 0) return "p101";
        const maxId = rooms
            .map(room => parseInt(room.roomId.replace('p', '')))
            .reduce((max, id) => Math.max(max, id), 100);
        return `p${maxId + 1}`;
    }

    useEffect(() => {
        getallRooms();
    }, []);

    const getallRooms = () => {
        RoomService.getAllRooms()
            .then((response) => {
                setRooms(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    // sửa lại hàm addRoom
    const addRoom = (roomData) => {
        // roomId đã được truyền từ form, không cần set lại
        RoomService.addRoom(roomData)
            .then((response) => {
                getallRooms();
                setShowFormAdd(false);
            }).catch((error) => {
                console.log(error);
            })
    }

    // sửa lại hàm updateRoom
    const updateRoom = (id, roomData) => {
        RoomService.updateRoom(id, roomData)
            .then((response) => {
                getallRooms();
                setShowFormUpdate(false);
                setSelectedRoom(null); // đóng form và clear phòng chọn
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleUpdateClick = (room) => {
        setSelectedRoom(room);
        setShowFormUpdate(true);
    }

    const handleCancelUpdate = () => {
        setShowFormUpdate(false);
        setSelectedRoom(null);
    }

    const deleteRoom = (id) => {
        if (!window.confirm("bạn có thực sự muốn xóa ?")) {
            return
        }
        RoomService.deleteRoom(id)
            .then((response) => {
                getallRooms();
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <h2 className="text-center">Danh sách phòng</h2>
            <button type="button" className="btn btn-primary mb-2" onClick={() => getallRooms()}>Làm mới</button>
            <button className="btn btn-success mb-2" onClick={() => setShowFormAdd(true)}>Thêm phòng mới</button>

            {/* modal thêm phòng mới */}
            {showFormAdd && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Thêm phòng mới</h3>
                            <button
                                className="close-button"
                                onClick={() => setShowFormAdd(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <RoomFormAdd onSave={addRoom} defaultRoomId={getNextRoomId()} />
                        </div>
                    </div>
                </div>
            )}

            {/* modal cập nhật phòng */}
            {showFormUpdate && selectedRoom && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Cập nhật thông tin</h3>
                            <button
                                className="close-button"
                                onClick={handleCancelUpdate}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <RoomFormUpdate
                                room={selectedRoom}
                                onUpdate={(updatedRoom) => {
                                    updateRoom(selectedRoom.id, updatedRoom);
                                }}
                                onCancel={handleCancelUpdate}
                            />
                        </div>
                    </div>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>roomId</th>
                        <th>roomName</th>
                        <th>capacity</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.map(
                            room => (
                                <tr key={room.id}>
                                    <td>{room.roomId}</td>
                                    <td>{room.roomName}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.status}</td>
                                    <td style={{ display: "flex" }}>
                                        <button type="button" className="btn btn-info" onClick={() => handleUpdateClick(room)}>
                                            Cập nhật
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteRoom(room.id)} style={{ marginLeft: "10px" }}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default RoomList;
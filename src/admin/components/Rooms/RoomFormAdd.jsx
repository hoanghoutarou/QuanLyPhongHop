import { useState } from 'react';

const RoomFormAdd = ({ onSave, defaultRoomId }) => {
    const [newRoom, setNewRoom] = useState({
        roomId: '',
        roomName: '',
        capacity: '',
        status: 'available'
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // kiểm tra thông tin đầu vào
        if (!newRoom.roomName || !newRoom.capacity || Number(newRoom.capacity) <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin và sức chứa hợp lệ");
            return;
        }

        // set roomId từ defaultRoomId
        const roomToSave = { ...newRoom, roomId: defaultRoomId };

        onSave(roomToSave);
        alert("Thêm phòng thành công");

        setNewRoom({
            roomId: '',
            roomName: '',
            capacity: '',
            status: 'available'
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <input type="text" value={defaultRoomId} readOnly />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter room name"
                        value={newRoom.roomName}
                        onChange={(e) => setNewRoom({ ...newRoom, roomName: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter capacity"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        min="1"
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-control"
                        value={newRoom.status}
                        onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mb-3">Save Room</button>
            </form>
        </div>
    );
};

export default RoomFormAdd;
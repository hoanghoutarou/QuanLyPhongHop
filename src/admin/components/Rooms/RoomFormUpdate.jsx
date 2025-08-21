import { useState, useEffect } from 'react';

const RoomFormUpdate = ({ room, onUpdate, onCancel }) => {
  const [updatedRoom, setUpdatedRoom] = useState({
    roomId: '',
    roomName: '',
    capacity: '',
    status: ''
  });

  useEffect(() => {
    if (room) {
      setUpdatedRoom(room);
    }
  }, [room]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRoom({ ...updatedRoom, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!updatedRoom.roomName.trim() || Number(updatedRoom.capacity) <= 0) {
      alert("Vui lòng nhập tên phòng và sức chứa hợp lệ");
      return;
    }

    try {
      // Giữ lại roomId cũ khi cập nhật
      await onUpdate({ ...updatedRoom, roomId: room.roomId });
      onCancel();
    } catch (error) {
      alert("Cập nhật phòng thất bại!");
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div className="form-group mb-3">
        <input
          type="text"
          name="roomName"
          placeholder="Enter Room Name"
          value={updatedRoom.roomName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="number"
          placeholder="Enter Capacity"
          name="capacity"
          value={updatedRoom.capacity}
          onChange={handleChange}
          className="form-control"
          min="1"
          required
        />
      </div>

      <div className="form-group mb-3">
        <select
          name="status"
          value={updatedRoom.status}
          onChange={handleChange}
          className="form-control"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Cập nhật</button>
        <button type="button" className="btn btn-secondary ml-3" onClick={onCancel}>Hủy</button>
      </div> 
    </form>
  );
};
 
export default RoomFormUpdate;

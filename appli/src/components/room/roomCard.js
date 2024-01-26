import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../button';

const RoomCard = ({ roomData }) => {
  const navigate = useNavigate();

  const goToRoomPage = () => {
    navigate(`/roomPresentation/${roomData.id}`, { state: { roomData } });
  };

  return (
    <Button primary onClick={goToRoomPage}>
      {roomData.name}
    </Button>
  );
};

export default RoomCard;
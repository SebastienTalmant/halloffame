import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RoomCard from './roomCard';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const StyledRoomList = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 1440px) {
    display: none;
  }
`;

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <StyledRoomList>
      {rooms.map((room) => (
        <RoomCard key={room.id} roomData={room} />
      ))}
    </StyledRoomList>
  );
};

export default RoomList;
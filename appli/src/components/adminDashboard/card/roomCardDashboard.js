import React, { useState, useEffect } from 'react';
import RoomCardForm from './roomCardForm';
import RoomCardTable from './roomCardTable';
import axios from 'axios';
import styled from 'styled-components';
import API_BASE_URL from '../../../apiConfig';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  display: ${({ showform }) => showform ? 'block' : 'none'};
  }
`;

const RoomDashboard = () => {
  const [currentId, setCurrentId] = useState(0);
  const [cards, setCards] = useState([]);
  const [showform, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/rooms`);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setCards(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const addRoom = async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}api/rooms`, formData);
      fetchCards();
      setCurrentId(0);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const editRoom = async (id, formData) => {
    try {
      await axios.put(`${API_BASE_URL}api/rooms/${id}`, formData);
      fetchCards();
      setCurrentId(0);
      setShowForm(false);
    } catch (error) {
      console.error('Error editing room:', error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      if (window.confirm("Voulez-vous supprimer cette room ?")) {
        await axios.delete(`${API_BASE_URL}api/rooms/${id}`);
        fetchCards();
        alert('Enregistrement effectué');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleAdd = () => {
    setCurrentId(0);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    if (currentId === 0) {
      addRoom(formData);
    } else {
      editRoom(currentId, formData);
    }
  };

  return (
    <DashboardContainer>
      <TableContainer>
        <RoomCardTable data={cards} onEdit={handleEdit} onDelete={deleteRoom} onAdd={handleAdd} />
      </TableContainer>
      <FormContainer showform={showform}>
        {showform && (
          <RoomCardForm
            onSubmit={handleFormSubmit}
            initialValues={currentId === 0 ? {} : cards.find(card => card.id === currentId)}
            onClose={() => {
              setCurrentId(0);
              setShowForm(false);
            }}
          />
        )}
      </FormContainer>
    </DashboardContainer>
  );
};

export default RoomDashboard;

import React, { useState, useEffect } from 'react';
import PricingForm from './pricingForm';
import PricingTable from './pricingTable';
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

const PricingDashboard = () => {
  const [currentId, setCurrentId] = useState(0);
  const [pricing, setPricing] = useState([]);
  const [showform, setShowForm] = useState(false);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/pricing`);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setPricing(data);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  };

  const editPricing = async (id, formData) => {
    try {
      await axios.put(`${API_BASE_URL}api/pricing/${id}`, formData);
      fetchPricing();
      setCurrentId(0);
      setShowForm(false);
    } catch (error) {
      console.error('Error editing pricing:', error);
    }
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
      editPricing(currentId, formData);
  };

  return (
    <DashboardContainer>
      <TableContainer>
        <PricingTable data={pricing} onEdit={handleEdit} />
      </TableContainer>
      <FormContainer showform={showform}>
        {showform && (
          <PricingForm
            onSubmit={handleFormSubmit}
            initialValues={currentId === 0 ? {} : pricing.find(pricing => pricing.id === currentId)}
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

export default PricingDashboard;

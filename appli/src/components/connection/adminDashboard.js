import React from 'react';
import styled from 'styled-components';
import Connection from './authConnection';
import RoomDashboard from '../adminDashboard/card/roomCardDashboard';
import PricingDashboard from '../adminDashboard/pricing/pricingDashboard';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
`;


const AdminDashboard = () => {

  return (
  <>
    <Connection />
    <DashboardContainer>
    <RoomDashboard />
    <PricingDashboard />
    </DashboardContainer>

  </>
  );
};
export default AdminDashboard;

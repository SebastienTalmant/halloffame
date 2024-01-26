import React from 'react';
import Button from "../../../button";
import styled from 'styled-components';

const StyledTable = styled.table`
  font-family: "Lora", serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  border-collapse: collapse;
  tr:nth-child(even) {
    background-color: #8D99AE;
  }
`;

const TableRow = styled.tr`
  display: flex;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 90px;
`;

const TableColumn = styled.td`
  flex-basis: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const PricingTable = ({ data, onEdit }) => {
  return (
    <>
      <h3>Gestion des prix</h3>
      <StyledTable>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableColumn>{item.size}</TableColumn>
            <TableColumn>{item.price} €</TableColumn>
            <TableColumn>{item.caracteres} caractères</TableColumn>
            <TableColumn>
              <Button primary onClick={() => onEdit(item.id)}>Modifier</Button>
            </TableColumn>
          </TableRow>
        ))}
      </StyledTable>
    </>
  );
};

export default PricingTable;

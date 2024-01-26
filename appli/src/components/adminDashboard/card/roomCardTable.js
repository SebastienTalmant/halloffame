import React from 'react';
import Pagination from "react-js-pagination";
import Button from "../../../button";
import styled, {createGlobalStyle} from 'styled-components';

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
  flex-direction;: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const GlobalStyles = createGlobalStyle`
  ul.pagination {
    list-style-type: none;
    display: flex;
    justify-content: center;
    font-family: "Lora", serif;
    color: #2B2D42;
    li {
      margin: 0 5px;
    }
    a {
      color: #2B2D42;
      cursor: pointer;
    }
  }
`;

const RoomCardTable = ({ data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <GlobalStyles />
      <h3>Gestion des rooms</h3>
      <StyledTable>
        {currentItems.map(item => (
          <TableRow key={item.id}>
            <TableColumn>{item.name}</TableColumn>
            <TableColumn>
              <Button primary onClick={() => onEdit(item.id)}>Modifier</Button>
              <Button onClick={() => onDelete(item.id)}>Supprimer</Button>
            </TableColumn>
          </TableRow>
        ))}
      </StyledTable>
      <ControlsContainer>
        <Button primary onClick={onAdd}>Ajouter room </Button>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </ControlsContainer>
    </>
  );
};

export default RoomCardTable;

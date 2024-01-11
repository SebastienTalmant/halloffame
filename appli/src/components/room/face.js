import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Case from './case';
import API_BASE_URL from '../../apiConfig';

const StyledFace = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1440px;
  height: 780px;
`;

const faceLayout = [
  { rows: 1, columns: 16, size: 90 },
  { rows: 10, columns: 3, size: 60 },
  { rows: 5, columns: 1, size: 120 },
  { rows: 4, columns: 1, size: 150 },
  { rows: 5, columns: 1, size: 120 },
  { rows: 4, columns: 2, size: 150 },
  { rows: 5, columns: 1, size: 120 },
  { rows: 4, columns: 1, size: 150 },
  { rows: 5, columns: 1, size: 120 },
  { rows: 10, columns: 3, size: 60 },
  { rows: 1, columns: 16, size: 90 },
];

const Face = ({ roomId, faceId, onCaseClick }) => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/room/${roomId}/${faceId}/cases`);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, [roomId, faceId]);

  const sortedCases = () => {
    const sorted = {};
    cases.forEach((item) => {
      if (!sorted[item.size]) {
        sorted[item.size] = [];
      }
      sorted[item.size].push(item);
    });
    return sorted;
  };

  const renderFace = () => {
    const sortedCasesData = sortedCases();

    return faceLayout.map((part, partIndex) => {
      const partContent = Array.from({ length: part.rows }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
          {Array.from({ length: part.columns }, (_, colIndex) => {
            const sizeCases = sortedCasesData[part.size];
            const item = sizeCases && sizeCases.length > 0 ? sizeCases.shift() : null;

            if (item) {
              return (
                <Case
                  key={colIndex}
                  id={item.id}
                  size={item.size}
                  photo={item.URL}
                  message={item.text}
                  name={item.name}
                  surname={item.surname}
                  offertByName={item.offert_by_name}
                  offertBySurame={item.offert_by_surname}
                  onCaseClick={() => onCaseClick(item)}
                  statut={item.statut}
                />
              );
            } else {
              return <Case key={colIndex} size={part.size} />;
            }
          })}
        </div>
      ));

      return <div key={partIndex}>{partContent}</div>;
    });
  };

  return <StyledFace>{renderFace()}</StyledFace>;
};

export default Face;

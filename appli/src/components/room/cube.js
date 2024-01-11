import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Face from './face';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const StyledCubeContainer = styled.div`
  height: 96vh;
  width: 96vw;
  position: relative;
  margin: auto;
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  transition: all 2s;
`;

const StyledCube = styled.div`
  width: 1440px;
  height: 780px;
  transform-style: preserve-3d;
  perspective-origin: 50%;
  position: relative;
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  top: 98%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  transition: all 2s;
`;

const StyledFace = styled.div`
  position: absolute;
  width: 1440px;
  height: 780px;
  overflow: hidden;
  box-shadow: 5px 5px 30px #0B025F;
  transition: all 3s;
`;

const StyledButton = styled.button`
  color: #972D5C;
  border: 3px solid #972D5C;
  padding: 8px 40px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  box-shadow: 5px 5px 10px #0B025F;
`;

const Cube = ({ onCaseClick, roomId }) => {
  const [faces, setFaces] = useState([
    { translateZ: 0, translateX: 0 },
    { translateZ: -720, translateX: 1440 },
    { translateZ: -1440, translateX: 2880 },
    { translateZ: -2160, translateX: 1440 },
    { translateZ: -2880, translateX: 0 },
    { translateZ: -2160, translateX: -1440 },
    { translateZ: -1440, translateX: -2880 },
    { translateZ: -720, translateX: -1440 },
  ]);

  const [faceDataFiles, setFaceDataFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFaces = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/room/${roomId}/faces`);
        const faceIds = response.data;
        const shuffledFaces = faceIds.sort(() => Math.random() - 0.5);
        setFaceDataFiles(shuffledFaces);
      } catch (error) {
        console.error('Error fetching faces data:', error);
      } 
    };
    fetchFaces();
  }, [roomId]);

  useEffect(() => {
    setFaces((prevFaces) => {
      const updatedFaces = prevFaces.map((face, index) => ({
        ...face,
        faceId: faceDataFiles[index],
      }));
      return updatedFaces;
    });
  }, [faceDataFiles]);



  const handlePrevious = () => {
    setFaces((prevFaces) => {
      const newFaces = prevFaces.map((face, index) => ({
        ...face,
        faceId: faceDataFiles[index],
      }));
      const lastFace = newFaces.pop();
      newFaces.unshift(lastFace);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % faces.length);
      return newFaces;
    });
  };

  const handleCaseClick = (item) => {
    if (item) {
      onCaseClick(item);
    }
  };

  return (
    <StyledCubeContainer>
      <StyledCube>
        {faces.map((face, index) => (
          <StyledFace
            key={index}
            className={`face-transition ${index === currentIndex ? 'current-face' : ''}`}
            style={{
              transform: `translateZ(${face.translateZ}px) translateX(${face.translateX}px)`,
            }}
            onClick={() => {
              handleCaseClick(null);
            }}
          >
            <Face faceId={face.faceId} roomId={roomId} onCaseClick={onCaseClick} />
          </StyledFace>
        ))}
      </StyledCube>

      <StyledButtonContainer>
        <StyledButton onClick={handlePrevious}>Face suivante ►</StyledButton>
      </StyledButtonContainer>
    </StyledCubeContainer>
  );
};


export default Cube;
const db = require('./dbModule');
const { v4: uuidv4 } = require('uuid');


// récupération données table room
const getRoom = (req, res) => {
    const query = 'SELECT * FROM room';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Une erreur est survenue lors de la récupération des chambres depuis la base de données');
      }
  
      res.json(result);
    });
};

// insertion données table room avec création en cascaque de 8 faces et des cases par face
const postRoom = async (req, res) => {
    try {
        const { name, title, description } = req.body;
        const roomID = uuidv4();
        const queryRoom = 'INSERT INTO room (id, name, title, description) VALUES (?, ?, ?, ?)';

        db.query(queryRoom, [roomID, name, title, description], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Une erreur est survenue lors de la connexion à la base de données');
            }

            if (result) {
                try {
                    await insertFacesAndCases(roomID);
                    res.json({ message: 'Chambre ajoutée avec succès' });
                } catch (error) {
                    console.error('Database error:', error);
                    res.status(500).send('Une erreur est survenue lors de l\'ajout des faces et des cases à la base de données');
                }
            } else {
                console.log('else n°1');
                res.status(500).send('Une erreur est survenue lors de l\'ajout de la chambre à la base de données');
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Une erreur est survenue lors de l\'ajout de la chambre à la base de données');
    }
};


const insertFacesAndCases = async (roomId) => {
    const queryFace = 'INSERT INTO face (id, room_id) VALUES (?, ?)';

    for (let i = 0; i < 8; i++) {
        const faceId = uuidv4();
        try {
            await dbQuery(queryFace, [faceId, roomId]);
            await generateCasesData(faceId);
        } catch (error) {
            console.error('Erreur de la base de données :', error);
            throw new Error('Une erreur est survenue lors de l\'ajout de la face et des cases à la base de données');
        }
    }
};


const generateCasesData = async (faceId) => {
    const casesData = [];
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

    for (const layout of faceLayout) {
        for (let rowIndex = 0; rowIndex < layout.rows; rowIndex++) {
            for (let colIndex = 0; colIndex < layout.columns; colIndex++) {
                const caseId = uuidv4();
                const size = layout.size;
                casesData.push({ id: caseId, faceId, size });
            }
        }
    }

    const queryCases = 'INSERT INTO case_table (id, face_id, size) VALUES ?';
    const casesValues = casesData.map(_case => [_case.id, faceId, _case.size]);
    await dbQuery(queryCases, [casesValues]);
};

// Helper function to promisify db.query
const dbQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


// mise à jour données table room
const updateRoom = (req, res) => {
    const roomId = req.params.id;
    const { name, title, description } = req.body;
    const query = 'UPDATE room SET name = ?, title = ?, description = ? WHERE id = ?';
    db.query(query, [name, title, description, roomId], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Une erreur est survenue lors de la mise à jour de la chambre dans la base de données');
      }
  
      res.json({ message: 'Chambre mise à jour avec succès' });
    });
};

const deleteRoom = (req, res) => {
    const roomId = req.params.id;
    const query = 'DELETE FROM room WHERE id = ?';
    db.query(query, [roomId], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Une erreur est survenue lors de la suppression de la chambre de la base de données');
      }
  
      res.json({ message: 'Chambre supprimée avec succès' });
    });
};


// récupération room par nom
const getRoomByName = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM room WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur de la base de données :', err);
            return res.status(500).send('Une erreur est survenue lors de la récupération des données de la salle depuis la base de données');
        }

        if (result.length > 0) {
            const roomData = result[0];
            res.json(roomData);
        } else {
            res.status(404).send('Salle non trouvée');
        }
    });
};

// récupération des faces par Room
const getFacesByRoomId = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await dbQuery('SELECT id FROM face WHERE room_id = ?', [id]);
        if (result.length > 0) {
            const faceIds = result.map(face => face.id);
            res.json(faceIds);
        } else {
            res.status(404).send('Aucune face trouvée pour cette salle');
        }
    } catch (error) {
        console.error('Erreur de la base de données lors de la récupération des données des faces :', error);
        res.status(500).send('Une erreur est survenue lors de la récupération des données des faces');
    }
};

const getCasesByFaceId = async (req, res) => {   
    const { roomId, faceId } = req.params;

    try {
        const result = await dbQuery('SELECT * FROM case_table WHERE face_id = ?', [faceId]);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send('Cases non trouvées');
        }
    } catch (error) {
        console.error('Erreur de la base de données lors de la récupération des données des cas :', error);
        res.status(500).send('Une erreur est survenue lors de la récupération des données des cases');
    }
};



module.exports = {
    getRoom,
    postRoom,
    updateRoom,
    deleteRoom,
    getRoomByName,
    getFacesByRoomId,
    getCasesByFaceId
};

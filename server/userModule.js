const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./dbModule');
const { sendEmailNotification } = require('./emailModule');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Received login request for email: ${email}`);

        if (!email || !password) {
            console.log('Email or password not provided');
            return res.status(400).send('Veuillez fournir un email et un mot de passe');
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Une erreur est survenue lors de la connexion à la base de données');
            }

            if (result.length > 0) {
                const user = result[0];
                const updatedAccountLocked = await checkAccountLock(user.id, user.email, res);

                console.log(user.account_locked);
                if (updatedAccountLocked) {
                    bcrypt.compare(password, result[0].password, (err, isMatch) => {
                        if (err) {
                            console.error('Error comparing passwords:', err);
                            return res.status(500).send('Une erreur est survenue lors de la comparaison des mots de passe');
                        }

                        if (isMatch) {
                            resetLoginAttempts(user.id, res);

                            const token = jwt.sign({ userId: result[0].id, email: result[0].email }, 'TejtaNeistasbes211006!?', { expiresIn: '1h' });
                            req.session.admin_id = result[0].id;
                            return res.send({
                                message: 'Connexion réussie',
                                email: user.email,
                                token: token
                            });
                        } else {
                            incrementLoginAttempts(user.id, user.email, res);
                            console.log('Passwords do not match');
                            res.status(401).send('Mot de passe incorrect');
                        }
                    });
                }  else {
                    console.log('Account is locked. Access denied.');
                }
            }
            else if (result.length === 0) {
                console.log('No user found with this email');
                res.status(404).send('Aucun utilisateur trouvé avec cet email');
            }
        });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).send('Une erreur est survenue lors de la connexion.');
    }
};


const resetLoginAttempts = (userId) => {
    const resetQuery = 'UPDATE users SET login_attempts = 0 WHERE id = ?';
    db.query(resetQuery, [userId], (err) => {
        if (err) {
            console.error('Error resetting login attempts:', err);
        }
    });
};


const incrementLoginAttempts = (userId, userEmail) => {
    const incrementQuery = 'UPDATE users SET login_attempts = login_attempts + 1 WHERE id = ?';
    db.query(incrementQuery, [userId], (err) => {
        if (err) {
            console.error('Error incrementing login attempts:', err);
        } else {
            console.log('Incremented login attempts');
            sendEmailNotification(userEmail, 'Tentative de connexion infructueuse', 'Quelqu\'un a tenté de se connecter à votre compte avec un mot de passe incorrect.');
        }
    });
};


const checkAccountLock = async (userId, userEmail, res) => {
    try {
        const checkQuery = 'SELECT login_attempts, account_locked, email FROM users WHERE id = ?';
        const result = await db.promise().query(checkQuery, [userId]);

        if (result && result[0].length > 0) {
            const loginAttempts = result[0][0].login_attempts;
            const maxLoginAttempts = 3;
            const accountLocked = result[0][0].account_locked;

            console.log('locked dans check :', accountLocked)

            if (accountLocked) {
                console.log('Account is locked. Access denied.');
                res.status(403).send('Accès interdit, compte verrouillé.');
                return false;
            } else if (!accountLocked && loginAttempts >= maxLoginAttempts) {
                return await lockAccount(userId, userEmail);
            }
        } else {
            console.log('No or invalid result found while checking account lock');
        }
        return true;
    } catch (error) {
        console.error('Error checking account lock:', error);
        res.status(500).send('Erreur lors de la vérification du verrouillage du compte.');
        return false;
    }
};

const lockAccount = async (userId, userEmail) => {
    try {
        const lockQuery = 'UPDATE users SET account_locked = 1 WHERE id = ?';
        await db.promise().query(lockQuery, [userId]);
        
        const updatedResult = await db.promise().query('SELECT account_locked FROM users WHERE id = ?', [userId]);
        
        if (updatedResult && updatedResult[0].length > 0) {
            const updatedAccountLocked = updatedResult[0][0].account_locked;

            console.log('Account locked successfully', updatedAccountLocked);

            sendEmailNotification(
                userEmail,
                'Compte verrouillé',
                'Votre compte a été verrouillé en raison de trop nombreuses tentatives de connexion infructueuses.'
            );
            res.status(403).send('Accès interdit, compte verrouillé.');
            return updatedAccountLocked;
        } else {
            console.log('No or invalid result found while locking account');
            return false;
        }
    } catch (error) {
        console.error('Error locking account:', error);
        return false;
    }
};


const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, jeton manquant.' });
    }

    jwt.verify(token, 'TejtaNeistasbes211006!?', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Accès interdit, jeton non valide.' });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    login,
    authenticateToken
};

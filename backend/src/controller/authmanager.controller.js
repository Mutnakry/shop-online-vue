const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../DB/db');

// Register manager
exports.register =async (req, res) => {
    try {
        const { names, email, pass, rol } = req.body; 
        const hashedPassword = await bcrypt.hash(pass, 8);
        const query = 'INSERT INTO manager (names, email, pass, rol) VALUES (?, ?, ?, ?)'; 

        db.query(query, [names, email, hashedPassword, rol], (err, results) => {
            if (err) {
                return res.status(500).send('Error registering manager'); 
            }
            res.status(201).send('manager registered successfully'); 
        });
    } catch (error) {
        res.status(500).send('Error registering manager');
    }
};



// Example modification in your login controller
exports.login = (req, res) => {
    const { email, pass } = req.body;

  const query = 'SELECT * FROM manager WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }
    if (results.length === 0) {
      return res.status(404).send('manager not found');
    }
    const manager = results[0];
    const isPasswordValid = bcrypt.compareSync(pass, manager.pass);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ id: manager.id, rol: manager.rol }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

    res.status(200).send({ auth: true, token, rol: manager.rol, names: manager.names,email:manager.email });
  });
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 6900;

app.use(cors());
app.use(bodyParser.json());

/// Auth Manager  ///
const AuthRoutes = require('./src/router/authmanager.router');
app.use('/auth', AuthRoutes); // Added leading '/'


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});














// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'crud_angular'
// });

// db.connect(err => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL Connected...');
// });



// // Get paginated and searched products
// app.get('/products', (req, res) => {
//     const { page = 1, limit = 15, search = '' } = req.query;
//     const offset = (page - 1) * limit;

//     const sql = `
//       SELECT SQL_CALC_FOUND_ROWS * FROM products
//       WHERE names LIKE ?
//       LIMIT ? OFFSET ?
//     `;

//     db.query(sql, [`%${search}%`, parseInt(limit), parseInt(offset)], (err, results) => {
//         if (err) return res.status(500).json({ error: err });

//         db.query('SELECT FOUND_ROWS() as total', (err, totalResults) => {
//             if (err) return res.status(500).json({ error: err });
//             const total = totalResults[0].total;
//             res.status(200).json({ data: results, total });
//         });
//     });
// });



// app.get('/products/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'SELECT * FROM products where id= ?';
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//     });
// });


// app.post('/addproducts', (req, res) => {
//     const value = {
//         names: req.body.names,
//         price: req.body.price,
//         qty: req.body.qty
//     }
//     const sql = 'INSERT INTO products SET ?';
//     db.query(sql, value, (err) => {
//         if (err) {
//             throw err;
//         }
//         res.send('Product added...');
//     });
// });

// app.put('/updateproducts/:id', (req, res) => {
//     const id =req.params.id;
//     const { names, price, qty } = req.body;
//     const sql = 'UPDATE products SET names = ?, price = ?, qty = ? WHERE id = ?';
//     db.query(sql, [names, price, qty,id], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         res.status(200).json(result);
//     });

//   });

// app.delete('/products/:id', (req, res) => {
//     const sql = `DELETE FROM products WHERE id = ${req.params.id}`;
//     db.query(sql, (err) => {
//         if (err) {
//             throw err;
//         }
//         res.send('Product deleted...');
//     });
// });


// app.post('/authuser', async (req, res) => {
//     try {
//         const { names, email, pass, rol } = req.body; // Extracting user details from the request body
//         const hashedPassword = await bcrypt.hash(pass, 8); // Hashing the password with a salt of 8 rounds
//         const query = 'INSERT INTO user (names, email, pass, rol) VALUES (?, ?, ?, ?)'; // SQL query to insert user into the database

//         db.query(query, [names, email, hashedPassword, rol], (err, results) => {
//             if (err) {
//                 return res.status(500).send('Error registering user'); // Return error if there's a problem with the query
//             }
//             res.status(201).send('User registered successfully'); // Send success message on successful registration
//         });
//     } catch (error) {
//         res.status(500).send('Error registering user'); // Catch any errors during the process
//     }
// });


// app.post('/authlogin', async (req, res) => {
//     const { names, pass } = req.body;

//   const query = 'SELECT * FROM user WHERE names = ?';
//   db.query(query, [names], (err, results) => {
//     if (err) {
//       return res.status(500).send('Error logging in');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('User not found');
//     }

//     const user = results[0];
//     const isPasswordValid = bcrypt.compareSync(pass, user.pass);

//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid password');
//     }

//     const token = jwt.sign({ id: user.id, rol: user.rol }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

//     res.status(200).send({ auth: true, token, rol: user.rol, names: user.names });
//   });
// });
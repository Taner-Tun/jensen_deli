import express from 'express';
import { createPool } from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Add CORS middleware here
app.use(express.json());

// MySQL database configuration
const dbConfig = {
  host: process.env.JENSEN_DELI_HOST,
  user: process.env.JENSEN_DELI_USER,
  password: process.env.JENSEN_DELI_PASSWORD,
  database: process.env.JENSEN_DELI_DATABASE,
};

// Create a MySQL connection pool
const pool = createPool(dbConfig);

// GET route to retrieve all data
app.get('/data', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      connection.query('SELECT * FROM jensen_deli', (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json(results);
        }
      });
    }
  });
});

// GET route to retrieve data by ID
app.get('/data/:id', (req, res) => {
  const id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      connection.query('SELECT * FROM jensen_deli WHERE id = ?', [id], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'Data not found' });
        } else {
          res.status(200).json(results[0]);
        }
      });
    }
  });
});

// POST route to add data
app.post('/data', (req, res) => {
  console.log('POST request received');
  const { itemid, image, title, category, price } = req.body;
  const data = { itemid, image, title, category, price };

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const query = 'INSERT INTO jensen_deli (itemid, image, title, category, price) VALUES (?, ?, ?, ?, ?)';
      const values = [data.itemid, data.image, data.title, data.category, data.price];

      connection.query(query, values, (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'Data added successfully' });
        }
      });
    }
  });
});

// PUT route to update data by ID
// app.put('/data/:id', (req, res) => {
//   const id = req.params.id;
//   const { itemid, image, title, category, price } = req.body;
//   const data = { itemid, image, title, category, price };

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to MySQL database:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       connection.query('UPDATE jensen_deli SET ? WHERE id = ?', [data, id], (error, results) => {
//         connection.release();
//         if (error) {
//           console.error('Error executing MySQL query:', error);
//           res.status(500).json({ error: 'Internal server error' });
//         } else if (results.affectedRows === 0) {
//           res.status(404).json({ error: 'Data not found' });
//         } else {
//           res.status(200).json({ message: 'Data updated successfully' });
//         }
//       });
//     }
//   });
// });
app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const { itemid, image, title, category, price } = req.body;

  // Perform the update query
  const sql = `UPDATE jensen_deli SET itemid = ?, image = ?, title = ?, category = ?, price = ? WHERE id = ?`;
  const values = [itemid, image, title, category, price, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ message: "Item updated successfully" });
  });
});



// DELETE route to delete data by ID
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      connection.query('DELETE FROM jensen_deli WHERE id = ?', [id], (error, results) => {
        connection.release();
        if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Data not found' });
        } else {
          res.status(200).json({ message: 'Data deleted successfully' });
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

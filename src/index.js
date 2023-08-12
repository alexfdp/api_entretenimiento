
import express from 'express';
import { pool } from './db.js';
const app = express();
app.listen(3000);
// console.log("server run port 3000");

app.get('/prueba', async (req, res) => {
    const result = await pool.query('select * from user');
    res.json(result);
});

app.get('/employees', (req, res) => res.send('obteniendo empleados'));

app.post('/employees', (req, res) => res.send('creando empleados empleados'));

app.put('/employees', (req, res) => res.send('editando empleados'));

app.delete('/employees', (req, res) => res.send('eliminando empleados'));;
import { pool } from '../db.js';

export const consultar = async (req, res) => {
    const [result] = await pool.query('select * from user');
    res.json(result);
}
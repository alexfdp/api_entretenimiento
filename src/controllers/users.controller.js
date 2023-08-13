import { pool } from "../db.js"

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('select * from usuario')
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from usuario where iduser = ?',
            [id])
        if (result.length <= 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}

export const postUsers = async (req, res) => {
    try {
        const { nombre, apellido, cedula, telefono, correo, contrasena } = req.body;
        const [result] = await pool.query('INSERT INTO persona (nombre, apellido, ceula, telefono) VALUES (?, ?, ?, ?);'
            , [nombre, apellido, cedula, telefono]);
        const ide = result.insertId;

        ingresarUser(ide, correo, contrasena, res)
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}

async function ingresarUser(id_persona, correo, contrasena, res) {
    try {
        const [result] = await pool.query('INSERT INTO usuario (persona_id, correo, contrasena) values (?,?,?)'
            , [id_persona, correo, contrasena]);
        if (result.insertId != 0) {
            res.send("guardado correctamente")
        }
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        const [result] = await pool.query('delete from usuario where iduser = ?', [req.params.id])
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Error al eliminar usuario'
            })
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}

export const putUsers = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, apellido } = req.body
        const [result] = await pool.query('UPDATE usuario SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE iduser = ?',
            [nombre, apellido, id])
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Error al actualizar"
            })
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error"
        })
    }
}


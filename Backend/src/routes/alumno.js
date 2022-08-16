const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all alumnos
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM alumno', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al consultar alumnos'})
        }
    }
    );
});

// GET an alumno
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM alumno WHERE Id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al buscar alumno'})
        }
    });
});

// INSERT new alumno
router.post('/', (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO alumno SET ?`;
    mysqlConnection.query(query, req.body, (err,result) => {
        if (!err) {
            res.status(200).json({msg: 'Alumno agregado', id: result.insertId});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al agregar alumno'})
        }
    }
    );
});

// DELETE alumno
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM alumno WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.status(200).json({status: 'Alumno eliminado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al eliminar alumno'})
        }
    });
});

// UPDATE alumno
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE alumno SET ? WHERE id = ${id}`;
    mysqlConnection.query(query, req.body, (err, result) => {
        if (!err) {
            res.status(200).json({msg: 'Alumno actualizado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al actualizar alumno'})
        }
    }
    );
});

module.exports = router;
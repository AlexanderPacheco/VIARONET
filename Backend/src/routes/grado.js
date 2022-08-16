const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all grados
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM grado', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al consultar grados'})
        }
    }
    );
});

// GET an grado
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM grado WHERE Id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al buscar grado'})
        }
    });
});

// INSERT new grado
router.post('/', (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO grado SET ?`;
    mysqlConnection.query(query, req.body, (err,result) => {
        if (!err) {
            res.status(200).json({msg: 'grado agregado', id: result.insertId});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al agregar grado'})
        }
    }
    );
});

// DELETE grado
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM grado WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.status(200).json({status: 'grado eliminado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al eliminar grado'})
        }
    });
});

// UPDATE grado
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE grado SET ? WHERE id = ${id}`;
    mysqlConnection.query(query, req.body, (err, result) => {
        if (!err) {
            res.status(200).json({msg: 'grado actualizado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al actualizar grado'})
        }
    }
    );
});

module.exports = router;
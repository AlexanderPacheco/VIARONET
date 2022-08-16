const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all profesores
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM profesor', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al consultar profesores'})
        }
    }
    );
});

// GET an profesor
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM profesor WHERE Id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al buscar profesor'})
        }
    });
});

// INSERT new profesor
router.post('/', (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO profesor SET ?`;
    mysqlConnection.query(query, req.body, (err,result) => {
        if (!err) {
            res.status(200).json({msg: 'Profesor agregado', id: result.insertId});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al agregar profesor'})
        }
    }
    );
});

// DELETE profesor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM profesor WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.status(200).json({status: 'Profesor eliminado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al eliminar profesor'})
        }
    });
});

// UPDATE profesor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE profesor SET ? WHERE id = ${id}`;
    mysqlConnection.query(query, req.body, (err, result) => {
        if (!err) {
            res.status(200).json({msg: 'profesor actualizado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al actualizar profesor'})
        }
    }
    );
});

module.exports = router;
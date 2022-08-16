const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all alumnoGrados
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM alumnoGrado', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al consultar alumnoGrados'})
        }
    }
    );
});

// GET an alumnoGrado
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM alumnoGrado WHERE Id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al buscar alumnoGrado'})
        }
    });
});

// INSERT new alumnoGrado
router.post('/', (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO alumnoGrado SET ?`;
    mysqlConnection.query(query, req.body, (err,result) => {
        if (!err) {
            res.status(200).json({msg: 'alumnoGrado agregado', id: result.insertId});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al agregar alumnoGrado'})
        }
    }
    );
});

// DELETE alumnoGrado
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM alumnoGrado WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.status(200).json({status: 'alumnoGrado eliminado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al eliminar alumnoGrado'})
        }
    });
});

// UPDATE alumnoGrado
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE alumnoGrado SET ? WHERE id = ${id}`;
    mysqlConnection.query(query, req.body, (err, result) => {
        if (!err) {
            res.status(200).json({msg: 'alumnoGrado actualizado'});
        } else {
            console.log(err);
            res.status(500).json({msg: 'Error al actualizar alumnoGrado'})
        }
    }
    );
});

module.exports = router;
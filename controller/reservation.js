const pool = require('../config/db');

// POST /reservation
const postReservation = async (req, res) => {
    const { guest_id, room_id, check_in_date, check_out_date, status } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, status)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [guest_id, room_id, check_in_date, check_out_date, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// GET /reservations
const getReservations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservations');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /reservation/:id
const putReservation = async (req, res) => {
    const { id } = req.params;
    const { check_in_date, check_out_date, status } = req.body;
    try {
        const result = await pool.query(
            `UPDATE reservations SET check_in_date = $1, check_out_date = $2, status = $3, updated_at = CURRENT_TIMESTAMP
             WHERE id = $4 RETURNING *`,
            [check_in_date, check_out_date, status, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /reservation/:id
const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query(`DELETE FROM reservations WHERE id = $1`, [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /reservation/search
const searchReservations = async (req, res) => {
    const { from_date, to_date } = req.query;
    try {
        const result = await pool.query(
            `SELECT * FROM reservations WHERE check_in_date >= $1 AND check_out_date <= $2`,
            [from_date, to_date]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postReservation,
    getReservations,
    putReservation,
    deleteReservation,
    searchReservations
}

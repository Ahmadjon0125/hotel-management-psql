const pool = require('../config/db');

// POST /room
const postRoom = async (req, res) => {
    const { room_number, room_type, price_per_night } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO rooms (room_number, room_type, price_per_night) VALUES ($1, $2, $3) RETURNING *`,
            [room_number, room_type, price_per_night]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// GET /rooms
const getRooms = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM rooms`);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// PUT /rooms/:id
const putRoom = async (req, res) => {
    const { id } = req.params;
    const { room_number, room_type, price_per_night } = req.body;
    try {
        const result = await pool.query(
            `UPDATE rooms SET room_number = $1, room_type = $2, price_per_night = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
            [room_number, room_type, price_per_night, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// DELETE /rooms/:id
const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query(`DELETE FROM rooms WHERE id = $1`, [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /rooms/:id
const getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM rooms WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postRoom,
    getRooms,
    putRoom,
    deleteRoom,
    getRoomById,
}
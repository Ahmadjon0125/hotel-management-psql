const pool = require('../config/db');

// POST /guest
const postGuest = async (req, res) => {
    const { ism, contact_info } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO guests (ism, contact_info) VALUES ($1, $2) RETURNING *`,
            [ism, contact_info]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// GET /guests
const getGuests = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM guests`);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// PUT /guests/:id
const putGuest = async (req, res) => {
    const { id } = req.params;
    const { ism, contact_info } = req.body;
    try {
        const result = await pool.query(
            `UPDATE guests SET ism = $1, contact_info = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
            [ism, contact_info, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// DELETE /guests/:id
const deleteGuest = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query(`DELETE FROM guests WHERE id = $1`, [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /guests/:id
const getGuestById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM guests WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Guest not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    postGuest,
    getGuests,
    putGuest,
    deleteGuest,
    getGuestById,
}
const db = require('../../../lib/db');
const SQL = require('sql-template-strings');

module.exports = async (req, res) => {
    if (req.method !== 'GET') return res.status(401).end();
    try {
        const [state] = await db.query(SQL`SELECT id, state_name, abbrev, capital FROM states WHERE id = ${req.query.id}`);

        if (state.error) return res.status(500).end();

        res.status(200).json({ state });
    } catch (error) {
        res.status(500).end();
    }
};

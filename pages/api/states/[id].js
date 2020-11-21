const db = require('../../../lib/db');
const SQL = require('sql-template-strings');

module.exports = async (req, res) => {
    // console.log('req.query.id', req.query.id);
    const [state] = await db.query(SQL`SELECT id, state_name, abbrev, capital FROM states WHERE id = ${req.query.id}`);
    res.status(200).json({ state });
};

const db = require('../../../lib/db');
const SQL = require('sql-template-strings');

module.exports = async (req, res) => {
    if (req.method !== 'GET') return res.status(401).json({ message: 'Only the GET method is allowed!' });
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    if (page < 1) page = 1;

    const states = await db.query(SQL`SELECT id, state_name, abbrev, capital FROM states ORDER BY id LIMIT ${(page - 1) * limit}, ${limit}`);
    const count = await db.query(SQL`SELECT COUNT(*) AS statesCount FROM states`);

    const { statesCount } = count[0];
    const pageCount = Math.ceil(statesCount / limit);

    res.status(200).json({ states, pageCount, page });
};

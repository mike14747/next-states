const db = require('../../../lib/db');
const SQL = require('sql-template-strings');

module.exports = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    switch (req.method) {
        case 'GET':
            if (page < 1) page = 1;

            try {
                const states = await db.query(SQL`SELECT id, state_name, abbrev, capital FROM states ORDER BY id LIMIT ${(page - 1) * limit}, ${limit}`);
                const count = await db.query(SQL`SELECT COUNT(*) AS statesCount FROM states`);

                if (states.error || count.error) return res.status(500).end();

                const { statesCount } = count[0];
                const pageCount = Math.ceil(statesCount / limit);

                res.status(200).json({ states, pageCount, page });
            } catch (error) {
                res.status(500).end();
            }
            break;
        case 'POST':
            break;
        default:
            res.status(401).end();
    }
};

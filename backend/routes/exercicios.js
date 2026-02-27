const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient (
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
)

router.get('/', async (req, res) => {
	try {
		const { subject, theme, statement, difficulty, type } = req.query;
		
		let query = supabase.from('worksheets').select('*');

		if (type) query = query.eq('type', type);
		if (theme) query = query.eq('theme', theme);
		if (subject) query = query.eq('subject', subject);
		if (statement) query = query.eq('statement', statement);
		if (difficulty) query = query.eq('difficulty', difficulty);

		const { data, error } = await query;

		res.json(data);
		if (error) throw error;

	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
})

module.exports = router;
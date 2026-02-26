const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient (
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
)

router.get('/', async (req, res) => {
	try {
		const { subject, theme, difficulty, type } = req.query;
		
		let query = supabase.from('worksheets').select('*');

		if (type) query = query.eq('type', type);
		if (theme) query = query.eq('theme', theme);
		if (subject) query = query.eq('subject', subject);
		if (difficulty) query = query.eq('difficulty', difficulty);

		const {data, error } = await query;

		if (error) throw error;

		res.json(data);
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
);

// GET /provas — busca todas as provas com filtros opcionais
router.get('/', async (req, res) => {
	try {
		const { teacher, semester, type, date } = req.query;

		let query = supabase.from('tests').select('*');

		if (teacher) query = query.eq('teacher', teacher);
		if (semester) query = query.eq('semester', semester);
		if (type) query = query.eq('type', type);
		if (date) query = query.eq('data', date);
		

		const { data, error } = await query;

		if (error) throw error;

			res.json(data);
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
});

module.exports = router;
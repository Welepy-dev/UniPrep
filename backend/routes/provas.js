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
		const { professor, semestre, tipo, date } = req.query;

		let query = supabase.from('provas').select('*');

		if (professor) query = query.eq('professor', professor);
		if (semestre) query = query.eq('semestre', semestre);
		if (tipo) query = query.eq('tipo', tipo);
		if (date) query = query.eq('data', date);
		

		const { data, error } = await query;

		if (error) throw error;

			res.json(data);
	} catch (err) {
		res.status(500).json({ erro: err.message });
	}
});

module.exports = router;
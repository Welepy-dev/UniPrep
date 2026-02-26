//configuração e conexão
const express = require('express')
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient (
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
)

router.get('/', async (req, res) => {
	try {
		const { search } = req.query; 
		let query = supabase.from('classes').select('*');

		
		if (search) {
			query = query.ilike('title', `%${search}%`);
		}

		const { data, error } = await query;
		if (error) throw error;

		res.json(data);
	} catch (err) {
		res.status(500).json({ erro: "Erro ao encontrar as aulas" });
	}
});

module.exports = router;
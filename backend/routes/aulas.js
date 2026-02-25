//configuração e conexão
const express = require('express')
const router = express.router();
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient (
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY
)

router.get('/', async (req, res) => {
	try {
		const { search } = req.query; 
		let query = supabase.from('aulas').select('*');

		
		if (search) {
			query = query.ilike('titulo', `%${search}%`);
		}

		const { data, error } = await query;
		if (error) throw error;

		res.json(data);
	} catch (err) {
		res.status(500).json({ erro: "Erro ao buscar aulas" });
	}
});
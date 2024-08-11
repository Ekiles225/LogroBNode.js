import express from 'express';
import { crearGenero, listarGeneros, editarGeneroVista, editarGenero, eliminarGenero } from '../controller/GeneroController.js';

const router = express.Router();

router.post('/generos', crearGenero);

router.get('/generos', listarGeneros);
router.get('/generos/:id/edit', editarGeneroVista);
router.put('/generos/:id', editarGenero);
router.delete('/generos/:id', eliminarGenero);


export default router;

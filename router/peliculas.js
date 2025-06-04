import express from 'express';
import {index, crearPelicula, listarPeliculas, editarPeliculaVista, editarPelicula, eliminarPelicula, filtrarPeliculas } from '../controller/PeliculaController.js';

const router = express.Router();

router.get('/peliculas', listarPeliculas);
//router.get('/', index);
router.get('/peliculas/:id/edit', editarPeliculaVista);
router.put('/peliculas/:id', editarPelicula);
router.delete('/peliculas/:id', eliminarPelicula);
router.get('/peliculas/filtrar', filtrarPeliculas);
router.post("/crearPelicula", crearPelicula);


export default router;

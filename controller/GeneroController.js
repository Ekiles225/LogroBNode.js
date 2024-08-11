import Genero from '../model/GeneroModel.js';
import Pelicula from '../model/PeliculaModel.js'


// Crear una nueva prioridad
export const crearGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
      const nuevoGenero = await Genero.create({ nombre });
      res.redirect('/generos');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Listar todos los generos
export const listarGeneros = async (req, res) => {
    try {
      const genero = await Genero.findAll();
      res.render('generos', { genero });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  

// Editar una genero existente (vista de formulario de edición)
export const editarGeneroVista = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);  
    res.render('editarGenero', { genero });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una genero existente
export const editarGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
      await Genero.update({ nombre }, { where: { id: req.params.id } });
      res.redirect('/generos');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Eliminar una prioridad
export const eliminarGenero= async (req, res) => {
  const { id } = req.params;
  try {
      // Eliminar todas las películas asociadas
      await Pelicula.destroy({ where: { genero_id: id } });

      // Ahora eliminar el género
      await Genero.destroy({ where: { id } });

      res.redirect('/generos'); // Redirigir después de eliminar
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

 
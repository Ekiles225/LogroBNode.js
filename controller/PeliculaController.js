import Pelicula from '../model/PeliculaModel.js';
import Genero from '../model/GeneroModel.js';


export const index = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    const pelicula = await Pelicula.findAll();
    res.render("peliculas", { generos: generos, pelicula: pelicula });
  } catch (er) {
    res.render("peliculas", { error: er.message });
  }
};

// Crear un nuevo pelicula
export const crearPelicula = async (req, res) => {
    // const { nombre, descripcion, director, genero_id } = req.body;
    // try {
     
    //   const peliculas = await Pelicula.create({ nombre, descripcion, director, genero_id });
    //   const generos = await Genero.findAll();
    //   res.render('peliculas', { generos });
    //   res.redirect('/peliculas');
    
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }

    const { nombre, descripcion, director, genero_id } = req.body;
    try {
      // Crea la película
      await Pelicula.create({ nombre, descripcion, director, genero_id });
      console.log("Datos recibidos:", req.body);
      // Redirige a la lista de películas
      res.redirect('/peliculas');
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
};


// Listar todos los peliculas
export const listarPeliculas = async (req, res) => {
    try {
      const peliculas = await Pelicula.findAll({
        include:[{ model: Genero },Genero]
      });
      //const genero = await Genero.findAll();
      res.render('peliculas', { peliculas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};



// Editar una pelicula existente (vista de formulario de edición)
export const editarPeliculaVista = async (req, res) => {
  
    try {
      // Obtener la película y los géneros
      const pelicula = await Pelicula.findByPk(req.params.id);
      const generos = await Genero.findAll();

      if (!pelicula) {
          return res.status(404).send('Película no encontrada');
      }

      // Preparar los datos de la película y géneros
      const peliculaData = pelicula.get({ plain: true });
      const generosData = generos.map(genero => {
          const generoData = genero.get({ plain: true });
          return {
              ...generoData,
              selected: generoData.id === peliculaData.genero_id
          };
      });

      // Renderizar la vista con los datos de la película y géneros
      res.render('editarPelicula', { pelicula: peliculaData, generos: generosData });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// Actualizar un pelicula existente
export const editarPelicula = async (req, res) => {
    const { nombre, descripcion, director, genero_id } = req.body;
    try {
      await Pelicula.update({ nombre, descripcion, director, genero_id }, { where: { id: req.params.id } });
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Eliminar un pelicula
export const eliminarPelicula= async (req, res) => {
    const { id } = req.params;
    try {
      await Pelicula.destroy({ where: { id } });
      res.redirect('/peliculas');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Filtrar peliculas por genero
export const filtrarPeliculas = async (req, res) => {
  

    const { genero } = req.query; // Capturar el valor del campo de búsqueda
    try {
        const generoSeleccionado = await Genero.findOne({ where: { nombre: genero } });

        if (generoSeleccionado) {
            // Buscar películas que coincidan con el género seleccionado
            const peliculas = await Pelicula.findAll({
                where: { genero_id: generoSeleccionado.id },
                include: Genero
            });

            const generos = await Genero.findAll(); // Para que se sigan mostrando todos los géneros
            res.render('peliculas', { peliculas, generos });
        } else {
            // Si no se encuentra el género, mostrar un mensaje de error o una lista vacía
            const peliculas = [];
            const generos = await Genero.findAll();
            res.render('peliculas', { peliculas, generos });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


  
  


  
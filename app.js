import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './db/conexion.js';
import generosRoutes from './router/generos.js';
import peliculasRoutes from './router/peliculas.js';
import methodOverride from 'method-override';
import hbs from 'hbs';

dotenv.config();

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('peliculas'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', generosRoutes);
app.use('/', peliculasRoutes);

app.get('/', (req, res) => {
  res.render('peliculas'); // nombre del archivo .hbs en views
});

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    if (process.env.DB_HOST) {
      await sequelize.authenticate();
      console.log('Base de datos conectada.');
      await sequelize.sync({ alter: false });
    } else {
      console.log('No hay configuración de base de datos. Continuando sin conexión.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(`Error: ${error}`);
  }
};


main();

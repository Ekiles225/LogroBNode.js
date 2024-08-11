import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';
import Genero from './GeneroModel.js';

const Pelicula = sequelize.define('pelicula', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Genero,
      key: 'id'
    }
  }
}, {
  tableName: 'peliculas'
});

Pelicula.belongsTo(Genero, { foreignKey: 'genero_id' });

export default Pelicula;

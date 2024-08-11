import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';

const Genero = sequelize.define('genero', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'generos'
});

export default Genero;

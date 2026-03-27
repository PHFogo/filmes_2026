import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Aula extends Model {
  public id!: number;
  public materia!: string;
  public valor!: number;
  public descricao: string | undefined;
  public professorId!: number;
}

Aula.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    materia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "Aulas",
  },
);

User.hasMany(Aula, { foreignKey: "professorId", as: "aulas" });
Aula.belongsTo(User, { foreignKey: "professorId", as: "professor" });

export default Aula;

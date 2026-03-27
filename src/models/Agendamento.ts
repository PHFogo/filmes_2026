import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Aula from "./Aula";

class Agendamento extends Model {
  public id!: number;
  public alunoId!: number;
  public aulaId!: number;
  public data!: Date;
}

Agendamento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    aulaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Aulas",
        key: "id",
      },
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Agendamentos",
  },
);

User.hasMany(Agendamento, { foreignKey: "alunoId", as: "agendamentos" });
Agendamento.belongsTo(User, { foreignKey: "alunoId", as: "aluno" });
Aula.hasMany(Agendamento, { foreignKey: "aulaId", as: "agendamentos" });
Agendamento.belongsTo(Aula, { foreignKey: "aulaId", as: "aula" });

export default Agendamento;

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email: string | undefined;
  public password: string | undefined;
  public tipo: string | undefined; // 'aluno' ou 'professor'
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING
    },
    tipo: {
      type: DataTypes.ENUM('aluno', 'professor'),
      allowNull: false,
      defaultValue: 'aluno',
    },
  },
  {
    sequelize,
    tableName: "Users",
  },
);

export default User;
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public lastName: string | undefined;
  public email: string | undefined;
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
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    tableName: "Users",
  },
);

export default User;
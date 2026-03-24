import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Actor extends Model {
  public id!: number;
  public name!: string;
}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "Actors",
  },
);

export default Actor;
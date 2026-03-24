import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Genre extends Model {
  public id!: number;
  public name!: string;
}

Genre.init(
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
    tableName: "Genres",
  },
);

export default Genre;
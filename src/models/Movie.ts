import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Genre from "./Genre";

class Movie extends Model {
  public id!: number;
  public name!: string;
}

Movie.init(
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
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Genres",
        key: "id"
      }
    },
  },
  {
    sequelize,
    tableName: "Movies",
  },
);

Genre.hasMany(Movie, {
  foreignKey: "genreId",
  as: "movies"
});
Movie.belongsTo(Genre, {
  foreignKey: "genreId",
  as: "genre"
});

export default Movie;
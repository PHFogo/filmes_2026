import app from "./app";
import sequelize from "./config/database";
import "./models/User";
import "./models/Aula";
import "./models/Agendamento";

const port = process.env.PORT || 3000;

sequelize.sync({ alter: true });

app.listen(port, () => {
  console.log(`Servidor EduLivre rodando na porta ${port}`);
});
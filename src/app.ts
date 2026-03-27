import express, { Request, Response, Router } from 'express';
import rateLimit from 'express-rate-limit';
import UsersController from './controllers/users.controller';
import AulasController from './controllers/aulas.controller';
import AgendamentosController from './controllers/agendamentos.controller';
import AuthController from './controllers/auth.controller';
import "dotenv/config";
import authMiddleware from './middlewares/auth.middleware';
import User from './models/User';
import Aula from './models/Aula';

const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send("EduLivre API");
});

// autenticação
router.post('/login', AuthController.login);

// rotas de usuários (cadastro público, demais protegidas)
router.post('/usuarios', UsersController.create);
router.get('/usuarios', authMiddleware, UsersController.findAll);
router.get('/usuarios/:id', authMiddleware, UsersController.getById);
router.delete('/usuarios/:id', authMiddleware, UsersController.remove);
router.put('/usuarios/:id', authMiddleware, UsersController.update);

// listar professores (com suas aulas)
router.get('/professores', authMiddleware, async (req: Request, res: Response) => {
    const { materia } = req.query;
    const aulaWhere: any = {};
    if (materia) aulaWhere.materia = materia;

    const professores = await User.findAll({
        where: { tipo: 'professor' },
        attributes: ['id', 'name', 'email'],
        include: [{ model: Aula, as: 'aulas', where: Object.keys(aulaWhere).length ? aulaWhere : undefined, required: false }],
    });
    res.status(200).json(professores);
});

// rotas de aulas
router.get('/aulas', authMiddleware, AulasController.findAll);
router.post('/aulas', authMiddleware, AulasController.create);
router.get('/aulas/:id', authMiddleware, AulasController.getById);
router.delete('/aulas/:id', authMiddleware, AulasController.remove);
router.put('/aulas/:id', authMiddleware, AulasController.update);

// rotas de agendamentos
router.get('/agendamentos', authMiddleware, AgendamentosController.findAll);
router.post('/agendamentos', authMiddleware, AgendamentosController.create);
router.get('/agendamentos/:id', authMiddleware, AgendamentosController.getById);
router.delete('/agendamentos/:id', authMiddleware, AgendamentosController.remove);

app.use(router);

export default app;
import express from 'express';
import connect from './schemas/index.js';
import UsersRouter from './routes/users.router.js'

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: '메인 화면이야!어때 멋지지!빼앰!' });
});

app.use([UsersRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

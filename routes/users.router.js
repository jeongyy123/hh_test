import express from 'express';
import Users from '../schemas/users.schema.js';
import joi from 'joi';
import { Schema } from 'mongoose';

const router = express.Router();

const createUsersSchema = joi.object({
  name: joi.string().min(1).max(10).required(),
  email: joi.string().email().required(),
  pw: joi.string().min(1).max(10).required()
});

/**회원 전체 목록 조회**/
router.get('/user', async (req, res) => {
  try {
    const users = await Users.find().exec();

    if (!users) {
      return res.status(400).json({ errorMessage: "데이터가 없어요!" })
    };

    const usersArr = users.map(user => ({
      userId: user.userId,
      name: user.name,
      email: user.email,
      pw: user.pw
    }));

    return res.status(200).json(usersArr);
  } catch (error) {
    return res.status(400).json({ errorMessage: error })
  };
});

/**회원 상세 조회**/
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ errorMessage: "userId값을 입력해주세요!" })
    };

    const users = await Users.findById(userId).exec();
    if (!users) {
      return res.status(400).json({ errorMessage: "데이터가 없어요!" });
    };

    const usersArr = {
      userId: users.userId,
      name: users.name,
      email: users.email,
      pw: users.pw
    };

    return res.status(200).json(usersArr);
  } catch (error) {
    return res.status(400).json({ errorMessage: error })
  };
});

/**회원 등록**/
router.post('/user', async (req, res) => {
  try {
    const validation = await createUsersSchema.validateAsync(req.body);
    const { name, email, pw } = validation;
    const { userId } = req.params;

    if (!name) {
      return res.status(400).json({ errorMessage: "name을 입력해주세요!" })
    } else if (!email) {
      return res.status(400).json({ errorMessage: "email을 입력해주세요!" })
    } else if (!pw) {
      return res.status(400).json({ errorMessage: "pw를 입력해주세요!" })
    }

    const users = new Users({ name, email, pw });
    await users.save();

    return res.status(200).json({ message: "회원등록이 완료되었습니다." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  };
});

export default router;
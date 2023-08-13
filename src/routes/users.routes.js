import { Router } from 'express'
import { deleteUsers, getUserById, getUsers, postUsers, putUsers } from '../controllers/users.controller.js'

const router = Router();

router.get('/employees', getUsers);

router.get('/employees/:id', getUserById);

router.post('/employees', postUsers);

router.delete('/employees/:id', deleteUsers);

router.patch('/employees/:id', putUsers);

export default router;
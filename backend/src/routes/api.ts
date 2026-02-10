import { Router } from 'express';
import * as ListController from '../controllers/shopping-list-controller';
import * as ItemController from '../controllers/shopping-item-controller';

const router = Router();

// Lists
router.get('/lists', ListController.getLists);
router.post('/lists', ListController.createList);
router.get('/lists/:id', ListController.getList);
router.delete('/lists/:id', ListController.deleteList);

// Items
router.post('/lists/:listId/items', ItemController.addItem);
router.put('/items/:id', ItemController.updateItem);
router.delete('/items/:id', ItemController.deleteItem);

export default router;

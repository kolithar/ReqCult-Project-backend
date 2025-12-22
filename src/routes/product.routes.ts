import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { validateProduct } from '../validations/product.validation';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.post('/', authMiddleware, roleMiddleware('admin'), validateProduct, productController.createProduct);
router.put('/:id', authMiddleware, roleMiddleware('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.deleteProduct);

export default router;

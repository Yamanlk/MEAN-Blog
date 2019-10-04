import * as express from "express"
import * as articleController from "../../controllers/articleController"
export const router = express.Router();

router.get('/find/categories/', articleController.findArticleByCategories);
router.get('/find/user/:id', articleController.findArticleByUser);
router.post('/creat', articleController.creatArticle);
router.route('/:id')
.get(articleController.findArticleById)
.put(articleController.updateAtricle)
.delete(articleController.deleteAtricle);
router.get('/', articleController.getAtricles)

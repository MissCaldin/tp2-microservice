import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { deleteItem, getList, postItem, postList, putItem, putList } from '../../schemas';

async function lists(fastify: FastifyInstance) {


  fastify.get('/', getList, listsController.listLists)

  fastify.post('/', postList, listsController.addLists)

  fastify.put('/:id', putList , listsController.updateList);

  fastify.post('/:id/items', postItem , listsController.addItemToList);

  fastify.delete('/:listId/items/:itemId', deleteItem, listsController.deleteItemFromList);

  fastify.put ('/:listId/items/:itemId', putItem, listsController.updateItemInList);



}

export default lists
import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

  fastify.get('/', listsController.listLists)

  fastify.post('/', listsController.addLists)

  fastify.post('/lists/:id/items', listsController.addItemToList);

}

export default lists
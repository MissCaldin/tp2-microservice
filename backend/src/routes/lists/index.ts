import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

  fastify.addSchema({
    $id: 'ITodoList',
    type: 'object',
    properties: {
      id: { type: 'string' },
      description: { type: 'string' },
      todos: {
      type: 'array',
        items: { $ref: 'IItem#' },
      },
    },
  });
    
  fastify.addSchema({
    $id: 'IItem',
    type: 'object',
    properties: {
      id: { type: 'string' },
      description: { type: 'string' },
      state: { type: 'string', enum: ['pending', 'in-progress', 'done'] },
    },
  });

  fastify.get('/',{
    schema: {
      description: 'Récupère toutes les listes de tâches',
      tags: ['Lists'],
      response: {
        200: {
          description: 'Toutes les listes récupérées',
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: 'ITodoList#' } },
          },
        },
      },handler: listsController.listLists},
    },
    listsController.listLists)

  fastify.post('/', {
    schema: {
      description: 'Crée une nouvelle liste de tâches',
      tags: ['Lists'],
      body: { $ref: 'ITodoList#' },
      response: {
        201: {
          description: 'Nouvelle liste créée',
          type: 'object',
          properties: {
            data: { $ref: 'ITodoList#' },
          },
        },
      },handler: listsController.addLists},
    },
    listsController.addLists)

  fastify.put('/:id', {
    schema: {
      description: 'Mettre à jour une liste existante',
      tags: ['Lists'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'ITodoList#' },
      response: {
        200: {
          description: 'Liste mise à jour',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { $ref: 'ITodoList#' },
          },
        },
      },handler: listsController.updateList},
    },
    listsController.updateList);

  fastify.post('/:id/items', {
    schema: {
      description: 'Ajouter un item à une liste de tâches',
      tags: ['Lists', 'Items'],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: { $ref: 'IItem#' },
      response: {
        201: {
          description: 'Item ajouté',
          type: 'object',
          properties: {
            data: { $ref: 'ITodoList#' },
          },
        },
      },handler: listsController.addItemToList},
    },
    listsController.addItemToList);

  fastify.delete('/id/items/:id',{
    schema: {
      description: 'Supprime un item d’une liste',
      tags: ['Lists', 'Items'],
      params: {
        type: 'object',
        properties: {
          listId: { type: 'string' },
          itemId: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Item supprimé',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { $ref: 'ITodoList#' },
          },
        },
      },handler: listsController.deleteItemFromList,
    },},
    listsController.deleteItemFromList);

  fastify.put ('/:id/items/:id',{
    schema: {
      description: 'Mettre à jour un item dans une liste de tâches',
      tags: ['Lists', 'Items'],
      params: {
        type: 'object',
        properties: {
          listId: { type: 'string' },
          itemId: { type: 'string' },
        },
      },
      body: { $ref: 'IItem#' },
      response: {
        200: {
          description: 'Item mis à jour',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { $ref: 'ITodoList#' },
          },
        },
      },handler: listsController.updateItemInList},
    },
    listsController.updateItemInList);



}

export default lists
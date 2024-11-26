export const getList = {
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
      }
    },
}

export const postList = {
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
      },
    }
}

export const putList = {
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
      },
    }
}

export const postItem = {
    schema: {
      description: 'Ajouter un item à une liste de tâches',
      tags: ['Lists', 'Items'],
      params: {  type: 'object', properties: { id: { type: 'string' } } ,required: ['id']},
      body: { $ref: 'IItem#' },
      response: {
        201: {
          description: 'Item ajouté',
          type: 'object',
          properties: {
            data: { $ref: 'ITodoList#' },
          },
        },
      },
    }
}

export const deleteItem = {
    schema: {
      description: 'Supprime un item d’une liste',
      tags: ['Lists', 'Items'],
      params: {
        type: 'object',
        properties: {
          listId: { type: 'string'  },
          itemId: { type: 'string'  }
        },
        required: ['listId','itemId' ]
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
      },
    },
}

export const putItem = {
    schema: {
      description: 'Mettre à jour un item dans une liste de tâches',
      tags: ['Lists', 'Items'],
      params: {
        type: 'object',
        properties: {
          listId: { type: 'string' },
          itemId: { type: 'string' }
        },
        required: ['listId','itemId']
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
      },
    }
}

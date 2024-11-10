import { FastifyReply, FastifyRequest } from "fastify"
import { IItem, ITodoList } from "../interfaces"


export async function listLists(
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
    console.log('DB status', this.level.db.status)
    const listsIter = this.level.db.iterator()
  
    const result: ITodoList[] = []
    for await (const [key, value] of listsIter) {
      result.push(JSON.parse(value))
    }
    reply.send({ data: result })
  }
  

export async function addLists(
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
   const list = request.body as ITodoList
   const result = await this.level.db.put(
     list.id.toString(), JSON.stringify(list)
   )
   reply.send({ data: result })
  }


export async function updateList(
  request: FastifyRequest<{ Params: { id: string }; Body: ITodoList }>, // Typage explicite des params et du body
  reply: FastifyReply
) {
  const { id } = request.params; // Récupère l'ID de la liste depuis les paramètres
  const updatedList = request.body;

  try {
    // Vérifier si la liste existe dans la base de données
    let existingList;
    try {
      existingList = await this.level.db.get(id);
    } catch (error) {
      return reply.code(404).send({ message: 'List not found' });
    }

    const existingListParsed = JSON.parse(existingList);

    // Mettre à jour la liste dans la base de données
    const updatedListWithId = {
      id,
      ...existingListParsed,
      ...updatedList,
    };
    
    await this.level.db.put(id, JSON.stringify(updatedListWithId));

    // Réponse de succès
    reply.send({
      message: 'List updated successfully',
      data: updatedListWithId,
    });
  } catch (error) {
    // Gérer les erreurs
    const err = error as Error;
    reply.code(500).send({ message: 'Error updating list', error: err.message });
  }
}


export async function addItemToList(
  request: FastifyRequest<{ Params: { id: string }; Body: IItem }>,
  reply: FastifyReply
) {
    try {
      const { id } = request.params as { id: string} ; // Récupère l'ID de la liste depuis les paramètres de l'URL
      const newItem = request.body as IItem;
  
      // Vérifie si l'ID de la liste existe
      const listString = await this.level.db.get(id);
      const list = JSON.parse(listString) as ITodoList;
  
      if (!Array.isArray(list.todos)) {
        list.todos = [];
      }

  
      // Ajoute l'item à la liste
      list.todos.push(newItem);
      await this.level.db.put(id, JSON.stringify(list));
  
      // Renvoie la liste mise à jour
      reply.status(201).send({ data: list });
    } catch (error) {
      reply.status(500).send({ error: 'Error when trying to add the item' });
    }
  }

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

export async function addItemToList(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = request.params as { id: string} ; // Récupère l'ID de la liste depuis les paramètres de l'URL
      const newItem = request.body as IItem;
  
      // Vérifie si l'ID de la liste existe
      const listString = await this.level.db.get(id);
      const list = JSON.parse(listString) as ITodoList;
  
      if (!list) {
        return reply.status(404).send({ error: 'List not found' });
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
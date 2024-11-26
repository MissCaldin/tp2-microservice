//import { ListsApi } from 'todo-list-client'
//import { Def1StateEnum } from 'todo-list-client';
import axios from 'axios'
//const api = new ListsApi()

const lists = ['Work Tasks', 'Personal Tasks', 'Shopping List']
const listItems: Record<string, string[]> = {
    'Work Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Personal Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Shopping List': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter']
}

export const apiClient = {
    getLists: async () => {
        // return Promise.resolve(lists)
        // const api = new ListsApi()
        //return (await api.listsGet()).data as string[];
        return axios.get('http://localhost:3000/lists').then(res => res.data)

    },
    /*addList: async (listName: string) => {
        //lists.push(listName)
        //console.debug('-- addList', listName, lists);
        //return Promise.resolve(lists)
        try {
            const newList = { id: listName, description: listName, todos: [] };
            const response = await api.listsPost(newList);
            return response.data; // Renvoie la liste nouvellement créée
          } catch (error) {
            console.error('Erreur lors de l\'ajout de la liste', error);
            throw error;
          }
    },
    getTodos: async (listName: string): Promise<string[]> => {
        return Promise.resolve(listItems[listName])
    },
    addTodo: async (listId: string, todo: string) => {
        // console.debug('-- addTodo', listName, todo, listItems);
        // if (!listItems[listName]) {
        //     listItems[listName] = []
        // }
        // listItems[listName].push(todo)
        // return Promise.resolve(listItems[listName])
        try {
            const newTodo = { id: `${Date.now()}`, description: todo, state: Def1StateEnum.Pending }; // Remplir avec un ID unique
            const response = await api.listsIdItemsPost(listId, newTodo);
            return response.data as string[]; // Renvoie la liste mise à jour avec le nouvel élément ajouté
          } catch (error) {
            console.error(`Erreur lors de l'ajout de l'élément dans la liste ${listId}`, error);
            throw error;
          }
    }*/
}

export interface ITodoList {
  id: string
  description: string
  todos: IItem[]
}

type PENDING = "pending";
type INPROGRESS = "in-progress"
type DONE = "done"
type State = PENDING | INPROGRESS | DONE

export interface IItem {
id: string
description: string
state: State
}
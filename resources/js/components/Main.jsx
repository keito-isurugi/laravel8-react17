import { useState, useEffect, ChangeEvent } from "react"
import { client, postMethod } from './lib/axios'
import { createURLSearchParams } from './utils'

const WORK_IN_PROGRESS = '作業中'
const DONE = '完了'

export const Main = () => {
  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState('')
  const bindTodoNameValue = (event) => {
    setTodoName(event.target.value)
  }
  
  const fetchTodos = async () => {
    const { data } = await client.get('/api/fetch_todos')
    setTodos(data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const pushTodo = () => {
    const params = createURLSearchParams([
      ['name', todoName],
      ['status', WORK_IN_PROGRESS],
    ])
    postMethod('/api/push_todo', params).then((_response) => fetchTodos())
  }

  const changeStatus = (id, status) => {
    const statusParam = status === WORK_IN_PROGRESS ? DONE : WORK_IN_PROGRESS
    const params = createURLSearchParams([
      ['id', id],
      ['status', statusParam],
    ])
    postMethod('/api/change_status', params).then((_response) => fetchTodos())
  }

  const deleteTodo = (id) => {
    const params = createURLSearchParams([['id', id]])
    postMethod('/api/delete_todo', params).then((_response) => fetchTodos())
  }

  // ログインお試し
  // useEffect(() => {
  //   axios.post('/api/login', {
  //     email: 'tanaka@email.com',
  //     password: 'admin'
  //   }).then(response => {
  //     console.log(response)
  //   })
  // })


  return (
    <>
      <p>タスクを追加する</p>
      <input onChange={bindTodoNameValue} type="text" />
      <button onClick={pushTodo}>追加する</button>
      <ul>
        {todos.length > 0 &&
          todos.map(({ id, name, status }, index) => {
            return (
              <li key={id}>
                <p>Index:{index + 1}</p>
                <p>タスク名:{name}</p>
                <p>状況:{status}</p>
                <button onClick={() => changeStatus(id, status)}>
                  変更する
                </button>
                <button onClick={() => deleteTodo(id)}>削除する</button>
              </li>
            )
          })}
      </ul>
    </>
  )
}
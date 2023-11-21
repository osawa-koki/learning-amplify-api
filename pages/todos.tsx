import React, { useEffect, useState } from 'react'

import { Alert, Spinner, Table } from 'react-bootstrap'

import { listTodos } from '../src/graphql/queries'

import { graphqlClient } from './_app'
import { type Todo } from '../src/API'

export default function Todos (): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[] | null | Error>(null)

  useEffect(() => {
    graphqlClient.graphql({ query: listTodos })
      .then((result) => {
        setTodos(result.data.listTodos.items)
      })
      .catch((err) => {
        console.error(err)
        setTodos(err)
      })
  }, [])

  if (todos == null) {
    return (
      <div className='d-flex justify-content-between'>
        <Spinner animation='border' variant='primary' />
        <Spinner animation='border' variant='secondary' />
        <Spinner animation='border' variant='success' />
        <Spinner animation='border' variant='danger' />
        <Spinner animation='border' variant='warning' />
      </div>
    )
  }

  if (todos instanceof Error) {
    return (
      <Alert variant='danger'>
        {todos.message}
      </Alert>
    )
  }

  return (
    <>
      <h1>Todo List</h1>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

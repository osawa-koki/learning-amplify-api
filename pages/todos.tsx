import React, { useEffect, useMemo, useState } from 'react'

import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'

import { listTodos } from '../src/graphql/queries'

import { graphqlClient } from './_app'
import { type Todo } from '../src/API'
import { createTodo } from '../src/graphql/mutations'

export default function Todos (): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[] | null | Error>(null)

  const load = (): void => {
    graphqlClient.graphql({ query: listTodos })
      .then((result) => {
        setTodos(result.data.listTodos.items.sort((a, b) => {
          if (a.createdAt == null || b.createdAt == null) return 0
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        }))
      })
      .catch((err) => {
        console.error(err)
        setTodos(err)
      })
  }

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const createButtonDisabled = useMemo(() => {
    return name === '' || description === ''
  }, [name, description])

  const create = async (): Promise<void> => {
    setIsLoading(true)

    const data = {
      name,
      description
    }
    try {
      await graphqlClient.graphql({
        query: createTodo,
        variables: { input: data }
      })
      setName('')
      setDescription('')
      load()
    } catch (err) {
      console.error('error creating todo:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td></td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control type='text' placeholder='Enter name' value={name} onChange={(event) => { setName(event.target.value) }} />
            </td>
            <td>
              <Form.Control as='textarea' placeholder='Enter description' value={description} onChange={(event) => { setDescription(event.target.value) }} />
            </td>
            <td>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <Button variant='primary' onClick={create} disabled={createButtonDisabled || isLoading}>
                Create
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

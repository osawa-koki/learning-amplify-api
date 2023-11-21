import React, { useMemo, useState } from 'react'

import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

import { Button, Form } from 'react-bootstrap'

import config from '../src/amplifyconfiguration.json'

import { createTodo } from '../src/graphql/mutations'

Amplify.configure(config)
const client = generateClient()

export default function Create (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const buttonDisabled = useMemo(() => {
    return name === '' || description === ''
  }, [name, description])

  const create = async (): Promise<void> => {
    setIsLoading(true)

    const data = {
      name,
      description
    }
    try {
      await client.graphql({
        query: createTodo,
        variables: { input: data }
      })
      setName('')
      setDescription('')
    } catch (err) {
      console.error('error creating todo:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1>Create</h1>
      <Form.Group className='mt-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter name'
          value={name}
          onChange={(event) => { setName(event.target.value) }}
        />
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          placeholder='Enter description'
          value={description}
          onChange={(event) => { setDescription(event.target.value) }}
        />
      </Form.Group>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button variant='primary' className='mt-3' onClick={create} disabled={buttonDisabled || isLoading}>
        Submit
      </Button>
    </>
  )
}

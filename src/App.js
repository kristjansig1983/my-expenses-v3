import { useState, useRef, useEffect } from 'react'
import './App.css'
import styled, { css } from 'styled-components'
import { v4 as uuid } from 'uuid'
import { postExpenses, getExpenses, deleteExpenses } from './api'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Expense = () => {
  const [data, setData] = useState()
  const [error, setError] = useState(false)

  const handleGetExpenses = async () => {
    const body = await getExpenses()
    if (body) {
      setData(body.map((b) => b.id))
      setError('')
    } else {
      setError('Invalid input')
    }
  }

  useEffect(() => {
    handleGetExpenses
  }, [])

  const [name, setName] = useState('')
  const [cost, setCost] = useState(0)
  const [id, setId] = useState('')

  const handleSubmit = () => {
    postExpenses({
      name,
      cost,
    })
  }

  const handleDelete = async () => {
    const f = await deleteExpenses(id)
  }

  return (
    <Page>
      <Form>
        <Input>
          <p>Name: </p>
          <Field
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name}
            onFocus={() => {
              setError(false)
            }}
          />
        </Input>
        <Input>
          <p>Value: </p>
          <Field
            onChange={(e) => {
              setCost(e.target.value)
            }}
            value={cost}
            onFocus={() => {
              setError(false)
            }}
          />
        </Input>
        <Button type='button' onClick={handleSubmit}>
          Submit!
        </Button>
        {error && <p>{error}</p>}
        <Button type='button' onClick={handleGetExpenses}>
          Get Expenses!
        </Button>
        <div>{data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}</div>
      </Form>
      <Cardlist>
        <Card>
          <Delete type='button' onClick={handleDelete}>
            Delete
          </Delete>
        </Card>
      </Cardlist>
    </Page>
  )
}

const Page = styled.div`
  text-align: center;
  background-color: #282c34;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  height: 100vh;
`

const Field = styled.input`
  height: 20px;
  width: 200px;
  display: flex;
  justify-items: right;
`
const Form = styled.div`
  flex-direction: column;
  font-size: 18px;
  color: azure;
  margin-left: 20px;
  margin-right: 100px;
`
const Button = styled.button`
  height: 30px;
  width: 200px;
  margin-top: 8px;
  background-color: blue;
  align-self: center;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`
const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-content: right;
  color: white;
`
const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Card = styled.div`
  background-color: blueviolet;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  height: 100px;
  width: 300px;
  font-size: x-large;
`
const Delete = styled.button`
  width: 60px;
  height: 20px;
`
const Cardlist = styled.div`
  display: flex;
  flex-direction: column;
`
export default Expense

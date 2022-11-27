import { useState, useRef } from 'react'
import './App.css'
import styled, { css } from 'styled-components'
import { v4 as uuid } from 'uuid'

const App = () => {
  const [objectList, setObjectList] = useState([])
  const [error, setError] = useState(false)

  const nameValue = useRef('')
  const valueValue = useRef('')

  const handleClick = () => {
    if (nameValue.current.value && Number(valueValue.current.value)) {
      setObjectList((list) => [
        ...list,
        {
          key: uuid(),
          name: nameValue.current.value,
          value: valueValue.current.value,
        },
      ])
      setError('')
    } else {
      setError('Invalid input')
    }
  }

  return (
    <Page>
      <Form>
        <Input>
          <p>Name: </p>
          <Field
            ref={nameValue}
            onChange={(event) => {
              nameValue.current.value = event.target.value
            }}
            onFocus={() => {
              setError(false)
            }}
          />
        </Input>
        <Input>
          <p>Value: </p>
          <Field
            ref={valueValue}
            onChange={(event) => {
              valueValue.current.value = event.target.value
            }}
            onFocus={() => {
              setError(false)
            }}
          />
        </Input>
        <Button type='button' onClick={handleClick}>
          Submit!
        </Button>
        {error && <p>{error}</p>}
      </Form>
      <Cardlist>
        {objectList.map((item) => (
          <Card key={objectList.key}>
            <Items>
              <p>{item.name} </p>
            </Items>
            <Items>
              <p>{item.value}</p>
            </Items>
            <Delete
              type='button'
              onClick={() =>
                setObjectList((li) => li.filter((i) => i.key !== item.key))
              }
            >
              Delete
            </Delete>
          </Card>
        ))}
      </Cardlist>
      <Items>
        <p>Sum:</p>
        <p>
          {objectList.reduce(
            (previousValue, currentValue) =>
              previousValue + Number(currentValue.value),
            0
          )}
        </p>
      </Items>
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
export default App

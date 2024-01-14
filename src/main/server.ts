import app from './config/app'

interface Person {
  name: string
  cpf: string
  friends: string[]
}

global.personCollection = [] as Person[]

app.listen(3000, () => { console.log('Server running at http://localhost:3000') })

import request from 'supertest'
import app from '../config/app'

describe('CreatePerson Routes', () => {
  test('should return an person on success', async () => {
    await request(app)
      .post('/person')
      .send({
        name: 'Andre',
        cpf: '92837493847'
      })
      .expect(200)
  })
})

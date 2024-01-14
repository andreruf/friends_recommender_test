import request from 'supertest'
import app from '../config/app'

describe('LoadPerson Routes', () => {
  test('should return not found if person do not exists', async () => {
    await request(app)
      .get('/person/22222222222')
      .expect(404)
  })

  test('should return a person on success', async () => {
    await request(app)
      .post('/person')
      .send({
        name: 'Andre',
        cpf: '22222222222'
      })

    await request(app)
      .get('/person/22222222222')
      .expect(200)
  })
})

import request from 'supertest'
import app from '../config/app'

describe('Create relationship Routes', () => {
  test('should return not found if person do not exists', async () => {
    await request(app)
      .get('/relationship')
      .send({
        cpf1: '22222222222',
        cpf2: '11111111111'
      })
      .expect(404)
  })

  test('should return 200 on success', async () => {
    await request(app)
      .post('/person')
      .send({
        name: 'Andre',
        cpf: '22222222222'
      })
    await request(app)
      .post('/person')
      .send({
        name: 'Rufino',
        cpf: '11111111111'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '22222222222',
        cpf2: '11111111111'
      })
      .expect(200)
  })
})

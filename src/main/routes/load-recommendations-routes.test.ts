import request from 'supertest'
import app from '../config/app'

describe('Load recommendations Routes', () => {
  test('should return not found if person do not exists', async () => {
    await request(app)
      .get('/relationship')
      .send({
        cpf1: '22222222222',
        cpf2: '11111111111'
      })
      .expect(404)
  })

  test('should return friends of friends recomendation on success', async () => {
    await request(app)
      .post('/person')
      .send({
        name: 'A',
        cpf: '11111111111'
      })

    await request(app)
      .post('/person')
      .send({
        name: 'B',
        cpf: '22222222222'
      })

    await request(app)
      .post('/person')
      .send({
        name: 'C',
        cpf: '33333333333'
      })

    await request(app)
      .post('/person')
      .send({
        name: 'D',
        cpf: '44444444444'
      })

    await request(app)
      .post('/person')
      .send({
        name: 'E',
        cpf: '55555555555'
      })

    await request(app)
      .post('/person')
      .send({
        name: 'D',
        cpf: '44444444444'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '11111111111',
        cpf2: '22222222222'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '11111111111',
        cpf2: '33333333333'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '22222222222',
        cpf2: '44444444444'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '33333333333',
        cpf2: '44444444444'
      })

    await request(app)
      .post('/relationship')
      .send({
        cpf1: '33333333333',
        cpf2: '55555555555'
      })

    const response = await request(app)
      .get('/recommendations/11111111111')

    expect(response.body).toEqual(['44444444444','55555555555'])
  })
})

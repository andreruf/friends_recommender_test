import request from 'supertest'
import app from '../config/app'

describe('Clean Routes', () => {
  test('should return 200 on success', async () => {
    await request(app)
      .delete('/clean')
      .expect(200)
  })
})

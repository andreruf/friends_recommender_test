import { CpfValidatorAdapter } from './cpf-validator-adapter'

describe('CpfValidatorAdapter', () => {
  test('should return false if cpf length is not equals to 11', () => {
    const sut = new CpfValidatorAdapter()
    const isValid = sut.isValid('1234567')
    expect(isValid).toBe(false)
  })

  test('should return false if cpf contains any non-numeric character', () => {
    const sut = new CpfValidatorAdapter()
    const isValid = sut.isValid('123456789AA')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true ', () => {
    const sut = new CpfValidatorAdapter()
    const isValid = sut.isValid('12345678912')
    expect(isValid).toBe(true)
  })
})

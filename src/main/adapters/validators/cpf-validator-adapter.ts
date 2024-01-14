import { type CpfValidator } from '../../../presentation/protocols'

export class CpfValidatorAdapter implements CpfValidator {
  isValid (cpf: string): boolean {
    const isNumber = /^\d+$/.test(cpf)

    return Boolean(cpf.length === 11 && isNumber)
  }
}

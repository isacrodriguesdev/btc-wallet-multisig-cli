
import { AxiosControllerAdapter } from "../infra/axios/AxiosControllerAdapter"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"
import { SignSerializedTransactionUseCase } from "../useCases/SignSerializedTransaction/SignSerializedTransactionUseCase"

export function SignSerializedTransactionFactory() {

  const axiosControllerAdapter = new AxiosControllerAdapter()
  const bcoinControllerAdapter = new BitcoreControllerAdapter()

  return new SignSerializedTransactionUseCase(bcoinControllerAdapter)
}
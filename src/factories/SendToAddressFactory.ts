
import { AxiosControllerAdapter } from "../infra/axios/AxiosControllerAdapter"
import { BitcoreControllerAdapter } from "../infra/bitcore/BitcoreControllerAdapter"
import { SendToAddressUseCase } from "../useCases/SendToAddress/SendToAddressUseCase"

export function SendToAddressFactory() {

  const axiosControllerAdapter = new AxiosControllerAdapter()
  const bcoinControllerAdapter = new BitcoreControllerAdapter()

  return new SendToAddressUseCase(axiosControllerAdapter, bcoinControllerAdapter)
}
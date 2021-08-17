
import { AxiosControllerAdapter } from "../infra/axios/AxiosControllerAdapter"
import { GetUtxosUseCase } from "../useCases/GetUtxos/GetUtxosUseCase"

export function GetUtxosFactory() {

  const axiosControllerAdapter = new AxiosControllerAdapter()

  return new GetUtxosUseCase(axiosControllerAdapter)
}
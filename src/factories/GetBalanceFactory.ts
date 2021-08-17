import { GetBalanceWalletUseCase } from "../useCases/GetBalance/GetBalanceUseCase"
import { AxiosControllerAdapter } from "../infra/axios/AxiosControllerAdapter"

export function GetBalanceFactory() {

  const axiosControllerAdapter = new AxiosControllerAdapter()

  return new GetBalanceWalletUseCase(axiosControllerAdapter)
}
import fs from "fs"
import path from "path"

interface IGetWalletsUseCase {
  data: {
    privatekey: string
  }
  copayers: string[]
  network: string,
  error?: boolean
}

export class GetWalletsUseCase {

  public execute(filename: string = "wallets", extension = "json"): IGetWalletsUseCase {

    const objState = {
      data: {
        privatekey: ""
      },
      copayers: [],
      network: ""
    }

    const rPath = path.resolve(`${filename}.${extension}`)

    if (!fs.existsSync(rPath)) {
      return { ...objState, error: true }
    }

    const dataRead = fs.readFileSync(rPath, "utf-8")
    return JSON.parse(dataRead)
  }
}
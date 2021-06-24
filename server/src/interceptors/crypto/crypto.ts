import { AES, enc } from "crypto-js";

export class myCrypt {
  static encrypt(data: any) {
    return AES.encrypt(
      JSON.stringify(data),
      process.env.JWT_CRYPTOKEY as string,
    ).toString();
  }

  static decrypt(data: any) {
    return AES.decrypt(data, process.env.JWT_CRYPTOKEY as string).toString(enc.Utf8);
  }
}

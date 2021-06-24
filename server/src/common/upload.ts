import * as fs from "fs";
import * as path from "path";

export function assetFile(directory: string): string {
  return path.join(`${__dirname}/../assets/`, directory);
}

export function createFileWithBuffer(directory: string, base64: string) {
  const buff = Buffer.from(base64, "base64");
  fs.writeFileSync(assetFile(directory), buff);
}

export function deleteFilesWithListName(directory: [string]) {
  const result = directory.map((pathName) => {
    fs.unlink(assetFile(pathName), (error) => {
      if (error) {
        console.error("file not found " + pathName);
      }
    });
  });
}

export async function createDirSync(directory: string) {
  await fs.mkdir(assetFile(directory), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

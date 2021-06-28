import * as path from "path"
import { bootstrap } from './bootstrap'

require('dotenv').config({ path: path.join(__dirname, "../../.env") })

// import { appValidationRequestPipe } from '@/server/src/common/ValidationPipe'

const main = async () => {
  const app = await bootstrap();
  app.listen(process.env.DEV_SERVER_PORT as string).then(() => {
    console.log("server laucnh on port " + process.env.DEV_SERVER_PORT);
  });
}

main();


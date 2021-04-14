import { accessLogger } from "../../config/logger";

export const init = app => {
  app.use(accessLogger())
}
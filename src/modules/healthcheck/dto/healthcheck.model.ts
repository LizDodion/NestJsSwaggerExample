import { Expose } from "class-transformer";

export class Message {
  @Expose()
  message: string;

  @Expose()
  dateTime: Date;
}

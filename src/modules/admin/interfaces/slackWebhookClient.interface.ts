import { Expose } from 'class-transformer';

export interface SlackWebhookClientSendParams {
  channel: string;
  text: string;
}

export class SlackWebhookSendResponse {
  @Expose()
  message: string;
}

export interface SlackWebhookClient {
  send(params: SlackWebhookClientSendParams): Promise<SlackWebhookSendResponse>;
}

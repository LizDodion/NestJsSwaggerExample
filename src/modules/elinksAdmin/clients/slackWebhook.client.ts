import pyneaFetch from '../../common/utils/pyneaFetch';
import {
  SlackWebhookClient,
  SlackWebhookClientSendParams,
  SlackWebhookSendResponse,
} from '../interfaces/slackWebhookClient.interface';

export class SlackWebookClient implements SlackWebhookClient {
  constructor(private readonly endpoint: string) {}

  async send(
    input: SlackWebhookClientSendParams,
  ): Promise<SlackWebhookSendResponse> {
    await pyneaFetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return { message: input.text };
  }
}

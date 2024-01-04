import {
  SlackWebhookClient,
  SlackWebhookClientSendParams,
  SlackWebhookSendResponse,
} from "../interfaces/slackWebhookClient.interface";
import elinksFetch from "@api-core/modules/common/utils/elinksFetch";

export class SlackWebookClient implements SlackWebhookClient {
  constructor(private readonly endpoint: string) {}

  async send(
    input: SlackWebhookClientSendParams
  ): Promise<SlackWebhookSendResponse> {
    await elinksFetch(this.endpoint, {
      method: "POST",
      body: JSON.stringify(input),
    });
    return { message: input.text };
  }
}

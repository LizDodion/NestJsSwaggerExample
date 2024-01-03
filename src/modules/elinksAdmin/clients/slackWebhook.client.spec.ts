import { SlackWebookClient } from './slackWebhook.client';

global.fetch = jest.fn();

const testData = {
  webhookUrl: 'some-endpoint-url',
  slackText: 'test-slack',
  slackChannel: 'test-channel',
};

jest.mock('../../common/utils/pyneaFetch');

describe('SlackWebhookClient', () => {
  it('should be defined', () => {
    const mockSlackWebhookClient = new SlackWebookClient(testData.webhookUrl);
    expect(mockSlackWebhookClient).toBeDefined();
  });

  it('should send a slack message', async () => {
    const mockSlackWebhookClient = new SlackWebookClient(
      testData.webhookUrl,
    ) as any;

    const result = await mockSlackWebhookClient.send({
      channel: testData.slackChannel,
      text: testData.slackText,
    });

    expect(result).toEqual({
      message: testData.slackText,
    });
  });
});

import { testApiHandler } from 'next-test-api-route-handler';
import endpoint, { config } from '../../../pages/api/hello/[user_id]';
import { PageConfig } from 'next';

// Respect the Next.js config object if it's exported
const handler = endpoint;
handler.config = config;


test("200", async () => {
  // https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816
  await testApiHandler({
    handler,
    url: "/api/hello/1",
    params: {'user_id': '1'},
    test: async ({ fetch }) => {
      const res = await fetch({method: 'GET'});
      await expect(res.json())
        .resolves
        .toStrictEqual({
          'text': 'id: 1',
        });
    },
  });
});

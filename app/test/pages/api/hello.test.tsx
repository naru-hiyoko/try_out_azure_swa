import { testApiHandler } from 'next-test-api-route-handler';
import endpoint, { config } from '../../../pages/api/hello';
import { PageConfig } from 'next';

// Respect the Next.js config object if it's exported
const handler = endpoint;
handler.config = config;


test("200", async () => {
  await testApiHandler({
    handler,
    url: "/api/hello",
    test: async ({ fetch }) => {
      const res = await fetch({method: 'GET'});
      await expect(res.json())
        .resolves
        .toStrictEqual({
          'text': 'Hello',
        });
    },
  });
});

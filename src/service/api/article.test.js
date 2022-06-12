const app = require('./index');
const request = require(`supertest`);

test(`Should had properties id and title`, async () => {
  const res = await request(app).get(`/api/categories`);
  console.log('res: ', res)
  expect(res.body).toHaveProperty(`id`);
  expect(res.body).toHaveProperty(`title`);
});

const request = require('supertest');

const port = 3004;

describe('/api/img_carousel/:id', () => {
  const id = Math.floor(Math.random() * (100 - 1) + 1);
  it('makes a successful API call', (done) => {
    request(`localhost:${port}`)
      .get(`/api/img_carousel/${id}`)
      .expect(200, done);
  });

  it('brings back some appriopriate data ', (done) => {
    request(`localhost:${port}`)
      .get(`/api/img_carousel/${id}`)
      .expect((res) => {
        res.body[0].id = id;
      })
      .expect(200, done);
  });
});

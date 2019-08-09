import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';
import issueOpen from '../fixtures/github/issueOpened';

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('Events receivers', () => {
  describe('Post /api/events/github', () => {
    it('should handle issue open event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueOpen)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

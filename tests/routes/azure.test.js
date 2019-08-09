import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';
import userStory from '../fixtures/azure/userStory';

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('Events receivers', () => {
  describe('Post /api/events/azure', () => {
    it('should handle issue open event', (done) => {
      chai.request(app)
        .post('/api/events/azure')
        .send(userStory)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

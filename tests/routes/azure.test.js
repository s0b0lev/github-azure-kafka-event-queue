import chai from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import app from '../../src/server';
import workitemCreated from '../fixtures/azure/workitemCreated';
import workitemUpdated from '../fixtures/azure/workitemUpdated';
import workitemDeleted from '../fixtures/azure/workitemDeleted';
import workitemRestored from '../fixtures/azure/workitemRestored';

chai.use(chaiHttp);
chai.should();


describe('Azure devops events receivers', () => {
  describe('Post /api/events/azure', () => {
    it('handle workitem create event', (done) => {
      chai.request(app)
        .post('/api/events/azure')
        .auth(config.AZURE_USERNAME, config.AZURE_PASSWORD)
        .send(workitemCreated)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Post /api/events/azure', () => {
    it('should handle issue updated event', (done) => {
      chai.request(app)
        .post('/api/events/azure')
        .auth(config.AZURE_USERNAME, config.AZURE_PASSWORD)
        .send(workitemUpdated)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Post /api/events/azure', () => {
    it('should handle issue deleted event', (done) => {
      chai.request(app)
        .post('/api/events/azure')
        .auth(config.AZURE_USERNAME, config.AZURE_PASSWORD)
        .send(workitemDeleted)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Post /api/events/azure', () => {
    it('should handle issue restored event', (done) => {
      chai.request(app)
        .post('/api/events/azure')
        .auth(config.AZURE_USERNAME, config.AZURE_PASSWORD)
        .send(workitemRestored)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

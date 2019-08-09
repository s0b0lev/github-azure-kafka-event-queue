import chai from 'chai';
import chaiHttp from 'chai-http';
import crypto from 'crypto';

import config from '../../config';
import app from '../../src/server';

import issueOpen from '../fixtures/github/issueOpened';
import issueClose from '../fixtures/github/issueClosed';
import issueUpdated from '../fixtures/github/issueUpdated';
import issueCommented from '../fixtures/github/issueCommented';
import issueReopened from '../fixtures/github/issueReopened';

chai.use(chaiHttp);
chai.should();

// Configure secret
const githubSecret = (body) => {
  const payload = JSON.stringify(body);
  const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET || config.GITHUB_SECRET);
  const payloadHex = hmac.update(payload).digest('hex');
  return `sha1=${payloadHex}`;
};

describe('Github events handlers', () => {
  describe('Post /api/events/github', () => {
    it('should handle issue open event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueOpen)
        .set('X-Hub-Signature', githubSecret(issueOpen))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should handle issue close event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueClose)
        .set('X-Hub-Signature', githubSecret(issueClose))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should handle issue updated event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueUpdated)
        .set('X-Hub-Signature', githubSecret(issueUpdated))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should handle issue commented event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueCommented)
        .set('X-Hub-Signature', githubSecret(issueCommented))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should handle issue reopened event', (done) => {
      chai.request(app)
        .post('/api/events/github')
        .send(issueReopened)
        .set('X-Hub-Signature', githubSecret(issueReopened))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

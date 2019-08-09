import crypto from 'crypto';
import config from '../../config';

export default (req, res, next) => {
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET || config.GITHUB_SECRET);

  const payloadHex = hmac.update(payload).digest('hex');
  const digest = `sha1=${payloadHex}`;
  const checksum = req.get('X-Hub-Signature');

  if (!checksum || !digest || checksum !== digest) {
    return next(`Request body digest (${digest}) did not match 'X-Hub-Signature' (${checksum})`);
  }
  return next();
};

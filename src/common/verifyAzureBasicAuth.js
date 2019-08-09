import auth from 'http-auth';
import config from '../../config';


const basic = auth.basic({ realm: 'Web.' }, (username, password, callback) => {
  callback(username === config.AZURE_USERNAME && password === config.AZURE_PASSWORD);
});

export default auth.connect(basic);

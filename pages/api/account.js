import { accountService } from 'services';
import axios from 'axios'
async function handleAccountLogin(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  let { username, password } = JSON.parse(req.body)
   let response = await axios.post("https://wb94xm7q2j.execute-api.ap-south-1.amazonaws.com/dev/api/login",{email:username, password:password});
  res.json(response.data)

}

export default handleAccountLogin
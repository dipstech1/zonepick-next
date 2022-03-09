import { fetchWrapper } from 'helpers';

function handleAccountLogin(req,res){
    console.log(req.body);
   if(req.method !== 'POST'){
       res.status(405).end();
       return;
   }
   return fetchWrapper.post(`${baseUrl}/api/login`, { username, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

export default handleAccountLogin
import {accountService } from 'services';

async function handleAccountLogin(req,res){
   if(req.method !== 'POST'){
       res.status(405).end();
       return;
   }
   console.log(req.body.username, req.body.password);
   return  accountService.login(req.body.username, req.body.password)
   
}

export default handleAccountLogin
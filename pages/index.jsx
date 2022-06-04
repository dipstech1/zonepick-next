import Layout from '../components/layout';
import { useRouter } from 'next/router'
import { useEffect } from "react";

const Index = () => {

  const router = useRouter()

  useEffect(() => {
    const {pathname} = router
    // conditional redirect
    if(pathname == '/' ){        
      router.push('/home')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <Layout title="Index Page">
      
      <div id="pageContainer" className="d-flex align-items-center justify-content-center">
        <h1>Index Page</h1>
      </div>
    </Layout>
  );
};

export default Index;

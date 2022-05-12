import Layout from '../../components/layout';
import withAuthWraper from '../../components/withAuthWraper';


const Settings = () => {
  return (
    <Layout title="Setting Page">
      <div id="pageContainer" className="d-flex align-items-center justify-content-center">
        <h1>Settings Page</h1>
      </div>
    </Layout>
  );
};


export default withAuthWraper(Settings);

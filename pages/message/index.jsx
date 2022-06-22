import Layout from "../../components/layout";
const Message = () => {
    return( <Layout title="Message Page">
    <div id='pageContainer' className='d-flex align-items-center justify-content-center'>
        <h1>Message Page</h1>

        <button type="button" className="btn btn-primary position-relative">
  Inbox
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span className="visually-hidden">unread messages</span>
  </span>
</button>


    </div>
</Layout>)
}

export default Message
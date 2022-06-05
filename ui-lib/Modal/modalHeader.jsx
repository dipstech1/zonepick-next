export default function ModalHeader(props) {
    return (
      <div className="modal-header" style={{padding:'0.5rem 1rem'}}>
        { props.children }
      </div>
    );
  }
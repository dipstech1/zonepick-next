const ModalService = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  open(component, props = {}, modalClass='modal-md') {
    document.dispatchEvent(new CustomEvent('open', { detail: { component, props , modalClass} }));
  }
};

export default ModalService;

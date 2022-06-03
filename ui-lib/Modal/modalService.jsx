const ModalService = {
    on(event, callback) {
      document.addEventListener(event, (e) => callback(e.detail));
    },
    open(component, props = {}) {
      document.dispatchEvent(new CustomEvent('open', { detail: { component, props } }));   
      console.log(props)
    },
  };
  
  export default ModalService;
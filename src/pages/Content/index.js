import { FETCH_DATA, FILL_FORM } from '../../constants';
import { log } from './modules/print';

log('The extension has been loaded successfully!');

const port = chrome.runtime.connect({ name: "my-extension" });

const onMessageReceived = ({ type, payload }) => {
  switch (type) {
    case FILL_FORM: {
      document.querySelector('input[type="email"]').value = 'test'
      break;
    }
    case FETCH_DATA: {
      console.log('got data with ', payload)
      break;
    }

    default:
      return;
  }
}

port.onMessage.addListener(onMessageReceived);

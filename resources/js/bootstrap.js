import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Import Bootstrap JS for dropdown functionality
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import createStore from 'unistore';
import devtools from 'unistore/devtools';

const initial_state = {
    current_url: ''
};

export const store = devtools(createStore(initial_state));

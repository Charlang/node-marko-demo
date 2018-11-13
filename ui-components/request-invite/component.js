'use strict';

const { getStore } = require('./reducer/root');

module.exports = {
    onInput(input) {
        this.state = {
            i18n: input.i18n,
            csrfToken: input.csrfToken,
            inputs: getStore().getState()
        };
    },
    onMount() {
        this.store = getStore();
        this.store.subscribe(() => this.state.inputs = this.store.getState());
        this.timeout = {};
    },
    handleShowRequestClick() {
        this.store.dispatch({ type: 'START' });
    },
    handleCloseOverlay(event) {
        const className = event.target.className;
        if (className !== 'request-overlay'
            && className !== 'cancel') {
            return;
        }
        this.store.dispatch({ type: 'RESET' });
    },
    handleInputChange(type, event) {
        this.store.dispatch({ type, value: event.target.value });
    },
    deBounceInputTyping(type, event) {
        if (this.timeout[type]) {
            clearTimeout(this.timeout[type]);
        }
        this.timeout[type] = setTimeout(() => {
            this.store.dispatch({ type, value: event.target.value });
            delete this.timeout[type];
        }, 228);
    },
    handleSubmit() {
        const { status, name, email, nameErr, emailErr, emailConfirmed } = this.store.getState();
        if (status === 'SENDING') {
            return;
        }
        if (status === 'SUCCESS') {
            this.store.dispatch({ type: 'RESET' });
            return;
        }
        this.store.dispatch({ type: 'SUBMIT' });
        if (nameErr || emailErr || !emailConfirmed) {
            return;
        }
        const { sendInvite } = require('../utils/fetch');
        this.store.dispatch({ type: 'SENDING' });
        return sendInvite({ name, email, _csrf: this.state.csrfToken }).then((res) => {
            if (res.status === 200) {
                this.store.dispatch({ type: 'SUCCESS' });
            } else {
                this.store.dispatch({ type: 'ERR', value: res.body });
                this.store.dispatch({ type: 'START' });
            }
        }).catch(() => this.store.dispatch({ type: 'START' }));
    }
};

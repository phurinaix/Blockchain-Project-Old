const WAValidator = require('wallet-address-validator');

const validateStudentInfo = (name, id) => {
    if (!(/^[A-Za-z]+$/.test(name))) {
        return 'name1';
    }
    if (!(/^\d+$/.test(id))) {
        return 'id1';
    }
    if (id.length !== 10) {
        return 'id2'
    }
    
    return 0;
}

const validatePublickey = (address) => {
    return WAValidator.validate(address, 'BTC');
    // return true;
}


module.exports = { validateStudentInfo, validatePublickey };
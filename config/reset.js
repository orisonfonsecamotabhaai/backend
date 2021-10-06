const requests = [];

function createResetRequest(resetRequest) {
    requests.push(resetRequest);
}

function getResetRequest(id) {
    const thisRequest = requests.find(req =>{ return req.id === id});
    return thisRequest;
}

module.exports = {
    createResetRequest,
    getResetRequest,
}
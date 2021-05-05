const getAllMessages = (req, res) => {
    res.json({
        status: "succes",
        data : {
            message: `Getting all messages`
        }
    })
}

const getOneMessage = (req, res) => {
    res.json({
        status: "succes",
        data : {
            message: `Getting message with id`
        }
    })
}


const postMessage = (req, res) => {
    res.json({
        status: "succes",
        data : {
            message: `Posting new message`
        }
    })
}


const putMessage = (req, res) => {
    res.json({
        status: "succes",
        data : {
            message: `Updating message with id`
        }
    })
}

const deleteMessage = (req, res) => {
    res.json({
        status: "succes",
        data : {
            message: `Deleting message with id`
        }
    })
}

module.exports.getAllMessages = getAllMessages;
module.exports.getOneMessage = getOneMessage;
module.exports.postMessage = postMessage;
module.exports.putMessage = putMessage;
module.exports.deleteMessage = deleteMessage;
const getAllMessages = (req, res) => {
    if (req.query.user) {
        let username = req.query.user;

        res.json({
            status: "succes",
            data: {
                message: `Getting all messages from ${username}`
            }
        })
    } else {
        res.json({
            status: "succes",
            data: {
                message: `Getting all messages`
            }
        })
    }

}

const getOneMessage = (req, res) => {
    let id = req.params.id;

    res.json({
        status: "succes",
        data: {
            message: `Getting message with id ${id}`
        }
    })
}


const postMessage = (req, res) => {
    if (req.query.user) {
        let username = req.query.user;
        res.json({
            status: "succes",
            data: {
                message: `Posting new message for ${username}`
            }
        })
    } else {
        res.json({
            status: "succes",
            data: {
                message: `Posting new message for unknown user`
            }
        })
    }
}


const putMessage = (req, res) => {
    let id = req.params.id;
    
    res.json({
        status: "succes",
        data: {
            message: `Updating message with id ${id}`
        }
    })
}

const deleteMessage = (req, res) => {
    let id = req.params.id;
    res.json({
        status: "succes",
        data: {
            message: `Deleting message with id ${id}`
        }
    })
}

module.exports.getAllMessages = getAllMessages;
module.exports.getOneMessage = getOneMessage;
module.exports.postMessage = postMessage;
module.exports.putMessage = putMessage;
module.exports.deleteMessage = deleteMessage;
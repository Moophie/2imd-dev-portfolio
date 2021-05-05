const getAllMessages = (req, res) => {
    if(req.query.user){
        res.json({
            "message": `GETTING messages`
        })
    }
}
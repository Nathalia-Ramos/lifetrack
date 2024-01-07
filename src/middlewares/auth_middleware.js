const AuthMiddleware = {
    
    validateAuthBody(req, res, next) {
        try {
            const {mail, pass } = req.body;

            if(!mail || mail === "") return res.status(401).send("Campo 'mail' vazio ou não enviado.");
            if(!pass || pass === "") return res.status(401).send("Campo 'pass' vazio ou não enviado.");
    
            return next();
        } catch (error) {
            console.log(error);
        }
    },
    
};

export default AuthMiddleware;
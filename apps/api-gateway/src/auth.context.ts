export const authContext = ({ req }) => {
    if (req.headers?.authorization) {
        return { token: req.headers.authorization }
    }

};
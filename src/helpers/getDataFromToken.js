import jwt from "jsonwebtoken"

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("decodedToken",decodedToken);
        
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
}
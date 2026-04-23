import httpStatus from 'http-status';
import User from '../../models/user.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const user = await User.create({ username, email, passeword, role });

        return res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "An Error occured during registration",
            error: error,
        });
    }
}
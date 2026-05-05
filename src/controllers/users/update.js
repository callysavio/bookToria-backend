import User from "../../models/user.js";
import httpStatus from "http-status";

export const updateUser = async (req, res) => {
    try { 
        const { id } = req.params;
        const { username, role, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, 
            {username: username, role: role, password: password }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(httpStatus.NOT_FOUND).json({
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "User not found",
            });
        }
        res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
           stausCode: httpStatus.INTERNAL_SERVER_ERROR,
           success: false,
            message: "error updating user details",
            error: error.message,
        });
    }
};
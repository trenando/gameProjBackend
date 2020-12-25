import bcrypt from 'bcrypt';
import { IUser } from '../../model/modelTypes';
import { User } from "../../model/User";
import { registerValidation } from "../../validation/authValidation/authValidation";
import { Register, RegisterValidationError } from "./authTypes";

export const register: Register = async (req, res) => {

    const { error }: RegisterValidationError = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist: IUser | null = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //hash pass
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);

    const user: IUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        postCount: 0,
        subCount: 0
    });

    try {
        await user.save();
        return res.status(201).send("The user was created");
    } catch (err) {
        return res.status(400).send(err);
    };
};

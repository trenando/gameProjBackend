import e, { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { LoginValidationData } from "../../validation/authValidation/authValidationtypes";
import { IncomingHttpHeaders } from "http";
import Joi from "joi";
import { UserSchema } from "../../model/modelTypes";

type RefreshTokenRequest = {
    refreshToken: string
};

type RefreshTokenResponse = {
    accessToken: string
} | string;

type LoginResponse = {
    accessToken: string,
    refreshToken: string
} | string;

export type Logout = (req: Request<core.ParamsDictionary, string, IncomingHttpHeaders, core.Query>, res: Response<string>) => Promise<Response<string>>;

export type Register = (req: Request<core.ParamsDictionary, string, UserSchema, core.Query>, res: Response<string>) => Promise<Response<string>>;

export interface RegisterValidationError {
    error?: Joi.ValidationError | undefined
};

export type PostRefreshToken = (req: Request<core.ParamsDictionary, RefreshTokenResponse, RefreshTokenRequest, core.Query>, res: Response<RefreshTokenResponse>) => Promise<Response<RefreshTokenResponse>>;

export type Login = (req: Request<core.ParamsDictionary, LoginResponse, LoginValidationData, core.Query>, res: Response<LoginResponse>) => Promise<Response<LoginResponse>>;
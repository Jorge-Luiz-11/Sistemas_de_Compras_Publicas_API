import { Types } from 'mongoose';

export type YearRequest = {
    _id: string | Types.ObjectId | RegExp;
    year: string | RegExp;
    select: string | RegExp;
    sort: string | number | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type SectionRequest = {
    _id: string | Types.ObjectId | RegExp;
    name: string | RegExp;
    level: string | RegExp | Types.ObjectId;
    select: string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type UserRequest = {
    _id: string | Types.ObjectId | RegExp;
    name: string | RegExp;
    password: string | RegExp;
    pg: string | RegExp;
    section: string | RegExp;
    level: number | string | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type ProcessRequest = {
    _id: string | Types.ObjectId | RegExp;
    user: string | Types.ObjectId | RegExp | null;
    receiver: string | Types.ObjectId | RegExp | null;
    section_receiver: string | Types.ObjectId | RegExp | null;
    nup: number | string | null | RegExp;
    done: boolean | string | RegExp;
    origin: string | Types.ObjectId | RegExp;
    title: string | RegExp;
    category: string | RegExp;
    description: string | RegExp;
    date: string | RegExp;
    year: string | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    sort: number | string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
    aggregate: string | RegExp;
};

export type ProcessStateRequest = {
    _id: string | Types.ObjectId | RegExp;
    process: string | Types.ObjectId | RegExp;
    user: string | Types.ObjectId | RegExp;
    state: string | RegExp;
    anotation: string | RegExp;
    date: string | RegExp;
    createdAt: string | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    sort: number | string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type FileRequest = {
    _id: string | Types.ObjectId | RegExp;
    file?: string | Buffer | RegExp;
    filename: string | RegExp;
    extension: string | RegExp;
    originalname: string | RegExp;
    process: string | Types.ObjectId | RegExp;
    message: string | Types.ObjectId | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    sort: number | string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type AcquisitionWayRequest = {
    _id: string | Types.ObjectId | RegExp;
    name: string | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    sort: number | string | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

export type MessageRequest = {
    _id: string | Types.ObjectId | RegExp;
    sender: string | Types.ObjectId | null | RegExp;
    receiver: string | Types.ObjectId | null | RegExp;
    section_receiver: string | Types.ObjectId | null | RegExp;
    process: string | Types.ObjectId | null | RegExp;
    message: string | Types.ObjectId | null | RegExp;
    title: string | RegExp;
    process_title: string | RegExp;
    content: string | RegExp;
    date: string | RegExp;
    visualized: boolean | string | RegExp;
    select: string | RegExp;
    include: string | RegExp;
    sort: string | number | RegExp;
    limit: number | string | RegExp;
    page: number | string | RegExp;
};

import {
    MessageRequest,
    YearRequest,
    SectionRequest,
    UserRequest,
    ProcessRequest,
    ProcessStateRequest,
    FileRequest,
    AcquisitionWayRequest,
} from '../types/types';

export function yearValidator(request: Partial<YearRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof YearRequest;
    const yearRegex: YearRequest = {
        year: /^\d+$/,
        _id: /^[0-9a-fA-F]{24}$/,
        select: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in yearRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(yearRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function sectionValidator(request: Partial<SectionRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof SectionRequest;
    const sectionRegex: SectionRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        name: /^./s,
        level: /^\d+$/,
        select: /^./s,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in sectionRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(sectionRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function userValidator(request: Partial<UserRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof UserRequest;
    const userRegex: UserRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        name: /^[a-zA-Z\s]+$/,
        password: /^./s,
        pg: /^./s,
        level: /^\d+$/,
        section: /^[0-9a-fA-F]{24}$/,
        select: /^./s,
        include: /^./s,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in userRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(userRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function processValidator(request: Partial<ProcessRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof ProcessRequest;
    const processRegex: ProcessRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        user: /^[0-9a-fA-F]{24}$/,
        receiver: /^[0-9a-fA-F]{24}$/,
        section_receiver: /^[0-9a-fA-F]{24}$/,
        nup: /^(?:\d+|null)$/,
        done: /^(true|false)$/,
        origin: /^[0-9a-fA-F]{24}$/,
        title: /^./s,
        category: /^./s,
        description: /^./s,
        date: /^./s,
        year: /^\d+$/,
        select: /^./s,
        include: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
        aggregate: /^./s,
    };

    for (key in processRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(processRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function processStateValidator(request: Partial<ProcessStateRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof ProcessStateRequest;
    const processStateRegex: ProcessStateRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        process: /^[0-9a-fA-F]{24}$/,
        user: /^[0-9a-fA-F]{24}$/,
        state: /^./s,
        anotation: /^./s,
        date: /^./s,
        createdAt: /^./s,
        select: /^./s,
        include: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in processStateRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(processStateRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

// eslint-disable-next-line prettier/prettier
export function messageValidator(request: Partial<MessageRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof MessageRequest;
    const messageRegex: MessageRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        sender: /^[0-9a-fA-F]{24}$/,
        receiver: /^[0-9a-fA-F]{24}$/,
        process: /^[0-9a-fA-F]{24}$/,
        section_receiver: /^[0-9a-fA-F]{24}$/,
        title: /^./s,
        message: /^[0-9a-fA-F]{24}$/,
        process_title: /^./s,
        content: /^./s,
        date: /^./s,
        visualized: /^(true|false)$/,
        select: /^./s,
        include: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in messageRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(messageRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function fileValidator(request: Partial<FileRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof FileRequest;
    const fileRegex: FileRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        filename: /^./s,
        extension: /^[a-zA-Z0-9]+$/,
        originalname: /^./s,
        process: /^[0-9a-fA-F]{24}$/,
        message: /^[0-9a-fA-F]{24}$/,
        select: /^./s,
        include: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in fileRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(fileRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function acquisitionWayValidator(request: Partial<AcquisitionWayRequest>): Record<string, string>[] {
    const errors: Record<string, string>[] = [];
    let key: keyof AcquisitionWayRequest;
    const fileRegex: AcquisitionWayRequest = {
        _id: /^[0-9a-fA-F]{24}$/,
        name: /^./s,
        select: /^./s,
        include: /^./s,
        sort: /^(1|-1|asc|ASC|DESC|desc)$/,
        page: /^\d+$/,
        limit: /^\d+$/,
    };

    for (key in fileRegex) {
        if (request.hasOwnProperty(key)) {
            if (!(fileRegex[key] as RegExp).test(`${request[key]}`)) errors.push({ message: `Valor do Parâmetro ${key} é inválido!` });
        }
    }
    return errors;
}

export function setHeader(extension: string): string {
    if (extension.toLowerCase() === '.doc' || extension.toLowerCase() === '.docx' || extension.toLowerCase() === '.txt') {
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    if (extension.toLowerCase() === '.xlsx') {
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    if (extension.toLowerCase() === '.ods') {
        return 'application/vnd.oasis.opendocument.spreadsheet';
    }
    if (extension.toLowerCase() === '.odt') {
        return 'application/vnd.oasis.opendocument.text';
    }
    if (extension.toLowerCase() === '.zip') {
        return 'application/zip';
    }
    if (extension.toLowerCase() === '.rar') {
        return 'application/x-rar-compressed';
    }
    if (extension.toLowerCase() === '.tar') {
        return 'application/x-tar';
    }
    if (extension.toLowerCase() === '.pdf') {
        return 'application/pdf';
    }
    if (extension.toLowerCase() === '.jpeg' || extension.toLowerCase() === '.jpg') {
        return 'image/jpeg';
    }
    if (extension.toLowerCase() === '.png') {
        return 'image/png';
    } else {
        return '';
    }
}

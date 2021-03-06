const {
    CR,
    WS,
    ES,
    NL,
    FORMAT,
    STRING,
    EMPTYDATAMSG,
    EMPTYDATAEXCEPTION,
    NOTASTRINGMSG,
    INVALIDDATAEXCEPTION,
    FILENOTFOUNDEXCEPTION,
    NOTVALIDARGMSG,
    INVALIDARGUMENTEXCEPTION
} = require("./constants");

const getTrimmedValue = function (line, startPoints, index) {
    return line.substring(startPoints[index], startPoints[index + 1]).trim();
};

const getObject = function (line, headers, startPoints) {
    return headers.reduce(function (acc, currentElement, index) {
        let trimmedValue = getTrimmedValue(line, startPoints, index);

        if (trimmedValue == "null") {
            trimmedValue = null;
        }
        acc[currentElement] = trimmedValue;
        return acc;
    }, {});
};

const formatDataInArray = function (data, startPoints, headers) {
    let finalResult = [];

    data.forEach(line => {
        if (line == ES) {
            return;
        }
        finalResult.push(getObject(line, headers, startPoints));
    });
    return finalResult;
};

const pushHeader = function (isWS, isNextNotWS, isLastChar, headers, header) {
    if ((isWS && isNextNotWS) || isLastChar) {
        if (header != "") {
            headers.push(header);
            header = ES;
        }
    }
    return {headers, header};
};

const addCharToHeader = function (char, header) {
    if (char != WS && char != CR && char != NL) {
        header += char;
    }
    return header;
};

const getHeaders = function (headersLine) {
    const splittedHeaderLine = headersLine.split(ES);
    const headerLineLength = headersLine.length;
    let headers = [];
    let header = ES;

    splittedHeaderLine.forEach((char, index) => {
        const isWS = char == WS;
        const nextChar = splittedHeaderLine[index + 1];
        const isNextNotWS = nextChar != WS;
        const isLastChar = index == headerLineLength - 1;

        header = addCharToHeader(char, header);
        const head = pushHeader(isWS, isNextNotWS, isLastChar, headers, header);
        headers = head.headers;
        header = head.header;
    });
    return headers;
};

const pushStartPoint = function (char, nextChar, startPoints, index) {
    if (char == WS && nextChar != WS) startPoints.push(index + 1);
    return startPoints;
};

const getStartPoints = function (splittedHeaderLine) {
    let startPoints = [0];
    splittedHeaderLine.forEach((char, index) => {
        const nextChar = splittedHeaderLine[index + 1];
        startPoints = pushStartPoint(char, nextChar, startPoints, index);
    });
    return startPoints;
};

const readFile = function (filePath, fs) {
    if (fs.existsSync(filePath))
        return fs.readFileSync(filePath, FORMAT).split(NL);
    console.error(`ERROR -->> ${filePath} is not a valid path.`);
    throw Error(FILENOTFOUNDEXCEPTION);
};

const readData = function (data) {
    if (typeof data == STRING) {
        if (data.length)
            return data.split(NL);
        console.error(EMPTYDATAMSG);
        throw Error(EMPTYDATAEXCEPTION);
    }
    console.error(NOTASTRINGMSG);
    throw Error(INVALIDDATAEXCEPTION);
};

const getData = function (params, fs) {
    if (params.filePath == null && params.data == null) {
        console.error(NOTVALIDARGMSG);
        throw Error(INVALIDARGUMENTEXCEPTION);
    }
    if (params.filePath) {
        return readFile(params.filePath, fs);
    } else {
        return readData(params.data);
    }
};

const getRequiredData = function (params, data) {
    let dataWithoutHeaders = data.slice(1);
    if(params.noOfRecords) {
        dataWithoutHeaders = dataWithoutHeaders.slice(0,params.noOfRecords);
    }
    return dataWithoutHeaders;
}

module.exports = {
    getStartPoints,
    pushStartPoint,
    getHeaders,
    addCharToHeader,
    pushHeader,
    formatDataInArray,
    getObject,
    getTrimmedValue,
    readFile,
    readData,
    getData,
    getRequiredData
};

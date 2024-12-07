export interface ErrorResponse {
    data:    Data;
    status:  number;
    headers: LowerCaseResponseHeadersClass;
    config:  Config;
    request: Request;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string[];
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Env;
    headers:           ConfigHeaders;
    baseURL:           string;
    withCredentials:   boolean;
    method:            string;
    url:               string;
}

export interface Env {
}

export interface ConfigHeaders {
    Accept:        string;
    Authorization: string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    statusCode: number;
    message:    string;
    error:      string;
    path:       string;
    timestamp:  Date;
}

export interface LowerCaseResponseHeadersClass {
    "content-length":       string;
    "content-type":         string;
    date:                   string;
    etag:                   string;
    server:                 string;
    "x-powered-by":         string;
    "x-railway-request-id": string;
}

export interface Request {
    UNSENT:                    number;
    OPENED:                    number;
    HEADERS_RECEIVED:          number;
    LOADING:                   number;
    DONE:                      number;
    readyState:                number;
    status:                    number;
    timeout:                   number;
    withCredentials:           boolean;
    upload:                    Env;
    _aborted:                  boolean;
    _hasError:                 boolean;
    _method:                   string;
    _perfKey:                  string;
    _response:                 string;
    _url:                      string;
    _timedOut:                 boolean;
    _trackingName:             string;
    _incrementalEvents:        boolean;
    _performanceLogger:        PerformanceLogger;
    responseHeaders:           LowerCaseResponseHeadersClass;
    _requestId:                null;
    _headers:                  Headers;
    _responseType:             string;
    _sent:                     boolean;
    _lowerCaseResponseHeaders: LowerCaseResponseHeadersClass;
    _subscriptions:            any[];
    responseURL:               string;
}

export interface PerformanceLogger {
    _timespans:   { [key: string]: Timespan };
    _extras:      Env;
    _points:      Points;
    _pointExtras: Env;
    _closed:      boolean;
}

export interface Points {
    initializeCore_start: number;
    initializeCore_end:   number;
}

export interface Timespan {
    startTime: number;
    endTime:   number;
    totalTime: number;
}


export interface AxiosErrorResponse {
    message: string;
    name:    string;
    stack:   string;
    config:  Config;
    code:    string;
    status:  number;
    response: ErrorResponse;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string[];
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Env;
    headers:           Headers;
    baseURL:           string;
    withCredentials:   boolean;
    method:            string;
    url:               string;
}

export interface Env {
}

export interface Headers {
    Accept:        string;
    Authorization: string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

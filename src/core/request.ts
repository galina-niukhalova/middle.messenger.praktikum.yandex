export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: Methods;
  data?: any;
  retries?: number,
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.GET });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.PUT });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.POST });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.DELETE });
  }

  queryStringify(data: { [key: string]: string }) {
    let queryString = '';
    const keys = Object.keys(data);

    if (keys.length) {
      queryString += '?';
    }

    keys.forEach((key, index) => {
      queryString += `${key}=${data[key]}`;
      if (index !== keys.length - 1) {
        queryString += '&';
      }
    });

    return queryString;
  }

  async request(url: string, options: Options = { method: Methods.GET }, timeout = 5000):
    Promise<XMLHttpRequest> {
    const self = this;
    let targetUrl = `${this.baseURL}${url}`;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data } = options;

      if (data && method === Methods.GET) {
        targetUrl += self.queryStringify(data);
      }

      const handleLoad = () => {
        resolve(xhr);
      };

      const handleError: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null = (err) => {
        reject(err);
      };

      xhr.open(method, targetUrl, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.onload = handleLoad;
      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
    const { retries = 1 } = options;

    function onError() {
      const retriesLeft = retries - 1;

      if (retriesLeft < 1) {
        throw new Error('Exceeded the number of attempts');
      }

      return this.fetchWithRetry(url, { ...options, retries: retriesLeft });
    }

    return this.request(url, options).catch(onError);
  }
}

export default HTTPTransport;

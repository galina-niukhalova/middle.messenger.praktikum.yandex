enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS;
  data?: any;
  retries?: number,
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.GET });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE });
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

  async request(url: string, options: Options = { method: METHODS.GET }, timeout = 5000):
    Promise<XMLHttpRequest> {
    const self = this;
    let targetUrl = url;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data } = options;

      if (method === METHODS.GET && data) {
        targetUrl += self.queryStringify(data);
      }

      const handleLoad = () => {
        resolve(xhr);
      };

      const handleError: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null = (err) => {
        reject(err);
      };

      xhr.open(method, targetUrl);
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.onload = handleLoad;
      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export function fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
  const { retries = 1 } = options;

  function onError() {
    const retriesLeft = retries - 1;

    if (retriesLeft < 1) {
      throw new Error('Exceeded the number of attempts');
    }

    return fetchWithRetry(url, { ...options, retries: retriesLeft });
  }

  return new HTTPTransport().request(url, options).catch(onError);
}

export default HTTPTransport;

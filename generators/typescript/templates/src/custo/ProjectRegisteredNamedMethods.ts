declare function require(module: string);
declare var String: { toLocaleString: (param: any) => void; };

export function renew<%= capitalizeCustomerSafeName %>AccessToken(): Promise<string> {
  let renewTokenPromise = new Promise<string>((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/renewtoken');
    xhr.onreadystatechange = handler;
    xhr.setRequestHeader('Accept', 'application/text');
    xhr.send();

    function handler() {
      if (this.readyState === this.DONE) {

        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error('renewtoken failed with status: [' + this.status + ']'));
        }
      }
    }
  });
  return renewTokenPromise;
}

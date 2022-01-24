class API {
  host = process.env.NEXT_PUBLIC_INTEGRATIONS_API_HOST;

  integrations = {
    detail: "/integrations/:integrationId",
  };

  sync = {
    detail: "/integrations/:integrationId/sync",
  };

  getEndpoint(name, args) {
    const [namespace, endpoint] = name.split(":");
    let path = null;

    if (this.hasOwnProperty(namespace)) {
      if (this[namespace].hasOwnProperty(endpoint)) {
        path = this[namespace][endpoint];
      }
    }

    const endpointFunction = this.generateFunction(path);
    return this.host + endpointFunction(args);
  }

  generateFunction(endpoint) {
    const tokens = endpoint.split("/");
    const functionBody = `
           const tokens = [ '${tokens.join("','")}' ]
           const result = tokens.map((t) => {
             if (t.indexOf(':') > -1) {
               return args[t.replace(':', '')]
             } else {
               return t
             }
           })
           return result.join('/')
        `;
    return new Function("args", functionBody);
  }
}

const api = new API();

const fetcher = async (...args) => {
  const res = await fetch(...args, { credentials: "include" });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

module.exports = {
  api,
  fetcher,
};

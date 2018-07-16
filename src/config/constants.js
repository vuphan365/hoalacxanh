const dev = {
  // BACKEND_URL: "http://localhost:3005"
  BACKEND_URL: "https://hoalacxanh-server.azurewebsites.net"
};

const prod = {
  //BACKEND_URL: "http://localhost:3005"
  BACKEND_URL: "https://hoalacxanh-server.azurewebsites.net"
};

function chooseEnvironment(env) {
  switch (env) {
    case "development":
      return dev;
    case "production":
      return prod;
    default:
      return prod;
  }
}

const currentEnv = process.env.REACT_APP_STAGE || "development";
const config = chooseEnvironment(currentEnv);

export const BACKEND_URL = config.BACKEND_URL;
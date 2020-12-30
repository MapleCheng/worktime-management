export const getHostName = () => {
  const hostname = localStorage.getItem("hostname") || "";

  return hostname;
};

export const LocalHost = getHostName();

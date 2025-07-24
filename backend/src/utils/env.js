export const env = (envName) => {
  const value = process.env[envName];
  if (!value) {
    throw new Error(`"${envName}" not found`);
  }
  return value;
};

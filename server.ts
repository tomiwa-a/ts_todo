import App from "./app";

const PORT = 3000;

const main = async () => {
  const appInstance = new App();
  await appInstance.init(); // Important
  appInstance.app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

main();

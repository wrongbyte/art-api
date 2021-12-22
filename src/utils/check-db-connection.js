export default async (database, retries = 5) => {
    while (retries > 0) {
      try {
        await database().connect();
        console.log('Database connected');
        return;
      } catch (error) {
        retries -= 1;
        console.log(`Error in database connection. Retries left: ${retries}`);
        console.log(error);
        await new Promise(res => setTimeout(res, 15000));
      };
    }
  };
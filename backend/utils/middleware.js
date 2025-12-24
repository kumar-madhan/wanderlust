export const cacheHandler = (key) => async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    return next(); // disable cache in dev
  }

  try {
    const cachedData = await retrieveDataFromCache(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    next();
  } catch (err) {
    next();
  }
};

function returnSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ statusCode, data });
}

function returnErrorRequest(res, statusCode, error) {
  return res.status(statusCode).json({ statusCode, error });
}

module.exports = {
  returnSuccess,
  returnErrorRequest
};

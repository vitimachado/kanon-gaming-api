function returnSuccess(res, data) {
  return res.status(200).json({statusCode: "200", data });
}

function returnErrorBadRequest(res) {
  return res.status(400).json({statusCode: "400", error: "Bad Request" });
}

module.exports = {
  returnSuccess,
  returnErrorBadRequest
};

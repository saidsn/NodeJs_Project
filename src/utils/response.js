class Response {
  constructor(data = null, message = null) {
    (this.data = data), (this.message = message);
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Process successfully",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Process successflly 201",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Process server error",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Process not successflly",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Please open Account",
    });
  }

  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Not Found",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Many requests have been made",
    });
  }
}

module.exports = Response;

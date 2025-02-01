const checkTodoBody = async (req, res, next) => {
    try {
      const { title, description } = req.body;
  
      if (!title || title.trim() === "") {
        return res.status(400).send({
          message: "The todo title is required",
        });
      }
  
      if (!description || description.trim() === "") {
        return res.status(400).send({
          message: "The todo description is required",
        });
      }
  
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Error while checking Todo body:", err);
      return res.status(500).send({
        message: "Error while checking Todo body",
      });
    }
  };
  
  module.exports = {
    checkTodoBody,
  };
  
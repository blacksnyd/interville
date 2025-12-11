const {Class} = require('../models')

exports.all = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.status(200).json({
      success: true,
      message: "Toutes les promos",
      data: {
        classes
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    })
  }
}

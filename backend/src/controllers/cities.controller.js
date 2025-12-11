const {City} = require('../models')

exports.all = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.status(200).json({
      success: true,
      message: "Toutes les villes",
      data: {
        cities
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

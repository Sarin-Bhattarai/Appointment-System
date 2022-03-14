const Appointment = require("../models/appointment");
const { errorHandler } = require("../helper/error");

exports.getAppointment = (req, res) => {
  Appointment.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.createAppointment = async (req, res) => {
  try {
    const appointmentDetails = {
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      user: req.body.user,
      status: req.body.status,
    };
    const appointment = new Appointment(appointmentDetails);
    const result = await appointment.save();
    return res.json({ status: "Success", data: { product: result } });
  } catch (ex) {
    return res.send({ status: "Error", message: ex.message });
  }
};

// router.put(
//   "/product/:productId/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   type,
//   async (req, res) => {
//     const productid = req.params.productId;
//     console.log(req.body);
//     try {
//       const product = await Product.findById(productid);
//       if (req.body.name) {
//         product.name = req.body.name;
//       }
//       if (req.body.description) {
//         product.description = req.body.description;
//       }
//       if (req.body.price) {
//         product.price = req.body.price;
//       }
//       if (req.body.category) {
//         product.category = req.body.category;
//       }
//       if (req.body.quantity) {
//         product.quantity = req.body.quantity;
//       }
//       if (req.file) {
//         product.photo = req.file.path;
//       }
//       if (req.body.shipping) {
//         product.shipping = req.body.shipping;
//       }
//       const result = await product.save();
//       return res
//         .status(200)
//         .send({ status: "success", data: { product: result } });
//     } catch (ex) {
//       console.log(ex);
//       return res
//         .status(400)
//         .send({ status: "error", message: "Something went wrong" });
//     }
//   }
// );

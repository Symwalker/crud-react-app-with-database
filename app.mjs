import express from 'express'
import path from "path"
import cors from "cors"
import mongoose from "mongoose";
import userModel from './model/userSchema.mjs';
const app = express()
const port = process.env.PORT || 5001;
const mongodbUri = process.env.mongodbUri || "mongodb+srv://shayanhanif01:Kingfu_12@crudapp.6g7fxo0.mongodb.net/userData?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())

app.use('/', express.static(path.join(process.cwd(), "web", "build")));

let products = []; //we will use database intead of state data
app.post('/product', (req, res) => {
  const { name, email, number } = req.body
  console.log(name);
  console.log(email);
  console.log(number);

  if (name && email && number) {
    const objtosend = {
      name,
      email,
      number
    }
    userModel.create(objtosend)
      .then(result => {
        res.send({
          message: "user added"
        })
        console.log(result)
      })
      .catch((err) => {
        res.send({
          message: "server error"
        })
      })
    // userModel.create({
    //   name: body.name,
    //   email: body.email,
    //   number: body.number
    // })
    //   .then((result) => {
    //     res.json({
    //                 msg: "user signup successfully",
    //                 result,
    //                 // status: true
    //             })
    //   })
    //   .catch((err) => {
    //     res.json({
    //                 msg: "something went wrong"
    //             })
    //   })
    // userModel.create({

    //   // id: new Date().getTime(),
    //   name: body.name,
    //   email: body.email,
    //   number: body.number

    // },(err, data) => {
    //     if (err) {
    //       res.json({
    //           msg: "something went wrong"
    //       })
    //   } else {
    //       res.json({
    //           msg: "user signup successfully",
    //           data,
    //           // status: true
    //       })
    //   }
    //   }
    // )
    // products.push({
    //   id: new Date().getTime(),
    //   name: body.name,
    //   email: body.email,
    //   number: body.number
    // })
  }
  else {
    res.status(400).send({
      message: "required parameters are missing"
    })
  }

})
app.get('/products', (req, res) => {
  userModel.find({})
    .then((data) => {
      res.status(200).send({
        message: "got all products",
        data
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "server error",
      })
    })
})
// if (!err ) {
//   res.status(200).send({
//     message:"got all products",
//     data
//   })
// }
// else{
//   res.status(500).send({
//     message:"server error",
//     data
//   })
// }

app.get('/product/:id', (req, res) => {
  const id = req.params.id
  userModel.findOne({ _id: id })
    .then(data => {
      res.status(200).send({
        message: `find product by id ${data._id}`,
        data
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "server error",
      })
    })
})

app.delete('/product/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  userModel.deleteOne({ _id: id })
    .then((deldeData) => {
      if (deldeData.deletedCount !== 0) {
        res.status(200).send({
          message: "your item is deleted"
        })
      }
      else {
        res.status(400).send({
          message: `no product is found by this id ${id}`
        })
      }
    })
})

app.put('/product/:id',async (req, res) => {
  const id = req.params.id
  const {name, email, number} = req.body

  if (name, email, number) {
    try{
      let data = userModel.findByIdAndUpdate(id,{
        name,
        email,
        number
      },
      {new:true}
      ).exec()
      console.log('updated',data);
      res.status(200).send({
        message:"user updated",
        data
      })
    }
    catch (error){
      res.status(500).send({
        message: "server error "
      })
      console.log(error);
    }
  }
  else{
    res.status(400).send({
      message: "required parameters are missing"
    })

  }
})
app.get('/weather', (req, res) => {
  console.log(req.query.city);
  res.send({
    message: "working"
  })
})
app.use('*', express.static(path.join(process.cwd(), "web", "build")));
// app.use har trha ke method me chalta he 
// console.log(path.dirname(__filename));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect(mongodbUri)

mongoose.connection.on('connected', function () {
  console.log("Mongodb is connected");
})
mongoose.connection.on('disconnected', function () {
  console.log("Mongodb disconnected");
  process.exit(1);
})
mongoose.connection.on('error', function (err) {
  console.log("Mongodb connection error", err);
  process.exit(1);
})
mongoose.connection.on('error', function (err) {
  console.log("Mongodb connection error", err);
  process.exit(1);
})
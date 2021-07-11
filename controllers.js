const Contact = require('./Contact');

exports.getAllContact = (req, res) => {
  Contact.find().then((contacts) => {
    res.render('index', { contacts, error: {} });
  });
};

exports.getSingleContact = (req, res) => {
  let { id } = req.params;
  Contact.findById(id)
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: 'Error Occured',
      });
    });
};

exports.createContact = (req, res) => {
  let { name, phone, email, id } = req.body;
  let error = {};

  if (!name) {
    error.name = 'Please enter name';
  }
  if (!phone) {
    error.phone = 'Please enter phone number';
  }
  if (!email) {
    error.email = 'Please enter email';
  }

  let isError = Object.keys(error).length > 0;
  if (isError) {
    console.log('Error Occured', isError);

    Contact.find()
      .then((contacts) => {
        return res.render('index', { contacts, error });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          message: 'Error Occured',
        });
      });
  }

  if (id) {
    Contact.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    )
      .then((contact) => {
        Contact.find().then((contacts) => {
          return res.render('index', { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.log(e);
        res.json({
          message: 'Error Occured',
        });
      });
  } else {
    let contact = new Contact({
      name,
      email,
      phone,
    });

    contact
      .save()
      .then((contact) => {
        Contact.find().then((contacts) => {
          return res.render('index', { contacts, error: {} });
        });
      })
      .catch((e) => {
        console.log(e);
        return res.render('index', { contacts, error });
      });
  }
};

exports.updateContact = (req, res) => {
  let { name, email, phone } = req.body;
  let { id } = req.params;
  Contact.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
        phone,
      },
    },
    { new: true }
  )
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: 'Error Occured',
      });
    });
};

exports.deleteContact = (req, res) => {
  let { id } = req.params;
  console.log(id);
  Contact.findOneAndDelete({
    _id: id,
  })
    .then(() => {
      Contact.find().then((contacts) => {
        return res.render('index', { contacts, error: {} });
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        message: 'Error Occured',
      });
    });
};

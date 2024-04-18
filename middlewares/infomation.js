const router = require('express').Router();
const UserInformation = require("../model/UserInformation");

router.post('/information', async (req, res) => {
  try {
    const { firstName, lastName, address, city, country, postalCode, aboutMe } = req.body;
    const newUser = new UserInformation({
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
      aboutMe
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put('/information/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, address, city, country, postalCode, aboutMe } = req.body;

    const existingUser = await UserInformation.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.address = address;
    existingUser.city = city;
    existingUser.country = country;
    existingUser.postalCode = postalCode;
    existingUser.aboutMe = aboutMe;

    const updatedUser = await existingUser.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/information/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserInformation.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

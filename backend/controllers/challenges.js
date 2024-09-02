const Challenge = require("../model/challenge");

// Function to create a new challenge
async function createChallenge(req, res) {
  try {
    const { name, startDate, endDate, description, levelType } = req.body;
    const image = req.file;

    if (!name || !startDate || !endDate || !description || !image || !levelType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log("path",image.path)
    const newChallenge = new Challenge({
      name,
      startDate,
      endDate,
      description,
      image: image.path,
      levelType,
    });

    await newChallenge.save();

    res.status(201).json({
      message: 'Challenge created successfully!',
      challenge: newChallenge,
    });
  } catch (error) {
    console.error("Error in createChallenge:", error);
    res.status(500).json({ message: 'An error occurred while creating the challenge.', error: error.message });
  }
}

// Function to get challenges from the database
async function getChallenge(req, res) {
  try {
    const challenges = await Challenge.find();

    if (!challenges.length) {
      return res.status(404).json({ message: 'No challenges found.' });
    }
    console.log("get",challenges[0].image)

    const updatedChallenges = challenges.map(challenge => ({
      ...challenge._doc,
      image: `${req.protocol}://${req.get('host')}/${challenge.image}`,
    }));

    res.status(200).json(updatedChallenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving challenges.', error: error.message });
  }
}

module.exports = { createChallenge, getChallenge };

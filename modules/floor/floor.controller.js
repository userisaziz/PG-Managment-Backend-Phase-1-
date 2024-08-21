const Floor = require("./floor.model");

// Create a new floor
exports.createFloor = async (req, res) => {
  try {
    const floor = await Floor.create(req.body);
    res.status(201).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.aggregate([
      {
        $group: {
          _id: "$hostel", // Group by hostel field
          hostel: { $first: "$hostel.name" }, // Retrieve the hostel name
          floors: { $push: "$$ROOT" }, // Push entire floor documents into an array
        },
      },
    ]);
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single floor by ID
exports.getFloorById = async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);
    if (!floor) {
      return res.status(404).json({ error: "Floor not found" });
    }
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a floor
exports.updateFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!floor) {
      return res.status(404).json({ error: "Floor not found" });
    }
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a floor
exports.deleteFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);
    if (!floor) {
      return res.status(404).json({ error: "Floor not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

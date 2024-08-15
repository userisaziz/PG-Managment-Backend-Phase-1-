// //Analytics
// const Hostel = require("../hostel/hostel.model");

// exports.getAnalytics = async (req, res) => {
//   try {
//     const hostels = await Hostel.find().populate("floors rooms tenants");

//     const analytics = hostels.map(async (hostel) => {
//       const totalRooms = hostel.rooms.length;
//       const occupiedRooms = hostel.rooms.filter(
//         (room) => room.currentOccupancy > 0
//       ).length;
//       const vacantRooms = totalRooms - occupiedRooms;

//       const totalBeds = hostel.rooms.reduce(
//         (sum, room) => sum + room.maxOccupancy,
//         0
//       );
//       const occupiedBeds = hostel.rooms.reduce(
//         (sum, room) => sum + room.currentOccupancy,
//         0
//       );
//       const vacantBeds = totalBeds - occupiedBeds;

//       const totalTenants = hostel.tenants.length;

//       const monthlyIncome = hostel.tenants.reduce((sum, tenant) => {
//         const latestRentHistory = tenant.rentHistory.slice(-1)[0];
//         if (latestRentHistory && latestRentHistory.rentType === "monthly") {
//           return sum + latestRentHistory.amountPaid;
//         }
//         return sum;
//       }, 0);

//       const dailyIncome = hostel.tenants.reduce((sum, tenant) => {
//         const latestRentHistory = tenant.rentHistory.slice(-1)[0];
//         if (latestRentHistory && latestRentHistory.rentType === "daily") {
//           return sum + latestRentHistory.amountPaid;
//         }
//         return sum;
//       }, 0);

//       const netIncome = monthlyIncome + dailyIncome;

//       return {
//         hostelName: hostel.name,
//         totalRooms,
//         occupiedRooms,
//         vacantRooms,
//         totalBeds,
//         occupiedBeds,
//         vacantBeds,
//         totalTenants,
//         monthlyIncome,
//         dailyIncome,
//         netIncome,
//       };
//     });

//     const resolvedAnalytics = await Promise.all(analytics);
//     res.json(resolvedAnalytics);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

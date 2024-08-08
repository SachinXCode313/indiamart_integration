import { TripPlan, Counter } from "../models/Employees.js";

const getNextSequenceValue = async (sequenceName) => {
    try {
        const sequence = await Counter.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return sequence.sequence_value;
    } catch (error) {
        console.error(`Error getting next sequence value for ${sequenceName}:`, error);
        throw error;  // rethrow the error if you want to handle it further up the call stack
    }
};


// Create Users Data
const createTripPlan = async (req, res) => {
    try {
        const trips = req.body; // Assuming req.body is an array of trip objects
        const planId = await getNextSequenceValue('planIdCounter'); // Generate the next planId

        // Validate and save each trip object with the new planId
        for (const trip of trips) {
            const newTrip = new TripPlan({
                ...trip,
                planId: planId.toString(), // Convert to string if needed
            });
            await newTrip.save();
        }

        res.status(200).send('Trips saved successfully with planId: ' + planId);
    } catch (error) {
        console.error('Error saving trips:', error);
        res.status(500).send('Internal Server Error');
    }
};




const updateUser = async (req, res) => {
    try {
        const userID = req.params.id
        const updatedUser = await UserModel.findByIdAndUpdate(userID, req.body, { new: true });
        res.send([updatedUser]);
        console.log(updateUser)
    } catch (error) {
        console.log(error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id
        const deletedUser = await UserModel.findByIdAndDelete(userID);
        res.send("User Deleted Successfully ")
    } catch (error) {
        console.log(error)
    }
}

export { getEmployee, createTripPlan, updateUser, deleteUser };
// @desc	Get goals
// @route	GET /api/goals
// @access	Private
const getGoals = (req, res) => {
	res.status(200).json({ message: 'Get Goals' })
}

// @desc        Set goals
// @route       POST /api/goals
// @access      Private
const setGoal = (req, res) => {
        res.status(200).json({ message: 'Create Goals' })
}

// @desc        Update goals
// @route       PUT /api/goals/:id
// @access      Private
const updateGoal = (req, res) => {
        res.status(200).json({ message: `Goal number ${req.params.id} has been updated` })
}

// @desc        Delete goals
// @route       DELETE /api/goals/:id
// @access      Private
const deleteGoal = (req, res) => {
        res.status(200).json({ message: `Goal number ${req.params.id} has been deleted` })
}

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }

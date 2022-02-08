const asyncHandler = require('express-async-handler')

// @desc	Get goals
// @route	GET /api/goals
// @access	Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get Goals' })
})

// @desc        Set goals
// @route       POST /api/goals
// @access      Private
const setGoal = asyncHandler(async (req, res) => {
	// console.log(req.body)
	if(!req.body.text) {
		// res.status(400).json({ message: 'Please add a text feild!' })
		res.status(400)
		throw new Error('Please add a text feild!')
	}

        res.status(200).json({ message: 'Create Goals' })
})

// @desc        Update goals
// @route       PUT /api/goals/:id
// @access      Private
const updateGoal = asyncHandler(async (req, res) => {
        res.status(200).json({ message: `Goal number ${req.params.id} has been updated` })
})

// @desc        Delete goals
// @route       DELETE /api/goals/:id
// @access      Private
const deleteGoal = asyncHandler(async (req, res) => {
        res.status(200).json({ message: `Goal number ${req.params.id} has been deleted` })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }

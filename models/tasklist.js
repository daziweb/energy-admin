// 任务管理清单 任务列表
const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize.db')
const Model = Sequelize.Model

class TaskList extends Model {}

TaskList.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		taskcode: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		taskname: {
			type: Sequelize.STRING
		},
		content: {
			type: Sequelize.STRING
		},
		createuserid: {
			type: Sequelize.INTEGER
		},
		doneuserid: {
			type: Sequelize.INTEGER
		},
		priority: {
			type: Sequelize.STRING
		}
	},
	{
		sequelize,
		modelName: 'tasklist'
	}
)

TaskList.sync()

module.exports = TaskList

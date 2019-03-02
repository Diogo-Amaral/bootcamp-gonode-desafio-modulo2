const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class SchedulerController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })
    return res.render('scheduler/index', { appointments })
  }
}

module.exports = new SchedulerController()

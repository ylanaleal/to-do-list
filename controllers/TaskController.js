const Task = require('../models/Task')

module.exports = class TaskController {
  
  //NEW
  static createTask(req, res) {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${day} ${month} ${year}`;
        
    res.render('add', { currentDate })
  }

  //CREATE
  static createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }

    Task.create(task)
      .then(res.redirect('/'))
      .catch((err) => console.log())
  }

  //INDEX
  static indexTasks(req, res) { 
    Task.findAll({ raw: true })
      .then((data) => {
        let emptyTasks = false

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const currentDate = `${day} ${month} ${year}`;
        
        
        if (data.length === 0) {
          emptyTasks = true
        }

        res.render('home', { tasks: data, emptyTasks, currentDate })
      })
      .catch((err) => console.log(err))
}

  //SHOW
  static async showTasks(req, res) {
    const id = req.params.id
    const task = await Task.findOne({ where: { id: id }, raw: true })
   
    res.render('show', { task })
  }

  //DESTROY
  static async removeTask(req, res) {
    const id = req.body.id

    await Task.destroy({ where: { id: id } })
    res.redirect('/')
  }

  //EDIT
  static async updateTask(req, res) {
    const id = req.params.id
    const task = await Task.findOne({ where: { id: id }, raw: true })

    res.render('edit', { task })
  }

  //UPDATE
  static async updateTaskPost(req, res) {
    const id = req.body.id

    const task = {
      title: req.body.title,
      description: req.body.description,
    }

    await Task.update(task, { where: { id: id } })
    res.redirect('/')
  }

  //TOGGLE STATUS
  static async toggleTaskStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const task = {
      done: req.body.done === '0' ? true : false,
    }

    console.log(task)

    await Task.update(task, { where: { id: id } })
    res.redirect('/')
}}

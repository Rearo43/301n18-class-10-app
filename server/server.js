'use strict';

// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
// Initialize the App
const app = express();
app.use(cors());

// Global Variables
const PORT = 3000;

// Route Definitions
app.get('/todo', handleToDo);

// Route Handlers
function handleToDo(request, response) {

  // let thingsToDo = [
  //   { task: 'watch tv' },
  //   { task: 'walk rosie' },
  //   { task: 'practice for lecture' },
  //   { task: 'cooking' },
  //   { task: 'eat cookies' },
  //   { task: 'take a nap' },
  // ];
  let SQL = "SELECT * FROM tasks";
  
  client.query(SQL).then(data =>{
    let allTasks = data.rows;
    response.status(200).json(allTasks);
  })

}

function MakeData(info){
  this.task =  info.task
}

// Go!
function startServer(ugg) {
  ugg.listen(PORT, () => console.log('Server is running'));
}

client.connect().then(() =>{
  startServer(app);
})

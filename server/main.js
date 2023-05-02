import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/api/TasksCollection";
const insertTask = (taskText, user) => {
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
};

const USERNAME = "shreya";
const PASSWORD = "testing";
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(USERNAME)) {
    Accounts.createUser({
      username: USERNAME,
      password: PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(USERNAME);
  console.log(user, "here is the tasks");
  if (TasksCollection.find().count() === 0) {
    console.log(user, "the collection is empty ");
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});

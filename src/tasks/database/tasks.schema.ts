import * as mongoose from "mongoose";
import {Document} from "mongoose";
import {QuestionsTypes, TaskTypes} from './tasks.enums';


export const OptionsSchema = new mongoose.Schema({
  title: String,
  value: String,
});

export const QuestionsSchema = new mongoose.Schema({
  title: String,
  order: Number,
  type: {
    type: String,
    enum: [QuestionsTypes.CheckBox, QuestionsTypes.Input, QuestionsTypes.RadioButton]
  },
  options: [OptionsSchema]
});

export const TasksSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: [TaskTypes.CustomPractical, TaskTypes.Practical, TaskTypes.Test]
  },
  creatorId: mongoose.Schema.Types.ObjectId,
  questions: [QuestionsSchema]
},  { timestamps: true });

export interface Tasks extends Document {
   title: string;
   creatorId: string;
   questions: Questions[];
}

export interface Questions extends Document {
  readonly title: string;
  readonly order: number;
  readonly type: string;
  readonly options: Options[];
}

export interface Options extends Document {
  readonly title: string;
  readonly value: string;
}

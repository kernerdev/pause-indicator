import express from "express";
import { ScheduleHandler } from "./scheduleHandler";
import bodyParser from 'body-parser';
import { Schedule } from "./scheduleType";

export const httpServer = express()

httpServer.use(bodyParser.json())

const scheduleHandler = new ScheduleHandler();

export function checkSchedule(scheduleIndex:number, currentTimeInMinutes:number):any{
	return scheduleHandler.checkSchedule(scheduleIndex,currentTimeInMinutes)
}

httpServer.get('/', function (req, res) {
	res.sendFile('settings.html', {root: __dirname })
})

httpServer.get('/schedule/:number', function (req,res) {
	const scheduleIndex:number = Number.parseInt(req.params.number);
	const schedule = scheduleHandler.getShedule(scheduleIndex);
	if(schedule === undefined){
		res.send({"Message":"Schedule not found"})
		res.statusCode = 404;
		return;
	}
	res.send(schedule.data);
})

httpServer.post('/schedule/:number', function (req,res) {
	const scheduleIndex:number = Number.parseInt(req.params.number);
  const scheduleBody:Schedule[] = req.body;
	console.log(scheduleBody);
	scheduleHandler.setSchedule(scheduleIndex,scheduleBody);
	res.send({"response:":"ok"})
});
import express from "express";
import { ScheduleHandler } from "./scheduleHandler";
import bodyParser from 'body-parser';
import { Schedule } from "./scheduleType";
import { FontSizeHandler } from "./fontSizeHandler";

export const httpServer = express()

httpServer.use(bodyParser.json())

const scheduleHandler = new ScheduleHandler();
const fontSizeHandler = new FontSizeHandler();

export function checkSchedule(scheduleIndex:number, currentTimeInMinutes:number):any{
	return scheduleHandler.checkSchedule(scheduleIndex,currentTimeInMinutes)
}

export function checkClockFontSize():any{
	return fontSizeHandler.getClockFontSize();
}

export function checkMessageFontSize():any{
	return fontSizeHandler.getMessageFontSize();
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


httpServer.get('/clock-fontsize', function (req,res) {
    const fontSize = fontSizeHandler.getClockFontSize();
	if(fontSize === undefined){
		res.send({"Message":"FontSize not found"})
		res.statusCode = 404;
		return;
	}
	res.send(fontSize.data);
});

httpServer.post('/clock-fontsize', function (req,res) {
    const fontsize:any = req.body;
	console.log(fontsize.fontSize);
	fontSizeHandler.setClockFontSize(fontsize)
	res.send({"response:":"ok"})
});


httpServer.get('/message-fontsize', function (req,res) {
    const fontSize = fontSizeHandler.getMessageFontSize();
	if(fontSize === undefined){
		res.send({"Message":"FontSize not found"})
		res.statusCode = 404;
		return;
	}
	res.send(fontSize.data);
});

httpServer.post('/message-fontsize', function (req,res) {
    const fontsize:any = req.body;
	console.log(fontsize.fontSize);
	fontSizeHandler.setMessageFontSize(fontsize)
	res.send({"response:":"ok"})
});
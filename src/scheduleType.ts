export type Schedule = {
	fromTime:string
	toTime:string
	type:"CountUp"|"CountDown"|"Message"
	message:string

	clockColor:string
	counterColor:string
	messageColor:string
}
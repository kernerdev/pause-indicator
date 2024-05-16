import { fileStorage } from './fileStorage';
import { Schedule } from './scheduleType';

export class ScheduleHandler {

	public daySchedules:fileStorage[] = []

	public schedules:fileStorage[] = []
	public prioritySchedules: fileStorage;
	public generalSchedules: fileStorage;
	

	constructor(){
		for (let index = 0; index < 7; index++) {
			this.daySchedules.push(new fileStorage({configName:index+"-schedule"}));
		}
		this.schedules.push(...this.daySchedules);
		this.prioritySchedules = new fileStorage({
			configName: "priority-schedule",
		});
	
		this.generalSchedules = new fileStorage({
			configName: "general-schedule",
		});
		this.schedules.push(this.prioritySchedules);
		this.schedules.push(this.generalSchedules);
		
	}

	public getShedule(index:number):fileStorage|undefined{
		return this.schedules[index] === undefined ? undefined : this.schedules[index];
	}

	public setSchedule(index:number, data:Schedule[]) {
		this.schedules[index].setData(data);
		
	}

  private convertToMinute(schedule_time:any) {
		const splitTime = schedule_time.split(":");
		return Number(splitTime[0]) * 60 + Number(splitTime[1]);
	}
	
	public checkSchedule(scheduleIndex:number, currentTimeInMinutes:number) {
		const scheduleData = this.getShedule(scheduleIndex).data;
		if(scheduleData !== undefined && scheduleData !== undefined){
			for (let i = 0; i < scheduleData.length; i++) {
				const schedule_from_minute = this.convertToMinute(scheduleData[i].fromTime);
				const schedule_to_minute = this.convertToMinute(scheduleData[i].toTime);
				if (
					currentTimeInMinutes >= schedule_from_minute &&
					currentTimeInMinutes <= schedule_to_minute
				) {
					return scheduleData[i];
				}
			}
		}
	}


}
import { fileStorage } from './fileStorage';

export class FontSizeHandler {

	
	public clockFontSizeStorage: fileStorage;
    public messageFontSizeStorage: fileStorage;

	
	constructor(){
		this.clockFontSizeStorage = new fileStorage({
			configName: "clock-font-size-config",
		});
        this.messageFontSizeStorage = new fileStorage({
			configName: "message-font-size-config",
		});
	}

	public getClockFontSize():fileStorage|undefined{
		return this.clockFontSizeStorage === undefined ? undefined : this.clockFontSizeStorage;
	}

	public setClockFontSize(data:any) {
		this.clockFontSizeStorage.setData(data);

	}

    public getMessageFontSize():fileStorage|undefined{
		return this.messageFontSizeStorage === undefined ? undefined : this.messageFontSizeStorage;
	}

	public setMessageFontSize(data:any) {
		this.messageFontSizeStorage.setData(data);

	}


}
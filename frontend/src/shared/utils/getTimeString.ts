import moment from "moment";

export const getTimeString = (time: TimeObject) =>
	moment.utc(time.totalMilliseconds).format(time.hours ? "H ч. m мин." : "m мин.")

export const getTimeString2 = (time: TimeObject) =>
	[{ time: time.hours, text: "ч." }, { time: time.minutes, text: "мин." }]
		.filter(x => x.time)
		.map(x => `${x.time} ${x.text}`)
		.join(" ")

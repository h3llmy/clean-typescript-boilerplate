import * as cron from "node-cron";

interface ISchedulerTimer {
  second?: number;
  minute?: number;
  hour?: number;
  day?: number;
  month?: number;
  week?: number;
}

class Scheduler {
  private cronExpression: string | null;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public every({ second, minute, hour, day, month, week }: ISchedulerTimer) {
    this.cronExpression = `${second > 0 ? `*/${second}` : "*"} ${
      minute > 0 ? `*/${minute}` : "*"
    } ${hour > 0 ? `*/${hour}` : "*"} ${day > 0 ? `*/${day}` : "*"} ${
      month > 0 ? `*/${month}` : "*"
    } ${week > 0 ? `*/${week}` : "*"}`;
    return this;
  }

  public scedule({ second, minute, hour, day, month, week }: ISchedulerTimer) {
    this.cronExpression = `${second > 0 ? second : "*"} ${
      minute > 0 ? minute : "*"
    } ${hour > 0 ? hour : "*"} ${day > 0 ? day : "*"} ${
      month > 0 ? month : "*"
    } ${week > 0 ? week : "*"}`;
    return this;
  }

  public run(action: () => void) {
    if (!this.cronExpression) {
      throw new Error("You must call 'every' or 'scedule' before scheduling.");
    }

    console.log("\x1b[34m%s\x1b[0m", `scheduler ${this.name} is running`);

    cron.schedule(this.cronExpression, action);
    return this;
  }
}

export default Scheduler;

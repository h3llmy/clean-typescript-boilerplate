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

  /**
   * create scheduler task to running in background
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * run the scheduler every seted time
   *
   * the scheduler will running every seted time
   */
  public every({ second, minute, hour, day, month, week }: ISchedulerTimer) {
    this.cronExpression = `${second > 0 ? `*/${second}` : "*"} ${
      minute > 0 ? `*/${minute}` : "*"
    } ${hour > 0 ? `*/${hour}` : "*"} ${day > 0 ? `*/${day}` : "*"} ${
      month > 0 ? `*/${month}` : "*"
    } ${week > 0 ? `*/${week}` : "*"}`;
    return this;
  }

  /**
   * run scheduler by seted time
   *
   * the scheduler will runing every the time reach the seted time
   */
  public scedule({ second, minute, hour, day, month, week }: ISchedulerTimer) {
    this.cronExpression = `${second > 0 ? second : "*"} ${
      minute > 0 ? minute : "*"
    } ${hour > 0 ? hour : "*"} ${day > 0 ? day : "*"} ${
      month > 0 ? month : "*"
    } ${week > 0 ? week : "*"}`;
    return this;
  }

  /**
   * set the function to run when the time fulfil
   */
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



export const AppConfig = {
  EnvName: (process.env.EnvName || 'QA').toLowerCase() as 'qa' | 'uat' | 'prod' | 'dev' | string,
  staticWait: Number(process.env.staticWait) || 0,

  get BaseURL(): string {
    const urls: Record<string, string> = {
      qa: '/',

    };
    return urls[this.EnvName] || 'https://www.google.com.pk/?gws_rd=ssl';
  },
};
export const waits = {
  shortWait:2*1000,
  midumWait: 5*1000,
  longWait: 90*1000,
  elementDisplayWait:120*1000,
};
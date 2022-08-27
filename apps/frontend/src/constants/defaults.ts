const defaults: Record<string, any> = {
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isSendNotification: false,
  createdTasks: [],
};

export default defaults;

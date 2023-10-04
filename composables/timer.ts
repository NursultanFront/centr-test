const DEFAULT_TIMER = 60;

export const usePrintableTimer = (seconds = DEFAULT_TIMER) => {
  const timeToEnd = ref<number>(seconds);
  const timer = ref<ReturnType<typeof setTimeout>>();

  const isFinished = computed(() => timeToEnd.value === 0);

  const estimatedTime = computed(() => {
    const estimateTimeInRawMinutes = timeToEnd.value / 60;

    const regex = /^(\d+).?(\d+)?$/;
    const match = regex.exec(estimateTimeInRawMinutes.toString());

    if (match) {
      const minutes = match[1].padStart(2, '0');
      const seconds = (timeToEnd.value % 60).toString().padStart(2, '0');

      return `${minutes}:${seconds}`;
    }
  });

  const startTimer = (): void => {
    timeToEnd.value = timeToEnd.value - 1;

    if (timeToEnd.value > 0) {
      timer.value = setTimeout(() => startTimer(), 1000);
    }
  };

  const resetTimer = (): void => {
    timeToEnd.value = seconds;

    clearTimeout(timer.value);
  };

  const restartTimer = (): void => {
    resetTimer();
    startTimer();
  };

  return { estimatedTime, isFinished, startTimer, resetTimer, restartTimer };
};

interface ProgressCardProps {
  focusTimeMinutes: number;
  dailyGoalMinutes: number;
}

const ProgressCard = ({
  focusTimeMinutes = 0,
  dailyGoalMinutes = 0,
}: ProgressCardProps) => {
  const hours = (focusTimeMinutes / 60).toFixed(1);
  const goalHours = (dailyGoalMinutes / 60).toFixed(1);

  let percentage = 0;
  if (dailyGoalMinutes > 0) {
    percentage = Math.floor((focusTimeMinutes / dailyGoalMinutes) * 100);
  }
  if (percentage > 100) percentage = 100;

  const goalText =
    dailyGoalMinutes === 0 ? "Goal Met" : `Goal Met (of ${goalHours}h)`;

  return (
    <div className="flex flex-col bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-6 gap-gutter">
      <h3 className="font-sans text-base font-bold uppercase text-primary-container mb-4 tracking-widest">
        Daily Progress
      </h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="font-mono text-4xl font-extrabold text-primary">
            {hours}h
          </p>
          <p className="font-sans text-muted text-sm mt-1">Focus Time</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-3xl font-bold text-primary-container">
            {percentage}%
          </p>
          <p className="font-sans text-muted text-sm mt-1">{goalText}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;

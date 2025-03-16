interface TrendingDownProps {
  percentageChange: number;
}
function TrendingDown({ percentageChange }: TrendingDownProps) {
  const displayValue = Math.abs(percentageChange).toFixed(2);

  return (
    <div className="bg-error-10 dark:bg-error-50 p-2 rounded-lg flex items-center gap-3">
      <p className="text-cap text-error-50 font-medium dark:text-error-10">
        -{displayValue}%
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="17px"
        viewBox="0 -960 960 960"
        width="17px"
        className="fill-error-50 dark:fill-error-10"
      >
        <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z" />
      </svg>
    </div>
  );
}

export default TrendingDown;

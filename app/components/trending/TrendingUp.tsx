function TrendingUp() {
  return (
    <div className="bg-success-20 dark:bg-success-70 p-2 rounded-lg flex items-center gap-3">
      <p className="text-cap text-success-50 dark:text-success-20 font-medium">
        +2,5%
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="17px"
        viewBox="0 -960 960 960"
        width="17px"
        className="fill-success-50 dark:fill-success-20"
      >
        <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
      </svg>
    </div>
  );
}

export default TrendingUp;

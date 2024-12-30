const AirQualityScale = ({ currentValue = 120 }) => {
  const min = 0;
  const max = 500;

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  const segments = [
    {
      label: "Good",
      min: 0,
      max: 50,
      color: "bg-green-400",
      indicatorColor: "border-green-400",
    },
    {
      label: "Moderate",
      min: 50,
      max: 100,
      color: "bg-yellow-400",
      indicatorColor: "border-yellow-400",
    },
    {
      label: "Poor",
      min: 100,
      max: 200,
      color: "bg-orange-400",
      indicatorColor: "border-orange-400",
    },
    {
      label: "Unhealthy",
      min: 200,
      max: 300,
      color: "bg-red-400",
      indicatorColor: "border-red-400",
    },
    {
      label: "Severe",
      min: 300,
      max: 400,
      color: "bg-red-700",
      indicadorColor: "border-red-700",
    },
    {
      label: "Hazardous",
      min: 400,
      max: 500,
      color: "bg-purple-800",
      indicatorColor: "border-purple-800",
    },
  ];

  const currentSegment =
    segments.find(
      (segment) => currentValue >= segment.min && currentValue < segment.max
    ) || segments[segments.length - 1];

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8">
      <div className="flex justify-between mb-1">
        <div
          className="absolute -top-0 -translate-y-full flex flex-col items-center"
          style={{ left: `${clampedPercentage}%` }}
        >
          <div
            className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 ${currentSegment.indicatorColor}`}
          ></div>
        </div>
        {segments.map((segment, i) => {
          const segmentRange = segment.max - segment.min;
          const segmentWidthPercent = (segmentRange / (max - min)) * 100;
          return (
            <div
              key={i}
              className="text-center text-xs font-light text-muted-foreground"
              style={{ width: `${segmentWidthPercent}%` }}
            >
              {segment.label}
            </div>
          );
        })}
      </div>

      <div className="relative flex w-full h-2 rounded overflow-hidden">
        {segments.map((segment, i) => {
          const segmentRange = segment.max - segment.min;
          const segmentWidthPercent = (segmentRange / (max - min)) * 100;
          return (
            <div
              key={i}
              className={`${segment.color} h-full`}
              style={{ width: `${segmentWidthPercent}%` }}
            ></div>
          );
        })}
      </div>

      <div className="w-full h-0.5 relative">
        {segments.map((segment, i) => (
          <div
            key={i}
            className="absolute text-xs font-light text-muted-foreground"
            style={{
              left: `${((segment.max - min) / (max - min)) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            {segment.max}
          </div>
        ))}
        <div
          className="absolute text-xs font-light text-muted-foreground"
          style={{ left: "0%" }}
        >
          {min}
        </div>
      </div>
    </div>
  );
};

export default AirQualityScale;

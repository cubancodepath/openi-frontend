interface AQIParameterP {
  data: {
    contaminant: string;
    value: string;
    fill: string;
    unit: string;
  }[];
}

const AQIParameters = ({ data }: AQIParameterP) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {data.map((param, i) => {
        return (
          <div key={i} className="flex flex-col">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">
                {param.contaminant}
              </h3>
              <p className="text-lg font-bold text-accent-foreground">
                {param.value}{" "}
                <span className="text-xs text-muted-foreground font-extralight">
                  {param.unit}
                </span>
              </p>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full`}
                style={{
                  width:
                    +param.value > 0 ? `${(+param.value / 1000) * 100}%` : "0%",
                  background: param.fill,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AQIParameters;

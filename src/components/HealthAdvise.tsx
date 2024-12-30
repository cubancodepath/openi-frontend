import { AlertTriangle } from "lucide-react"; // Usando íconos de ShadCN

const HealthAdvise = () => {
  return (
    <div className="bg-amber-100 p-4 rounded-md shadow">
      <div className="flex items-start">
        <AlertTriangle className="w-6 h-6 text-amber-500 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Air is poor for unhealthy for sensitive group
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            People with asthma, children and older people should wear masks or
            stay close to indoor plants to breath clean air.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthAdvise;

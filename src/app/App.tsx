import { useState } from 'react';

interface Bus {
  id: number;
  number: number;
}

interface Assignment {
  [busId: number]: string;
}

const busData: Bus[] = [
  { id: 1, number: 9 },
  { id: 2, number: 11 },
  { id: 3, number: 12 },
  { id: 4, number: 13 }
];

const availableDrivers = ['Driver 1', 'Driver 2', 'Driver 3', 'Driver 4'];

const availableDestinations = [
  'Neivasal',
  'SS Kottai',
  'Illupakudi',
  'Seniai',
  'Thirupathur Pudhu Theru',
  'Singampunari',
  'Velangudi',
  'Karaikudi',
  'Enyur',
  'Akitmanai, Thirupathur',
  'Sembanur',
  'Kottaiyur',
  'Keelaevalpatti',
  'Kallutimedu',
  'Elanthaim angalam'
];

export default function App() {
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [driverAssignments, setDriverAssignments] = useState<Assignment>({});
  const [destinationAssignments, setDestinationAssignments] = useState<Assignment>({});

  const selectedBus = busData.find(bus => bus.id === selectedBusId);
  const assignedDriver = selectedBusId ? driverAssignments[selectedBusId] : null;
  const assignedDestination = selectedBusId ? destinationAssignments[selectedBusId] : null;

  const handleDriverSelect = (driver: string) => {
    if (selectedBusId) {
      setDriverAssignments({
        ...driverAssignments,
        [selectedBusId]: driver
      });
    }
  };

  const handleDestinationSelect = (destination: string) => {
    if (selectedBusId) {
      setDestinationAssignments({
        ...destinationAssignments,
        [selectedBusId]: destination
      });
    }
  };

  const isDriverAssigned = (driver: string) => {
    return Object.values(driverAssignments).includes(driver);
  };

  const isDestinationAssigned = (destination: string) => {
    return Object.values(destinationAssignments).includes(destination);
  };

  return (
    <div className="size-full bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-foreground">Bus Management System</h1>

        <div className="mb-8">
          <h2 className="mb-4 text-foreground">Available Buses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {busData.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={`p-6 border-2 rounded-lg transition-all hover:scale-105 ${
                  selectedBusId === bus.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-card-foreground border-border hover:border-primary'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="opacity-60">Bus</span>
                  <span className="text-3xl">{bus.number}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedBus && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4 text-card-foreground">Select Driver for Bus {selectedBus.number}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDrivers.map((driver) => {
                  const isAssignedToOtherBus = isDriverAssigned(driver) && driverAssignments[selectedBus.id] !== driver;
                  const isAssignedToThisBus = driverAssignments[selectedBus.id] === driver;

                  return (
                    <button
                      key={driver}
                      onClick={() => handleDriverSelect(driver)}
                      disabled={isAssignedToOtherBus}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        isAssignedToThisBus
                          ? 'bg-primary text-primary-foreground border-primary'
                          : isAssignedToOtherBus
                          ? 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed'
                          : 'bg-card text-card-foreground border-border hover:border-primary hover:scale-105'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground">
                          {driver.charAt(driver.length - 1)}
                        </div>
                        <span className="text-sm">{driver}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {assignedDriver && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="mb-4 text-card-foreground">Select Destination for Bus {selectedBus.number}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {availableDestinations.map((destination) => {
                    const isAssignedToOtherBus = isDestinationAssigned(destination) && destinationAssignments[selectedBus.id] !== destination;
                    const isAssignedToThisBus = destinationAssignments[selectedBus.id] === destination;

                    return (
                      <button
                        key={destination}
                        onClick={() => handleDestinationSelect(destination)}
                        disabled={isAssignedToOtherBus}
                        className={`p-4 border-2 rounded-lg transition-all text-center ${
                          isAssignedToThisBus
                            ? 'bg-primary text-primary-foreground border-primary'
                            : isAssignedToOtherBus
                            ? 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed'
                            : 'bg-card text-card-foreground border-border hover:border-primary hover:scale-105'
                        }`}
                      >
                        {destination}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {assignedDriver && assignedDestination && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    alert(`Bus ${selectedBus.number} assigned to ${assignedDriver} for route to ${assignedDestination}`);
                    setSelectedBusId(null);
                  }}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all hover:scale-105"
                >
                  Confirm Selection
                </button>
              </div>
            )}
          </div>
        )}

        {!selectedBus && (
          <div className="text-center p-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">Select a bus to assign a driver and view route details</p>
          </div>
        )}
      </div>
    </div>
  );
}
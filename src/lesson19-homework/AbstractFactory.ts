import { vehicleDictionary } from './data';
import { Vehicle } from './BaseVehicle';
import { TVehicleName } from './type';

export class VehicleFactory {
    static getFactory(name: TVehicleName): Vehicle {
        const vehicle = vehicleDictionary[name];
        if (!vehicle) {
            throw new Error(`Vehicle ${name} does not exist`);
        }
        return vehicle;
    }
}

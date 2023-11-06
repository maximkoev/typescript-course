import { VehicleFactory } from './AbstractFactory';

VehicleFactory.getFactory('bmx').go();
const honda = VehicleFactory.getFactory('honda');
honda.go();
honda.stop();

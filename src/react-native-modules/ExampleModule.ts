import { NativeModules } from 'react-native';

const { ExampleModule } = NativeModules;

interface ExampleModuleInterface {
  log(message: string): void;
  rand(): Promise<number>;
  randSync(): number;
  triggerEvent(eventName: string, eventParams?: any): void;
}

export default ExampleModule as ExampleModuleInterface;

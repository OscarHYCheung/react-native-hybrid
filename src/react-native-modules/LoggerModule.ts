import { NativeModules } from 'react-native';

const { LoggerModule } = NativeModules;

interface LoggerModuleInterface {
  log(message: string): void;
}

export default LoggerModule as LoggerModuleInterface;

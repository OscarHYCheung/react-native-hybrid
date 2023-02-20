import { NativeModules } from 'react-native';

const { RandomModule } = NativeModules;

interface RandomModuleInterface {
  rand(): Promise<number>;
  randSync(): number;
}

export default RandomModule as RandomModuleInterface;

import { NativeModules } from 'react-native';

const { EventEmitter } = NativeModules;

interface EventInterface {
  getConstants(): {
    [EXAMPLE_EVENT_NAME: string]: string,
  },
  emitEventFromReactNative(): void,
  addListener(): void,
  removeListeners(count: Number): void,
}

export default EventEmitter as EventInterface;

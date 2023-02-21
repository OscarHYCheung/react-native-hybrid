import { NativeModules } from 'react-native';

const { EventModule } = NativeModules;

interface EventInterface {
  getConstants(): {
    [EVENT_NAME: string]: string,
  },
  triggerEvent(): void,
  addListener(eventName: String): void,
  removeListeners(count: Number): void,
}

export default EventModule as EventInterface;

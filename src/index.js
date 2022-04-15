import { LogBox } from 'react-native';
import App from '../App';

LogBox.ignoreLogs([
  'Setting a timer',
  'Non-serializable values were found in the navigation state',
]);
export { App };

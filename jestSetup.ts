import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {jest} from '@jest/globals';
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  TroveStack: NavigatorScreenParams<RootTabParamList> | undefined;
  ListsStack: NavigatorScreenParams<RootTabParamList> | undefined;
  ListStack: NavigatorScreenParams<RootTabParamList> | undefined;
  SettingsStack: NavigatorScreenParams<RootTabParamList> | undefined;
  Item: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  ListsTab: undefined;
  TroveTab: undefined;
  SettingsTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList>,
    BottomTabScreenProps<RootTabParamList, Screen>
  >;

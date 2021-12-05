import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

declare global {
  // namespace ReactNavigation {
  //   interface RootParamList extends RootStackParamList {}
  // }
  type User = null | {
    username: string;
    groupname: string;
    token: string;
  };
  type OtherUser = {
    username: string;
    email: string;
  };
  type DateData = {
    year: number;
    month: number;
    day: number;
  };
  type TimeTable = {
    lesson: {
      BeginTime: string;
      EndTime: string;
    };
    subject: {
      Abbrev: string;
      Name: string;
    };
  };
  type Task = {
    title: string;
    subject: {
      title: string;
      color: string;
    };
    date: DateData;
    color: string;
    createdByUser: OtherUser;
    type: "homework" | "test";
  };
}

// export type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
//   AddTask: undefined;
//   NotFound: undefined;
// };
// export type RootNavProps<T extends keyof RootStackParamList> = {
//   navigation: StackNavigationProp<RootStackParamList, T>;
//   route: RouteProp<RootStackParamList, T>;
// };

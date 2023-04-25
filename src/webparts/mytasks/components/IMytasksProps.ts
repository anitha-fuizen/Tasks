import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMytasksProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  ListName:string;
}

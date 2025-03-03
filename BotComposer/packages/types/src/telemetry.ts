// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeedType, RuntimeType } from './creation';
import { TelemetrySettings } from './settings';

export type ServerSettings = Partial<{ telemetry: TelemetrySettings }>;

export type LogData = Record<string, unknown>;

export enum TelemetryEventTypes {
  TrackEvent = 'TrackEvent',
  PageView = 'PageView',
}

export type TelemetryEvent = {
  type: TelemetryEventTypes;
  name: string;
  url?: string;
  properties?: LogData;
};

export enum PageNames {
  Design = 'Design',
  Home = 'Home',
  LanguageGeneration = 'LanguageGeneration',
  LanguageUnderstanding = 'LanguageUnderstanding',
  KnowledgeBase = 'KnowledgeBase',
  Publish = 'Publish',
  Diagnostics = 'Diagnostics',
  BotProjectsSettings = 'BotProjectsSettings',
  Plugin = 'Plugin',
  Settings = 'Settings',
  Unknown = 'Unknown',

  // Extensions
  Forms = 'Forms',
  PackageManger = 'PackageManger',
}

type ApplicationEvents = {
  NotificationPanelOpened: undefined;
  HandoffToComposerCompleted: { appId?: string | null; source?: string | null };
};

type GettingStartedEvents = {
  GettingStartedLinkClicked: { method: 'link' | 'button'; url: string };
  GettingStartedActionClicked: { taskName: string; priority: string };
};

type PackageManagerEvents = {
  PackageInstallConflictFound: { package: string; version: string; isUpdate: boolean };
  PackageInstallConflictResolved: { package: string; version: string; isUpdate: boolean };
  PackageInstalled: { package: string; version: string; isUpdate: boolean };
  PackageInstallFailed: { package: string; version: string; isUpdate: boolean };
  PackageSearch: { term: string };
  PackageUninstalled: { package: string };
  PackageUninstallFailed: { package: string };
  PackageFeedAdded: undefined;
  PackageFeedDeleted: undefined;
};

type SessionEvents = {
  SessionStarted: { os: string; height: number; width: number; devicePixelRatio: number };
  SessionEnded: undefined;
  NavigateTo: { sectionName: string; url: string };
};

type BotProjectEvents = {
  CreateNewBotProject: { method: 'toolbar' | 'newCallToAction' | 'luisCallToAction' };
  CreateNewBotProjectNextButton: { template: string };
  CreateNewBotProjectFromExample: { template: string };
  CreateNewBotProjectStarted: { template: string };
  CreateNewBotProjectCompleted: { template: string; status: number };
  CreateNewBotProjectFailed: { reason: string; template: string; status: number };
  BotProjectOpened: { method: 'toolbar' | 'callToAction' | 'list'; projectId?: string };
  StartAllBotsButtonClicked: undefined;
  StartBotButtonClicked: { isRoot: boolean; location: string; projectId: string };
  RestartAllBotsButtonClicked: undefined;
  StartBotStarted: { projectId: string };
  StartBotCompleted: { projectId: string; status: string };
  StopBotButtonClicked: { isRoot: boolean; location: string; projectId: string };
};

type DesignerEvents = {
  ActionAdded: { type: string };
  ActionDeleted: { type: string };
  EditModeToggled: { jsonView: boolean };
  HelpLinkClicked: { url: string };
  ToolbarButtonClicked: { name: string };
  EmulatorButtonClicked: { isRoot: boolean; projectId: string; location: 'WebChatPane' | 'BotController' };
  LeftMenuModeToggled: { expanded: boolean };
  ProjectTreeFilterUsed: undefined;
  TooltipOpened: { location?: string; title: string; duration: number };
  AddNewTriggerStarted: undefined;
  AddNewTriggerCompleted: { kind: string };
  AddNewDialogStarted: undefined;
  AddNewDialogCompleted: undefined;
  AddNewSkillStarted: { method: string };
  AddNewSkillCompleted: { from: string };
  NewTemplateAdded: undefined;
  FormDialogGenerated: { durationMilliseconds: number };
};

type QnaEvents = {
  AddNewKnowledgeBaseStarted: undefined;
  AddNewKnowledgeBaseCompleted: { source: 'none' | 'kb' | 'url' };
  AddNewKnowledgeBaseError: { error: string };
  AddNewKnowledgeBaseCanceled: undefined;
  UpdateKnowledgeBaseStarted: undefined;
  UpdateKnowledgeBaseCompleted: { source: 'none' | 'kb' | 'url' };
  UpdateKnowledgeBaseCanceled: undefined;
  UpdateKnowledgeBaseError: { error: string };
  NewQnAPair: undefined;
  AlternateQnAPhraseAdded: undefined;
};

type ResourcesItem = {
  description: string;
  text: string;
  tier: string;
  group: string;
  key: string;
  required: boolean;
  [key: string]: any;
};

type PublishingEvents = {
  CreateProvisionStarted: { newResourceGroup: boolean };
  PublishStartBtnClick: undefined;
  PublishSuccess: undefined;
  PublishFailure: { message: string };
  NewPublishingProfileStarted: undefined;
  NewPublishingProfileSaved: { type: string; msAppId?: string; subscriptionId?: string };
  PublishingProfileStarted: { target: string; projectId: string; msAppId?: string; subscriptionId?: string };
  PublishingProfileCompleted: { target: string; projectId: string; msAppId?: string; subscriptionId?: string };
  ProvisionAddResourcesNavigate: undefined;
  ProvisionConfigureResources: undefined;
  ProvisionEditJSON: undefined;
  ProvisionReviewResources: undefined;
  ProvisionStart: { region: string; subscriptionId: string; externalResources: ResourcesItem[] };
  ProvisionCancel: undefined;
  ProvisionShowHandoff: undefined;
  ProvisionAddResourcesCancel: undefined;
  ProvisioningProfileCreateFailure: { message: string };
};

type CreationEvents = {
  NewBotDialogOpened: { fromAbsHandoff: boolean; isSkillBot: boolean };
  CreationCancelled: undefined;
  NeedAnotherTemplateClicked: undefined;
  CreationExecuted: { runtimeChoice: RuntimeType; runtimeLanguage: FeedType; isPva: boolean; isAbs: boolean };
};

type AppSettingsEvents = {
  FeatureFlagChanged: { featureFlag: string; enabled: boolean };
};

type BotSettingsEvents = {
  CustomRuntimeToggleChanged: { enabled: boolean };
  GetNewRuntime: { runtimeType: string };
  SettingsGetKeysExistingResourceSelected: { subscriptionId: string; resourceType: string };
  SettingsGetKeysCreateNewResourceStarted: {
    subscriptionId: string;
    resourceType: string;
    createNewResourceGroup: boolean;
    region: string;
  };
  SettingsGetKeysCreateNewResourceCompleted: {
    subscriptionId: string;
    resourceType: string;
    createNewResourceGroup: boolean;
    region: string;
  };
  SettingsGetKeysResourceRequestSelected: { subscriptionId?: string; resourceType: string };
  TelemetryOptInOut: { enabled: boolean };
};

type LgEditorEvents = {
  LGEditorSwitchToCodeEditor: undefined;
  LGEditorSwitchToResponseEditor: undefined;
  LGEditorModalityAdded: { modality: string };
  LGEditorModalityDeleted: { modality: string };
  LGQuickInsertItem: {
    itemType: string;
    item?: string;
    location: 'LGCodeEditor' | 'LGResponseEditor';
  };
};

type LuEditorEvents = {
  LUEditorToolbarEntityTagAdded: { entityType: string; source: 'toolbar' | 'floatingMenu' };
  LUEditorToolbarEntityDefinitionAdded: { entityType: string };
};

type WebChatEvents = {
  WebChatPaneOpened: undefined;
  WebChatPaneClosed: undefined;
  WebChatConversationRestarted: { restartType: 'SameUserId' | 'NewUserId' };
  DrawerPaneOpened: undefined;
  DrawerPaneClosed: undefined;
  DrawerPaneTabOpened: { tabType: 'Diagnostics' | 'WebChatInspector' | 'RuntimeLog' | 'Watch' };
  SaveTranscriptClicked: undefined;
};

type DebuggingEvents = {
  StateWatchPropertyAdded: { property: string };
  StateWatchPropertyRemoved: { property: string };
};

type ABSChannelsEvents = {
  ConnectionsAddNewProfile: undefined;
  ConnectionsChannelStatusDisplayed: { teams: boolean; speech: boolean; webchat: boolean };
  ConnectionsChannelStatusError: { error: string };
  ConnectionsToggleChannel: { channel: string; enabled: boolean };
  ConnectionsToggleChannelFailed: { channel: string; enabled: boolean };
};

type OrchestratorEvents = {
  OrchestratorDownloadStarted: undefined;
  OrchestratorDownloadCompleted: undefined;
  OrchestratorBuildStarted: { baseModel: string; firstBuild: boolean };
  OrchestratorBuildCompleted: { baseModel: string; firstBuild: boolean };
};

type PropertyEditorEvents = {
  RecognizerChanged: { recognizer: string };
};

type OtherEvents = {};

type PageView = {
  [PageNames.Design]: undefined;
  [PageNames.Home]: undefined;
  [PageNames.LanguageGeneration]: undefined;
  [PageNames.LanguageUnderstanding]: undefined;
  [PageNames.KnowledgeBase]: undefined;
  [PageNames.Publish]: undefined;
  [PageNames.Diagnostics]: undefined;
  [PageNames.BotProjectsSettings]: undefined;
  [PageNames.Plugin]: undefined;
  [PageNames.Settings]: undefined;
  [PageNames.Unknown]: undefined;
  [PageNames.Forms]: undefined;
  [PageNames.PackageManger]: undefined;
};

type SurveyEvents = {
  HATSSurveyOffered: undefined;
  HATSSurveyDismissed: undefined;
  HATSSurveyAccepted: undefined;
  HATSSurveyRejected: undefined;
};

export type TelemetryEvents = ApplicationEvents &
  GettingStartedEvents &
  BotProjectEvents &
  PackageManagerEvents &
  DesignerEvents &
  ABSChannelsEvents &
  SessionEvents &
  BotSettingsEvents &
  OtherEvents &
  PublishingEvents &
  QnaEvents &
  AppSettingsEvents &
  PageView &
  LgEditorEvents &
  WebChatEvents &
  LuEditorEvents &
  OrchestratorEvents &
  PropertyEditorEvents &
  CreationEvents &
  SurveyEvents &
  DebuggingEvents;

export type TelemetryEventName = keyof TelemetryEvents;

export type TelemetryClient = {
  track: <TN extends TelemetryEventName>(
    eventName: TN,
    properties?: TelemetryEvents[TN] extends undefined ? never : TelemetryEvents[TN]
  ) => void;

  pageView: <TN extends TelemetryEventName>(
    eventName: TN,
    url: string,
    properties?: TelemetryEvents[TN] extends undefined ? never : TelemetryEvents[TN]
  ) => void;
};

/**
 * persistedEvents is an array of telemetry events that occur before the user has
 * had a chance to opt in to data collection. These events are added to the event queue;
 * however, they are only logged to Application Insights after the user opts in to data collection.
 */
export const persistedEvents: TelemetryEventName[] = ['SessionStarted', 'HandoffToComposerCompleted'];

/**
 * These events are ones which are always tracked regardless of whether tracking is opted
 * into or not (i.e. those having to do with turning telemetry itself on or off). If
 * the user opts out, we will strip all PII from the event before sending it. Every event
 * whose name is in this array should have "enabled: boolean" in its fields.
 */
export const alwaysTrackEvents: TelemetryEventName[] = ['TelemetryOptInOut'];

/** Names of the properties containing PII Data */
export const piiProperties = ['userId'];

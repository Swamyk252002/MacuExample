/// <reference types="node" />
/**
 * Creates an error object in case a session gets incompatible capabilities as the input.
 *
 * @returns {Error}
 */
export function makeNonW3cCapsError(): Error;
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<ServerCommand>}
 */
export function isServerCommandArgs<Cmd extends import("appium/types").CliCommand = "server", SubCmd extends void | import("appium/types").CliExtensionSubcommand = void>(args: import("appium/types").Args<Cmd, SubCmd>): args is {
    subcommand?: import("appium/types").CliCommand | undefined;
    configFile?: string | undefined;
    showConfig?: boolean | undefined;
    shell?: boolean | undefined;
    throwInsteadOfExit?: boolean | undefined;
    logHandler?: ((...args: any[]) => void) | undefined;
    appiumHome?: string | undefined;
    showBuildInfo?: boolean | undefined;
    driver?: import("@appium/types").DriverConfig | undefined;
    plugin?: import("@appium/types").PluginConfig | undefined;
    address?: string | undefined;
    nodeconfig?: import("@appium/types").NodeconfigConfig | undefined;
    port?: number | undefined;
    webhook?: string | undefined;
    allowCors?: NonNullable<boolean | undefined> | undefined;
    allowInsecure?: import("@appium/types").AllowInsecureConfig | undefined;
    basePath?: string | undefined;
    callbackAddress?: string | undefined;
    callbackPort?: number | undefined;
    debugLogSpacing?: NonNullable<boolean | undefined> | undefined;
    defaultCapabilities?: import("@appium/types").DefaultCapabilitiesConfig | undefined;
    denyInsecure?: import("@appium/types").DenyInsecureConfig | undefined;
    keepAliveTimeout?: number | undefined;
    localTimezone?: NonNullable<boolean | undefined> | undefined;
    logFilters?: import("@appium/types").LogFiltersConfig | undefined;
    logNoColors?: NonNullable<boolean | undefined> | undefined;
    logTimestamp?: NonNullable<boolean | undefined> | undefined;
    pluginsImportChunkSize?: number | undefined;
    driversImportChunkSize?: number | undefined;
    longStacktrace?: NonNullable<boolean | undefined> | undefined;
    noPermsCheck?: NonNullable<boolean | undefined> | undefined;
    sessionOverride?: NonNullable<boolean | undefined> | undefined;
    strictCaps?: NonNullable<boolean | undefined> | undefined;
    traceDir?: string | undefined;
    useDrivers?: import("@appium/types").UseDriversConfig | undefined;
    usePlugins?: import("@appium/types").UsePluginsConfig | undefined;
    sslKeyPath?: string | undefined;
    logFile?: string | undefined;
    loglevel?: NonNullable<import("@appium/types").LogLevelConfig | undefined> | undefined;
    relaxedSecurityEnabled?: NonNullable<boolean | undefined> | undefined;
    tmpDir?: string | undefined;
    sslCertificatePath?: string | undefined;
};
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<CliExtensionCommand, SubCmd>}
 */
export function isExtensionCommandArgs<Cmd extends import("appium/types").CliCommand = "server", SubCmd extends void | import("appium/types").CliExtensionSubcommand = void>(args: import("appium/types").Args<Cmd, SubCmd>): args is import("appium/types").ParsedArgs<"driver", SubCmd> | import("appium/types").ParsedArgs<"plugin", SubCmd>;
/**
 * @template {CliCommand} Cmd
 * @template {CliExtensionSubcommand} SubCmd
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<DriverCommand, SubCmd>}
 */
export function isDriverCommandArgs<Cmd extends import("appium/types").CliCommand, SubCmd extends import("appium/types").CliExtensionSubcommand>(args: import("appium/types").Args<Cmd, SubCmd>): args is import("appium/types").ParsedArgs<"driver", SubCmd>;
/**
 * @template {CliCommand} Cmd
 * @template {CliExtensionSubcommand} SubCmd
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<PluginCommand, SubCmd>}
 */
export function isPluginCommandArgs<Cmd extends import("appium/types").CliCommand, SubCmd extends import("appium/types").CliExtensionSubcommand>(args: import("appium/types").Args<Cmd, SubCmd>): args is import("appium/types").ParsedArgs<"plugin", SubCmd>;
/**
 * Fetches the list of matched network interfaces of the current host.
 *
 * @param {4|6|null} family Either 4 to include ipv4 addresses only,
 * 6 to include ipv6 addresses only, or null to include all of them
 * @returns {os.NetworkInterfaceInfo[]} The list of matched interfcaes
 */
export function fetchInterfaces(family?: 4 | 6 | null): os.NetworkInterfaceInfo[];
export const V4_BROADCAST_IP: "0.0.0.0";
export const V6_BROADCAST_IP: "::";
export const npmPackage: import("read-pkg").NormalizedPackageJson;
export type StringRecord = import('@appium/types').StringRecord;
export type BaseDriverCapConstraints = import('@appium/types').BaseDriverCapConstraints;
export type ParsedDriverCaps<C extends import("@appium/types").Constraints = {
    readonly platformName: {
        readonly presence: true;
        readonly isString: true;
    };
    readonly app: {
        readonly isString: true;
    };
    readonly platformVersion: {
        readonly isString: true;
    };
    readonly webSocketUrl: {
        readonly isBoolean: true;
    };
    readonly newCommandTimeout: {
        readonly isNumber: true;
    };
    readonly automationName: {
        readonly isString: true;
    };
    readonly autoLaunch: {
        readonly isBoolean: true;
    };
    readonly udid: {
        readonly isString: true;
    };
    readonly orientation: {
        readonly inclusion: readonly ["LANDSCAPE", "PORTRAIT"];
    };
    readonly autoWebview: {
        readonly isBoolean: true;
    };
    readonly noReset: {
        readonly isBoolean: true;
    };
    readonly fullReset: {
        readonly isBoolean: true;
    };
    readonly language: {
        readonly isString: true;
    };
    readonly locale: {
        readonly isString: true;
    };
    readonly eventTimings: {
        readonly isBoolean: true;
    };
    readonly printPageSourceOnFindFailure: {
        readonly isBoolean: true;
    };
}, J = any> = {
    desiredCaps: Capabilities<C>;
    protocol: string;
    processedJsonwpCapabilities?: J | undefined;
    processedW3CCapabilities?: import("@appium/types").W3CCapabilities<C> | undefined;
};
export type InvalidCaps<C extends import("@appium/types").Constraints = {
    readonly platformName: {
        readonly presence: true;
        readonly isString: true;
    };
    readonly app: {
        readonly isString: true;
    };
    readonly platformVersion: {
        readonly isString: true;
    };
    readonly webSocketUrl: {
        readonly isBoolean: true;
    };
    readonly newCommandTimeout: {
        readonly isNumber: true;
    };
    readonly automationName: {
        readonly isString: true;
    };
    readonly autoLaunch: {
        readonly isBoolean: true;
    };
    readonly udid: {
        readonly isString: true;
    };
    readonly orientation: {
        readonly inclusion: readonly ["LANDSCAPE", "PORTRAIT"];
    };
    readonly autoWebview: {
        readonly isBoolean: true;
    };
    readonly noReset: {
        readonly isBoolean: true;
    };
    readonly fullReset: {
        readonly isBoolean: true;
    };
    readonly language: {
        readonly isString: true;
    };
    readonly locale: {
        readonly isString: true;
    };
    readonly eventTimings: {
        readonly isBoolean: true;
    };
    readonly printPageSourceOnFindFailure: {
        readonly isBoolean: true;
    };
}, J = any> = {
    error: Error;
    protocol: string;
    desiredCaps?: import("@appium/types").ConstraintsToCaps<C> | undefined;
    processedJsonwpCapabilities?: J | undefined;
    processedW3CCapabilities?: import("@appium/types").W3CCapabilities<C> | undefined;
};
export type Capabilities<C extends import("@appium/types").Constraints> = import('@appium/types').Capabilities<C>;
export type W3CCapabilities<C extends import("@appium/types").Constraints> = import('@appium/types').W3CCapabilities<C>;
export type NSCapabilities<C extends import("@appium/types").Constraints> = import('@appium/types').NSCapabilities<C>;
export type ConstraintsToCaps<C extends import("@appium/types").Constraints> = import('@appium/types').ConstraintsToCaps<C>;
export type StringKeyOf<T> = import('type-fest').StringKeyOf<T>;
export type Constraints = import('@appium/types').Constraints;
export type CliCommand = import('appium/types').CliCommand;
export type CliExtensionSubcommand = import('appium/types').CliExtensionSubcommand;
export type CliExtensionCommand = import('appium/types').CliExtensionCommand;
export type ServerCommand = import('appium/types').CliCommandServer;
export type DriverCommand = import('appium/types').CliCommandDriver;
export type PluginCommand = import('appium/types').CliCommandPlugin;
export type Args<Cmd extends import("appium/types").CliCommand = "server", SubCmd extends void | import("appium/types").CliExtensionSubcommand = void> = import('appium/types').Args<Cmd, SubCmd>;
export type ParsedArgs<Cmd extends import("appium/types").CliCommand = "server", SubCmd extends void | import("appium/types").CliExtensionSubcommand = void> = import('appium/types').ParsedArgs<Cmd, SubCmd>;
import os from 'node:os';
/**
 * Dumps to value to the console using `info` logger.
 *
 * @todo May want to force color to be `false` if {@link isStdoutTTY} is `false`.
 */
export const inspect: (t1: any) => void;
/**
 * Takes the caps that were provided in the request and translates them
 * into caps that can be used by the inner drivers.
 *
 * @template {Constraints} C
 * @template [J=any]
 * @param {J} jsonwpCapabilities
 * @param {W3CCapabilities<C>} w3cCapabilities
 * @param {C} constraints
 * @param {NSCapabilities<C>} [defaultCapabilities]
 * @returns {ParsedDriverCaps<C,J>|InvalidCaps<C,J>}
 */
export function parseCapsForInnerDriver<C extends import("@appium/types").Constraints, J = any>(jsonwpCapabilities: J, w3cCapabilities: import("@appium/types").W3CCapabilities<C>, constraints?: C, defaultCapabilities?: Partial<import("@appium/types").CapsToNSCaps<import("@appium/types").ConstraintsToCaps<C>, "appium">> | undefined): ParsedDriverCaps<C, J> | InvalidCaps<C, J>;
/**
 * Takes a capabilities objects and prefixes capabilities with `appium:`
 * @template {Constraints} [C={}]
 * @param {Capabilities<C>} caps - Desired capabilities object
 * @returns {NSCapabilities<C>}
 */
export function insertAppiumPrefixes<C extends import("@appium/types").Constraints = {}>(caps: import("@appium/types").ConstraintsToCaps<C>): Partial<import("@appium/types").CapsToNSCaps<import("@appium/types").ConstraintsToCaps<C>, "appium">>;
/**
 *
 * @param {string} pkgName
 * @returns {string|undefined}
 */
export function getPackageVersion(pkgName: string): string | undefined;
/**
 * Pulls the initial values of Appium settings from the given capabilities argument.
 * Each setting item must satisfy the following format:
 * `settings[setting_name]: setting_value`
 * or
 * ```
 * settings = {
 *   setting_name1: 'setting_value1',
 *   setting_name2: 'setting_value2',
 * }
 * ```
 * The capabilities argument itself gets mutated, so it does not contain parsed
 * settings anymore to avoid further parsing issues.
 * Check
 * https://appium.io/docs/en/latest/guides/settings/
 * for more details on the available settings.
 *
 * @param {?Object} caps - Capabilities dictionary. It is mutated if
 * one or more settings have been pulled from it
 * @return {Object} - An empty dictionary if the given caps contains no
 * setting items or a dictionary containing parsed Appium setting names along with
 * their values.
 */
export function pullSettings(caps: any | null): any;
/**
 * @template {Constraints} [C={}]
 * @param {NSCapabilities<C>} caps
 * @returns {Capabilities<C>}
 */
export function removeAppiumPrefixes<C extends import("@appium/types").Constraints = {}>(caps: Partial<import("@appium/types").CapsToNSCaps<import("@appium/types").ConstraintsToCaps<C>, "appium">>): import("@appium/types").ConstraintsToCaps<C>;
/**
 * Adjusts NODE_PATH environment variable,
 * so drivers and plugins could load their peer dependencies.
 * Read https://nodejs.org/api/modules.html#loading-from-the-global-folders
 * for more details.
 * @returns {void}
 */
export function adjustNodePath(): void;
//# sourceMappingURL=utils.d.ts.map
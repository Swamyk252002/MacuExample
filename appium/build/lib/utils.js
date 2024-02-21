"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustNodePath = exports.removeAppiumPrefixes = exports.pullSettings = exports.getPackageVersion = exports.insertAppiumPrefixes = exports.parseCapsForInnerDriver = exports.inspect = exports.fetchInterfaces = exports.isPluginCommandArgs = exports.isDriverCommandArgs = exports.isExtensionCommandArgs = exports.isServerCommandArgs = exports.makeNonW3cCapsError = exports.npmPackage = exports.V6_BROADCAST_IP = exports.V4_BROADCAST_IP = void 0;
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = __importDefault(require("./logger"));
const base_driver_1 = require("@appium/base-driver");
const util_1 = require("util");
const support_1 = require("@appium/support");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const node_os_1 = __importDefault(require("node:os"));
const W3C_APPIUM_PREFIX = 'appium';
const STANDARD_CAPS_LOWERCASE = new Set([...base_driver_1.STANDARD_CAPS].map((cap) => cap.toLowerCase()));
exports.V4_BROADCAST_IP = '0.0.0.0';
exports.V6_BROADCAST_IP = '::';
exports.npmPackage = support_1.fs.readPackageJsonFrom(__dirname);
/**
 *
 * If `stdout` is a TTY, this is `true`.
 *
 * Used for tighter control over log output.
 * @type {boolean}
 */
const isStdoutTTY = process.stdout.isTTY;
/**
 * Creates an error object in case a session gets incompatible capabilities as the input.
 *
 * @returns {Error}
 */
function makeNonW3cCapsError() {
    return new base_driver_1.errors.SessionNotCreatedError('Session capabilities format must comply to the W3C standard. Make sure your client is up to date. ' +
        'See https://www.w3.org/TR/webdriver/#new-session for more details.');
}
exports.makeNonW3cCapsError = makeNonW3cCapsError;
/**
 * Dumps to value to the console using `info` logger.
 *
 * @todo May want to force color to be `false` if {@link isStdoutTTY} is `false`.
 */
const inspect = lodash_1.default.flow(lodash_1.default.partialRight(
/** @type {(object: any, options: import('util').InspectOptions) => string} */ (util_1.inspect), { colors: true, depth: null, compact: !isStdoutTTY }), (...args) => {
    logger_1.default.info(...args);
});
exports.inspect = inspect;
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
function parseCapsForInnerDriver(jsonwpCapabilities, w3cCapabilities, constraints = /** @type {C} */ ({}), defaultCapabilities = {}) {
    // Check if the caller sent JSONWP caps, W3C caps, or both
    const hasW3CCaps = lodash_1.default.isPlainObject(w3cCapabilities) &&
        (lodash_1.default.has(w3cCapabilities, 'alwaysMatch') || lodash_1.default.has(w3cCapabilities, 'firstMatch'));
    const hasJSONWPCaps = lodash_1.default.isPlainObject(jsonwpCapabilities);
    let desiredCaps = /** @type {ParsedDriverCaps<C>['desiredCaps']} */ ({});
    /** @type {ParsedDriverCaps<C>['processedW3CCapabilities']} */
    let processedW3CCapabilities;
    /** @type {ParsedDriverCaps<C>['processedJsonwpCapabilities']} */
    let processedJsonwpCapabilities;
    if (!hasW3CCaps) {
        return /** @type {InvalidCaps<C>} */ ({
            protocol: base_driver_1.PROTOCOLS.W3C,
            error: makeNonW3cCapsError(),
        });
    }
    const { W3C } = base_driver_1.PROTOCOLS;
    const protocol = W3C;
    // Make sure we don't mutate the original arguments
    jsonwpCapabilities = lodash_1.default.cloneDeep(jsonwpCapabilities);
    w3cCapabilities = lodash_1.default.cloneDeep(w3cCapabilities);
    defaultCapabilities = lodash_1.default.cloneDeep(defaultCapabilities);
    if (!lodash_1.default.isEmpty(defaultCapabilities)) {
        if (hasW3CCaps) {
            for (const [defaultCapKey, defaultCapValue] of lodash_1.default.toPairs(defaultCapabilities)) {
                let isCapAlreadySet = false;
                // Check if the key is already present in firstMatch entries
                for (const firstMatchEntry of w3cCapabilities.firstMatch ?? []) {
                    if (lodash_1.default.isPlainObject(firstMatchEntry) &&
                        lodash_1.default.has(removeAppiumPrefixes(firstMatchEntry), removeAppiumPrefix(defaultCapKey))) {
                        isCapAlreadySet = true;
                        break;
                    }
                }
                // Check if the key is already present in alwaysMatch entries
                isCapAlreadySet =
                    isCapAlreadySet ||
                        (lodash_1.default.isPlainObject(w3cCapabilities.alwaysMatch) &&
                            lodash_1.default.has(removeAppiumPrefixes(w3cCapabilities.alwaysMatch), removeAppiumPrefix(defaultCapKey)));
                if (isCapAlreadySet) {
                    // Skip if the key is already present in the provided caps
                    continue;
                }
                // Only add the default capability if it is not overridden
                if (lodash_1.default.isEmpty(w3cCapabilities.firstMatch)) {
                    w3cCapabilities.firstMatch = /** @type {W3CCapabilities<C>['firstMatch']} */ ([
                        { [defaultCapKey]: defaultCapValue },
                    ]);
                }
                else {
                    w3cCapabilities.firstMatch[0][defaultCapKey] = defaultCapValue;
                }
            }
        }
        if (hasJSONWPCaps) {
            jsonwpCapabilities = {
                ...removeAppiumPrefixes(defaultCapabilities),
                ...jsonwpCapabilities,
            };
        }
    }
    // Get MJSONWP caps
    if (hasJSONWPCaps) {
        processedJsonwpCapabilities = { ...jsonwpCapabilities };
    }
    // Get W3C caps
    if (hasW3CCaps) {
        // Call the process capabilities algorithm to find matching caps on the W3C
        // (see: https://github.com/jlipps/simple-wd-spec#processing-capabilities)
        try {
            desiredCaps = (0, base_driver_1.processCapabilities)(w3cCapabilities, constraints, true);
        }
        catch (error) {
            logger_1.default.info(`Could not parse W3C capabilities: ${error.message}`);
            return /** @type {InvalidCaps<C,J>} */ ({
                desiredCaps,
                processedJsonwpCapabilities,
                processedW3CCapabilities,
                protocol,
                error,
            });
        }
        // Create a new w3c capabilities payload that contains only the matching caps in `alwaysMatch`
        processedW3CCapabilities = {
            alwaysMatch: { ...insertAppiumPrefixes(desiredCaps) },
            firstMatch: [{}],
        };
    }
    return /** @type {ParsedDriverCaps<C,J>} */ ({
        desiredCaps,
        processedJsonwpCapabilities,
        processedW3CCapabilities,
        protocol,
    });
}
exports.parseCapsForInnerDriver = parseCapsForInnerDriver;
/**
 * Takes a capabilities objects and prefixes capabilities with `appium:`
 * @template {Constraints} [C={}]
 * @param {Capabilities<C>} caps - Desired capabilities object
 * @returns {NSCapabilities<C>}
 */
function insertAppiumPrefixes(caps) {
    return /** @type {NSCapabilities<C>} */ (lodash_1.default.mapKeys(caps, (_, key) => STANDARD_CAPS_LOWERCASE.has(key.toLowerCase()) || key.includes(':')
        ? key
        : `${W3C_APPIUM_PREFIX}:${key}`));
}
exports.insertAppiumPrefixes = insertAppiumPrefixes;
/**
 * @template {Constraints} [C={}]
 * @param {NSCapabilities<C>} caps
 * @returns {Capabilities<C>}
 */
function removeAppiumPrefixes(caps) {
    return /** @type {Capabilities<C>} */ (lodash_1.default.mapKeys(caps, (_, key) => removeAppiumPrefix(key)));
}
exports.removeAppiumPrefixes = removeAppiumPrefixes;
/**
 * @param {string} key
 * @returns {string}
 */
function removeAppiumPrefix(key) {
    const prefix = `${W3C_APPIUM_PREFIX}:`;
    return lodash_1.default.startsWith(key, prefix) ? key.substring(prefix.length) : key;
}
/**
 *
 * @param {string} pkgName
 * @returns {string|undefined}
 */
function getPackageVersion(pkgName) {
    const pkgInfo = require(`${pkgName}/package.json`) || {};
    return pkgInfo.version;
}
exports.getPackageVersion = getPackageVersion;
/**
 * Adjusts NODE_PATH environment variable,
 * so drivers and plugins could load their peer dependencies.
 * Read https://nodejs.org/api/modules.html#loading-from-the-global-folders
 * for more details.
 * @returns {void}
 */
function adjustNodePath() {
    const selfRoot = support_1.node.getModuleRootSync('appium', __filename);
    if (!selfRoot || path_1.default.dirname(selfRoot).length >= selfRoot.length) {
        return;
    }
    const nodeModulesRoot = path_1.default.dirname(selfRoot);
    const refreshRequirePaths = () => {
        try {
            // ! This hack allows us to avoid modification of import
            // ! statements in client modules. It uses a private API though,
            // ! so it could break (maybe, eventually).
            // See https://gist.github.com/branneman/8048520#7-the-hack
            // @ts-ignore see above comment
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('module').Module._initPaths();
            return true;
        }
        catch (e) {
            return false;
        }
    };
    if (!process.env.NODE_PATH) {
        process.env.NODE_PATH = nodeModulesRoot;
        if (refreshRequirePaths()) {
            process.env.APPIUM_OMIT_PEER_DEPS = '1';
        }
        else {
            delete process.env.NODE_PATH;
        }
        return;
    }
    const nodePathParts = process.env.NODE_PATH.split(path_1.default.delimiter);
    if (nodePathParts.includes(nodeModulesRoot)) {
        process.env.APPIUM_OMIT_PEER_DEPS = '1';
        return;
    }
    nodePathParts.push(nodeModulesRoot);
    process.env.NODE_PATH = nodePathParts.join(path_1.default.delimiter);
    if (refreshRequirePaths()) {
        process.env.APPIUM_OMIT_PEER_DEPS = '1';
    }
    else {
        process.env.NODE_PATH = lodash_1.default.without(nodePathParts, nodeModulesRoot).join(path_1.default.delimiter);
    }
}
exports.adjustNodePath = adjustNodePath;
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
function pullSettings(caps) {
    if (!lodash_1.default.isPlainObject(caps) || lodash_1.default.isEmpty(caps)) {
        return {};
    }
    const result = {};
    const singleSettings = {};
    for (const [key, value] of lodash_1.default.toPairs(caps)) {
        let match;
        if (/^(s|appium:s)ettings$/.test(key) && lodash_1.default.isPlainObject(value)) {
            Object.assign(result, value);
            delete caps[key];
        }
        else if ((match = /^(s|appium:s)ettings\[(\S+)\]$/.exec(key))) {
            singleSettings[match[2]] = value;
            delete caps[key];
        }
    }
    if (!lodash_1.default.isEmpty(singleSettings)) {
        Object.assign(result, singleSettings);
    }
    return result;
}
exports.pullSettings = pullSettings;
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<ServerCommand>}
 */
function isServerCommandArgs(args) {
    return args.subcommand === constants_1.SERVER_SUBCOMMAND;
}
exports.isServerCommandArgs = isServerCommandArgs;
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<CliExtensionCommand, SubCmd>}
 */
function isExtensionCommandArgs(args) {
    return args.subcommand === constants_1.DRIVER_TYPE || args.subcommand === constants_1.PLUGIN_TYPE;
}
exports.isExtensionCommandArgs = isExtensionCommandArgs;
/**
 * @template {CliCommand} Cmd
 * @template {CliExtensionSubcommand} SubCmd
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<DriverCommand, SubCmd>}
 */
function isDriverCommandArgs(args) {
    return args.subcommand === constants_1.DRIVER_TYPE;
}
exports.isDriverCommandArgs = isDriverCommandArgs;
/**
 * @template {CliCommand} Cmd
 * @template {CliExtensionSubcommand} SubCmd
 * @param {Args<Cmd, SubCmd>} args
 * @returns {args is Args<PluginCommand, SubCmd>}
 */
function isPluginCommandArgs(args) {
    return args.subcommand === constants_1.PLUGIN_TYPE;
}
exports.isPluginCommandArgs = isPluginCommandArgs;
/**
 * Fetches the list of matched network interfaces of the current host.
 *
 * @param {4|6|null} family Either 4 to include ipv4 addresses only,
 * 6 to include ipv6 addresses only, or null to include all of them
 * @returns {os.NetworkInterfaceInfo[]} The list of matched interfcaes
 */
function fetchInterfaces(family = null) {
    let familyValue = null;
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    if (family === 4) {
        familyValue = [4, 'IPv4'];
    }
    else if (family === 6) {
        familyValue = [6, 'IPv6'];
    }
    // @ts-ignore The linter does not understand the below filter
    return lodash_1.default.flatMap(lodash_1.default.values(node_os_1.default.networkInterfaces()).filter(Boolean))
        // @ts-ignore The linter does not understand the above filter
        .filter(({ family }) => !familyValue || familyValue && familyValue.includes(family));
}
exports.fetchInterfaces = fetchInterfaces;
/**
 * @typedef {import('@appium/types').StringRecord} StringRecord
 * @typedef {import('@appium/types').BaseDriverCapConstraints} BaseDriverCapConstraints
 */
/**
 * @template {Constraints} [C=BaseDriverCapConstraints]
 * @template [J=any]
 * @typedef ParsedDriverCaps
 * @property {Capabilities<C>} desiredCaps
 * @property {string} protocol
 * @property {J} [processedJsonwpCapabilities]
 * @property {W3CCapabilities<C>} [processedW3CCapabilities]
 */
/**
 * @todo protocol is more specific
 * @template {Constraints} [C=BaseDriverCapConstraints]
 * @template [J=any]
 * @typedef InvalidCaps
 * @property {Error} error
 * @property {string} protocol
 * @property {Capabilities<C>} [desiredCaps]
 * @property {J} [processedJsonwpCapabilities]
 * @property {W3CCapabilities<C>} [processedW3CCapabilities]
 */
/**
 * @template {Constraints} C
 * @typedef {import('@appium/types').Capabilities<C>} Capabilities
 */
/**
 * @template {Constraints} C
 * @typedef {import('@appium/types').W3CCapabilities<C>} W3CCapabilities
 */
/**
 * @template {Constraints} C
 * @typedef {import('@appium/types').NSCapabilities<C>} NSCapabilities
 */
/**
 * @template {Constraints} C
 * @typedef {import('@appium/types').ConstraintsToCaps<C>} ConstraintsToCaps
 */
/**
 * @template T
 * @typedef {import('type-fest').StringKeyOf<T>} StringKeyOf
 */
/**
 * @typedef {import('@appium/types').Constraints} Constraints
 */
/**
 * @typedef {import('appium/types').CliCommand} CliCommand
 * @typedef {import('appium/types').CliExtensionSubcommand} CliExtensionSubcommand
 * @typedef {import('appium/types').CliExtensionCommand} CliExtensionCommand
 * @typedef {import('appium/types').CliCommandServer} ServerCommand
 * @typedef {import('appium/types').CliCommandDriver} DriverCommand
 * @typedef {import('appium/types').CliCommandPlugin} PluginCommand
 */
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @typedef {import('appium/types').Args<Cmd, SubCmd>} Args
 */
/**
 * @template {CliCommand} [Cmd=ServerCommand]
 * @template {CliExtensionSubcommand|void} [SubCmd=void]
 * @typedef {import('appium/types').ParsedArgs<Cmd, SubCmd>} ParsedArgs
 */
//# sourceMappingURL=utils.js.map
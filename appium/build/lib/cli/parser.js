"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgParser = exports.getParser = exports.EXTRA_ARGS = void 0;
const support_1 = require("@appium/support");
const argparse_1 = require("argparse");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const schema_1 = require("../schema");
const config_1 = require("../config");
const args_1 = require("./args");
exports.EXTRA_ARGS = 'extraArgs';
/**
 * If the parsed args do not contain any of these values, then we
 * will automatially inject the `server` subcommand.
 */
const NON_SERVER_ARGS = Object.freeze(new Set([constants_1.DRIVER_TYPE, constants_1.PLUGIN_TYPE, constants_1.SERVER_SUBCOMMAND, '-h', '--help', '-v', '--version']));
const version = support_1.fs.readPackageJsonFrom(config_1.rootDir).version;
/**
 * A wrapper around `argparse`
 *
 * - Handles instantiation, configuration, and monkeypatching of an
 *    `ArgumentParser` instance for Appium server and its extensions
 * - Handles error conditions, messages, and exit behavior
 */
class ArgParser {
    /**
     * @param {boolean} [debug] - If true, throw instead of exit on error.
     */
    constructor(debug = false) {
        const prog = process.argv[1] ? path_1.default.basename(process.argv[1]) : 'appium';
        const parser = new argparse_1.ArgumentParser({
            add_help: true,
            description: 'A webdriver-compatible server that facilitates automation of web, mobile, and other types of apps across various platforms.',
            prog,
        });
        ArgParser._patchExit(parser);
        /**
         * Program name (typically `appium`)
         * @type {string}
         */
        this.prog = prog;
        /**
         * If `true`, throw an error on parse failure instead of printing help
         * @type {boolean}
         */
        this.debug = debug;
        /**
         * Wrapped `ArgumentParser` instance
         * @type {ArgumentParser}
         */
        this.parser = parser;
        parser.add_argument('-v', '--version', {
            action: 'version',
            version,
        });
        const subParsers = parser.add_subparsers({ dest: 'subcommand' });
        // add the 'server' subcommand, and store the raw arguments on the parser
        // object as a way for other parts of the code to work with the arguments
        // conceptually rather than just through argparse
        const serverArgs = ArgParser._addServerToParser(subParsers);
        this.rawArgs = serverArgs;
        // add the 'driver' and 'plugin' subcommands
        ArgParser._addExtensionCommandsToParser(subParsers);
        // backwards compatibility / drop-in wrapper
        /**
         * @type {ArgParser['parseArgs']}
         */
        this.parse_args = this.parseArgs;
    }
    /**
     * Parse arguments from the command line.
     *
     * If no subcommand is passed in, this method will inject the `server` subcommand.
     *
     * `ArgParser.prototype.parse_args` is an alias of this method.
     * @template {import('appium/types').CliCommand} [Cmd=import('appium/types').CliCommandServer]
     * @param {string[]} [args] - Array of arguments, ostensibly from `process.argv`. Gathers args from `process.argv` if not provided.
     * @returns {import('appium/types').Args<Cmd>} - The parsed arguments
     */
    parseArgs(args = process.argv.slice(2)) {
        if (!NON_SERVER_ARGS.has(args[0])) {
            args.unshift(constants_1.SERVER_SUBCOMMAND);
        }
        try {
            const parsed = this.parser.parse_known_args(args);
            const [knownArgs, unknownArgs] = parsed;
            // XXX: you'd think that argparse, when given an alias for a subcommand,
            // would set this value to the original subcommand name, but it doesn't.
            if (knownArgs?.driverCommand === 'ls') {
                knownArgs.driverCommand = 'list';
            }
            else if (knownArgs?.pluginCommand === 'ls') {
                knownArgs.pluginCommand = 'list';
            }
            if (unknownArgs?.length &&
                (knownArgs.driverCommand === 'run' || knownArgs.pluginCommand === 'run')) {
                return ArgParser._transformParsedArgs(knownArgs, unknownArgs);
            }
            else if (unknownArgs?.length) {
                throw new Error(`[ERROR] Unrecognized arguments: ${unknownArgs.join(' ')}`);
            }
            return ArgParser._transformParsedArgs(knownArgs);
        }
        catch (err) {
            if (this.debug) {
                throw err;
            }
            // this isn't tested via unit tests (we use `debug: true`) so may escape coverage.
            /* istanbul ignore next */
            {
                // eslint-disable-next-line no-console
                console.error(); // need an extra space since argparse prints usage.
                // eslint-disable-next-line no-console
                console.error(err.message);
                process.exit(1);
            }
        }
    }
    /**
     * Given an object full of arguments as returned by `argparser.parse_args`,
     * expand the ones for extensions into a nested object structure and rename
     * keys to match the intended destination.
     *
     * E.g., `{'driver-foo-bar': baz}` becomes `{driver: {foo: {bar: 'baz'}}}`
     * @param {object} args
     * @param {string[]} [unknownArgs]
     * @returns {object}
     */
    static _transformParsedArgs(args, unknownArgs = []) {
        const result = lodash_1.default.reduce(args, (unpacked, value, key) => {
            if (!lodash_1.default.isUndefined(value) && (0, schema_1.hasArgSpec)(key)) {
                const { dest } = /** @type {import('../schema/arg-spec').ArgSpec} */ ((0, schema_1.getArgSpec)(key));
                lodash_1.default.set(unpacked, dest, value);
            }
            else {
                // this could be anything that _isn't_ a server arg
                unpacked[key] = value;
            }
            return unpacked;
        }, {});
        result[exports.EXTRA_ARGS] = unknownArgs;
        return result;
    }
    /**
     * Patches the `exit()` method of the parser to throw an error, so we can handle it manually.
     * @param {ArgumentParser} parser
     */
    static _patchExit(parser) {
        parser.exit = (code, msg) => {
            if (code) {
                throw new Error(msg);
            }
            process.exit();
        };
    }
    /**
     *
     * @param {import('argparse').SubParser} subParser
     * @returns {import('./args').ArgumentDefinitions}
     */
    static _addServerToParser(subParser) {
        const serverParser = subParser.add_parser('server', {
            add_help: true,
            help: 'Run an Appium server',
        });
        ArgParser._patchExit(serverParser);
        const serverArgs = (0, args_1.getServerArgs)();
        for (const [flagsOrNames, opts] of serverArgs) {
            // @ts-ignore TS doesn't like the spread operator here.
            serverParser.add_argument(...flagsOrNames, { ...opts });
        }
        return serverArgs;
    }
    /**
     * Adds extension sub-sub-commands to `driver`/`plugin` subcommands
     * @param {import('argparse').SubParser} subParsers
     */
    static _addExtensionCommandsToParser(subParsers) {
        for (const type of /** @type {[DriverType, PluginType]} */ ([constants_1.DRIVER_TYPE, constants_1.PLUGIN_TYPE])) {
            const extParser = subParsers.add_parser(type, {
                add_help: true,
                help: `Access the ${type} management CLI commands`,
            });
            ArgParser._patchExit(extParser);
            const extSubParsers = extParser.add_subparsers({
                dest: `${type}Command`,
            });
            const extensionArgs = (0, args_1.getExtensionArgs)();
            /**
             * @type { {command: import('appium/types').CliExtensionSubcommand, args: import('./args').ArgumentDefinitions, help: string, aliases?: import('argparse').SubArgumentParserOptions['aliases']}[] }
             */
            const parserSpecs = [
                {
                    command: constants_1.EXT_SUBCOMMAND_LIST,
                    args: extensionArgs[type].list,
                    help: `List available and installed ${type}s`,
                    aliases: ['ls'],
                },
                {
                    command: constants_1.EXT_SUBCOMMAND_INSTALL,
                    args: extensionArgs[type].install,
                    help: `Install a ${type}`,
                },
                {
                    command: constants_1.EXT_SUBCOMMAND_UNINSTALL,
                    args: extensionArgs[type].uninstall,
                    help: `Uninstall a ${type}`,
                },
                {
                    command: constants_1.EXT_SUBCOMMAND_UPDATE,
                    args: extensionArgs[type].update,
                    help: `Update installed ${type}s to the latest version`,
                },
                {
                    command: constants_1.EXT_SUBCOMMAND_RUN,
                    args: extensionArgs[type].run,
                    help: `Run a script (defined inside the ${type}'s package.json under the ` +
                        `“scripts” field inside the “appium” field) from an installed ${type}`,
                },
                {
                    command: constants_1.EXT_SUBCOMMAND_DOCTOR,
                    args: extensionArgs[type].doctor,
                    help: `Run doctor checks (if any defined) for the given ${type}`,
                },
            ];
            for (const { command, args, help, aliases } of parserSpecs) {
                const parser = extSubParsers.add_parser(command, { help, aliases: aliases ?? [] });
                ArgParser._patchExit(parser);
                for (const [flagsOrNames, opts] of args) {
                    // add_argument mutates params so make sure to send in copies instead
                    if (flagsOrNames.length === 2) {
                        parser.add_argument(flagsOrNames[0], flagsOrNames[1], { ...opts });
                    }
                    else {
                        parser.add_argument(flagsOrNames[0], { ...opts });
                    }
                }
            }
        }
    }
}
exports.ArgParser = ArgParser;
/**
 * Creates a {@link ArgParser} instance; finalizes the config schema.
 *
 * @constructs ArgParser
 * @param {boolean} [debug] - If `true`, throw instead of exit upon parsing error
 * @returns {ArgParser}
 */
function getParser(debug) {
    (0, schema_1.finalizeSchema)();
    return new ArgParser(debug);
}
exports.getParser = getParser;
/**
 * @typedef {import('@appium/types').DriverType} DriverType
 * @typedef {import('@appium/types').PluginType} PluginType
 */
//# sourceMappingURL=parser.js.map
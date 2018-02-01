export as namespace webOS;

/**
 * Portable webOS utility library for access to webOS-specific features and functionality
 */
export namespace webOS {
    interface Platform {
        /**
         * Set true for LG webOS SmartTV
         */
        tv: boolean;

        /**
         * Set true for LG webOS SmartWatch
         */
        watch: boolean;
        
        /**
         * Set true for Open webOS
         */
        open: boolean;
        
        /**
         * Set true for legacy webOS (Palm and HP hardware)
         */
        legacy: boolean;

        /**
         * Set true for any unknown system
         */
        unknown: boolean;
    }

    interface DeviceInfoObject {
        /**
         * Model name of device in UTF-8 format
         */
        modelName: string;

        /**
         * Model name of device in ASCII format
         */
        modelNameAscii: string;

        /**
         * Full OS firmware version string
         */
        version: string;

        /**
         * Subset of OS version string: Major version number
         */
        versionMajor: number;

        /**
         * Subset of OS version string: Minor version number
         */
        versionMinor: number;

        /**
         * Subset of OS version string: Dot version number
         */
        versionDot: number;

        /**
         * webOS SDK version
         */
        sdkVersion: string;

        /**
         * Width in pixels
         */
        screenWidth: number;

        /**
         * Height in pixels
         */
        screenHeight: number;

        /**
         * Whether supports Ultra HD resolution.
         */
        uhd: boolean;
    }

    interface DeviceInfo {
        /**
         * Gets the device-specific information regarding model, OS version, specifications, etc.
         */
        (callback: Function): void;
        info: DeviceInfoObject;
    }

    interface Feedback {
        /**
         * Play feedback sound
         * @param {string} param feedback sound name
         */
        play(param: string): void;
    }

    interface Keyboard {
        /** Checks if the virtual keyboard is visible (only works on SmartTV platform)
	    * @return {boolean} Whether or not the virtual keyboard is displaying
	    */
        isShowing: boolean;
    }

    interface Notification {
        /**
         * Shows a temporary toast message via the system
         * @param {object} params - Toast notification parameters
         */
        showToast(params: {}, callback: Function): void;

        /**
         * Removes a toast notification
         * @param {string} toastId ID of the toast to remove
         */
        removeToast(toastId: string): void;

        /**
         * Checks whether or not the current device supports creation of dashboard windows.
         */
        supportsDashboard(): boolean;

        /**
         * Creates a dashboard window. (Only works on old webOS and Open webOS)
         * @param {string} url URL for an HTML file to be loaded into the dashboard.
         * @param {string} html HTML code to inject into the dashboard window.
         */
        showDashboard(url: string, html: string): Window;
    }

    interface Service {
        /**
         * Creates and sends off a service request to the system
         * @param {string} uri Service URI. Accepts the normal service URI format, 
         * as well as the extended format with the service method included.
         * 
         * @param {{}} params Service request options.
         */
        request(uri: string, params: {}): void;

        /**
         * System service name prefix
         */
        systemPrefix: string;

        /**
         * Service URI protocol
         */
        protocol: string;
    }

    /**
     * APIs for accessibility VoiceReadout
     */
    interface VoiceReadOut {
        /**
         * Read alert text when accessibility VoiceReadout enabled.
         */
        readAlert(s: string, c: boolean): void;
    }

    /**
     * Platform identification of webOS variants
     */
    export var platform: Platform;

    /**
     * Fetches the appID of the caller app
     * @returns {string} AppID of the app.
     */
    export function fetchAppId(): string;

    /**
     * Fetches the appinfo.json data of the caller app with a cache saved to webOS.appInfo
     * @param {webOS~appInfoCallback} callback - The function to called upon completion
     * @param {string} [path] - An optional relative filepath from the current document to a specific appinfo to read
     */
    export function fetchAppInfo(callback: Function, path: string): void;

    /**
     * Fetches the full root URI path of the caller app
     * @returns {string} App's URI path the app is within.
     */
    export function fetchAppRootPath(): string;

    /**
     * Emulate the back key to move backwards 1 level.
     */
    export function platformBack(): void;
    export var deviceInfo: DeviceInfo;
    export var feedback: Feedback;
    export var keyboard: Keyboard;
    export var notification: Notification;
    export var service: Service;
    export var libVersion: string;
    export var voicereadout: VoiceReadOut;
}
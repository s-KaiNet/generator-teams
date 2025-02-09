// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ManifestVersions } from "./ManifestVersions";

import { ManifestGenerator as ManifestGenerator18 } from "./manifestGenerators/generator18/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator19 } from "./manifestGenerators/generator19/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator110 } from "./manifestGenerators/generator110/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator111 } from "./manifestGenerators/generator111/ManifestGenerator";
import { ManifestGenerator as ManifestGeneratorDevPreview } from "./manifestGenerators/generatorDevPreview/ManifestGenerator";
import { BaseManifestGenerator } from "./BaseManifestGenerator";

export class ManifestGeneratorFactory {

    public static supportedManifestVersions = [
        {
            manifestVersion: ManifestVersions.v18,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
            manifestValue: "1.8",
            default: false,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.v19,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json",
            manifestValue: "1.9",
            default: true,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.v110,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.schema.json",
            manifestValue: "1.10",
            default: false,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.v111,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
            manifestValue: "1.11",
            default: false,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.devPreview,
            schemaUrl: "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
            manifestValue: "devPreview",
            default: false,
            hide: false
        }
    ]

    constructor() {

    }

    public static getManifestVersionFromValue(value: string): string {
        const versions = ManifestGeneratorFactory.supportedManifestVersions.filter((v) => {
            return v.manifestValue == value;
        });
        if (versions.length === 1) {
            return versions[0].manifestVersion;
        } else {
            throw new Error("Invalid manifest version.");
        }
    }

    public createManifestGenerator(manifestVersion: string): BaseManifestGenerator {
        if (manifestVersion == ManifestVersions.v18) {
            return new ManifestGenerator18();
        } else if (manifestVersion == ManifestVersions.v19) {
            return new ManifestGenerator19();
        } else if (manifestVersion == ManifestVersions.v110) {
            return new ManifestGenerator110();
        } else if (manifestVersion == ManifestVersions.v111) {
            return new ManifestGenerator111();
        } else if (manifestVersion == ManifestVersions.devPreview) {
            return new ManifestGeneratorDevPreview();
        } else {
            throw new Error(`Invalid manifest version: ${manifestVersion}.`);
        }
    }

    static isSchemaVersionValid(existingManifest: any): boolean {
        if (existingManifest) {
            let retVal = false;
            this.supportedManifestVersions.forEach(manifestVersionItem => {
                if (existingManifest["$schema"] == manifestVersionItem.schemaUrl) {
                    retVal = true;
                    return;
                }
            });
            return retVal;
        } else {
            return true;
        }
    }
}

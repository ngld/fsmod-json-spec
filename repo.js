/* Repo schema */
// Created by ngld, m!m and Hellzed
// Inspired by Goober's text files (http://www.hard-light.net/wiki/index.php/FSO_Installer_Text_Files)

{
    "generated": "<time of generation>", // optional
    "includes": ["<URL1>", "..."], // optional, contains absolute and/or relative links
    "mods": [
        {
            "id": "...", // required, internal *unique* identifier, should be URL friendly, never shown to the user
            "title": "...", // required, a UTF-8 compatible string, displayed to the user
            "version": "...", // required, http://semver.org/
            "description": "...", // optional, should match the mod.ini's description
            "logo": "<path to image>", // optional, default: null, absolute or relative URL pointing to an image
            "notes": "...", // optional, these will be displayed during the installation.
            "folder": "<mod folder>", // optional, This folder will be created in the FS2 directory. default: mod ID
            "cmdline": "<flags>", // optional, allows the modder to specify a default cmdline for this mod
            
            "packages": [ // optional
                {
                    "name": "...", // required
                    "notes": "...", // optional, text which is displayed to the user if they look up the details of a package.
                    /*
                        optional, default: "recommended"
                        A feature can be:
                        - "required" (always installed with the mod, in fact these are the base files of the mod),
                        - "recommended" (automatically selected for installation, but the user can skip them),
                        - "optional" (not automatically selected, but user can add them during the install process)
                    */
                    "status": "<required|recommended|optional>",
                    "dependencies": [ // optional
                        {
                            "id": "<mod ID>", // required, special values: self, retail
                            "version": "1.2.*", // required, https://getcomposer.org/doc/01-basic-usage.md#package-versions
                            "packages": [] // optional, specifies which optional and recommended packages are also required
                        },
                        ...
                    ],
                    "environment": [ // optional
                        {
                            "type": "cpu_feature", // required
                            "value": "<SSE|SSE2|AVX|...>", // required
                            "not": false // optional, default: false, this value negates the requirement
                            //              (The package isn't installed if the user's processor has this feature.)
                        },
                        {
                            "type": "os", // required
                            "value": "<windows|linux|macos>", // required
                            "not": false, // optional, default: false, this value negates the requirement
                            //              (The package isn't installed if the user uses the given OS.)
                        },
                        ...
                    ],
                    "executables": [ // optional
                        {
                            "version": "...", // required, http://semver.org
                            "file": "...", // required, path to the executable (*.exe file on Windows), relative to the mod folder
                            "debug": false // optional, default: true, Is this a debug build?
                        }
                    ],
                    "files": [ // required
                        {
                            "filename": "...", // required, the file extension *must* be correct since it's used to determine the archive's format
                            "is_archive": true, // optional
                            "dest": "<destination path>", // required, a path relative to the mod folder, the archive will be extracted there
                            "md5sum": "...", // required, checksum
                            "filesize": "<size in bytes>", // optional
                            "urls": ["<URL1>", "<URL2>"], // required, The URLs are absolute and point *directly* to the file.
                        }
                    ],
                    "filelist": [ // required
                        {
                            "filename": "<file path>", // required, file path relative to the mod folder
                            "archive": "...", // required, the filename of the archive containing this file
                            "orig_name": "<name in archive>", // required, filename (and path) inside of the given archive
                            "md5sum": "..." // required, checksum
                        },
                        ...
                    ]
                },
                ...
            ],
            "actions": [ // optional
                // NOTE: Globbing only applies to the "paths" property.
                {
                    "type": "delete", // required
                    "paths": ["<file1>", "<file2>", "<dir1>", "<file3>", "..."], // required, relative to the mod folder 
                    "glob": true // optional, default: true, turns globbing on (https://en.wikipedia.org/wiki/Glob_%28programming%29)
                },
                {
                    "type": "move", // required
                    "paths": ["<file1>", "<file2>", "<dir1>", "<file3>", "..."], // required, relative to the mod folder 
                    "dest": "<path>", // required, specifies the destination relative to the mod folder
                    "glob": true // optional, default: true, turns globbing on (https://en.wikipedia.org/wiki/Glob_%28programming%29)
                },
                {
                    "type": "copy", // required
                    "paths": ["<file1>", "<file2>", "<dir1>", "<file3>", "..."], // required, relative to the mod folder 
                    "dest": "<path>", // required, specifies the destination relative to the mod folder
                    "glob": true // optional, default: true, turns globbing on (https://en.wikipedia.org/wiki/Glob_%28programming%29)
                },
                {
                    "type": "mkdir", // required
                    "paths": ["<folder1>", "<folder2>", "..."], // required, relative to the mod folder 
                    "glob": true // optional, default: true, turns globbing on (https://en.wikipedia.org/wiki/Glob_%28programming%29)
                }
                ...
            ]
        },
        ...
    ]
}
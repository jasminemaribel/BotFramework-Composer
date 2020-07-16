// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;

namespace Microsoft.BotFramework.Composer.Core
{
    public static class ComposerLuisExtensions
    {
        /// <summary>
        /// Setup configuration to utilize the settings file generated by bf luis:build. This is a luis settings extensions adapter aligning with Composer customized settings.
        /// </summary>
        /// <remarks>
        /// This will pick up LUIS_AUTHORING_REGION or --region settings as the setting to target.
        /// This will pick up --environment as the environment to target.  If environment is Development it will use the name of the logged in user.
        /// This will pick up --root as the root folder to run in.  
        /// </remarks>
        /// <param name="builder">Configuration builder to modify.</param>
        /// <returns>Modified configuration builder.</returns>
        public static IConfigurationBuilder UseComposerLuisSettings(this IConfigurationBuilder builder)
        {
            var configuration = builder.Build();
            var botRoot = configuration.GetValue<string>("bot") ?? ".";
            var luisRegion = configuration.GetValue<string>("LUIS_AUTHORING_REGION") ?? configuration.GetValue<string>("luis:authoringRegion") ?? configuration.GetValue<string>("luis:region") ?? "westus";
            var environment = configuration.GetValue<string>("luis:environment") ?? Environment.UserName;
            var settings = new Dictionary<string, string>();
            settings["luis:endpoint"] = configuration.GetValue<string>("luis:endpoint") ?? $"https://{luisRegion}.api.cognitive.microsoft.com";
            settings["BotRoot"] = botRoot;
            builder.AddInMemoryCollection(settings);
            if (environment == "Development")
            {
                environment = Environment.UserName;
            }

            var di = new DirectoryInfo(botRoot);
            foreach (var file in di.GetFiles($"luis.settings.{environment.ToLower()}.{luisRegion}.json", SearchOption.AllDirectories))
            {
                var relative = file.FullName.Substring(di.FullName.Length);
                if (!relative.Contains("bin\\") && !relative.Contains("obj\\"))
                {
                    builder.AddJsonFile(file.FullName, optional: false, reloadOnChange: true);
                }
            }

            return builder;
        }
    }
}

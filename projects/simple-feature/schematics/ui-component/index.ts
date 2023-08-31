import { apply, applyTemplates, chain, mergeWith, move, Rule, url } from "@angular-devkit/schematics";
import { strings, normalize } from "@angular-devkit/core";
import { ComponentSchema } from "./ComponentSchema";

export function ComponentGenerator(options: ComponentSchema): Rule {
  return () => {
    const templateSource = apply(
      url('./files'), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          name: options.name
        }),
        move(normalize(`/${options.path}/${options.name}`))
      ]
    )
    return chain([
    //  externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource)
    ])
  }
}
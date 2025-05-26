import { Rule, Tree, SchematicContext,  chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask,  } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
/* import { NodePackageInstallTask,  } from "@angular-devkit/schematics/tasks";
import {applyToUpdateRecorder} from '@schematics/angular/utility/change';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript'; */
function addAngularMaterialToPackageJson(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const angularMaterialDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: '@angular/material',
      version: '^18.2.0', // Specify the version you need here
      overwrite: true,
    };

    addPackageJsonDependency(host, angularMaterialDependency);

    // Schedule the normal `npm install` first
    context.addTask(new NodePackageInstallTask());


    return host;
  };
}

function addAngularNGRXToPackageJson(): Rule {
  return (host: Tree, context: SchematicContext) => {
    let angularMaterialDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: "@ngrx/store",
      version: '^18.1.1', // Specify the version you need here
      overwrite: true,
    };
    addPackageJsonDependency(host, angularMaterialDependency);


    angularMaterialDependency = {
      type: NodeDependencyType.Default,
      name: "@ngrx/effects",
      version: '^18.1.1', // Specify the version you need here
      overwrite: true,
    };
    addPackageJsonDependency(host, angularMaterialDependency)

    angularMaterialDependency = {
      type: NodeDependencyType.Default,
      name: "@ngrx/store-devtools",
      version: '^18.1.1', // Specify the version you need here
      overwrite: true,
    };
    addPackageJsonDependency(host, angularMaterialDependency)

    // Schedule the normal `npm install` first

    context.addTask(new NodePackageInstallTask());


    return host;
  };
}

function configureAngularMaterial(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspaceConfig = host.read('angular.json');
    if (!workspaceConfig) {
      context.logger.error('Could not find Angular workspace configuration');
      return host;
    }

    const workspace = JSON.parse(workspaceConfig.toString());
    const defaultProjectName = workspace.defaultProject;
    if (!defaultProjectName) {
      context.logger.error('No default project found in Angular workspace configuration');
      return host;
    }

    const projectConfig = workspace.projects[defaultProjectName];
    if (!projectConfig || !projectConfig.architect || !projectConfig.architect.build || !projectConfig.architect.build.options) {
      context.logger.error(`Could not find build options for project ${defaultProjectName}`);
      return host;
    }

    // Add the Angular Material theme to the styles array in build options
    const buildOptions = projectConfig.architect.build.options;
    buildOptions.styles.push('node_modules/@angular/material/prebuilt-themes/indigo-pink.css');
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));

    
    

    return host;
  };
} 


export function ngAdd(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      // Add @ngrx/store, @ngrx/effects, and other NGRX packages
      addAngularMaterialToPackageJson(),
      addAngularNGRXToPackageJson(),
      configureAngularMaterial()
    ])(tree, _context);
  };
}
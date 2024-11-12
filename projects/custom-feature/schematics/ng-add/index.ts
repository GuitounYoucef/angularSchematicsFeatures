import { Rule, Tree, SchematicContext,  chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
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
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new NodePackageInstallTask());

    // Schedule `npm install --force` to run after the initial install
    context.addTask(
      new RunSchematicTask('force-install', {}),
      [installTaskId]
    );

    return host;
  };
}

export function ngAdd(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      // Add @ngrx/store, @ngrx/effects, and other NGRX packages
      addAngularMaterialToPackageJson()
    ])(tree, _context);
  };
}
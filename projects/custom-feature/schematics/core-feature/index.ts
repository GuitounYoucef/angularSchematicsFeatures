import { apply, applyTemplates, chain, mergeWith, move, Rule, url, Tree, SchematicContext, SchematicsException,  } from "@angular-devkit/schematics";
import { strings, normalize } from "@angular-devkit/core";
import { ComponentSchema } from "./ComponentSchema";
import {  getSourceNodes,  } from '@schematics/angular/utility/ast-utils';
import {  InsertChange , Change,NoopChange} from '@schematics/angular/utility/change';
import * as ts from 'typescript';

import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { NodePackageInstallTask, RunSchematicTask  } from '@angular-devkit/schematics/tasks';
//import { addImportToModule } from '@schematics/angular/utility/ast-utils';


function addAngularMaterialToPackageJson(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const angularMaterialDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: '@angular/material',
      version: '^15.0.0', // Specify the version you need here
      overwrite: true,
    };

    addPackageJsonDependency(host, angularMaterialDependency);

    // Schedule the normal `npm install` first
    const installTaskId = context.addTask(new NodePackageInstallTask());

    // Schedule `npm install --force` to run after the initial install
    context.addTask(
      new RunSchematicTask('force-install', {}),
      [installTaskId]
    );

    return host;
  };
}

/* function configureAngularMaterial(): Rule {
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

    // Import Material module into the app module
    const modulePath = 'src/app/app.module.ts';
    const moduleSource = ts.createSourceFile(
      modulePath,
      host.read(modulePath)!.toString(),
      ts.ScriptTarget.Latest,
      true
    );

    const changes = addImportToModule(
      moduleSource,
      modulePath,
      'MatButtonModule',
      '@angular/material/button'
    );

    const recorder = host.beginUpdate(modulePath);
    changes.forEach(change => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });
    host.commitUpdate(recorder);

    return host;
  };
} */


/*
caommands:

1- npm install --global verdaccio
2- verdaccio
3- npm adduser --registry http://localhost:4873/
4- npm run build
5- npm run build --prefix projects/custom-feature
6-1 cd dist/custom-feature
6-2 npm publish

add library to your project
1- npm add custom-feature
2- ng g custom-feature:ui-component --name FeatureName


 */

export function addObjectToArrayChange (context: string, tree: Tree, nodeName:string,path:string,nodeContext:string): Change {
  const content = tree.read(path);
  let node = ts.createSourceFile(path, content!.toString(), ts.ScriptTarget.Latest, true);
  //showTree(node);

  let nodes: ts.Node[] = getSourceNodes(node);

  const existNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getText() === context);
  if (existNode) {
    return new NoopChange();
  }

  // find providers node by checking the SyntaxKind to be Identifier and by checking the node text to be providers
  const providersNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getText() === nodeName);

  if (!providersNode || !providersNode.parent) {
    throw new SchematicsException(`providers variable in ${path}`);
  }
 return new InsertChange(path, providersNode.getEnd()+3,'\n' + nodeContext)
}

/*
function showTree(node: ts.Node, indent: string = '    '): void {
  // will output the syntax kind of the node
  console.log(indent + ts.SyntaxKind[node.kind]);
  // output the text of node
  if (node.getChildCount() === 0) {
    console.log(indent + '    Text: ' + node.getText());
  }

  // output the children nodes
  for (let child of node.getChildren()) {
    showTree(child, indent + '    ');
  }
} 
*/
function unppercase(str: string): string {
  return str.toUpperCase();
}

function addNode(tree: Tree,path:string,newNode: string,parentNode:string,nodeContext:string):boolean
{
  
  let change = addObjectToArrayChange(newNode, tree,parentNode,path,nodeContext);
  const declarationRecorder = tree.beginUpdate(path);
  if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos,change.toAdd);
  }
  else return false;
  tree.commitUpdate(declarationRecorder);
  return true;
}
/******************************************************************************** */

 function addImportToFile(tree: Tree,path:string,importNode: string):void
{
  const declarationRecorder = tree.beginUpdate(path);
  let importChange=new InsertChange(path, 0,importNode+'\n' )
  if (importChange instanceof InsertChange) {
    declarationRecorder.insertLeft(importChange.pos,importChange.toAdd);
}  
  tree.commitUpdate(declarationRecorder);
}



export function ComponentGenerator(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding library Module to the app...');

    //console.log(tree)
    // update Store file

     let path='/src/app/app.config.ts';


     

    let newNode='provideStore';
    let newNodeContext=`provideStore(appReducer),`;
    let parentNode=`providers`;
    let importNode=`import { provideStore } from '@ngrx/store';`+'\n'+`import { appEffects, appReducer } from './Modules/Core/state/app.state';`;
    if(addNode(tree,path,newNode,parentNode,newNodeContext))
    {
      importNode=`import { provideStore } from '@ngrx/store';`+'\n'+`import { appEffects, appReducer } from './Modules/Core/state/app.state';`;
      addImportToFile(tree,path,importNode);      
      context.logger.info('imprort file added succefully ');
    }
    


    newNode=`provideEffects`;
    newNodeContext=`provideEffects(appEffects),`;
    parentNode=`providers`;
    if(addNode(tree,path,newNode,parentNode,newNodeContext))    
    {
      importNode=`import { provideEffects } from '@ngrx/effects';`;
      addImportToFile(tree,path,importNode);      
    }

    newNode=`provideStoreDevtools`;
    newNodeContext=`provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),`;
    parentNode=`providers`;
    if(addNode(tree,path,newNode,parentNode,newNodeContext))
    {
      importNode=`import { provideStoreDevtools } from '@ngrx/store-devtools';`+'\n'+`import { isDevMode } from '@angular/core';`;
      addImportToFile(tree,path,importNode);      
    } 
 
    


 

    const templateSource = apply(
      url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        uppercase: unppercase,
 
      }),
      move(normalize(`/${options.path}`))
    ]
    )
    return chain([
      //  externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource),
      addAngularMaterialToPackageJson(),
  //    configureAngularMaterial()

    ])
  }
}
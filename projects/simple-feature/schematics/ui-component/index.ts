import { apply, applyTemplates, chain, mergeWith, move, Rule, url, Tree, SchematicContext, SchematicsException,  } from "@angular-devkit/schematics";
import { strings, normalize } from "@angular-devkit/core";
import { ComponentSchema } from "./ComponentSchema";
import {  addImportToModule,  getSourceNodes,  } from '@schematics/angular/utility/ast-utils';
import {  applyToUpdateRecorder,  InsertChange , Change} from '@schematics/angular/utility/change';
import * as ts from 'typescript';



/*
caommands:

1- npm install --global verdaccio
2- verdaccio
3- npm adduser --registry http://localhost:4873/
4- npm run build
5- npm run build --prefix projects/simple-feature
6- dist/simple-feature: npm publish

add library to your project
1- npm add simple-feature
2- ng g simple-feature:ui-component --name FeatureName


 */

export function addObjectToArrayChange (context: string, tree: Tree, nodeName:string,path:string): Change {
  const content = tree.read(path);
  let node = ts.createSourceFile(path, content!.toString(), ts.ScriptTarget.Latest, true);
  //showTree(node);

  let nodes: ts.Node[] = getSourceNodes(node);

  // find providers node by checking the SyntaxKind to be Identifier and by checking the node text to be providers
  const providersNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getText() === nodeName);

  if (!providersNode || !providersNode.parent) {
    throw new SchematicsException(`providers people variable in ${path}`);
  }
 return new InsertChange(path, providersNode.getEnd()+3,'\n' + context)
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

export function ComponentGenerator(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding library Module to the app...');
    /* 
    const modulePath = '/src/app/app.module.ts';
    if (!tree.exists(modulePath)) {
      throw new SchematicsException(`The file ${modulePath} doesn't exists...`);
    }
    const recorder = tree.beginUpdate(modulePath);

    const text = tree.read(modulePath);

    if (text === null) {
      throw new SchematicsException(`The file ${modulePath} doesn't exists...`);
    }

    const source = ts.createSourceFile(
      modulePath,
      text.toString(),
      ts.ScriptTarget.Latest,
      true
    );

    applyToUpdateRecorder(recorder,
      addImportToModule(source, modulePath, 'provideStore', '@ngrx/store')
    );

    tree.commitUpdate(recorder); */


    //************************************************************************************* */
    let path='/src/app/Modules/Core/state/app.state.ts'

    let change = addObjectToArrayChange(`${options.name}Red:${options.name}Reducer,`, tree,"appReducer",path);

    const declarationRecorder = tree.beginUpdate(path);
    if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos,change.toAdd);
    }
    let importChange=new InsertChange(path, 0,`import { ${options.name}Reducer } from "src/app/${options.name}/${options.name}.Data/${options.name}.State/${options.name}.reducer";`+'\n' )

    if (importChange instanceof InsertChange) {
      declarationRecorder.insertLeft(importChange.pos,importChange.toAdd);
  }
    
    tree.commitUpdate(declarationRecorder); // commits the update on the tree




    //************************************************************************************* */    

    const templateSource = apply(
      url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        uppercase: unppercase,
        name: options.name
      }),
      move(normalize(`/${options.path}/${options.name}`))
    ]
    )
    return chain([
      //  externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource),

    ])
  }
}
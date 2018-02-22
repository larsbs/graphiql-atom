'use babel';

import GraphiqlAtomView from './graphiql-atom-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri.startsWith('graphiql-atom')) {
          return new GraphiqlAtomView();
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'graphiql-atom:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof GraphiqlAtomView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    const editor = atom.workspace.getActiveTextEditor();
    this.addGraphiQLToEditor(editor);
  },

  deserializeActiveEditorInfoView(serialized) {
    return new GraphiqlAtomView();
  },

  async addGraphiQLToEditor(editor) {
    const uri = `graphiql-atom://editor/${editor.id}`;
    const previousActivePane = atom.workspace.getActivePane();
    const options = { searchAllPanes: true, split: 'right' };
    const graphiQLView = await atom.workspace.open(uri, options);
    return previousActivePane.activate();
  },

};

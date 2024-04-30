import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import ReactDOM from 'react-dom';
import React from 'react';

const firstLoad = new Promise(resolve => setTimeout(resolve, 1000));

async function fetchViewer() {
  // simulate long network delay
  await firstLoad;

  // uncomment to simulate failed load
  // throw new Error("Failed to load viewer from remote.");

  return (await import('home/ReadyPlayerMeViewer')).default;
}

export default {
  name: 'ReadyPlayerMeVueViewer',
  props: {
    modelSrc: String,
  },
  setup(props) {
    const root = ref(null);
    const error = ref(null);
    const ViewerComponent = ref(null);

    function updateReactComponent() {
      if (!ViewerComponent.value || !!error.value) return;

      ReactDOM.render(React.createElement(ViewerComponent.value, props), root.value);
    }

    function unmountReactComponent() {
      root.value && ReactDOM.unmountComponentAtNode(root.value);
    }

    onMounted(updateReactComponent);
    onUpdated(updateReactComponent);
    onBeforeUnmount(unmountReactComponent);

    fetchViewer()
      .then(b => {
        ViewerComponent.value = b;
        updateReactComponent();
      })
      .catch(e => {
        error.value = e;
      });

    return { root, error };
  },
  template: `
    <!-- this element is just served to mount the React element  -->
    <div v-if="error">error loading viewer: {{ error }}</div>
    <div v-else ref="root">loading viewer...</div>
  `,
};

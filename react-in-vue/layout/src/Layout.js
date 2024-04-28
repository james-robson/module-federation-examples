import { ref } from 'vue';
import ReactButton from './ReactButton';
import ReadyPlayerMeCreator from './ReadyPlayerMeCreator';

export default {
  name: 'Layout',
  components: { ReactButton, ReadyPlayerMeCreator },
  setup() {
    const showButton = ref(true);
    const buttonText = ref('React button');
    const clickedCount = ref(0);
    const incrementCount = () => (clickedCount.value += 1);
    const avatarUrl = ref();

    const onAvatarUrlChange = (newAvatarUrl) => {
      console.log('Received changed URL:', newAvatarUrl);
      avatarUrl.value = newAvatarUrl;
    }

    return { avatarUrl, showButton, buttonText, clickedCount, incrementCount, onAvatarUrlChange };
  },
  template: `
    <div class="layout-app">
      <div>
        <h2>Vue State/Input</h2>
        <div>
          <label>
            <span>Show button:</span>
            <input v-model="showButton" type="checkbox" />
          </label>
        </div>
        <div>
          <label>
            <span>Button text:</span>
            <input data-e2e="FORM_FIELD__BUTTON_TEXT" v-model="buttonText" type="text" />
          </label>
        </div>
        <div>
          <label>
            <span>Times button clicked: </span>
            <input data-e2e="FORM_FIELD__COUNTER" disabled type="number" :value="clickedCount" />
          </label>
        </div>
      </div>
      <div>
        <h2>React Button - loaded via Module Federation</h2>
        <div class="remote-component">
          <react-button v-if="showButton" :text="buttonText" :onClick="incrementCount" />
        </div>
      </div>
      <div>
        <h2>Ready Player Me Creator iFrame</h2>
        <div v-if="avatarUrl">
          <span>Viewer for {{ avatarUrl }} </span>
        </div>
        <ready-player-me-creator v-else @updated-url="onAvatarUrlChange" />
      </div>
    </div>
  `,
};

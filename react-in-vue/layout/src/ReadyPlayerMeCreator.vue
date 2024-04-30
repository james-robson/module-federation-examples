<script setup>
import { defineEmits, ref, toRefs, onMounted } from 'vue';

const subdomain = 'change-me'; // <=== CHANGE ME - Your Ready Player Me subdomain
const frame = ref();
const iframeSource = ref(`https://${subdomain}.readyplayer.me/avatar?frameApi`);
const avatarUrl = ref();

const emit = defineEmits(['updatedUrl']);

const subscribe = (event) => {
  const json = parse(event);

  if (json?.source !== 'readyplayerme') {
    return;
  }

  // Subscribe to all events sent from Ready Player Me once frame is ready
  if (json.eventName === 'v1.frame.ready') {
    frame.value.contentWindow.postMessage(
      JSON.stringify({
        target: 'readyplayerme',
        type: 'subscribe',
        eventName: 'v1.**'
      }),
      '*'
    );
  }

  // Get avatar GLB URL
  if (json.eventName === 'v1.avatar.exported') {
    console.log(`Avatar URL: ${json.data.url}`);
    avatarUrl.value = json.data.url;
    emit('updatedUrl', avatarUrl.value);
  }

  // Get user id
  if (json.eventName === 'v1.user.set') {
    console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
  }
}

const parse = (event) => {
  try {
    return JSON.parse(event.data);
  } catch (error) {
    return null;
  }
}

onMounted(() => {
  window.addEventListener('message', subscribe);
  document.addEventListener('message', subscribe);
});
</script>

<template>
  <iframe :src="iframeSource" ref="frame" class="frame" @message="subscribe" allow="camera *; microphone *; clipboard-write"></iframe>
</template>

<style>
.frame {
  position: relative;
  width: 1024px;
  height: 768px;
  margin: 0;
  border: none;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
}
</style>
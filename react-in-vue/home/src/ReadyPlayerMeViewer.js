import React, { useEffect } from 'react';
import { Avatar } from '@readyplayerme/visage';

export default ({ modelSrc = 'https://readyplayerme.github.io/visage/male.glb' }) => {
  useEffect(() => {
    console.log('ReadyPlayerMeViewer.js: mounted.');
    return () => console.log('ReadyPlayerMeViewer.js: unmounted.');
  }, []);

  const animationSrc =  'https://readyplayerme.github.io/visage/male-idle.glb';

  console.log(`ReadyPlayerMeViewer.js: rendered. Avatar URL is ${modelSrc}`);

  return (
    <div style={{
      width: '1024px',
      height: '768px',
      border: '2px solid black',
    }}>
      <Avatar modelSrc={modelSrc} animationSrc={animationSrc} />
    </div>
  );
};

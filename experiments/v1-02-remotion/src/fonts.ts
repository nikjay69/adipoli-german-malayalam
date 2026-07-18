import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

const fontDefinitions = [
  {
    family: 'Source Serif 4',
    path: 'fonts/source-serif-4-latin-variable.woff2',
  },
  {family: 'Geist', path: 'fonts/geist-sans-variable.woff2'},
  {family: 'Geist Mono', path: 'fonts/geist-mono-variable.woff2'},
] as const;

const fontLoadHandle = delayRender('Loading frozen 2A typefaces');

Promise.all(
  fontDefinitions.map(async ({family, path}) => {
    const face = new FontFace(family, `url(${staticFile(path)})`, {
      style: 'normal',
      weight: '100 900',
      display: 'block',
    });
    const loaded = await face.load();
    (document.fonts as unknown as {add: (font: FontFace) => void}).add(loaded);
  }),
)
  .then(() => continueRender(fontLoadHandle))
  .catch((error: unknown) => cancelRender(error));

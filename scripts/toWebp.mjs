import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
  const imgFiles = await imagemin(['public/images/*.jpg'], {
    destination: 'public/images',
    plugins: [imageminWebp()],
  });
  console.log(imgFiles);

  const profileFiles = await imagemin(['public/images/profiles/*.jpg'], {
    destination: 'public/images/profiles',
    plugins: [imageminWebp()],
  });
  console.log(profileFiles);
})();

const os = require('os');
const { exec } = require('child_process');

const args = process.argv.slice(2);

const validTimes = args.filter(arg => {
  const time = Number(arg);
  return !isNaN(time) && time > 0;
}).map(Number).sort((a, b) => a - b);

const beepOrAlert = () => {
  const platform = os.platform();
  // edgeCases "MAC/UNIX/CC"
  if (platform === 'darwin') {
    exec('say "Beep!"');
  } else if (platform === 'linux') {
    exec('echo -e "\\a"');
  } else {
    console.log(".");  // Default to printing a dot for other platforms
  }

  console.log("Beep!");  // Visual feedback (like closed captioning)
};


validTimes.forEach(time => {
  setTimeout(beepOrAlert, time * 1000);
});

if (validTimes.length === 0) {
  console.log("No valid times provided. Exiting...");
  process.exit();
}

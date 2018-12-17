let audio: any = {}; // cache

export function playSound(soundFileName: string) {
    if (soundFileName.endsWith(".mp3"))
        throw "playSound('" + soundFileName + "'): расширение .mp3 не нужно";

    let fileName = "sounds/" + soundFileName + ".mp3";

    if (!audio[fileName])
        audio[fileName] = new Audio(fileName);

    audio[fileName].play();

}

export function playSound_ButtonClick() {
    playSound("button-click");
}


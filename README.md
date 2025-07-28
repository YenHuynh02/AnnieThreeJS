# Gift for Ann (3D Render Test)

### Notes:
Download package `ffmpeg` in Ubuntu to convert audio file.

```wsl
sudo apt update
```
```wsl
sudo apt install ffmpeg
```
```wsl
ffmpeg -i mylight.mp3 -c:a aac -b:a 192k mylight.m4a
```
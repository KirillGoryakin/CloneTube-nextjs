
# 📺 CloneTube
*👴 [Old repository](https://github.com/KirillGoryakin/CloneTube) without **NextJS***

**CloneTube** basically is just a YouTube clone made with **NextJS**. No auth, no liking and commenting. Just watching. It uses [YT-API](https://rapidapi.com/ytjar/api/yt-api).

## ✨ Features:
- Server Side Rendering with **NextJS**
- Responsive design
- Framer-motion animations
- SCSS
- Infinite scroll

## 🔧 Technologies:
- React JS
- Next JS
- Typescript
- Framer-motion
- ESLint

# 👓 Live Demo
https://clone-tube.vercel.app/
# 💻 Development
### Instalation:
Clone repository:
```
git clone https://github.com/KirillGoryakin/CloneTube-nextjs.git
```
Install packages:
```
npm i
```
You are going to need [YT-API](https://rapidapi.com/ytjar/api/yt-api) api key. After you subscribe, copy and provide it with `ENV` variables:
```
NEXT_PUBLIC_X_RAPID_API_HOST=yt-api.p.rapidapi.com
NEXT_PUBLIC_X_RAPID_API_KEY=your_api_key
```
### Start dev server:
```
npm run dev
```
### Build production:
```
npm run build
```
### Start production server:
```
npm run start
```

# 🐳 Docker
### Build image
```
docker build . -t clonetube
```
### Run container
```
docker run -d --rm -p 3000:3000 --name clonetube clonetube
```